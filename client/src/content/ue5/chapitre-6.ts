// Chapitre 6 du module UE5, Finances publiques : contenu pur.
// Migré depuis l'ancienne page dédiée UE5Chapitre6Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec vérification sur
// les textes : LOFIP art. 9, 34-35, 89-92, 102-110, 128-131 ; RGCP (décret
// n° 24/10 du 14 octobre 2024) art. 1-79 lus en intégralité ; Constitution
// art. 174, 176 ; LF 2026 (n° 25/060) et son annexe II ; paramètres
// fiscaux 2026 (loi n° 23/053). Corrections majeures : les trois phases
// de la recette relèvent de l'art. 89 LOFIP - l'« art. 90 » cité partout
// vise les DÉPENSES (engagement, liquidation, ordonnancement, paiement) ;
// la citation prêtée à l'art. 110 était une paraphrase (texte exact
// rétabli, avec sa réserve « sauf disposition expresse d'une loi de
// finances ») ; l'« art. 14 universalité » est en réalité l'art. 7
// (l'art. 14 = équilibre) ; les régies d'avances et de recettes relèvent
// de l'art. 50 du RGCP (non d'un « art. 94 LOFIP ») ; la dualité
// ordonnateur/comptable est portée par l'art. 4 du RGCP et les art.
// 101-109 LOFIP (non « art. 92-94 ») ; les fonds de concours relèvent
// des art. 69-71 (non « art. 61 ») ; « IS 30% - O.-L. n° 13/002 » et
// l'IRPP « cédulaire » décrivaient le régime abrogé - depuis le 1er
// janvier 2026, IS et IRPP relèvent de la loi n° 23/053 (IS 30%, impôt
// minimum 1% du CA) ; la « taxe de 2% étendue à toutes les exportations
// minières par la LF 2026 » n'est pas vérifiable dans le texte promulgué
// (supprimée) ; « DGRAD 6 469,4 Mds » confondait la DGRAD (5 474,6 Mds,
// annexe II) avec le total des recettes non fiscales (6 469,4 Mds).
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch6-q1', question: "Selon l'art. 89 LOFIP, dans quel ordre les phases administratives de la recette se succèdent-elles ?",
    options: [
      { id: 'a', texte: 'Liquidation → constatation → ordonnancement' },
      { id: 'b', texte: 'Ordonnancement → liquidation → constatation' },
      { id: 'c', texte: 'Constatation → liquidation → ordonnancement' },
      { id: 'd', texte: 'Engagement → liquidation → paiement' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 89 et 91 LOFIP · Art. 61 RGCP',
    explication: "L'art. 89 LOFIP définit les trois étapes : la constatation « a pour objet d'identifier et d'évaluer la matière imposable », la liquidation « consiste à déterminer le montant de la créance sur le redevable en indiquant les bases, taux et tarifs appliqués », l'ordonnancement « consiste à établir un titre de perception » permettant au comptable public d'assurer le recouvrement. L'art. 61 du RGCP y ajoute la phase comptable : le recouvrement. Attention : l'art. 90 LOFIP décrit, lui, la chaîne de la DÉPENSE.",
  },
  {
    id: 'ch6-q2', question: 'Pour les recettes perçues au comptant, quel est le régime prévu par la LOFIP ?',
    options: [
      { id: 'a', texte: "Elles sont interdites : toute recette exige un titre préalable" },
      { id: 'b', texte: 'Les documents justifiant le paiement forment titres de perception, et un ordonnancement de régularisation intervient après encaissement' },
      { id: 'c', texte: "Elles sont encaissées sans aucune formalité" },
      { id: 'd', texte: 'Elles doivent être autorisées par la Cour des comptes' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 89 et 91 LOFIP · Art. 62 RGCP',
    explication: "L'art. 89 in fine : « En matière de recettes au comptant, les documents justifiant le paiement forment titres de perception » ; et l'art. 91 : « Toute recette au comptant fait l'objet, après son encaissement, d'un ordonnancement pour régularisation. » L'art. 62 du RGCP organise la mécanique : le comptable public saisit l'ordonnateur des encaissements effectués pour l'émission d'un titre de perception de régularisation.",
  },
  {
    id: 'ch6-q3', question: 'Qui est l\'ordonnateur général de toutes les recettes du pouvoir central ?',
    options: [
      { id: 'a', texte: 'Le Ministre du Budget' },
      { id: 'b', texte: 'Le Ministre ayant les finances dans ses attributions' },
      { id: 'c', texte: 'Le Premier ministre' },
      { id: 'd', texte: 'Le Gouverneur de la Banque centrale' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 106 LOFIP · Art. 13-14 RGCP',
    explication: "L'art. 106 LOFIP : le ministre ayant les finances dans ses attributions est « ordonnateur général de toutes les recettes du pouvoir central. À ce titre, il constate, liquide et ordonnance lesdites recettes. » L'art. 14 du RGCP organise la délégation : aux responsables des administrations financières, qui deviennent ordonnateurs délégués des recettes, et, pour les recettes non fiscales, d'office aux fonctionnaires qualifiés pour la constatation et la liquidation.",
  },
  {
    id: 'ch6-q4', question: 'Quelle régie financière est compétente pour la TVA et les impôts sur les revenus (IS, IRPP) ?',
    options: [
      { id: 'a', texte: 'La DGDA' },
      { id: 'b', texte: 'La DGRAD' },
      { id: 'c', texte: 'La DGI' },
      { id: 'd', texte: 'La BCC' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 19 RGCP · LF 2026, annexe II',
    explication: "La DGI administre la fiscalité intérieure : TVA (taux normal 16%), IS et IRPP (régis depuis le 1er janvier 2026 par la loi n° 23/053). La DGDA perçoit les droits de douane et d'accises à la frontière, la DGRAD les recettes administratives, judiciaires, domaniales et de participations. Le RGCP (art. 19) qualifie leurs receveurs de « receveurs des administrations financières », chargés du recouvrement des impôts, droits, taxes et redevances selon les codes et lois applicables.",
  },
  {
    id: 'ch6-q5', question: 'Selon la LF 2026 (n° 25/060), quel montant de recettes d\'impôts (DGI) est prévu pour 2026 ?',
    options: [
      { id: 'a', texte: '7 522,0 milliards FC' },
      { id: 'b', texte: '5 474,6 milliards FC' },
      { id: 'c', texte: '19 033,6 milliards FC' },
      { id: 'd', texte: '48 969,3 milliards FC' },
    ],
    reponseCorrecte: 'c', articleRef: 'LF 2026 (n° 25/060), art. 7 et annexe II',
    explication: "L'annexe II de la LF 2026 prévoit 19 033,6 milliards FC de recettes d'impôts (+16,0% sur la LFR 2025), 7 522,0 milliards de douanes et accises (+12,4%) et 6 469,4 milliards de recettes non fiscales - dont 5 474,6 milliards pour la DGRAD. Le total des recettes du budget général est de 48 969,3 milliards (art. 7), le budget étant en équilibre à 54 335,8 milliards (art. 6).",
  },
  {
    id: 'ch6-q6', question: "Que dispose exactement l'art. 110 LOFIP sur les disponibilités des administrations ?",
    options: [
      { id: 'a', texte: 'Chaque ministère ouvre un compte auprès de la banque de son choix' },
      { id: 'b', texte: "Sauf disposition expresse d'une loi de finances, toutes les administrations et services publics déposent toutes leurs disponibilités dans le compte général du trésor ouvert auprès du caissier de l'État" },
      { id: 'c', texte: 'Seules les recettes fiscales transitent par le Trésor' },
      { id: 'd', texte: 'Les fonds publics sont déposés à la Cour des comptes' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 110 LOFIP',
    explication: "Texte exact de l'art. 110 : « Sauf disposition expresse d'une loi de finances, toutes les administrations et tous les services publics, y compris les projets émargeant au budget du pouvoir central, sont tenus de déposer toutes leurs disponibilités dans le compte général du trésor ouvert auprès du caissier de l'État. » C'est le principe d'unité de trésorerie (ou de caisse) - la dérogation elle-même est un monopole de la loi de finances.",
  },
  {
    id: 'ch6-q7', question: "Qui joue le rôle de caissier de l'État en RDC ?",
    options: [
      { id: 'a', texte: 'Une banque commerciale agréée' },
      { id: 'b', texte: 'La Banque centrale du Congo' },
      { id: 'c', texte: 'La Cour des comptes' },
      { id: 'd', texte: "L'Agent Comptable Central du Trésor" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 110 LOFIP · Art. 176 Constitution',
    explication: "La Banque centrale du Congo tient le compte général du Trésor : l'art. 176 de la Constitution lui confie « la garde des fonds publics » parmi ses missions, et l'art. 110 LOFIP impose le dépôt des disponibilités dans le compte général du trésor ouvert auprès du caissier de l'État. Rappel complémentaire : le recours aux avances de la BCC est prohibé pour les trois étages (art. 16 LOFIP) - la Banque garde les fonds, elle ne finance pas le déficit.",
  },
  {
    id: 'ch6-q8', question: 'Les débiteurs de l\'État peuvent-ils compenser leurs dettes fiscales avec leurs créances sur l\'État ?',
    options: [
      { id: 'a', texte: 'Oui, librement' },
      { id: 'b', texte: "Non : ils ne peuvent pas se prévaloir de leurs créances vis-à-vis de l'État pour s'opposer au paiement de leurs dettes" },
      { id: 'c', texte: 'Oui, avec l\'accord du contrôleur budgétaire' },
      { id: 'd', texte: 'Oui, pour les seules créances de plus de un an' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7 LOFIP · Art. 63 et 76 RGCP',
    explication: "L'art. 76 du RGCP : « Les débiteurs de l'État ne peuvent pas se prévaloir de leurs créances vis-à-vis de l'État pour s'opposer au paiement de leurs dettes. » Et l'art. 63 : les recettes sont émises et recouvrées dans leur intégralité, « aucune contraction n'est autorisée entre les recettes et les dépenses » - écho du produit brut de l'art. 7 LOFIP. Nuance technique : avant tout paiement, le comptable public doit opérer la compensation légale entre les dettes et créances assignées sur sa caisse (art. 76 al. 2) - c'est un mécanisme comptable interne, non un droit du contribuable.",
  },
  {
    id: 'ch6-q9', question: 'Quelle est la valeur juridique du titre de perception transmis au comptable public ?',
    options: [
      { id: 'a', texte: 'Une simple information administrative' },
      { id: 'b', texte: 'Il a force exécutoire' },
      { id: 'c', texte: "Il doit d'abord être homologué par un tribunal" },
      { id: 'd', texte: 'Il est valable trente jours' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 68 et 72-74 RGCP',
    explication: "L'art. 68 du RGCP : « Les titres de perception sont transmis aux comptables publics pour prise en charge et recouvrement. Ils ont force exécutoire. » Le recouvrement est d'abord amiable ; en cas de non-exécution, il devient forcé « par toutes voies de droit » (art. 72), exécuté par des agents ayant qualité d'huissier du Trésor ou, le cas échéant, d'huissier de justice (art. 74), avec titres complémentaires pour les majorations légalement dues.",
  },
  {
    id: 'ch6-q10', question: "Une créance de l'État se révèle irrécouvrable. Qui peut prononcer son admission en non-valeurs ?",
    options: [
      { id: 'a', texte: 'Le comptable public qui la détient' },
      { id: 'b', texte: "Le Ministre ayant les finances dans ses attributions (ou l'échevin au niveau local)" },
      { id: 'c', texte: 'Le contrôleur budgétaire' },
      { id: 'd', texte: "L'ordonnateur délégué de la régie financière" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 73 et 75 RGCP',
    explication: "L'art. 75 du RGCP : les mises en surséance indéfinie, les remises gracieuses de dettes, l'annulation ou l'admission en non-valeurs des créances irrécouvrables « sont prononcées, selon le cas, par le Ministre ou l'échevin ayant les finances dans ses attributions ». Le comptable, lui, engage sa responsabilité si une recette n'a pas été recouvrée conformément aux textes « ou en violation des dispositions réglementant l'admission des recettes en non-valeurs » (art. 34 RGCP).",
  },
  {
    id: 'ch6-q11', question: "Un directeur provincial d'une régie financière ouvre un compte dans une banque commerciale pour y loger les recettes de sa province. Cette pratique est :",
    options: [
      { id: 'a', texte: 'Légale si elle accélère le paiement des agents' },
      { id: 'b', texte: "Illégale : violation de l'art. 110 LOFIP, et l'immixtion dans le maniement des deniers publics expose à la gestion de fait" },
      { id: 'c', texte: 'Légale avec l\'accord du gouverneur de province' },
      { id: 'd', texte: 'Légale pour les montants inférieurs à 1 milliard FC' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 110 et 130 LOFIP · Art. 17 et 36 RGCP',
    explication: "Sauf disposition expresse d'une loi de finances, toutes les disponibilités doivent être déposées au compte général du trésor (art. 110). Manier des deniers publics hors de tout titre expose à la qualification de comptable de fait : « toute personne qui, sans avoir qualité ou mandat du comptable public, s'immisce dans la gestion des deniers et valeurs publics peut être déclarée comptable public de fait par la Cour des comptes » (art. 17 RGCP), avec les mêmes obligations et responsabilités qu'un comptable public et une amende pouvant atteindre le total des sommes maniées (art. 36 RGCP ; art. 130 LOFIP).",
  },
  {
    id: 'ch6-q12', question: 'Quel dispositif permet légalement à un agent d\'encaisser localement des recettes au comptant avant reversement au Trésor ?',
    options: [
      { id: 'a', texte: 'Un compte bancaire de service ouvert par le directeur' },
      { id: 'b', texte: 'La régie de recettes, créée par les Ministres ou échevins ayant les finances dans leurs attributions, avec limitation de l\'encaisse' },
      { id: 'c', texte: 'Une caisse noire dûment inventoriée' },
      { id: 'd', texte: 'Un mandat délivré par le gouverneur' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 50-54 RGCP',
    explication: "L'art. 50 du RGCP : la régie de recettes « permet à un agent de carrière des services publics de l'État de constater, de liquider et d'encaisser des recettes au nom et pour le compte d'un comptable public assignataire des recettes », les sommes étant reversées audit comptable. L'acte constitutif - pris par le Ministre ou l'échevin des finances sur proposition des responsables des administrations financières - précise notamment la liste limitative des recettes, le montant maximum de l'encaisse et la périodicité de la reddition des comptes (art. 51) ; la régie est soumise à la règle de limitation de l'encaisse (art. 54).",
  },
  {
    id: 'ch6-q13', question: 'La responsabilité du comptable public est engagée notamment lorsque :',
    options: [
      { id: 'a', texte: 'Les prévisions de recettes de la loi de finances ne sont pas atteintes' },
      { id: 'b', texte: "Une recette n'a pas été recouvrée conformément aux dispositions légales et réglementaires" },
      { id: 'c', texte: 'Le Parlement rejette la loi de reddition des comptes' },
      { id: 'd', texte: "Un contribuable conteste sa liquidation" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 32-35 RGCP · Art. 131 LOFIP',
    explication: "L'art. 34 du RGCP énumère les cas : déficit ou excédent de caisse ou manquant de matières ; recette non recouvrée conformément aux textes ; dépense irrégulièrement payée en manquement aux contrôles ; indemnisation d'un tiers par la faute du comptable. Le comptable responsable verse alors de ses deniers personnels une somme égale au manquant (art. 35) - le débet -, sa responsabilité personnelle et pécuniaire étant posée par l'art. 131 LOFIP et l'art. 32 RGCP.",
  },
  {
    id: 'ch6-q14', question: "En cas de vol à main armée de la caisse, le comptable public peut :",
    options: [
      { id: 'a', texte: 'Être automatiquement condamné au débet' },
      { id: 'b', texte: 'Obtenir décharge totale ou partielle de sa responsabilité pour force majeure' },
      { id: 'c', texte: 'Être révoqué sans procédure' },
      { id: 'd', texte: "Imputer la perte sur les crédits du programme" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 46 RGCP',
    explication: "L'art. 46 du RGCP : le comptable peut obtenir décharge totale ou partielle de sa responsabilité « dans la mesure où le débet résulte de circonstances de force majeure » - notamment les faits de guerre, l'incendie et le vol à main armée ; d'autres circonstances peuvent être admises après examen (faux billets d'une contrefaçon indétectable, fausses pièces justificatives). La force majeure n'est pas reconnue si le comptable ou un agent sous son autorité a commis une faille ou une négligence. À distinguer de la remise gracieuse (art. 39), qui n'éteint pas la responsabilité mais dispense du paiement.",
  },
  {
    id: 'ch6-q15', question: "Depuis le 1er janvier 2026, l'imposition des bénéfices des sociétés en RDC relève de :",
    options: [
      { id: 'a', texte: "L'ordonnance-loi n° 69/009 (IBP cédulaire)" },
      { id: 'b', texte: 'La loi n° 23/053 du 30 novembre 2023 : IS au taux de 30%, avec impôt minimum de 1% du chiffre d\'affaires' },
      { id: 'c', texte: 'Du Code minier exclusivement' },
      { id: 'd', texte: "D'un décret du Premier ministre" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053 du 30 novembre 2023',
    explication: "La réforme de la loi n° 23/053 du 30 novembre 2023, applicable depuis le 1er janvier 2026, remplace l'ancien régime cédulaire (IBP, IPR de l'O.-L. 69/009, abrogée) par l'IS (taux de 30%, impôt minimum de 1% du chiffre d'affaires) et l'IRPP. La LF 2026 ne modifie ni le taux de l'IS, ni le barème de l'IRPP, ni les taux de TVA (taux normal 16% ; taux réduits portés à 1% et 5% par son art. 46) ; elle déplace en revanche les échéances des acomptes provisionnels aux 25 juillet, 25 septembre et 25 novembre.",
  },
  {
    id: 'ch6-q16', question: "Un ministre veut affecter directement les recettes de TVA sur les produits pétroliers à un fonds d'électrification rurale, sans passer par le budget. Cette affectation est :",
    options: [
      { id: 'a', texte: 'Légale par simple arrêté interministériel' },
      { id: 'b', texte: "Illégale : l'art. 7 LOFIP interdit l'affectation du produit des recettes à des dépenses particulières - seule une loi de finances peut créer un compte d'affectation spéciale" },
      { id: 'c', texte: 'Légale si le fonds est audité' },
      { id: 'd', texte: 'Légale pour les recettes non fiscales seulement' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7, 54 et 60 LOFIP',
    explication: "L'art. 7 : « L'ensemble de recettes assure l'exécution de l'ensemble de dépenses sans aucune affectation de leur produit à des dépenses particulières » ; l'art. 54 réserve à la loi de finances les affectations expresses (budgets annexes, comptes spéciaux, procédures particulières) et l'art. 60 exige une disposition de loi de finances pour ouvrir un compte spécial et lui affecter une recette. La LF 2026 rappelle elle-même la non-contraction et la réserve de loi (art. 2-4). Le canal légal : faire créer un compte d'affectation spéciale par la loi de finances - comme le FIS-RDC (art. 51 LF 2026).",
  },
  {
    id: 'ch6-q17', question: 'À quel budget une recette est-elle rattachée selon l\'art. 92 LOFIP ?',
    options: [
      { id: 'a', texte: "Au budget de l'année de son fait générateur" },
      { id: 'b', texte: "Au budget de l'année au cours de laquelle elle est encaissée par un comptable public" },
      { id: 'c', texte: "Au budget de l'année de l'émission du titre de perception" },
      { id: 'd', texte: "Au budget de l'année choisie par l'ordonnateur" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 92 LOFIP',
    explication: "L'art. 92 : « Les recettes sont prises en compte au titre du budget de l'année au cours de laquelle elles sont encaissées par un comptable public. » C'est la logique de caisse de la comptabilité budgétaire (art. 3 pt. 10 : base d'encaissement pour les recettes), tempérée par la période complémentaire de l'art. 97 (comptabilisation possible jusqu'au 31 janvier). La comptabilité générale, elle, rattache en droits constatés (art. 99).",
  },
  {
    id: 'ch6-q18', question: "Le paiement d'une dette envers l'État donne lieu à la délivrance de :",
    options: [
      { id: 'a', texte: "Un acquit libératoire par le comptable public" },
      { id: 'b', texte: "Un certificat de l'ordonnateur" },
      { id: 'c', texte: 'Un visa du contrôleur budgétaire' },
      { id: 'd', texte: 'Une attestation de la Cour des comptes' },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 78-79 RGCP',
    explication: "L'art. 78 du RGCP : « Tout règlement de dette envers le pouvoir central, les provinces, les Entités Territoriales Décentralisées donne lieu à la délivrance d'un acquit libératoire par le comptable public » - sauf remise de timbres ou formules à valeur faciale. Le débiteur est libéré s'il présente cet acquit, s'il invoque une prescription ou s'il établit l'encaissement effectif des effets de commerce émis au profit de l'État (art. 79).",
  },
  {
    id: 'ch6-q19', question: 'Selon la classification de l\'art. 34 LOFIP, le produit des impôts et taxes constitue :',
    options: [
      { id: 'a', texte: 'Une recette exceptionnelle' },
      { id: 'b', texte: 'Une recette courante des ressources internes' },
      { id: 'c', texte: 'Une recette en capital' },
      { id: 'd', texte: 'Une ressource extérieure' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 34-35 LOFIP',
    explication: "L'art. 34 classe les ressources budgétaires : ressources internes - recettes courantes (impôts et taxes, revenus du domaine et des participations, recettes administratives et judiciaires, amendes, produits divers), recettes en capital (cessions) et recettes exceptionnelles (dons et legs intérieurs, remboursements de prêts, emprunts intérieurs) - et ressources extérieures (dons et legs extérieurs, tirages sur emprunts). Leur rendement est évalué par les lois de finances (art. 35).",
  },
  {
    id: 'ch6-q20', question: "Le taux de pression fiscale projeté par la LF 2026 est de :",
    options: [
      { id: 'a', texte: '5,3%' },
      { id: 'b', texte: '4,4%' },
      { id: 'c', texte: '12,3%' },
      { id: 'd', texte: '16%' },
    ],
    reponseCorrecte: 'c', articleRef: 'LF 2026 (n° 25/060), exposé des motifs',
    explication: "L'exposé des motifs de la LF 2026 projette une pression fiscale de 12,3% du PIB pour 2026, sur un cadrage macroéconomique de 5,3% de croissance, 4,4% d'inflation moyenne, un taux de change moyen de 2 467,0 FC/USD et un PIB nominal de 269 291,9 milliards FC. Les 16% sont le taux normal de TVA - un impôt, pas un ratio macroéconomique.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '6.1',
    titre: 'Le cadre : légalité, classification et rattachement des recettes',
    navLabel: 'Cadre général',
    blocs: [
      { type: 'paragraphe', texte: "Aucune recette publique ne se perçoit sans texte : « il ne peut être établi d'impôts que par la loi » et il ne peut être établi d'exemption ou d'allégement fiscal qu'en vertu de la loi (art. 9 LOFIP ; art. 174 de la Constitution) ; les règles d'assiette, de taux et de recouvrement des impositions de toute nature relèvent du domaine de la loi (art. 122 pt. 10 de la Constitution). Côté classification, l'art. 34 LOFIP range les ressources budgétaires en recettes courantes, en capital et exceptionnelles (ressources internes) et en ressources extérieures, leur rendement étant évalué par les lois de finances (art. 35). Le RGCP le redit à son échelle : les recettes comprennent « les produits d'impôts, taxes, droits, redevances, dons et autres produits autorisés par les lois en vigueur ou résultant de décisions de justice ou de conventions » (art. 60 RGCP)." },
      { type: 'filet', titre: 'Le rattachement à l\'exercice (art. 92 LOFIP)', texte: "« Les recettes sont prises en compte au titre du budget de l'année au cours de laquelle elles sont encaissées par un comptable public. » La comptabilité budgétaire suit l'encaissement (art. 3 pt. 10) ; la comptabilité générale, en droits constatés, rattache les créances à l'exercice de leur naissance (art. 99). La période complémentaire de l'art. 97 permet de comptabiliser jusqu'au 31 janvier." },
      { type: 'carte', titre: 'Les recettes 2026 en chiffres (LF n° 25/060, annexe II, milliards FC)', tableau: {
        entetes: ['Poste', 'LFR 2025', 'LF 2026', 'Évolution'],
        lignes: [
          ['Impôts (DGI)', '16 407,6', '**19 033,6**', '+16,0%'],
          ['Douanes et accises (DGDA)', '6 693,1', '**7 522,0**', '+12,4%'],
          ['Recettes non fiscales - dont DGRAD 5 474,6', '6 798,0', '**6 469,4**', '-4,8%'],
          ['Recettes totales du budget général', '45 749,6', '**48 969,3**', '+7,0%'],
        ],
      }, note: "Cadrage macroéconomique 2026 : croissance 5,3%, inflation moyenne 4,4%, change moyen 2 467,0 FC/USD, pression fiscale projetée 12,3% du PIB. Le budget total est en équilibre à 54 335,8 milliards FC (art. 6)." },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '6.2',
    titre: 'Les phases de la recette : constatation, liquidation, ordonnancement, recouvrement',
    navLabel: 'Les phases',
    blocs: [
      { type: 'filet', titre: 'Art. 89 LOFIP - texte exact', texte: "« En matière de recettes, la constatation a pour objet d'identifier et d'évaluer la matière imposable. La liquidation consiste à déterminer le montant de la créance sur le redevable en indiquant les bases, taux et tarifs appliqués. L'ordonnancement consiste à établir un titre de perception destiné à la prise en charge de la recette et permettant au comptable public d'en assurer le recouvrement. En matière de recettes au comptant, les documents justifiant le paiement forment titres de perception. » Attention à la confusion classique : l'art. 90 décrit la chaîne de la DÉPENSE (engagement, liquidation, ordonnancement, paiement)." },
      { type: 'carte', titre: 'La chaîne complète (art. 89, 91 LOFIP ; art. 61-70 RGCP)', tableau: {
        entetes: ['Phase', 'Contenu', 'Acteur'],
        lignes: [
          ['**1. Constatation**', "Identifier et évaluer la matière imposable - le fait générateur et l'assiette", 'Ordonnateur de recettes (phase administrative)'],
          ['**2. Liquidation**', "Déterminer le montant de la créance en indiquant bases, taux et tarifs ; toute créance fait l'objet d'un titre de constatation et de liquidation (art. 65 RGCP)", 'Ordonnateur de recettes'],
          ['**3. Ordonnancement**', "Établir le titre de perception - rôles, avis d'imposition, états de liquidation, titres de régularisation (art. 66 RGCP) - indiquant les bases de la liquidation", 'Ordonnateur de recettes'],
          ['**4. Recouvrement**', 'Prise en charge du titre, encaissement amiable puis forcé le cas échéant - la phase comptable (art. 61 RGCP)', 'Comptable public assignataire'],
        ],
      }, note: "Séquence impérative : « toute recette régulièrement constatée par les services générateurs des recettes fait l'objet, préalablement à son recouvrement, d'une liquidation et d'un ordonnancement » (art. 91 LOFIP). Une erreur de liquidation se corrige par ordre d'annulation ou de réduction de recette, ou par titre de perception complémentaire (art. 67 RGCP)." },
      { type: 'paragraphe', texte: "**Les recettes au comptant** inversent la fin de la séquence : perçues immédiatement - droits de caisse, timbres, nombreuses recettes administratives -, elles sont imputées provisoirement en comptabilité générale, puis le comptable saisit l'ordonnateur, par un document ad hoc, des encaissements effectués « en vue de l'émission d'un titre de perception de régularisation pour une imputation budgétaire et comptable définitive » (art. 62 RGCP) - c'est l'« ordonnancement pour régularisation » de l'art. 91 LOFIP. La retenue à la source (impôts sur les rémunérations retenus par l'employeur, retenues sur les revenus des capitaux mobiliers) obéit à une logique voisine : la déclaration accompagnée du paiement tient lieu de justification, l'imputation définitive suivant l'encaissement." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
    ],
  },
  {
    numero: '6.3',
    titre: 'Les acteurs : ordonnateurs de recettes, receveurs et régies',
    navLabel: 'Acteurs',
    blocs: [
      { type: 'paragraphe', texte: "L'exécution des recettes repose sur la **séparation des ordonnateurs et des comptables publics** : « les fonctions d'ordonnateur et celles de comptable public sont incompatibles » (art. 4 RGCP), et les conjoints, ascendants et descendants d'un ordonnateur ne peuvent être comptables des organismes où il exerce. L'**ordonnateur de recettes** est « toute autorité ayant qualité pour constater, liquider et ordonnancer au nom de l'État des recettes inscrites au budget » (art. 13 RGCP) : le Ministre des Finances est l'ordonnateur général de toutes les recettes du pouvoir central (art. 106 LOFIP), et il délègue ce pouvoir aux responsables des administrations financières - ordonnateurs délégués des recettes -, la constatation et la liquidation des recettes non fiscales étant conférées d'office aux fonctionnaires qualifiés (art. 14 RGCP). Les ordonnateurs sont responsables des titres qu'ils délivrent et les notifient aux comptables principaux assignataires (art. 15 RGCP)." },
      { type: 'carte', titre: 'Les régies financières et le réseau comptable', liste: [
        "**DGI** - fiscalité intérieure : TVA (taux normal 16%), IS et IRPP (loi n° 23/053 depuis le 1er janvier 2026). Prévision 2026 : 19 033,6 milliards FC.",
        "**DGDA** - fiscalité de frontière : droits de douane du tarif d'importation (structure 5% / 10% / 20% de l'O.-L. n° 011/2012, dont la LF 2026 réaménage des positions en annexe XVII) et droits d'accises (Code des accises, annexe XVIII). Prévision 2026 : 7 522,0 milliards FC.",
        "**DGRAD** - recettes administratives, judiciaires, domaniales et de participations (droits de chancellerie, amendes et frais de justice, redevances domaniales et minières, dividendes du portefeuille). Prévision 2026 : 5 474,6 milliards FC, au sein de 6 469,4 milliards de recettes non fiscales.",
        "**Les receveurs des administrations financières** sont des comptables publics relevant des cadres organiques de leurs services, « chargés du recouvrement des impôts, des droits, des taxes, des redevances et des recettes diverses ainsi que des pénalités fiscales » selon les codes et lois applicables (art. 19 RGCP) ; les comptables directs du Trésor exécutent principalement les dépenses (art. 20).",
        "**Le réseau comptable** est centralisé : comptables centralisateurs et non centralisateurs sont reliés à l'Agent Comptable Central du Trésor (ACCT), qui assure la centralisation finale des comptabilités et flux financiers et la consolidation de la comptabilité de l'État (art. 23 RGCP).",
      ] },
      { type: 'filet', titre: 'Les régies de recettes (art. 50-54 RGCP)', texte: "Pour les encaissements de proximité, la régie de recettes « permet à un agent de carrière des services publics de l'État de constater, de liquider et d'encaisser des recettes au nom et pour le compte d'un comptable public assignataire », à charge de reversement. Création sur proposition des responsables des administrations financières, par le Ministre ou l'échevin des finances ; l'acte constitutif fixe la liste limitative des recettes, le montant maximum de l'encaisse et la périodicité de la reddition des comptes ; les régies ne couvrent que les droits au comptant ou spontanés, et le régisseur - désigné par le ministre des finances sur proposition de l'ordonnateur - est personnellement et pécuniairement responsable de ses opérations." },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '6.4',
    titre: 'Le recouvrement : force exécutoire, contrainte et extinction de la créance',
    navLabel: 'Recouvrement',
    blocs: [
      { type: 'paragraphe', texte: "Les titres de perception transmis au comptable public **ont force exécutoire** (art. 68 RGCP) : nul besoin d'un jugement pour recouvrer. Le paiement s'opère par espèces, chèques ou effets bancaires, virement ou tout autre moyen autorisé (art. 71). Le recouvrement est d'abord **amiable** ; à défaut, il devient **forcé, par toutes voies de droit**, exécuté par des agents ayant qualité d'huissier du Trésor ou, le cas échéant, d'huissier de justice (art. 72 et 74), l'ordonnateur émettant des titres complémentaires pour constater les majorations et accroissements légalement dus." },
      { type: 'carte', titre: "Aménagements et extinction de la créance", liste: [
        "**Surséance, remise, non-valeurs** : la mise en surséance indéfinie, la remise gracieuse, l'annulation ou l'admission en non-valeurs des créances irrécouvrables sont prononcées par le Ministre - ou l'échevin - ayant les finances dans ses attributions (art. 73 et 75 RGCP) ; jamais par le comptable, dont la responsabilité serait engagée par un abandon irrégulier (art. 34).",
        "**Pas de compensation à l'initiative du débiteur** : « les débiteurs de l'État ne peuvent pas se prévaloir de leurs créances vis-à-vis de l'État pour s'opposer au paiement de leurs dettes » (art. 76) - écho de la non-contraction de l'art. 7 LOFIP et de l'art. 63 RGCP ; le comptable opère en revanche, avant tout paiement, la compensation légale entre dettes et créances assignées sur sa caisse.",
        "**Libération du débiteur** : acquit libératoire délivré par le comptable pour tout règlement (art. 78), prescription régie par les lois en vigueur (art. 77), ou preuve de l'encaissement effectif des effets de commerce émis au profit de l'État (art. 79).",
      ] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[17] },
    ],
  },
  {
    numero: '6.5',
    titre: "L'unité de trésorerie : le compte général du Trésor",
    navLabel: 'Unité de trésorerie',
    blocs: [
      { type: 'filet', titre: 'Art. 110 LOFIP - texte exact', texte: "« Sauf disposition expresse d'une loi de finances, toutes les administrations et tous les services publics, y compris les projets émargeant au budget du pouvoir central, sont tenus de déposer toutes leurs disponibilités dans le compte général du trésor ouvert auprès du caissier de l'État. » Le caissier de l'État est la Banque centrale du Congo, dont la Constitution fait la gardienne des fonds publics (art. 176) - tout en lui interdisant de financer l'État par avances (art. 16 LOFIP)." },
      { type: 'carte', titre: "Pourquoi l'unité de trésorerie ?", liste: [
        "**Transparence** : toutes les disponibilités dans un compte unique - pas de caisses parallèles ni de recettes dissimulées.",
        "**Pilotage de la liquidité** : l'État connaît à tout instant sa position globale de trésorerie ; le plan de trésorerie prévisionnel accompagne d'ailleurs le PLF (art. 79 pt. 7, réd. 2023) et le Ministre des Finances est le régulateur de la trésorerie (art. 106).",
        "**Prolongement de l'universalité** : l'art. 7 interdit d'affecter le produit des recettes à des dépenses particulières ; l'art. 110 interdit d'en disperser la trésorerie. Les deux règles se complètent sans se confondre.",
        "**Dérogation = loi de finances** : le « sauf disposition expresse d'une loi de finances » de l'art. 110 verrouille les exceptions au même niveau que les affectations de l'art. 54 - budgets annexes, comptes spéciaux, procédures particulières - et que les régies de recettes, encadrées par le RGCP avec reversement obligatoire au comptable.",
      ] },
      { type: 'paragraphe', texte: "La part des provinces elle-même passe par ce circuit : la retenue à la source des 40% est définie comme l'opération bancaire créditant le compte de la province génératrice « lors du nivellement au profit du compte général du trésor de l'ensemble de recettes mobilisées dans la province » (art. 3 pt. 39 LOFIP). Rien n'échappe donc au compte général : les recettes y montent, les répartitions en redescendent." },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '6.6',
    titre: 'Les responsabilités : débet, gestion de fait, force majeure',
    navLabel: 'Responsabilités',
    blocs: [
      { type: 'paragraphe', texte: "Le comptable public est **personnellement et pécuniairement responsable** des opérations dont il a la charge (art. 131 LOFIP ; art. 32 RGCP). Sa responsabilité est engagée en cas de déficit ou d'excédent de caisse, de manquant de matières, de recette non recouvrée conformément aux textes, de dépense irrégulièrement payée ou d'indemnisation d'un tiers par sa faute (art. 34 RGCP) : il doit alors verser de ses deniers personnels une somme égale au manquant (art. 35). La mise en jeu suit deux voies : **non contentieuse** - ordre de versement émis par le Ministre des Finances, sursis possible, demandes en décharge ou en remise gracieuse (art. 38-39) - et **contentieuse** - arrêté de débet, saisie du cautionnement, intérêts au taux légal, recours devant le Conseil d'État, transmission systématique à la Cour des comptes (art. 40-42) ; la Cour met aussi la responsabilité en jeu lors du jugement du compte de gestion (art. 45)." },
      { type: 'carte', titre: 'Trois figures à distinguer', tableau: {
        entetes: ['Figure', 'Définition', 'Régime'],
        lignes: [
          ['**Débet**', "Somme mise à la charge du comptable dont la responsabilité est établie", "Ordre de versement puis arrêté de débet ; apurement poursuivi par le pouvoir central par toutes voies de droit (art. 43 RGCP) ; recouvrement par le receveur des recettes non fiscales (art. 44)"],
          ['**Gestion de fait**', "Immixtion dans la gestion des deniers et valeurs publics sans qualité ni mandat (art. 17 RGCP ; art. 130 LOFIP)", 'Mêmes obligations et responsabilités qu\'un comptable public + amende pouvant atteindre le total des sommes indûment maniées (art. 36 RGCP)'],
          ['**Force majeure**', 'Faits de guerre, incendie, vol à main armée - et, après examen, faux indétectables', "Décharge totale ou partielle de responsabilité (art. 46) ; refusée en cas de faille ou de négligence ; la remise gracieuse, elle, dispense du paiement sans éteindre la responsabilité (art. 39)"],
        ],
      }, note: "Garanties d'entrée en fonction : cautionnement et serment (art. 26 RGCP) ; accréditation réciproque avec ordonnateurs, contrôleurs budgétaires et banques (art. 6 et 27) ; arrêt mensuel des écritures, dépôt trimestriel des comptabilités à la Cour des comptes et compte de gestion soumis au plus tard le 31 mars (art. 29-30) - la non-transmission est elle-même une faute de gestion (art. 31). Le comptable n'est pas tenu de déférer aux ordres contraires aux textes qui engageraient sa responsabilité (art. 37)." },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: 'Le titre de perception émis par le receveur',
    contexte: "Un contrôle fiscal chez une société révèle des honoraires de 500 millions FC perçus sans déclaration ni reversement de la TVA (taux normal : 16%). Pour « régulariser », le receveur des impôts émet lui-même un titre de perception de 80 millions FC, sans qu'aucun agent taxateur n'ait liquidé la dette. La société propose ensuite de « compenser » la TVA due avec un crédit de TVA déductible de 30 millions FC qu'elle revendique, et de ne payer que 50 millions.",
    questions: [
      { num: 1, enonce: "Analysez la régularité de l'émission du titre par le receveur et de la « compensation » proposée.", correction: "(1) L'émission du titre par le receveur cumule deux irrégularités. D'abord la violation de la séquence de l'art. 89 LOFIP et des art. 61-66 du RGCP : l'ordonnancement présuppose une constatation et une liquidation - « toute créance fait l'objet d'un titre de constatation et de liquidation suivi d'un titre de perception » (art. 65 RGCP). Ensuite la violation de la séparation des fonctions : constater, liquider et ordonnancer les recettes appartient à l'ordonnateur de recettes et à ses délégués (art. 13-15 RGCP ; art. 106 LOFIP), jamais au comptable - « les fonctions d'ordonnateur et celles de comptable public sont incompatibles » (art. 4 RGCP), et « est nul, tout acte des personnes qui s'ingèrent dans les opérations de constatation, de liquidation et d'ordonnancement de recettes... sans en avoir qualité » (art. 58 RGCP). Le titre est nul ; l'opération doit être reprise par les agents habilités. (2) La « compensation » est doublement irrecevable : « les débiteurs de l'État ne peuvent pas se prévaloir de leurs créances vis-à-vis de l'État pour s'opposer au paiement de leurs dettes » (art. 76 RGCP), et « aucune contraction n'est autorisée entre les recettes et les dépenses » (art. 63 RGCP ; art. 7 LOFIP). La TVA collectée est due intégralement ; le crédit de TVA déductible suit son propre régime - imputation sur les déclarations suivantes ou remboursement dans les conditions du droit fiscal - sans amputer le titre de perception." },
      { num: 2, enonce: 'Chiffrez la créance et décrivez la procédure régulière complète, de la constatation au recouvrement.', correction: "Liquidation : 500 000 000 × 16% = 80 000 000 FC de TVA collectée non reversée, hors pénalités fiscales dont le régime relève de la loi n° 004/2003 sur les procédures fiscales. Procédure régulière : (1) constatation par le service taxateur - identification de la matière imposable (art. 89 LOFIP ; art. 64 RGCP) ; (2) liquidation indiquant bases, taux et tarif, matérialisée par un titre de constatation et de liquidation (art. 65 RGCP) ; (3) ordonnancement : émission du titre de perception - ici l'avis de mise en recouvrement prévu par la législation fiscale, les rôles, avis d'imposition et états de liquidation formant titres de perception (art. 66 RGCP) - par l'ordonnateur délégué des recettes ; (4) transmission au receveur, comptable public assignataire, pour prise en charge : le titre a force exécutoire (art. 68), le recouvrement est d'abord amiable puis forcé par toutes voies de droit, avec titres complémentaires pour les majorations légalement dues (art. 72) et intervention d'agents ayant qualité d'huissier du Trésor (art. 74). Le paiement donne lieu à un acquit libératoire (art. 78). L'encaissement est reversé au compte général du Trésor (art. 110 LOFIP) et rattaché au budget de l'année de l'encaissement (art. 92)." },
    ],
  },
  {
    id: 'cp2',
    titre: 'Le compte parallèle et le péage affecté',
    contexte: "Deux pratiques sont découvertes par l'Inspection générale des finances : (1) un directeur provincial d'une régie financière a ouvert un compte dans une banque commerciale pour y loger 4,2 milliards FC de recettes domaniales, invoquant « la lenteur des nivellements vers Kinshasa » ; (2) le responsable d'un service routier affecte directement 1,8 milliard FC de recettes de péage au paiement des salaires de ses agents, « pour éviter les délais du Trésor ».",
    questions: [
      { num: 1, enonce: 'Qualifiez juridiquement les deux pratiques et leurs conséquences pour leurs auteurs.', correction: "(1) Le compte parallèle viole l'art. 110 LOFIP : sauf disposition expresse d'une loi de finances, toutes les disponibilités doivent être déposées au compte général du trésor ouvert auprès du caissier de l'État - la « lenteur » n'est pas une dérogation légale. En maniant des deniers publics hors de tout titre, le directeur s'expose à la gestion de fait : « toute personne qui, sans avoir qualité ou mandat du comptable public, s'immisce dans la gestion des deniers et valeurs publics peut être déclarée comptable public de fait par la Cour des comptes » (art. 17 RGCP ; art. 130 LOFIP), avec les mêmes obligations et responsabilités qu'un comptable public et une amende calculée suivant l'importance et la durée du maniement, plafonnée au total des sommes indûment maniées (art. 36 RGCP). Les 4,2 milliards doivent être immédiatement reversés au Trésor. (2) L'affectation directe des péages cumule trois violations : l'art. 110 (fonds hors du compte général), l'art. 7 LOFIP (affectation du produit d'une recette à une dépense particulière, réservée aux formes de l'art. 54 votées en loi de finances) et le circuit de la dépense - des salaires payés sans engagement, liquidation, ordonnancement ni contrôles constituent des dépenses irrégulières (art. 80 et suivants RGCP), engageant la faute de gestion de l'art. 129 LOFIP. Dans les deux cas, la Cour des comptes juge (art. 131 LOFIP ; art. 56 RGCP)." },
      { num: 2, enonce: "Ces services avaient-ils des voies légales pour répondre à leurs besoins opérationnels ?", correction: "Oui, trois. (1) La **régie de recettes** (art. 50-54 RGCP) : un agent constate, liquide et encaisse localement, au nom et pour le compte du comptable assignataire, les droits au comptant limitativement énumérés par l'acte constitutif - pris par le Ministre ou l'échevin des finances -, avec encaisse plafonnée et reversement périodique : elle répond exactement au problème de proximité du service des péages, sans soustraire les fonds au Trésor. (2) La **régie d'avances** (art. 50) : pour les menues dépenses urgentes, des fonds mis à disposition par le comptable assignataire permettent de régler des dettes définitivement constatées - mais jamais des salaires permanents, qui suivent la chaîne normale de la dépense. (3) L'**affectation légale** : si l'on veut durablement financer l'entretien routier par les péages, la voie est le compte d'affectation spéciale créé par une loi de finances (art. 54, 60, 62 LOFIP), dont les recettes sont par nature en relation directe avec les dépenses - le tout restant retracé au budget et dans le compte général du Trésor. L'urgence opérationnelle ne crée aucune compétence : elle appelle l'organisation préalable des instruments que le droit offre." },
    ],
  },
  {
    id: 'cp3',
    titre: "L'importation et la cascade des droits",
    contexte: "Exercice de calcul (données simplifiées d'énoncé). Une société importe quatre lots, dédouanés au taux de change de 2 467,0 FC/USD (cadrage LF 2026) : lot A, machines agricoles, valeur CIF 2 500 000 USD, droit de douane 5% ; lot B, articles de luxe, CIF 800 000 USD, droit 20% ; lot C, composants électroniques semi-finis, CIF 1 200 000 USD, droit 10% ; lot D, produits cosmétiques, CIF 400 000 USD, droit 20% plus droits d'accises. Le tarif d'importation congolais (O.-L. n° 011/2012, réaménagée par l'annexe XVII de la LF 2026) est structuré autour des taux de 5, 10 et 20% selon la nature des biens.",
    questions: [
      { num: 1, enonce: 'Calculez les droits de douane par lot et au total.', correction: "Conversion puis application du taux à la valeur CIF : lot A - 2 500 000 × 2 467,0 = 6 167 500 000 FC × 5% = 308 375 000 FC ; lot B - 800 000 × 2 467,0 = 1 973 600 000 FC × 20% = 394 720 000 FC ; lot C - 1 200 000 × 2 467,0 = 2 960 400 000 FC × 10% = 296 040 000 FC ; lot D - 400 000 × 2 467,0 = 986 800 000 FC × 20% = 197 360 000 FC. Total des droits de douane : 1 196 495 000 FC. La logique du tarif : taux bas (5%) pour les équipements et intrants, intermédiaire (10%) pour les biens semi-finis, haut (20%) pour les produits finis de consommation - la position tarifaire exacte de chaque marchandise relevant du tarif officiel, dont la LF 2026 a réaménagé plusieurs positions (annexe XVII). Dans la chaîne de l'art. 89 LOFIP : le franchissement de la frontière et la déclaration en douane fondent la constatation, le bulletin de liquidation douanier la liquidation, et les états de liquidation forment titres de perception (art. 66 RGCP) pris en charge par le receveur des douanes." },
      { num: 2, enonce: "Pourquoi le lot D supporte-t-il des droits d'accises en plus des droits de douane, et qui les perçoit ? Quel est l'effet de la réserve de loi sur une demande d'exonération ?", correction: "Droits de douane et droits d'accises sont deux impositions distinctes : les premiers relèvent du tarif d'importation (O.-L. n° 011/2012) et frappent le franchissement de la frontière ; les seconds relèvent du Code des accises (O.-L. n° 18/002) et frappent la consommation de produits déterminés - les produits cosmétiques y figurent, avec des taux de 15 à 20% selon la catégorie (annexe XVIII de la LF 2026). À l'importation, la DGDA perçoit les deux simultanément lors du dédouanement, ainsi que la TVA à l'importation. Ces cumuls sont voulus par des lois distinctes et ne constituent pas une double imposition irrégulière. Quant à l'exonération : « il ne peut être établi d'exemption ou d'allégement fiscal qu'en vertu de la loi » (art. 9 LOFIP ; art. 174 al. 3 de la Constitution), principe que la LF 2026 réaffirme dans ses dispositions générales (art. 2-4) - aucun agent des douanes, aucun directeur, aucun ministre ne peut exonérer par instruction ou lettre administrative ; l'importateur qui invoque une exonération doit produire la disposition légale qui la fonde, et l'agent qui l'accorderait sans texte commettrait la faute de gestion de l'art. 129 LOFIP (avantage indu aux contribuables en méconnaissance de la loi fiscale)." },
    ],
  },
  {
    id: 'cp4',
    titre: 'Trois tentations budgétaires au banc d\'essai',
    contexte: "Trois propositions circulent : (1) affecter directement la TVA perçue sur les produits pétroliers (estimation : 800 milliards FC) à un fonds d'électrification rurale, hors budget ; (2) réduire par amendement la dotation de la Caisse nationale de péréquation (744,6 milliards FC, art. 9 LF 2026) pour financer des logements sociaux, sans compensation ; (3) accorder par décret du Premier ministre une exonération de TVA de trois ans aux entreprises minières investissant plus de 100 millions USD.",
    questions: [
      { num: 1, enonce: 'Analysez la conformité de chaque proposition.', correction: "(1) L'affectation directe viole l'art. 7 LOFIP - aucune affectation du produit des recettes à des dépenses particulières - et l'art. 54, qui réserve les affectations expresses à la loi de finances sous forme de budgets annexes, de comptes spéciaux ou de procédures particulières ; un compte d'affectation spéciale créé par la loi de finances (art. 60, 62) serait la voie régulière, sur le modèle du FIS-RDC institué par l'art. 51 de la LF 2026. Hors ce cadre, les fonds échapperaient aussi au compte général du Trésor (art. 110). (2) L'amendement est irrecevable : il diminue une dotation et crée une charge nouvelle sans compensation (art. 86 LOFIP ; art. 127 de la Constitution) ; au surplus, la Caisse nationale de péréquation est d'assise constitutionnelle - budget alimenté à concurrence de 10% des recettes à caractère national (art. 181) - ce qui borne la marge du législateur financier lui-même. (3) L'exonération par décret est nulle : art. 9 al. 2 LOFIP et art. 174 al. 3 de la Constitution - l'exemption ne s'établit qu'en vertu de la loi ; l'art. 122 pt. 10 réserve à la loi l'assiette, le taux et le recouvrement. Les entreprises ne pourraient pas s'en prévaloir contre l'administration fiscale, et ses auteurs s'exposeraient aux sanctions du titre VII de la LOFIP." },
      { num: 2, enonce: "La part des 40% des provinces et la dotation de péréquation violent-elles l'universalité et l'unité de trésorerie ?", correction: "Non - ce sont des applications organisées de ces principes, non des dérogations sauvages. La part des 40% est fixée par la Constitution (art. 175 al. 2 : retenue à la source) et mise en œuvre PAR la loi de finances, qui la fixe globalement (art. 24 LOFIP ; art. 8 LF 2026 : 7 694,5 milliards FC) et en répartit les catégories selon les art. 219-221 ; techniquement, la retenue à la source est l'opération bancaire créditant le compte de la province « lors du nivellement au profit du compte général du trésor » (art. 3 pt. 39) - le circuit passe donc par le caissier de l'État, l'unité de trésorerie est respectée. La Caisse nationale de péréquation est créée par la Constitution (art. 181), alimentée par le Trésor à concurrence de 10% des recettes à caractère national, et sa dotation est inscrite chaque année en loi de finances (art. 9 LF 2026 : 744,6 milliards) : l'affectation est décidée par les textes du niveau requis - Constitution et loi de finances - exactement là où l'art. 54 place le monopole des affectations. La différence avec les trois « tentations » du cas : ici, le Parlement a voté, et les fonds transitent par le compte général du Trésor." },
    ],
  },
  {
    id: 'cp5',
    titre: 'Le contribuable aux trois revenus',
    contexte: "Exercice d'application des phases de la recette (les taux sont donnés par l'énoncé ; le détail du droit fiscal matériel relève du module de fiscalité). Un contrôle sur pièces révèle, pour un contribuable : (1) des salaires pour lesquels l'employeur a retenu à la source et reversé 108 millions FC ; (2) des loyers de 180 millions FC jamais déclarés - taux applicable donné : 20% ; (3) des honoraires de consultance de 50 millions FC non déclarés - taux applicable donné : 30%.",
    questions: [
      { num: 1, enonce: 'Déroulez les phases de l\'art. 89 LOFIP pour les revenus non déclarés (loyers et honoraires).', correction: "Loyers - (1) Constatation : le contrôle sur pièces identifie la matière imposable, 180 millions FC de loyers perçus (art. 89 LOFIP ; art. 64 RGCP). (2) Liquidation : application du taux donné, 180 000 000 × 20% = 36 000 000 FC, la liquidation indiquant les bases, taux et tarifs appliqués et donnant lieu à un titre de constatation et de liquidation (art. 65 RGCP) ; les pénalités pour absence de déclaration s'y ajoutent selon la loi sur les procédures fiscales. (3) Ordonnancement : émission du titre de perception - l'avis de mise en recouvrement de la législation fiscale - par l'ordonnateur délégué des recettes (art. 66 RGCP). Honoraires - même séquence : constatation des 50 millions FC, liquidation 50 000 000 × 30% = 15 000 000 FC, titre de perception. Total des droits simples : 51 000 000 FC, hors pénalités. (4) Phase comptable : prise en charge par le receveur des impôts, recouvrement amiable puis forcé - les titres ont force exécutoire (art. 68 RGCP) -, acquit libératoire au paiement (art. 78), reversement au compte général du Trésor (art. 110 LOFIP) et rattachement au budget de l'année de l'encaissement (art. 92)." },
      { num: 2, enonce: "La retenue à la source opérée par l'employeur sur les salaires est-elle compatible avec la séquence de l'art. 89 ?", correction: "Oui - c'est une modalité d'exécution simplifiée que le droit organise. L'employeur, redevable légal désigné par la loi fiscale, opère lui-même l'identification de la matière imposable (le salaire versé) et le calcul de l'impôt selon le barème, puis reverse à l'administration : la déclaration accompagnée du paiement joue le rôle de justification, et l'imputation budgétaire définitive suit la logique des recettes perçues sans ordonnancement préalable - « en matière de recettes au comptant, les documents justifiant le paiement forment titres de perception » (art. 89 in fine LOFIP), avec régularisation par l'ordonnateur (art. 91 LOFIP ; art. 62 RGCP). Les modalités des retenues à la source de l'IRPP et de leur reversement au Trésor sont fixées par arrêtés ministériels pris en application de la loi n° 23/053. Le circuit préserve l'unité de trésorerie : employeur → administration fiscale → compte général du Trésor tenu par la BCC (art. 110 LOFIP ; art. 176 de la Constitution). Le comptable assignataire demeure responsable de la prise en charge et du contrôle, et un reversement manquant de l'employeur se poursuit par titre de perception exécutoire, comme toute créance de l'État." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue5',
  numero: 6,
  id: 'ue5-chapitre-6',
  titre: 'Exécution des recettes publiques',
  sousTitre: 'LOFIP, art. 89-92 et 110 · RGCP (décret n° 24/10 du 14 octobre 2024), art. 13-19, 50-54 et 60-79',
  infoBulle: "Les phases de la recette (constatation, liquidation, ordonnancement, recouvrement - art. 89 LOFIP et 61-70 RGCP), les ordonnateurs de recettes et les receveurs des régies financières (DGI, DGDA, DGRAD), les régies de recettes, la force exécutoire des titres, l'unité de trésorerie (art. 110) et les responsabilités (débet, gestion de fait).",
  loiRef: 'Art. 89-92, 110 LOFIP · RGCP 2024',
  moduleLabel: 'UE 5 · Finances publiques',
  retourRoute: '/ue5-finances-publiques',
  coursId: 'ue5-finances-publiques',
  objectifs: [
    "Maîtriser les phases de la recette : constatation, liquidation, ordonnancement (art. 89 LOFIP) et recouvrement (art. 61 RGCP), y compris le régime des recettes au comptant (art. 91 LOFIP ; art. 62 RGCP)",
    "Identifier les acteurs : Ministre des Finances ordonnateur général des recettes (art. 106 LOFIP), ordonnateurs délégués, receveurs des administrations financières, ACCT (art. 13-24 RGCP)",
    'Situer les régies financières - DGI, DGDA, DGRAD - et leurs prévisions de la LF 2026, ainsi que les régies de recettes (art. 50-54 RGCP)',
    "Connaître le recouvrement : force exécutoire des titres, recouvrement amiable et forcé, huissier du Trésor, surséance, remise, non-valeurs, acquit libératoire, prescription (art. 68-79 RGCP)",
    "Expliquer l'unité de trésorerie (art. 110 LOFIP, texte exact) et son articulation avec l'universalité (art. 7) et la BCC caissier de l'État (art. 176 Constitution)",
    'Appliquer le régime des responsabilités : débet, ordre de versement, gestion de fait, force majeure (art. 32-46 RGCP ; art. 128-131 LOFIP)',
  ],
  sections: SECTIONS,
  aRetenir: [
    "Les phases de la recette sont à l'art. 89 LOFIP : constatation (identifier et évaluer la matière imposable), liquidation (déterminer le montant de la créance en indiquant bases, taux et tarifs), ordonnancement (établir le titre de perception) ; le recouvrement est la phase comptable (art. 61 RGCP). L'art. 90 LOFIP décrit, lui, la chaîne de la dépense.",
    "Recettes au comptant : les documents justifiant le paiement forment titres de perception (art. 89 in fine) et l'ordonnancement intervient après encaissement, pour régularisation (art. 91 LOFIP ; art. 62 RGCP).",
    "Le Ministre des Finances est ordonnateur général de toutes les recettes (art. 106 LOFIP) ; il délègue aux responsables des administrations financières (art. 14 RGCP) ; les receveurs des régies - DGI (19 033,6 Mds FC en 2026), DGDA (7 522,0 Mds), DGRAD (5 474,6 Mds) - sont des comptables publics ; le réseau est centralisé par l'ACCT (art. 23 RGCP).",
    "Les titres de perception ont force exécutoire (art. 68 RGCP) ; recouvrement amiable puis forcé par toutes voies de droit, exécuté par les huissiers du Trésor (art. 72, 74) ; surséance, remise gracieuse et admission en non-valeurs relèvent du Ministre des finances (art. 75) ; le paiement donne lieu à un acquit libératoire (art. 78).",
    "Aucune contraction entre recettes et dépenses (art. 63 RGCP ; art. 7 LOFIP) et les débiteurs de l'État ne peuvent opposer leurs créances à leurs dettes (art. 76) ; les recettes sont rattachées au budget de l'année de leur encaissement (art. 92 LOFIP).",
    "Unité de trésorerie : sauf disposition expresse d'une loi de finances, toutes les administrations déposent toutes leurs disponibilités dans le compte général du trésor ouvert auprès du caissier de l'État (art. 110 LOFIP) - la BCC, gardienne des fonds publics (art. 176 Constitution), dont les avances à l'État sont prohibées (art. 16 LOFIP).",
    "Les régies de recettes (art. 50-54 RGCP) permettent l'encaissement local des droits au comptant, sous acte constitutif du Ministre des finances, encaisse plafonnée et reversement au comptable assignataire ; hors de ce cadre, manier des deniers publics est une gestion de fait (art. 17 et 36 RGCP ; art. 130 LOFIP).",
    "Le comptable public est personnellement et pécuniairement responsable (art. 131 LOFIP ; art. 32-35 RGCP) : ordre de versement, arrêté de débet exécutoire avec saisie du cautionnement, recours au Conseil d'État, décharge pour force majeure (art. 38-46) ; comptes de gestion à la Cour des comptes au plus tard le 31 mars (art. 30).",
    "Depuis le 1er janvier 2026, IS (30%, impôt minimum 1% du CA) et IRPP relèvent de la loi n° 23/053 ; la TVA garde son taux normal de 16% (taux réduits 1% et 5%, art. 46 LF 2026) ; la pression fiscale projetée 2026 est de 12,3% du PIB.",
  ],
  references: [
    {
      genre: 'texte',
      intitule: 'Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP)',
      precision: 'telle que modifiée par les lois n° 18/010 et n° 23/030 ; art. 9, 34-35, 89-92, 97, 102-110 et 128-131',
    },
    {
      genre: 'texte',
      intitule: 'Décret n° 24/10 du 14 octobre 2024 portant Règlement général sur la comptabilité publique (RGCP)',
      precision: 'art. 1-58 (ordonnateurs, comptables publics, régies, responsabilités) et 59-79 (opérations de recettes)',
    },
    {
      genre: 'texte',
      intitule: 'Constitution de la République Démocratique du Congo du 18 février 2006',
      precision: 'art. 122 pt. 10, 174-176 et 181',
    },
    {
      genre: 'texte',
      intitule: "Loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026",
      precision: 'art. 2-9, 46 et annexes II, XVII-XVIII ; loi n° 23/053 du 30 novembre 2023 (IS et IRPP)',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : LOFIP n° 11/011 du 13 juillet 2011 (mod. lois n° 18/010 et n° 23/030), art. 89-92, 102-110, 128-131 · RGCP, décret n° 24/10 du 14 octobre 2024, art. 1-79 · Constitution, art. 174-176, 181 · LF n° 25/060 (2026) · loi n° 23/053 (IS/IRPP)',
}

export default chapitre
