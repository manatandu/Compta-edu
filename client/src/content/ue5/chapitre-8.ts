import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 5 — Chapitre 8 : La décentralisation budgétaire
//
// Sources vérifiées article par article :
// - Constitution du 18 février 2006 telle que modifiée par la loi n° 11/002 du
//   20 janvier 2011 (art. 100, 126, 138, 146, 155, 161-162, 171, 175, 181,
//   195-207, 218) ;
// - Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP),
//   telle que modifiée par les lois n° 18/010 du 09 juillet 2018 et n° 23/030
//   du 28 juin 2023 (art. 3, 132-229) ;
// - Loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026
//   (art. 8 et 9).
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch8-q1',
    question: "Selon l'article 3 point 19 de la LOFIP, qu'est-ce que l'édit budgétaire ?",
    options: [
      { id: 'a', texte: "Un acte du Gouvernement provincial fixant les recettes et les dépenses sans vote de l'Assemblée provinciale" },
      { id: 'b', texte: "L'acte par lequel sont prévues et autorisées, par l'Assemblée provinciale, les ressources et les charges provinciales d'un exercice budgétaire" },
      { id: 'c', texte: "L'acte par lequel les organes délibérants des ETD autorisent les charges locales" },
      { id: 'd', texte: "Une loi de finances adoptée par le Parlement national pour les provinces" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 3 point 19 de la LOFIP définit l'édit budgétaire comme « l'acte par lequel sont prévues et autorisées, par l'Assemblée provinciale, les ressources et les charges provinciales d'un exercice budgétaire ». Il en détermine, dans le respect de l'équilibre budgétaire et financier, la nature, le montant et l'affectation, et il est la traduction financière annuelle du programme d'action de développement de la province.",
    articleRef: 'Art. 3 pt 19 LOFIP',
  },
  {
    id: 'ch8-q2',
    question: "La LOFIP distingue le « budget provincial » du « budget de la province ». Quelle est la bonne correspondance ?",
    options: [
      { id: 'a', texte: "Budget provincial (art. 3 pt 5) : prévisions de la seule province ; budget de la province (art. 3 pt 6) : prévisions intégrant celles des ETD" },
      { id: 'b', texte: "Budget provincial (art. 3 pt 5) : document intégrant les prévisions des ETD dans celles de la province ; budget de la province (art. 3 pt 6) : prévisions des recettes et dépenses de la seule province" },
      { id: 'c', texte: "Les deux expressions sont synonymes dans la LOFIP" },
      { id: 'd', texte: "Le budget provincial est voté par le Parlement national, le budget de la province par l'Assemblée provinciale" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 3 de la LOFIP distingue soigneusement les deux notions : le budget provincial (point 5) est « un document contenant les prévisions des recettes et des dépenses des entités territoriales décentralisées intégrées dans celles de la province », tandis que le budget de la province (point 6) est « un document contenant les prévisions des recettes et des dépenses de la province » seule. L'intégration produit en outre l'édit d'intégration budgétaire défini au point 20 (rédaction de 2011).",
    articleRef: 'Art. 3 pts 5 et 6 LOFIP',
  },
  {
    id: 'ch8-q3',
    question: "Selon l'article 3 point 18 de la LOFIP (rédaction de 2011), qu'est-ce que la décision budgétaire ?",
    options: [
      { id: 'a', texte: "L'acte par lequel le Gouvernement national alloue des fonds aux ETD" },
      { id: 'b', texte: "L'acte par lequel sont prévues et autorisées, par les organes délibérants des ETD, les ressources et les charges locales d'un exercice budgétaire" },
      { id: 'c', texte: "Un arrêté du Gouverneur de province fixant les budgets des communes" },
      { id: 'd', texte: "La décision du ministre des Finances attribuant des crédits aux chefferies" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 3 point 18 de la LOFIP (rédaction de 2011) définit la décision budgétaire comme « l'acte par lequel sont prévues et autorisées, par les organes délibérants des entités territoriales décentralisées, les ressources et les charges locales d'un exercice budgétaire ». Elle est la traduction financière annuelle du programme d'action de développement de l'entité concernée. Attention : la loi n° 23/030 de 2023 a renuméroté les définitions de l'article 3 (43 points), en insérant notamment le « débat d'orientation budgétaire » et la « dotation budgétaire ».",
    articleRef: 'Art. 3 pt 18 LOFIP',
  },
  {
    id: 'ch8-q4',
    question: "Selon l'article 133 de la LOFIP, quelles sont les entités territoriales décentralisées dont les finances relèvent de la décision budgétaire ?",
    options: [
      { id: 'a', texte: "Les communes, les secteurs et les chefferies uniquement" },
      { id: 'b', texte: "La ville, la commune, le secteur ou la chefferie" },
      { id: 'c', texte: "Les provinces, les districts et les territoires" },
      { id: 'd', texte: "Les ministères provinciaux et les services déconcentrés" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 133 de la LOFIP est explicite : « La décision budgétaire concerne les finances des entités territoriales décentralisées, à savoir la ville, la commune, le secteur ou la chefferie. » La ville fait donc partie des ETD, contrairement à une présentation courante qui la passe sous silence. Le même article précise que le budget de la province intègre celui des ETD y rattachées « à titre statistique, informatif et pour la consolidation ».",
    articleRef: 'Art. 133 LOFIP',
  },
  {
    id: 'ch8-q5',
    question: "Selon l'article 134 de la LOFIP, quels actes ont le caractère d'édits ou de décisions budgétaires ?",
    options: [
      { id: 'a', texte: "Uniquement l'édit ou la décision budgétaire de l'année" },
      { id: 'b', texte: "L'édit ou la décision de l'année, ceux portant ouverture de crédits provisoires, les rectificatifs et ceux portant reddition des comptes" },
      { id: 'c', texte: "L'édit de l'année et l'édit rectificatif uniquement" },
      { id: 'd', texte: "Tout arrêté du Gouverneur ayant une incidence financière" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 134 de la LOFIP énumère quatre espèces, en miroir exact des quatre espèces de lois de finances de l'article 18 : les édits ou décisions budgétaires de l'année, les édits ou décisions portant ouverture de crédits provisoires, les édits ou décisions budgétaires rectificatifs et les édits ou décisions portant reddition des comptes.",
    articleRef: 'Art. 134 LOFIP',
  },
  {
    id: 'ch8-q6',
    question: "Conformément à l'article 175 de la Constitution et à l'article 218 de la LOFIP, quelle est la part des recettes à caractère national allouée aux provinces ?",
    options: [
      { id: 'a', texte: "30 % des recettes à caractère national" },
      { id: 'b', texte: "50 % des recettes à caractère national" },
      { id: 'c', texte: "40 % des recettes à caractère national, retenus à la source" },
      { id: 'd', texte: "60 % des recettes à caractère national" },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 175 alinéa 2 de la Constitution dispose : « La part des recettes à caractère national allouées aux provinces est établie à 40 %. Elle est retenue à la source. » L'article 218 de la LOFIP le reprend : « les provinces ont droit à quarante pour cent des recettes à caractère national retenues à la source », les modalités de la retenue étant décrites aux articles 219 à 222.",
    articleRef: 'Art. 175 Constitution ; art. 218 LOFIP',
  },
  {
    id: 'ch8-q7',
    question: "Selon l'article 3 point 39 de la LOFIP, qu'est-ce que la « retenue à la source » ?",
    options: [
      { id: 'a', texte: "La retenue fiscale opérée par la DGI sur les salaires des agents provinciaux" },
      { id: 'b', texte: "L'opération bancaire consistant à créditer le compte d'une province génératrice des recettes d'une quotité de 40 % lors du nivellement au profit du compte général du Trésor" },
      { id: 'c', texte: "Un transfert mensuel du Trésor central vers les provinces" },
      { id: 'd', texte: "Un mécanisme de compensation entre provinces déficitaires et excédentaires" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 3 point 39 de la LOFIP définit la retenue à la source comme « l'opération bancaire qui consiste à créditer le compte d'une province génératrice des recettes, d'une quotité de 40 % sur le montant total recouvré au titre des recettes à caractère national lors du nivellement au profit du compte général du trésor de l'ensemble de recettes mobilisées dans la province ». Ce n'est donc pas une rétrocession a posteriori : la part provinciale est prélevée au moment même du nivellement.",
    articleRef: 'Art. 3 pt 39 LOFIP',
  },
  {
    id: 'ch8-q8',
    question: "Selon l'article 219 de la LOFIP, quelles recettes composent la catégorie A des recettes à caractère national ?",
    options: [
      { id: 'a', texte: "Les recettes de douanes et d'accises et les impôts sur les grandes entreprises" },
      { id: 'b', texte: "Les recettes administratives, judiciaires et domaniales collectées au niveau du pouvoir central" },
      { id: 'c', texte: "Les recettes des pétroliers producteurs" },
      { id: 'd', texte: "Les recettes administratives, judiciaires et domaniales collectées en province et les recettes des impôts perçues à leur lieu de réalisation" },
    ],
    reponseCorrecte: 'd',
    explication: "L'article 219 de la LOFIP range dans la catégorie A « les recettes administratives, judiciaires et domaniales collectées en province » et « les recettes des impôts perçues à leur lieu de réalisation ». La catégorie B regroupe les recettes administratives, judiciaires, domaniales et de participations collectées au niveau du pouvoir central, les recettes de douanes et d'accises, les recettes des impôts recouvrées sur les grandes entreprises et les recettes des pétroliers producteurs.",
    articleRef: 'Art. 219 LOFIP',
  },
  {
    id: 'ch8-q9',
    question: "Selon l'article 220 de la LOFIP, comment s'opère la retenue de 40 % pour les recettes de la catégorie A ?",
    options: [
      { id: 'a', texte: "Par décision du Gouverneur de province, après approbation du ministre du Budget" },
      { id: 'b', texte: "Trimestriellement, après audit de la Cour des comptes" },
      { id: 'c', texte: "Elle est portée au compte de la province génératrice lors du nivellement au profit du Compte général du Trésor, sur instruction permanente du ministre ayant les finances dans ses attributions" },
      { id: 'd', texte: "Annuellement, lors de la clôture de l'exercice budgétaire" },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 220 de la LOFIP dispose que, pour les recettes de la catégorie A, « la retenue de 40 % est portée au compte de la province génératrice de la recette, lors du nivellement au profit du Compte général du Trésor, sur instruction permanente du ministre ayant les finances dans ses attributions conformément aux prescrits du Règlement général sur la comptabilité publique ».",
    articleRef: 'Art. 220 LOFIP',
  },
  {
    id: 'ch8-q10',
    question: "Selon l'article 221 de la LOFIP, la retenue de 40 % sur les recettes de la catégorie B est répartie entre les provinces suivant :",
    options: [
      { id: 'a', texte: "La superficie géographique et le niveau de développement de chaque province" },
      { id: 'b', texte: "Leur capacité contributive et leur poids démographique, selon les modalités d'un arrêté conjoint des ministres ayant les finances et le budget dans leurs attributions" },
      { id: 'c', texte: "Une répartition égale entre les provinces, indépendamment de leur taille" },
      { id: 'd', texte: "Le volume des dépenses inscrites dans l'édit budgétaire de chaque province" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 221 de la LOFIP dispose que la retenue de 40 % sur les recettes de la catégorie B s'effectue « au profit des provinces, suivant leur capacité contributive et leur poids démographique au regard des modalités déterminées, conformément à un arrêté conjoint des ministres du pouvoir central ayant les finances et le budget dans leurs attributions respectives ».",
    articleRef: 'Art. 221 LOFIP',
  },
  {
    id: 'ch8-q11',
    question: "L'article 221 alinéa 2 de la LOFIP accorde à la province productrice de pétrole, à titre compensatoire, une allocation de :",
    options: [
      { id: 'a', texte: "40 % des recettes pétrolières de la catégorie B" },
      { id: 'b', texte: "5 % de la part revenant à l'ensemble des provinces" },
      { id: 'c', texte: "10 % de la part revenant aux provinces sur les recettes pétrolières incluses dans la catégorie B" },
      { id: 'd', texte: "20 % des recettes pétrolières, affectés à la réparation des dommages environnementaux" },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 221 alinéa 2 de la LOFIP dispose : « S'agissant des recettes pétrolières inclues dans la catégorie B, une allocation de 10 % de la part revenant aux provinces est attribuée à la province productrice à titre compensatoire pour réparer notamment les dommages d'environnement résultant de l'extraction. » Cette allocation est propre au secteur pétrolier : le texte ne l'étend pas aux recettes minières.",
    articleRef: 'Art. 221 al. 2 LOFIP',
  },
  {
    id: 'ch8-q12',
    question: "L'article 218 de la LOFIP permet au pouvoir central de retenir de la quote-part provinciale le coût des compétences non transférées. Dans quelles conditions ?",
    options: [
      { id: 'a', texte: "Par simple arrêté du ministre des Finances, sans condition particulière" },
      { id: 'b', texte: "Dans les conditions définies par une loi de finances" },
      { id: 'c', texte: "Par ordonnance-loi après avis du Sénat" },
      { id: 'd', texte: "Par décision de la Cour constitutionnelle sur requête d'une province" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 218 de la LOFIP précise que l'allocation des recettes aux provinces « tient compte du transfert effectif des compétences et des responsabilités en matière des dépenses » et que le pouvoir central peut retenir de la quote-part provinciale le coût des compétences et responsabilités non transférées, « dans les conditions définies par une loi de finances ». Un acte réglementaire ne suffit donc jamais.",
    articleRef: 'Art. 218 LOFIP',
  },
  {
    id: 'ch8-q13',
    question: "Selon l'article 181 de la Constitution, quelle est la mission de la Caisse nationale de péréquation ?",
    options: [
      { id: 'a', texte: "Financer les salaires des agents de l'État dans les provinces" },
      { id: 'b', texte: "Financer des projets et programmes d'investissement public, en vue d'assurer la solidarité nationale et de corriger le déséquilibre de développement entre les provinces et entre les autres ETD" },
      { id: 'c', texte: "Compenser la dette extérieure des provinces endettées" },
      { id: 'd', texte: "Garantir les emprunts contractés par les provinces" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 181 de la Constitution institue la Caisse nationale de péréquation, dotée de la personnalité juridique, avec pour mission « de financer des projets et programmes d'investissement public, en vue d'assurer la solidarité nationale et de corriger le déséquilibre de développement entre les provinces et entre les autres entités territoriales décentralisées ». Elle est placée sous la tutelle du Gouvernement et une loi organique fixe son organisation et son fonctionnement.",
    articleRef: 'Art. 181 Constitution',
  },
  {
    id: 'ch8-q14',
    question: "Selon l'article 222 de la LOFIP, à quelle hauteur le budget de la Caisse nationale de péréquation est-il alimenté ?",
    options: [
      { id: 'a', texte: "5 % des recettes à caractère national" },
      { id: 'b', texte: "40 % des recettes des provinces" },
      { id: 'c', texte: "10 % de la totalité des recettes de catégorie A et B" },
      { id: 'd', texte: "15 % des recettes de la DGI uniquement" },
    ],
    reponseCorrecte: 'c',
    explication: "L'article 222 de la LOFIP dispose : « Conformément à l'article 181 de la Constitution, les provinces bénéficient des ressources provenant de la Caisse nationale de péréquation dont le budget est alimenté à concurrence de dix pour cent de la totalité des recettes de catégorie A et B telle que définies à l'article 219 de la présente loi. » La Constitution formule le même taux comme « dix pour cent de la totalité des recettes à caractère national revenant à l'État chaque année ».",
    articleRef: 'Art. 222 LOFIP ; art. 181 Constitution',
  },
  {
    id: 'ch8-q15',
    question: "Quels montants la loi de finances n° 25/060 du 29 décembre 2025 (exercice 2026) fixe-t-elle pour la part des provinces et pour la Caisse nationale de péréquation ?",
    options: [
      { id: 'a', texte: "Provinces : 7 694,5 milliards de FC (art. 8) ; péréquation : 744,6 milliards de FC (art. 9)" },
      { id: 'b', texte: "Provinces : 9 505,8 milliards de FC ; péréquation : 2 376,5 milliards de FC" },
      { id: 'c', texte: "Provinces : 5 200 milliards de FC ; péréquation : 500 milliards de FC" },
      { id: 'd', texte: "Provinces : 10 000 milliards de FC ; péréquation : 1 500 milliards de FC" },
    ],
    reponseCorrecte: 'a',
    explication: "L'article 8 de la loi de finances n° 25/060 du 29 décembre 2025 arrête la part des recettes à caractère national allouée aux provinces à 7 694 540 952 980 FC, et son article 9 fixe les ressources de la Caisse nationale de péréquation à 744 632 995 450 FC, en application de l'article 175 de la Constitution et des articles 218 à 222 de la LOFIP.",
    articleRef: 'Art. 8 et 9, LF n° 25/060 (2026)',
  },
  {
    id: 'ch8-q16',
    question: "Selon l'article 132 de la LOFIP, l'édit budgétaire et la décision budgétaire sont :",
    options: [
      { id: 'a', texte: "Des actes administratifs du Gouverneur et du maire, soumis à la tutelle du ministre des Finances" },
      { id: 'b', texte: "Des actes par lesquels sont prévus et autorisés, par les organes délibérants respectifs, les ressources et les charges provinciales et locales d'un exercice budgétaire" },
      { id: 'c', texte: "Des décrets provinciaux pris en Conseil des ministres provincial" },
      { id: 'd', texte: "Des lois organiques adoptées par l'Assemblée nationale pour les provinces" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 132 de la LOFIP dispose que l'édit budgétaire et la décision budgétaire « sont des actes par lesquels sont prévus et autorisés, par les organes délibérants respectifs, les ressources et les charges provinciales et locales d'un exercice budgétaire. Ils en déterminent, dans le respect de l'équilibre budgétaire et financier, la nature, le montant et l'affectation. » Le pouvoir d'autorisation budgétaire appartient donc exclusivement à l'organe délibérant, jamais à l'exécutif.",
    articleRef: 'Art. 132 LOFIP',
  },
  {
    id: 'ch8-q17',
    question: "Selon l'article 137 de la LOFIP, l'édit budgétaire de l'année fixe, par programme :",
    options: [
      { id: 'a', texte: "Uniquement le plafond des emplois rémunérés, sans indication de crédits" },
      { id: 'b', texte: "Le montant des autorisations d'engagement et des crédits de paiement, et, par ministère et institution au niveau provincial, les plafonds des autorisations d'emplois rémunérés" },
      { id: 'c', texte: "Seulement les dépenses de fonctionnement, sans les investissements" },
      { id: 'd', texte: "Le seul montant global des dépenses, sans détail par programme" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 137 de la LOFIP dispose que l'édit budgétaire ou la décision budgétaire de l'année « fixe pour le budget de la province ou pour celui de l'entité territoriale décentralisée, par programme, le montant des autorisations d'engagement et des crédits de paiement » et fixe, par ministère et institution au niveau provincial (ou par organe et service au niveau local) et par budget annexe, les plafonds des autorisations d'emplois rémunérés ainsi que les AE et CP ouverts. La logique de budget-programme s'applique donc aussi aux provinces et aux ETD.",
    articleRef: 'Art. 137 LOFIP',
  },
  {
    id: 'ch8-q18',
    question: "Selon l'article 182 de la LOFIP, quel est le calendrier d'adoption de l'édit budgétaire de l'année ?",
    options: [
      { id: 'a', texte: "Dépôt au plus tard le 15 septembre, vote avant le 15 novembre" },
      { id: 'b', texte: "Session budgétaire du 30 septembre au 30 décembre ; dépôt au plus tard le 25 novembre ; vote et promulgation au plus tard le 15 décembre ; l'Assemblée provinciale dispose de 20 jours pour se prononcer" },
      { id: 'c', texte: "Dépôt au plus tard le 31 mai, vote avant le 15 juin" },
      { id: 'd', texte: "Aucun délai n'est fixé : chaque province détermine son propre calendrier" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 182 de la LOFIP fixe la session budgétaire des Assemblées provinciales du 30 septembre au 30 décembre, leur donne « un délai de 20 jours pour se prononcer sur le projet d'édit budgétaire » et impose le dépôt du projet, avec les états et documents des articles 176 et 178, « au plus tard le 25 novembre, pour être voté et promulgué au plus tard le 15 décembre ». Ce calendrier suit celui du budget national : l'article 187 impose de prendre en compte les résultats des votes conjoints de l'Assemblée nationale et du Sénat sur la quotité revenant à la province.",
    articleRef: 'Art. 182 et 187 LOFIP',
  },
  {
    id: 'ch8-q19',
    question: "Selon l'article 188 de la LOFIP, que se passe-t-il si l'Assemblée provinciale n'adopte pas le projet d'édit budgétaire avant le 15 décembre ?",
    options: [
      { id: 'a', texte: "Le budget de l'année précédente est reconduit automatiquement par douzièmes" },
      { id: 'b', texte: "Les dispositions du projet sont confirmées par arrêté du Gouverneur, délibéré en Conseil provincial des ministres, pour entrer en vigueur le 1er janvier" },
      { id: 'c', texte: "Le Président de la République met le projet en vigueur par ordonnance-loi" },
      { id: 'd', texte: "L'Assemblée provinciale est dissoute de plein droit" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 188 de la LOFIP prévoit que si l'Assemblée provinciale n'adopte pas le projet déposé dans les conditions de l'article 182 avant le 15 décembre, « les dispositions dudit projet sont confirmées par arrêté du Gouverneur de province, délibéré en Conseil provincial des ministres, pour entrer en vigueur le 1er janvier ». En sens inverse, si dix jours après le vote conjoint du projet de loi de finances par le Parlement le Gouvernement provincial n'a pas déposé son projet d'édit, il est réputé démissionnaire et présente, en expédiant les affaires courantes, un projet d'édit portant ouverture de crédits provisoires, à voter au plus tard le 30 décembre.",
    articleRef: 'Art. 188 LOFIP',
  },
  {
    id: 'ch8-q20',
    question: "Selon l'article 194 de la LOFIP, jusqu'à quelle date les engagements de dépenses, autres que celles de personnel, peuvent-ils intervenir au niveau provincial et local ?",
    options: [
      { id: 'a', texte: "Jusqu'au 31 décembre de l'année budgétaire" },
      { id: 'b', texte: "Jusqu'au 31 octobre de chaque année" },
      { id: 'c', texte: "Jusqu'au 30 novembre de chaque année" },
      { id: 'd', texte: "Jusqu'au 31 janvier de l'année suivante" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 194 de la LOFIP dispose que « les engagements de dépenses, autres que celles de personnel, se rapportant aux autorisations d'engagement annuelles ne peuvent intervenir après le 31 octobre de chaque année » — le même butoir que celui de l'article 92 pour le pouvoir central. Les parties de crédits couvrant des obligations existant au 31 octobre et non payées au 31 décembre peuvent être reportées à l'année suivante et s'ajoutent aux crédits de paiement correspondants.",
    articleRef: 'Art. 194 LOFIP',
  },
  {
    id: 'ch8-q21',
    question: "Selon les articles 223 et 224 de la LOFIP, comment s'opère la consolidation du budget du pouvoir central avec ceux des provinces ?",
    options: [
      { id: 'a', texte: "Par arrêté ministériel publié au Journal officiel chaque trimestre" },
      { id: 'b', texte: "Par une loi annuelle : le projet de loi de consolidation est déposé au plus tard le 31 mai de l'année suivante et voté au plus tard le 15 juin" },
      { id: 'c', texte: "Par ordonnance-loi du Président de la République en fin d'exercice" },
      { id: 'd', texte: "Par la loi de finances rectificative de l'année en cours" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 223 de la LOFIP dispose que, conformément à l'article 175 de la Constitution, « le Budget du pouvoir central et ceux des provinces sont consolidés chaque année par une loi », et que cette consolidation « s'effectue pour des raisons statistiques et informatives ». L'article 224 fixe les délais : dépôt du projet de loi de consolidation au plus tard le 31 mai de l'année suivante sur le bureau de l'Assemblée nationale, vote au plus tard le 15 juin.",
    articleRef: 'Art. 223-224 LOFIP',
  },
  {
    id: 'ch8-q22',
    question: "Selon les articles 225 et 226 de la LOFIP, quels sont les droits des ETD sur les recettes à caractère national et selon quels critères sont-ils répartis ?",
    options: [
      { id: 'a', texte: "Les ETD ont droit à 10 % de la part provinciale, répartis également entre elles" },
      { id: 'b', texte: "Les ETD ont droit à 40 % de la part des recettes à caractère national allouées aux provinces et à 40 % des impôts et taxes provinciaux d'intérêt commun ; la répartition entre ETD suit la capacité contributive, la superficie et le poids démographique" },
      { id: 'c', texte: "Les ETD n'ont aucun droit propre : elles dépendent des subventions discrétionnaires de la province" },
      { id: 'd', texte: "Les ETD reçoivent directement 40 % des recettes nationales, sans passer par la province" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 225 de la LOFIP dispose que les ETD « ont droit à 40 % de la part des recettes à caractère national allouées aux provinces conformément à l'article 115 de la loi organique n° 08/016 » et « également droit à 40 % des impôts et taxes provinciaux d'intérêt commun ». L'article 226 précise que la répartition des 40 % entre les ETD « est fonction des critères de capacité contributive, de la superficie et du poids démographique », un édit en déterminant les modalités d'exécution.",
    articleRef: 'Art. 225-226 LOFIP',
  },
  {
    id: 'ch8-q23',
    question: "Selon les articles 210 et 211 de la LOFIP, comment s'exerce le contrôle sur les finances des provinces et des ETD ?",
    options: [
      { id: 'a', texte: "Uniquement par les organes locaux de contrôle, à l'exclusion de tout organe national" },
      { id: 'b', texte: "Les règles de contrôle administratif (art. 111 à 122) et de contrôle juridictionnel (art. 123 à 126) applicables au pouvoir central s'appliquent mutatis mutandis ; la Cour des comptes ouvre sous son contrôle des chambres des comptes déconcentrées dans les provinces" },
      { id: 'c', texte: "Par le seul ministre national des Finances, qui approuve chaque dépense provinciale" },
      { id: 'd', texte: "Aucun contrôle n'est prévu : les provinces sont financièrement souveraines" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 210 de la LOFIP confie le contrôle administratif aux organes locaux de contrôle et à l'Inspection générale des finances, les articles 111 à 122 s'appliquant mutatis mutandis. L'article 211 étend de même le contrôle juridictionnel des articles 123 à 126 et ajoute que « la Cour des comptes ouvre sous son contrôle des chambres des comptes déconcentrées dans les provinces ». L'article 212 organise en outre le contrôle politique des organes délibérants, qui prononcent, s'il échet, la décharge des ordonnateurs lors de la reddition des comptes.",
    articleRef: 'Art. 210-212 LOFIP',
  },
  {
    id: 'ch8-q24',
    question: "Selon les articles 214 à 216 de la LOFIP, quel est le régime des sanctions applicables à la gestion des finances provinciales et locales ?",
    options: [
      { id: 'a', texte: "Seules des sanctions disciplinaires internes sont possibles" },
      { id: 'b', texte: "La faute de gestion est punie d'une amende plafonnée au double du traitement brut annuel (minimum un quart) ; le comptable de fait assume les responsabilités d'un comptable public ; les fautes de gestion sont jugées par la Cour des comptes, qui met en cause la responsabilité du comptable par une décision de débet" },
      { id: 'c', texte: "Toute irrégularité entraîne automatiquement une peine d'emprisonnement" },
      { id: 'd', texte: "Les sanctions sont prononcées par le Gouverneur de province" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 214 de la LOFIP énumère les faits constitutifs de faute de gestion (engagement sans pouvoir, sans crédits disponibles, dissimulation, avantage injustifié, etc.) et fixe l'amende : elle « ne pourra atteindre le double du montant du traitement ou salaire brut annuel [...] sans être inférieur au quart ». L'article 215 répute comptable de fait toute personne qui s'ingère dans les opérations de recettes, de dépenses ou de maniement de valeurs sans titre. L'article 216 confie l'examen et le jugement des fautes de gestion à la Cour des comptes, la responsabilité personnelle et pécuniaire du comptable étant mise en cause « au moyen d'une décision de débet ».",
    articleRef: 'Art. 214-216 LOFIP',
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '8.1',
    titre: "L'architecture de la décentralisation financière",
    navLabel: 'Architecture',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La Constitution du 18 février 2006 organise un État unitaire fortement décentralisé. Son article 171 pose le principe cardinal : *« Les finances du pouvoir central et celles des provinces sont distinctes. »* Son article 175 ajoute que le budget des recettes et des dépenses de l'État — celui du pouvoir central et des provinces — est arrêté chaque année par une loi, et que la part des recettes à caractère national allouée aux provinces est établie à **40 %**, retenue à la source.",
      },
      {
        type: 'paragraphe',
        texte: "Trois niveaux de gouvernance budgétaire coexistent ainsi : le **pouvoir central** (loi de finances votée par le Parlement), la **province** (édit budgétaire voté par l'Assemblée provinciale, qui légifère par voie d'édit selon l'article 197 de la Constitution) et les **entités territoriales décentralisées** (décision budgétaire votée par l'organe délibérant local). L'article 133 de la LOFIP énumère les ETD : *« la ville, la commune, le secteur ou la chefferie »* — la ville en fait partie, ce qu'on oublie souvent.",
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'carte',
        titre: "Les définitions légales de l'article 3 de la LOFIP",
        liste: [
          "**Édit budgétaire** (pt 19) : acte par lequel sont prévues et autorisées, *par l'Assemblée provinciale*, les ressources et les charges provinciales d'un exercice budgétaire — traduction financière annuelle du programme d'action de développement de la province.",
          "**Décision budgétaire** (pt 18, rédaction 2011) : le même acte, pour les ressources et charges locales, voté par les organes délibérants des ETD.",
          "**Budget de la province** (pt 6) : prévisions des recettes et des dépenses de la seule province.",
          "**Budget provincial** (pt 5) : document intégrant les prévisions des ETD dans celles de la province.",
          "**Édit d'intégration budgétaire** (pt 20, rédaction 2011) : acte présentant le budget provincial obtenu par cette intégration.",
          "**Loi de consolidation budgétaire** (pt 29, rédaction 2011) : acte par lequel le Parlement vote le budget de l'État, consolidation de la loi de finances avec les édits d'intégration des budgets provinciaux.",
        ],
        note: "La loi n° 23/030 du 28 juin 2023 a porté la liste des définitions à 43 points, en insérant notamment le « débat d'orientation budgétaire » et la « dotation budgétaire » ; la numérotation des points cités ici est celle du texte de 2011.",
      },
      { type: 'controle', question: QCM[1] },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Niveau', 'Acte budgétaire', 'Organe votant', 'Base'],
          lignes: [
            ['Pouvoir central', 'Loi de finances', 'Parlement (Assemblée nationale et Sénat)', 'Const. art. 126 ; LOFIP art. 18 s.'],
            ['Province', 'Édit budgétaire', 'Assemblée provinciale', 'LOFIP art. 3 pt 19, 132 s.'],
            ['ETD (ville, commune, secteur, chefferie)', 'Décision budgétaire', 'Organe délibérant local', 'LOFIP art. 3 pt 18, 132 s.'],
          ],
        },
      },
      {
        type: 'filet',
        titre: 'Le socle constitutionnel des compétences',
        texte: "La répartition des compétences (Constitution, art. 201 à 204) fonde la répartition des charges : les « finances publiques de la République » sont de la compétence exclusive du pouvoir central (art. 202 point 9), tandis que « les finances publiques provinciales », « la dette publique provinciale » et « les emprunts intérieurs pour les besoins des provinces » relèvent de la compétence exclusive des provinces (art. 204 points 5 à 7). L'article 205 interdit à chaque législateur d'empiéter sur la compétence exclusive de l'autre, la législation nationale primant sur l'édit provincial dans les matières concurrentes.",
      },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
    ],
  },
  {
    numero: '8.2',
    titre: 'La répartition des recettes à caractère national',
    navLabel: 'Retenue de 40 %',
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'article 218 de la LOFIP met en œuvre l'article 175 de la Constitution : *« les provinces ont droit à quarante pour cent des recettes à caractère national retenues à la source »*, les modalités de cette retenue étant décrites aux articles 219 à 222. Le même article tempère aussitôt ce droit : l'allocation *« tient compte du transfert effectif des compétences et des responsabilités en matière des dépenses »*, et le pouvoir central peut retenir de la quote-part provinciale le coût des compétences non transférées, **dans les conditions définies par une loi de finances** — jamais par simple acte réglementaire.",
      },
      { type: 'controle', question: QCM[5] },
      {
        type: 'carte',
        titre: "La « retenue à la source » : une opération bancaire (art. 3 pt 39 LOFIP)",
        texte: "La LOFIP définit la retenue à la source comme *« l'opération bancaire qui consiste à créditer le compte d'une province génératrice des recettes, d'une quotité de 40 % sur le montant total recouvré au titre des recettes à caractère national lors du nivellement au profit du compte général du trésor de l'ensemble de recettes mobilisées dans la province »*. La part provinciale n'est donc pas rétrocédée après coup par le Trésor : elle est prélevée au moment même du nivellement des comptes vers le Compte général du Trésor.",
      },
      { type: 'controle', question: QCM[6] },
      {
        type: 'carte',
        titre: "Les deux catégories de recettes à caractère national (art. 219 LOFIP)",
        tableau: {
          entetes: ['Catégorie A', 'Catégorie B'],
          lignes: [
            [
              "Recettes administratives, judiciaires et domaniales collectées en province ; recettes des impôts perçues à leur lieu de réalisation.",
              "Recettes administratives, judiciaires, domaniales et de participations collectées au niveau du pouvoir central ; recettes de douanes et d'accises ; recettes des impôts recouvrées sur les grandes entreprises ; recettes des pétroliers producteurs.",
            ],
          ],
        },
      },
      { type: 'controle', question: QCM[7] },
      {
        type: 'paragraphe',
        texte: "Le mécanisme de répartition diffère selon la catégorie. Pour la **catégorie A**, l'article 220 prévoit que la retenue de 40 % est portée au compte de la province génératrice *« lors du nivellement au profit du Compte général du Trésor, sur instruction permanente du ministre ayant les finances dans ses attributions conformément aux prescrits du Règlement général sur la comptabilité publique »* : la province qui génère la recette la conserve. Pour la **catégorie B**, l'article 221 organise une mutualisation : la retenue de 40 % s'effectue au profit de l'ensemble des provinces, *« suivant leur capacité contributive et leur poids démographique »*, selon les modalités d'un arrêté conjoint des ministres ayant les finances et le budget dans leurs attributions.",
      },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      {
        type: 'filet',
        titre: "L'allocation compensatoire pétrolière",
        texte: "L'article 221 alinéa 2 ajoute : « S'agissant des recettes pétrolières inclues dans la catégorie B, une allocation de 10 % de la part revenant aux provinces est attribuée à la province productrice à titre compensatoire pour réparer notamment les dommages d'environnement résultant de l'extraction. » Cette allocation est textuellement limitée au pétrole : une province minière ne peut pas l'invoquer pour le cuivre ou le cobalt sans modification législative.",
      },
      { type: 'controle', question: QCM[10] },
      {
        type: 'carte',
        titre: 'Application chiffrée — loi de finances n° 25/060 pour 2026',
        liste: [
          "**Art. 8** : part des recettes à caractère national allouée aux provinces : **7 694 540 952 980 FC** (environ 7 694,5 milliards).",
          "**Art. 9** : ressources de la Caisse nationale de péréquation : **744 632 995 450 FC** (environ 744,6 milliards).",
        ],
        note: "Ces montants sont rapportés à des recettes du budget général arrêtées à 48 969 279 573 100 FC (art. 7) et à un budget du pouvoir central en équilibre à 54 335 751 192 461 FC (art. 6).",
      },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '8.3',
    titre: 'La Caisse nationale de péréquation',
    navLabel: 'Péréquation',
    blocs: [
      {
        type: 'paragraphe',
        texte: "La retenue de 40 % avantage mécaniquement les provinces à forte base économique. La Constitution y répond par la **péréquation** : son article 181 institue une Caisse nationale de péréquation, *dotée de la personnalité juridique*, avec pour mission *« de financer des projets et programmes d'investissement public, en vue d'assurer la solidarité nationale et de corriger le déséquilibre de développement entre les provinces et entre les autres entités territoriales décentralisées »*. Elle dispose d'un budget alimenté par le Trésor public *« à concurrence de dix pour cent de la totalité des recettes à caractère national revenant à l'État chaque année »*, est placée sous la tutelle du Gouvernement, et une loi organique fixe son organisation et son fonctionnement.",
      },
      { type: 'controle', question: QCM[12] },
      {
        type: 'paragraphe',
        texte: "L'article 222 de la LOFIP articule ce financement avec la catégorisation des recettes : le budget de la Caisse est alimenté *« à concurrence de dix pour cent de la totalité des recettes de catégorie A et B telle que définies à l'article 219 »*. Ce prélèvement de 10 % est distinct de la retenue de 40 % : il porte sur la totalité des recettes des deux catégories, y compris la part qui alimente le budget du pouvoir central, et finance exclusivement des **dépenses d'investissement** — les articles 148 et 149 rangent d'ailleurs les ressources provenant de la Caisse parmi les *recettes en capital* des provinces et des ETD.",
      },
      { type: 'controle', question: QCM[13] },
      {
        type: 'tableau',
        tableau: {
          entetes: ['Mécanisme', 'Base constitutionnelle', 'Articles LOFIP', 'Taux', 'LF 2026'],
          lignes: [
            ['Retenue à la source', 'Art. 175', 'Art. 218 à 221', '40 % des recettes à caractère national', '7 694,5 Mds FC (art. 8)'],
            ['Caisse nationale de péréquation', 'Art. 181', 'Art. 222', '10 % de la totalité des recettes des catégories A et B', '744,6 Mds FC (art. 9)'],
          ],
        },
      },
      {
        type: 'filet',
        titre: 'Une logique redistributive, pas productiviste',
        texte: "La péréquation est un instrument de solidarité nationale : les ressources de la Caisse bénéficient aux provinces et aux ETD selon les besoins de correction des déséquilibres de développement, et non au prorata de la contribution de chacune. Une province fortement contributrice ne peut donc pas revendiquer un « retour » proportionnel sur la Caisse : ce serait contraire à la mission que l'article 181 de la Constitution lui assigne.",
      },
      { type: 'controle', question: QCM[14] },
    ],
  },
  {
    numero: '8.4',
    titre: "L'édit et la décision budgétaires : contenu et crédits",
    navLabel: 'Édit et décision',
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'article 132 de la LOFIP définit l'édit budgétaire et la décision budgétaire comme *« des actes par lesquels sont prévus et autorisés, par les organes délibérants respectifs, les ressources et les charges provinciales et locales d'un exercice budgétaire »*, dans le respect de l'équilibre budgétaire et financier. L'article 134 en distingue quatre espèces, en miroir des quatre espèces de lois de finances : l'édit ou la décision de l'année, ceux portant ouverture de crédits provisoires, les rectificatifs et ceux portant reddition des comptes.",
      },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[15] },
      {
        type: 'carte',
        titre: "Le contenu obligatoire de l'édit ou de la décision de l'année (art. 135 à 139 LOFIP)",
        liste: [
          "**Art. 135 — unité** : toutes les ressources et toutes les charges d'une année civile dans un document unique, traduisant les programmes d'actions du Gouvernement provincial ou du Collège exécutif de l'ETD avec leurs évaluations en objectifs et résultats attendus.",
          "**Art. 136 — recettes** : dispositions relatives à la perception des recettes de toute nature, aux ressources affectant l'équilibre, aux affectations de recettes, et évaluation de chaque nature de recettes.",
          "**Art. 137 — crédits** : par programme, montant des autorisations d'engagement et des crédits de paiement ; par ministère et institution provinciale (ou organe et service local) et par budget annexe, plafonds des autorisations d'emplois rémunérés.",
          "**Art. 138 — équilibre** : plafonds des charges et des emplois, données générales de l'équilibre budgétaire ; l'édit fixe globalement la dotation destinée aux ressources des ETD qui dépendent de la province.",
          "**Art. 139 — dispositions facultatives** : modalités de répartition des concours aux ETD, approbation de conventions financières, information et contrôle de l'organe délibérant.",
        ],
      },
      { type: 'controle', question: QCM[16] },
      {
        type: 'paragraphe',
        texte: "Les ressources sont détaillées aux articles 147 à 149 : recettes courantes (part des recettes à caractère national, impôts et taxes provinciaux d'intérêt commun, fiscalité propre, recettes administratives, participations), recettes en capital (cessions d'actifs, ressources de la Caisse nationale de péréquation) et recettes exceptionnelles (dons et legs, subventions, emprunts). L'article 146 rappelle deux garde-fous nationaux : le recours aux avances de la Banque centrale du Congo est **prohibé** (art. 16) et le recours à l'emprunt est **encadré** (art. 15). Les charges suivent la nomenclature de l'article 150 : six titres de dépenses courantes (dette publique en capital, frais financiers, personnel, biens et matériels, prestations, transferts et interventions), deux titres de dépenses en capital (équipements ; construction, réfection, réhabilitation et acquisitions immobilières) et un titre de prêts et avances.",
      },
      {
        type: 'carte',
        titre: 'Le régime des crédits provinciaux et locaux (art. 151 à 166 LOFIP)',
        liste: [
          "**Crédits limitatifs** par principe (art. 151) ; **évaluatifs** pour les charges de la dette (art. 152) ; **provisionnels** pour les dépenses accidentelles et imprévisibles, notamment les catastrophes naturelles (art. 153).",
          "**AE et CP** (art. 155) : les autorisations d'engagement sont la limite supérieure des dépenses pouvant être engagées, les crédits de paiement celle des dépenses pouvant être ordonnancées ou payées pendant l'année.",
          "**Programme** (art. 156) : ensemble cohérent d'actions avec objectifs, résultats attendus et indicateurs de performance ; seule une disposition d'édit ou de décision budgétaire peut créer ou supprimer un programme.",
          "**Fongibilité** (art. 158) : les crédits d'un programme sont fongibles à l'intérieur du titre et de la source de financement ; aucun virement ni transfert ne peut abonder le titre des dépenses de personnel depuis un autre titre (art. 164).",
          "**Virements et transferts** (art. 160 à 163) : virements entre titres d'un même programme par arrêté du ministre provincial ou de l'échevin du budget ; transferts entre programmes par arrêté du Gouverneur ou du responsable de l'exécutif local ; aucun mouvement au profit d'un programme non prévu par un édit ou une décision.",
          "**Reports** (art. 166) : AE pluriannuelles et CP non consommés reportés sur le même programme et le même titre, par arrêtés conjoints pris au plus tard le 31 mars de l'année suivante.",
        ],
        note: "Les articles 167 à 171 permettent en outre des budgets annexes provinciaux et locaux — dérogation à l'universalité de l'article 167 —, entre lesquels aucun mouvement de crédits n'est possible (art. 171).",
      },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '8.5',
    titre: 'Élaboration, adoption et exécution',
    navLabel: 'Adoption et exécution',
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'élaboration suit la discipline nationale : le projet d'édit ou de décision est élaboré conformément aux mesures d'encadrement de l'article 13 (cadre budgétaire à moyen terme, lettre d'orientation), traduites et notifiées par une instruction du Gouverneur (art. 174). Les instances provinciales et locales élaborent un **cadre de dépenses à moyen terme sur trois années** d'où découlent leurs prévisions. Le ministre provincial ou l'échevin du budget prépare le projet, arrêté par le Gouvernement provincial ou le Collège exécutif, puis déposé à l'organe délibérant (art. 175). Les articles 176 à 178 énumèrent les documents qui en font partie intégrante ou y sont joints — la loi n° 23/030 de 2023 a réécrit l'article 178 en huit points, ajoutant notamment les projets annuels de performance et le plan de trésorerie prévisionnel au niveau provincial.",
      },
      {
        type: 'carte',
        titre: "Le calendrier budgétaire provincial et local (art. 182 à 189 LOFIP)",
        tableau: {
          entetes: ['Étape', 'Échéance', 'Base'],
          lignes: [
            ['Session budgétaire des Assemblées provinciales', 'Du 30 septembre au 30 décembre', 'Art. 182'],
            ["Dépôt du projet d'édit budgétaire (délai d'examen : 20 jours)", 'Au plus tard le 25 novembre', 'Art. 182'],
            ["Vote et promulgation de l'édit budgétaire", 'Au plus tard le 15 décembre', 'Art. 182'],
            ["Non-adoption par l'Assemblée provinciale", "Dispositions confirmées par arrêté du Gouverneur délibéré en Conseil provincial des ministres, en vigueur le 1er janvier", 'Art. 188'],
            ["Non-dépôt du projet 10 jours après le vote conjoint de la loi de finances", "Gouvernement provincial réputé démissionnaire ; édit de crédits provisoires voté au plus tard le 30 décembre", 'Art. 188'],
            ["Dépôt du projet d'édit portant reddition des comptes (avec le rapport de la Cour des comptes)", "Au plus tard le 30 mai de l'année suivante", 'Art. 185'],
          ],
        },
        note: "Le projet d'édit prend en compte les résultats des votes conjoints de l'Assemblée nationale et du Sénat sur la quotité revenant à la province (art. 187) ; les ETD s'ajustent au calendrier de vote du budget de la province (art. 186 et 189). Les édits et décisions votés sont rendus exécutoires par le représentant de l'État par l'apposition de la date de réception, et publiés (art. 184).",
      },
      { type: 'controle', question: QCM[17] },
      { type: 'controle', question: QCM[18] },
      {
        type: 'paragraphe',
        texte: "L'exécution reprend les canons de la comptabilité publique : mise à disposition des crédits par programme (art. 190), liquidation et ordonnancement préalables des recettes et des dépenses (art. 191), rattachement des recettes à l'année de leur encaissement et des dépenses à l'année de leur paiement (art. 192), encaissement et règlement par un **comptable public** (art. 193), butoir d'engagement au **31 octobre** avec report possible des crédits couvrant des obligations non payées au 31 décembre (art. 194). Quatre comptabilités sont tenues (art. 196 à 201) : administrative, budgétaire, des matières et générale — cette dernière en droits constatés et en partie double. L'ordonnateur (responsable d'institution, ministre provincial, échevin ou délégué) et le comptable public se partagent l'exécution (art. 202 à 208), le comptable relevant du ministre du pouvoir central ayant les finances dans ses attributions (art. 208). Enfin, l'article 209 impose l'unité de trésorerie : sauf disposition expresse d'un édit ou d'une décision budgétaire, toutes les disponibilités sont déposées dans un seul et unique compte ouvert auprès du caissier de l'État.",
      },
    ],
  },
  {
    numero: '8.6',
    titre: 'Consolidation, ETD, contrôle et sanctions',
    navLabel: 'Consolidation et contrôle',
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'article 217 de la LOFIP arrime les rapports financiers entre le pouvoir central et les provinces aux *« principes de base édictés par les articles 171, 175, 202, 203 et 204 de la Constitution »* : distinction des finances, retenue de 40 % et répartition constitutionnelle des compétences. La **consolidation** ferme la boucle : conformément à l'article 175 de la Constitution, le budget du pouvoir central et ceux des provinces sont consolidés chaque année par une loi (art. 223), *« pour des raisons statistiques et informatives »* — la consolidation ne modifie pas les crédits votés. Le projet de loi de consolidation est déposé au plus tard le **31 mai** de l'année suivante et voté au plus tard le **15 juin** (art. 224).",
      },
      { type: 'controle', question: QCM[20] },
      {
        type: 'carte',
        titre: 'Les rapports entre les provinces et les ETD (art. 225 à 229 LOFIP)',
        liste: [
          "**Art. 225** : les ETD ont droit à **40 % de la part des recettes à caractère national allouées aux provinces** (conformément à l'article 115 de la loi organique n° 08/016 sur les ETD) et à **40 % des impôts et taxes provinciaux d'intérêt commun**.",
          "**Art. 226** : la répartition entre ETD est fonction de la **capacité contributive**, de la **superficie** et du **poids démographique** ; un édit en détermine les modalités d'exécution.",
          "**Art. 227** : l'intégration des budgets des ETD dans celui de la province s'effectue pour des raisons statistiques et informatives de la comptabilité nationale.",
          "**Art. 228** : votes en cascade — le budget de la province est voté après celui du pouvoir central, celui de l'ETD après celui de la province.",
          "**Art. 229** : la décision budgétaire promulguée est transmise au Gouverneur pour intégration au plus tard le **30 mars** ; l'édit de consolidation intégrant les budgets des ETD est transmis au Gouvernement central au plus tard le **20 avril**.",
        ],
      },
      { type: 'controle', question: QCM[21] },
      {
        type: 'paragraphe',
        texte: "Le **contrôle** est calqué sur celui du pouvoir central. Contrôle administratif : organes locaux de contrôle et Inspection générale des finances, les articles 111 à 122 s'appliquant *mutatis mutandis* (art. 210). Contrôle juridictionnel : les articles 123 à 126 s'appliquent de même, et la Cour des comptes *« ouvre sous son contrôle des chambres des comptes déconcentrées dans les provinces »* (art. 211) — application provinciale de l'article 180 de la Constitution, qui charge la Cour de contrôler la gestion des finances de l'État, des biens publics *« ainsi que les comptes des provinces, des entités territoriales décentralisées ainsi que des organismes publics »*. Contrôle politique enfin : les organes délibérants veillent à la bonne exécution des édits et décisions, peuvent conduire des investigations sur pièces et sur place, auditionner les ordonnateurs, et prononcent, s'il échet, la **décharge des ordonnateurs** lors de l'examen de la reddition des comptes (art. 212).",
      },
      { type: 'controle', question: QCM[22] },
      {
        type: 'filet',
        titre: 'Le régime des sanctions (art. 213 à 216 LOFIP)',
        texte: "Les ordonnateurs sont responsables des certifications qu'ils délivrent et des résultats atteints par rapport aux objectifs du budget-programme (art. 213). L'article 214 érige en faute de gestion, notamment, l'engagement de dépenses sans pouvoir ou sans crédits disponibles, la dissimulation permettant une fausse imputation, ou l'octroi à soi-même ou à autrui d'un avantage injustifié : l'amende encourue ne peut atteindre le double du traitement ou salaire brut annuel, sans être inférieure au quart. Toute personne qui s'ingère sans titre dans les opérations de recettes, de dépenses ou de maniement de valeurs est réputée comptable de fait et assume les obligations et responsabilités d'un comptable public (art. 215). Les fautes de gestion des contrôleurs budgétaires, comptables publics et ordonnateurs — autres que les membres du Gouvernement provincial, de l'Assemblée provinciale ou de l'exécutif et de l'organe délibérant local — sont examinées et jugées par la Cour des comptes ; la responsabilité personnelle et pécuniaire du comptable est mise en cause au moyen d'une décision de débet (art. 216).",
      },
      { type: 'controle', question: QCM[23] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ch8-cp1',
    titre: "L'édit budgétaire promulgué par le Gouverneur sans vote de l'Assemblée provinciale",
    contexte: "Le Gouverneur de la province du Kongo-Central promulgue, le 15 décembre, un édit budgétaire pour l'exercice suivant sans le soumettre au préalable au vote de l'Assemblée provinciale. Il invoque l'urgence et l'absence de quorum à l'Assemblée.",
    questions: [
      {
        num: 1,
        enonce: "Analysez la légalité de cet édit au regard des articles 3 point 19 et 132 de la LOFIP.",
        correction: "L'acte est irrégulier. L'article 3 point 19 de la LOFIP définit l'édit budgétaire comme l'acte par lequel les ressources et les charges provinciales sont prévues et autorisées « par l'Assemblée provinciale », et l'article 132 confirme que l'autorisation émane des « organes délibérants respectifs ». Le Gouverneur est un organe exécutif : ni l'urgence ni l'absence de quorum ne peuvent substituer l'exécutif au délibérant pour l'autorisation budgétaire. La Constitution le confirme : l'Assemblée provinciale est l'organe délibérant de la province et légifère par voie d'édit (art. 197).",
      },
      {
        num: 2,
        enonce: "La LOFIP prévoit-elle des mécanismes propres permettant de fonctionner sans édit budgétaire voté en temps utile ?",
        correction: "Oui — et il n'est pas nécessaire de raisonner par analogie avec le niveau national : la LOFIP organise elle-même deux mécanismes provinciaux. D'une part, si l'Assemblée provinciale n'adopte pas le projet d'édit régulièrement déposé avant le 15 décembre, ses dispositions sont confirmées par arrêté du Gouverneur délibéré en Conseil provincial des ministres, pour entrer en vigueur le 1er janvier (art. 188) — mais cela suppose un projet déposé dans les conditions de l'article 182, ce qui n'est pas le cas ici. D'autre part, l'édit portant ouverture de crédits provisoires (art. 134 et 144) autorise le recouvrement des recettes et l'engagement des dépenses nécessaires au fonctionnement minimum des services lorsque le projet n'a pas été déposé en temps utile ; il est voté au plus tard le 30 décembre et, à défaut, mis en vigueur par arrêté du Gouverneur (art. 188). En dehors de ces procédures, les dépenses engagées sur le fondement d'un édit adopté par le seul Gouverneur sont irrégulières et exposent leurs auteurs au régime des sanctions des articles 213 à 216.",
      },
      {
        num: 3,
        enonce: "Quelle voie de droit permet de contester cet acte ?",
        correction: "L'article 162 alinéa 2 de la Constitution ouvre largement le prétoire : « Toute personne peut saisir la Cour constitutionnelle pour inconstitutionnalité de tout acte législatif ou réglementaire. » L'acte du Gouverneur, pris en violation des articles 175 et 197 de la Constitution et des articles 3 point 19 et 132 de la LOFIP, peut ainsi être déféré à la Cour constitutionnelle. L'exception d'inconstitutionnalité peut aussi être soulevée devant toute juridiction à l'occasion d'un litige (art. 162).",
      },
    ],
  },
  {
    id: 'ch8-cp2',
    titre: "La suspension de la retenue à la source par arrêté ministériel",
    contexte: "En raison d'un déficit du Trésor, le ministre des Finances suspend pendant trois mois, par arrêté, la retenue à la source de 40 % sur les recettes de catégorie A au profit de la province du Sud-Kivu, en suspendant l'instruction permanente visée à l'article 220 de la LOFIP.",
    questions: [
      {
        num: 1,
        enonce: "Analysez la légalité de cet arrêté au regard de l'article 175 de la Constitution et des articles 218 à 220 de la LOFIP.",
        correction: "L'arrêté est illégal. L'article 175 alinéa 2 de la Constitution établit directement le droit des provinces à 40 % des recettes à caractère national, retenus à la source : un droit de rang constitutionnel ne peut être suspendu par un acte réglementaire. L'article 218 de la LOFIP le réaffirme et l'article 220 en organise le mécanisme pour la catégorie A — la retenue est portée au compte de la province génératrice lors du nivellement, « sur instruction permanente » du ministre des Finances. Le caractère permanent de l'instruction est voulu par la loi : sa suspension par arrêté contrevient à une obligation constitutionnelle et légale.",
      },
      {
        num: 2,
        enonce: "Le déficit du Trésor peut-il justifier la mesure sur le fondement de l'article 218 de la LOFIP ?",
        correction: "Non. L'article 218 n'autorise qu'une seule retenue sur la quote-part provinciale : celle du coût des compétences et responsabilités non transférées, et uniquement « dans les conditions définies par une loi de finances ». Le motif invoqué (déficit du Trésor) est étranger à cette hypothèse, et la forme utilisée (arrêté) est de toute façon insuffisante. La mesure est doublement irrégulière, quant au motif et quant à la forme.",
      },
      {
        num: 3,
        enonce: "Quels recours s'offrent à la province ?",
        correction: "Deux voies juridictionnelles principales. Devant le Conseil d'État : l'article 155 de la Constitution lui donne compétence, en premier et dernier ressort, pour les recours pour violation de la loi formés contre les actes, règlements et décisions des autorités administratives centrales — l'arrêté ministériel en est un. Devant la Cour constitutionnelle : outre l'exception d'inconstitutionnalité (art. 162), l'article 161 alinéa 3 lui donne compétence pour connaître « des conflits de compétences [...] entre l'État et les provinces », et sa saisine en interprétation est ouverte notamment aux Gouverneurs de province et aux Présidents des Assemblées provinciales (art. 161 al. 1er). Sur le plan politique, la Conférence des Gouverneurs de province (art. 200 de la Constitution), présidée par le Président de la République, peut émettre des avis et formuler des suggestions sur la politique à mener.",
      },
    ],
  },
  {
    id: 'ch8-cp3',
    titre: "La contestation de la péréquation par une province minière",
    contexte: "La province du Lualaba, grande productrice de cobalt, conteste le fonctionnement de la Caisse nationale de péréquation : elle estime que la répartition pénalise les provinces contributrices nettes et réclame, sur le fondement de l'article 221 de la LOFIP, une allocation compensatoire au titre de province productrice pour ses recettes minières.",
    questions: [
      {
        num: 1,
        enonce: "La thèse d'une Caisse réservée aux provinces productrices est-elle juridiquement fondée ?",
        correction: "Non. L'article 181 de la Constitution assigne à la Caisse nationale de péréquation la mission de financer des projets et programmes d'investissement public « en vue d'assurer la solidarité nationale et de corriger le déséquilibre de développement entre les provinces et entre les autres entités territoriales décentralisées ». Sa vocation est redistributive par définition : réserver ses ressources aux provinces contributrices contredirait frontalement la mission constitutionnelle. L'article 222 de la LOFIP confirme que les provinces — toutes — bénéficient de ses ressources, le budget de la Caisse étant alimenté à 10 % de la totalité des recettes des catégories A et B.",
      },
      {
        num: 2,
        enonce: "L'article 221 de la LOFIP permet-il au Lualaba de réclamer une allocation compensatoire pour ses recettes minières ?",
        correction: "Non. L'allocation compensatoire de l'article 221 alinéa 2 — 10 % de la part revenant aux provinces, attribuée à la province productrice pour réparer notamment les dommages d'environnement — vise textuellement « les recettes pétrolières inclues dans la catégorie B ». Les recettes minières ne sont pas visées. Une extension au secteur minier supposerait une modification législative ; le raisonnement par analogie ne peut créer un droit à allocation que la loi n'a pas prévu. Les compensations propres au secteur minier relèvent d'autres textes (Code minier), non de la LOFIP.",
      },
      {
        num: 3,
        enonce: "Une requête en inconstitutionnalité contre le mécanisme de péréquation pourrait-elle prospérer ?",
        correction: "Non. La Caisse nationale de péréquation est une institution d'origine constitutionnelle (art. 181) : sa vocation redistributive est inscrite dans la Constitution elle-même, et l'article 222 de la LOFIP se borne à en préciser l'alimentation. La Cour constitutionnelle contrôle la conformité des lois à la Constitution (art. 160) ; elle ne peut censurer un mécanisme que la Constitution institue. La seule voie serait une révision constitutionnelle, dans les conditions strictes de l'article 218 de la Constitution (initiative encadrée, approbation par référendum ou par le Congrès à la majorité des trois cinquièmes).",
      },
    ],
  },
  {
    id: 'ch8-cp4',
    titre: "Le retard de la loi de consolidation budgétaire",
    contexte: "En juin d'une année donnée, le Gouvernement national n'a toujours pas déposé le projet de loi de consolidation du budget du pouvoir central avec ceux des provinces pour l'exercice clos, malgré l'échéance du 31 mai. Le ministère du Budget invoque des difficultés à obtenir les édits d'intégration de toutes les provinces.",
    questions: [
      {
        num: 1,
        enonce: "Rappelez le cadre juridique de l'obligation de consolidation.",
        correction: "L'obligation est d'origine constitutionnelle : l'article 175 alinéa 1er de la Constitution dispose que le budget des recettes et des dépenses de l'État — celui du pouvoir central et des provinces — est arrêté chaque année par une loi. L'article 223 de la LOFIP en tire la règle : le budget du pouvoir central et ceux des provinces « sont consolidés chaque année par une loi », pour des raisons statistiques et informatives. L'article 224 fixe des délais impératifs : dépôt du projet au plus tard le 31 mai de l'année suivante, vote au plus tard le 15 juin. La chaîne documentaire est organisée en amont : transmission des décisions budgétaires au Gouverneur au plus tard le 30 mars, transmission de l'édit de consolidation provincial au Gouvernement central au plus tard le 20 avril (art. 229). Des difficultés de collecte ne constituent pas une cause exonératoire prévue par le texte.",
      },
      {
        num: 2,
        enonce: "La consolidation a-t-elle un effet normatif sur l'exécution budgétaire ?",
        correction: "Non. L'article 223 précise que la consolidation « s'effectue pour des raisons statistiques et informatives » ; l'article 227 le répète pour l'intégration des budgets des ETD dans celui de la province. Elle ne modifie pas les crédits votés et n'autorise aucune dépense nouvelle : sa fonction est de donner au Parlement et aux citoyens une vision globale des finances publiques de l'ensemble du territoire — expression du principe d'unité, l'article 6 de la LOFIP prévoyant que les budgets provinciaux sont consolidés avec le budget du pouvoir central « pour constituer le Budget de l'État ».",
      },
      {
        num: 3,
        enonce: "De quels leviers le Parlement dispose-t-il face à ce retard ?",
        correction: "Le Parlement contrôle le Gouvernement (art. 100 de la Constitution). L'article 138 énumère ses moyens d'information et de contrôle : question orale ou écrite, question d'actualité, interpellation, commission d'enquête, audition par les commissions. Ces moyens peuvent déboucher, le cas échéant, sur une motion de censure contre le Gouvernement ou de défiance contre un ministre (art. 146) : la motion de censure, signée par un quart des membres de l'Assemblée nationale, adoptée à la majorité absolue, rend le Gouvernement démissionnaire (art. 147). La responsabilité du retard est donc d'abord politique.",
      },
    ],
  },
  {
    id: 'ch8-cp5',
    titre: "La décision budgétaire déséquilibrée d'une commune",
    contexte: "Le Conseil communal de Ngaliema adopte une décision budgétaire prévoyant 2,5 milliards de FC de recettes — dont 90 % de transferts attendus de la province — et 3,1 milliards de FC de dépenses.",
    questions: [
      {
        num: 1,
        enonce: "Analysez la régularité de cette décision au regard des articles 132 et 135 de la LOFIP.",
        correction: "La décision est irrégulière. L'article 132 impose que l'édit et la décision budgétaires déterminent les ressources et les charges « dans le respect de l'équilibre budgétaire et financier » — exigence reprise par la définition de l'article 3 point 18. L'article 135 exige un document unique contenant toutes les ressources et toutes les charges. Un écart de 600 millions de FC entre dépenses (3,1 milliards) et recettes (2,5 milliards), sans financement identifié, viole l'exigence d'équilibre. Rappel : le recours aux avances de la Banque centrale est prohibé et l'emprunt est strictement encadré (art. 146, renvoyant aux art. 15 et 16).",
      },
      {
        num: 2,
        enonce: "L'inscription de 90 % de recettes en transferts « attendus » pose-t-elle un problème de sincérité ?",
        correction: "Oui, et directement — sans détour par analogie. L'article 11 de la LOFIP s'applique expressément aux trois niveaux : « Le budget du pouvoir central, de la province ou de l'entité territoriale décentralisée présente de façon sincère l'ensemble de leurs ressources et de leurs charges », la sincérité s'appréciant compte tenu des informations disponibles. L'article 136 exige en outre l'évaluation de chaque nature de recettes. Inscrire massivement des transferts non confirmés surestime les ressources ; la prudence commande de caler la prévision sur la dotation que l'édit budgétaire provincial fixe globalement pour les ETD (art. 138) et sur les droits des articles 225 et 226 (40 % de la part provinciale, répartis selon capacité contributive, superficie et poids démographique). C'est aussi pourquoi l'article 228 impose de voter le budget de l'ETD après celui de la province.",
      },
      {
        num: 3,
        enonce: "Quels mécanismes permettent de corriger cette décision budgétaire ?",
        correction: "D'abord la voie budgétaire : seule une décision budgétaire rectificative peut, en cours d'année, modifier les dispositions de la décision de l'année (art. 140) — le Conseil communal doit donc être ressaisi d'un projet rééquilibré. Ensuite le circuit d'exécutorialité : les décisions budgétaires votées sont soumises au représentant de l'État, qui les rend exécutoires par l'apposition de la date de réception (art. 184) ; la tutelle administrative organisée par la loi organique n° 08/016 sur les ETD permet le contrôle de légalité des actes des organes locaux. Enfin, en cas d'exécution d'une décision irrégulière, le régime des sanctions s'applique : faute de gestion pour engagement sans crédits disponibles (art. 214), jugée par la Cour des comptes (art. 216).",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue5',
  numero: 8,
  id: 'ue5-ch8',
  titre: 'La décentralisation budgétaire',
  sousTitre: "Provinces, ETD, retenue de 40 %, péréquation et consolidation",
  infoBulle: "Chapitre 8 du module Finances publiques : les finances des provinces et des entités territoriales décentralisées — retenue à la source de 40 %, Caisse nationale de péréquation, édits et décisions budgétaires, consolidation du Budget de l'État.",
  loiRef: "Constitution, art. 171, 175, 181, 195-207 · LOFIP, art. 3, 132-229 · LF n° 25/060 (2026), art. 8-9",
  moduleLabel: 'UE 5 · Finances publiques',
  retourRoute: '/ue5-finances-publiques',
  coursId: 'ue5-finances-publiques',
  objectifs: [
    "Situer les trois niveaux de gouvernance budgétaire (pouvoir central, provinces, ETD) et leurs actes respectifs : loi de finances, édit budgétaire, décision budgétaire.",
    "Maîtriser la répartition des recettes à caractère national : retenue à la source de 40 %, catégories A et B, mécanismes des articles 218 à 221 de la LOFIP.",
    "Expliquer le fondement, la mission et l'alimentation de la Caisse nationale de péréquation (art. 181 de la Constitution, art. 222 LOFIP).",
    "Décrire le contenu, l'élaboration, le calendrier d'adoption et l'exécution des édits et décisions budgétaires.",
    "Connaître les rapports financiers entre provinces et ETD (art. 225 à 229) et la consolidation annuelle du Budget de l'État (art. 223-224).",
    "Identifier les contrôles (administratif, juridictionnel, politique) et le régime des sanctions applicables aux finances provinciales et locales.",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Les finances du pouvoir central et celles des provinces sont distinctes (art. 171 de la Constitution) ; les provinces ont droit à 40 % des recettes à caractère national, retenus à la source (art. 175 ; art. 218 LOFIP).",
    "Catégorie A (recettes collectées en province) : les 40 % restent à la province génératrice, lors du nivellement, sur instruction permanente du ministre des Finances (art. 220). Catégorie B (recettes collectées au niveau central) : les 40 % sont répartis entre provinces selon capacité contributive et poids démographique (art. 221), avec une allocation compensatoire de 10 % pour la province productrice de pétrole.",
    "La Caisse nationale de péréquation (art. 181 de la Constitution) finance des investissements publics au titre de la solidarité nationale ; son budget est alimenté à 10 % de la totalité des recettes des catégories A et B (art. 222 LOFIP). LF 2026 : 7 694,5 milliards de FC pour les provinces (art. 8), 744,6 milliards pour la péréquation (art. 9).",
    "L'édit budgétaire (province) et la décision budgétaire (ville, commune, secteur, chefferie — art. 133) sont votés exclusivement par les organes délibérants, en quatre espèces calquées sur les lois de finances (art. 134), avec AE/CP par programme (art. 137).",
    "Calendrier provincial : dépôt au plus tard le 25 novembre, vote et promulgation au plus tard le 15 décembre (art. 182) ; à défaut d'adoption, arrêté du Gouverneur (art. 188) ; butoir d'engagement au 31 octobre (art. 194) ; reddition déposée au plus tard le 30 mai avec le rapport de la Cour des comptes (art. 185).",
    "Les ETD ont droit à 40 % de la part provinciale des recettes nationales et à 40 % des impôts et taxes provinciaux d'intérêt commun (art. 225), répartis selon capacité contributive, superficie et poids démographique (art. 226).",
    "Le Budget de l'État est consolidé chaque année par une loi, à visée statistique et informative : dépôt au plus tard le 31 mai, vote au plus tard le 15 juin (art. 223-224).",
    "Contrôles mutatis mutandis (IGF, Cour des comptes avec chambres déconcentrées en provinces, organes délibérants — art. 210 à 212) ; faute de gestion jugée par la Cour des comptes, débet du comptable, comptable de fait (art. 213 à 216).",
  ],
  references: [
    { genre: 'texte', intitule: "Constitution de la République Démocratique du Congo du 18 février 2006, telle que modifiée par la loi n° 11/002 du 20 janvier 2011", precision: "art. 171, 175, 181 (Caisse nationale de péréquation), 195 à 207 (provinces et répartition des compétences), 126, 138, 146-147, 155, 160-162" },
    { genre: 'texte', intitule: "Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques, telle que modifiée par la loi n° 18/010 du 09 juillet 2018 et par la loi n° 23/030 du 28 juin 2023", precision: "art. 3 (définitions), 132 à 216 (édits et décisions budgétaires), 217 à 229 (rapports entre pouvoir central, provinces et ETD)" },
    { genre: 'texte', intitule: "Loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026", precision: "art. 8 (part des provinces : 7 694 540 952 980 FC) et 9 (Caisse nationale de péréquation : 744 632 995 450 FC)" },
    { genre: 'texte', intitule: "Loi organique n° 08/016 du 07 octobre 2008 portant composition, organisation et fonctionnement des entités territoriales décentralisées et leurs rapports avec l'État et les provinces", precision: "citée par les art. 225 et 227 LOFIP (notamment son art. 115)" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Constitution de la RDC (18 février 2006, révisée en 2011) ; loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP), modifiée en 2018 et 2023 ; loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026.",
}

export default chapitre
