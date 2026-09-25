// Chapitre 6 du module UE3, Comptabilité des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014 : art. 58, 546 (5°), 549, 553, 587-2,
//   745, 779-821-1 (obligations, masse, assemblée des obligataires, droits
//   individuels, sûretés), 822-822-15 (valeurs mobilières composées),
//   842-845 (émission par appel public à l'épargne), 853-3 et 853-4 (SAS),
//   skill auscgie-acte-uniforme. L'art. 822-10-3 répète deux fois le même
//   alinéa dans le texte officiel.
// - AUDCIF, Titre VIII, chapitre 20 (emprunt obligataire : terminologie,
//   émission en trois phases, prime, frais, service, intérêts courus, rachat
//   en bourse, valeurs mobilières composées, coupon zéro, obligations à
//   fenêtres) ; Titre VII, comptes 161, 166, 4713, 5031, 671 ; SYSCOHADA
//   révisé, Applications 78, 79 et 80 ; plan de comptes ; maquette du bilan
//   (DA, DC) et du compte de résultat (RM, RN, TL) ; logique du tableau des
//   flux (variation des comptes 16 hors intérêts courus), skills
//   audcif-acte-uniforme et syscohada. Anomalies du Guide signalées dans le
//   texte : taux de l'Application 78 (5 % annoncé, 10 % calculé) et date de
//   la reprise de provision de l'Application 80.
// - loi n° 23/053 du 30 novembre 2023, art. 20, 72, 77, 80, 81 et 120 ;
//   arrêté ministériel n° 008/2025 (reversement de la retenue), skill
//   fiscalite-rdc.
// - Actualité RDC lue via Firecrawl le 24 septembre 2026 : MediaCongo
//   (9 avril 2026, première émission obligataire internationale de l'État) ;
//   RFI (11 août 2026, utilisation des fonds levés ; 6 septembre 2026, loi
//   relative aux marchés boursiers promulguée le 20 août 2026 et publiée au
//   Journal officiel le 2 septembre 2026).
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch6-q1', question: "Selon l'article 779 de l'AUSCGIE, les obligations sont :",
    options: [
      { id: 'a', texte: "Des titres de capital donnant droit au dividende" },
      { id: 'b', texte: "Des titres négociables qui, dans une même émission, confèrent les mêmes droits de créance pour une même valeur nominale" },
      { id: 'c', texte: "Des créances individuelles dont chaque porteur négocie les conditions" },
      { id: 'd', texte: "Des parts sociales à revenu fixe" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 779 AUSCGIE',
    explication: "L'obligataire est un créancier, pas un associé : il reçoit un intérêt et le remboursement de sa créance, sans droit au bénéfice ni vote aux assemblées d'actionnaires. L'égalité des droits dans une même émission (art. 779) explique l'organisation collective en masse.",
  },
  {
    id: 'ch6-q2', question: "Quelles entités peuvent émettre des obligations ?",
    options: [
      { id: 'a', texte: "Toute société commerciale immatriculée" },
      { id: 'b', texte: "Les SA et les GIE constitués de SA ayant deux années d'existence et deux bilans régulièrement approuvés par les actionnaires" },
      { id: 'c', texte: "Les SARL dont le capital dépasse le minimum légal" },
      { id: 'd', texte: "Les seules sociétés cotées en bourse" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 780 AUSCGIE',
    explication: "L'article 780 exige à la fois la forme (SA ou GIE de SA) et une ancienneté vérifiable : deux ans d'existence et deux bilans approuvés. La SARL est exclue : l'article 58 réserve l'émission de titres négociables aux sociétés par actions et interdit aux autres de garantir une telle émission.",
  },
  {
    id: 'ch6-q3', question: "Une SA de cinq ans dont le capital est libéré aux trois quarts peut-elle émettre des obligations ?",
    options: [
      { id: 'a', texte: "Oui, l'ancienneté suffit" },
      { id: 'b', texte: "Oui, si l'assemblée l'autorise à l'unanimité" },
      { id: 'c', texte: "Non, l'émission est interdite aux sociétés dont le capital n'est pas entièrement libéré" },
      { id: 'd', texte: "Oui, dans la limite du capital libéré" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 781 AUSCGIE',
    explication: "L'article 781 pose une interdiction sans exception : la société doit d'abord obtenir la libération intégrale de son capital. La logique est prudentielle : on n'emprunte pas auprès du public tant que les associés n'ont pas fourni la totalité de leur propre engagement.",
  },
  {
    id: 'ch6-q4', question: "Où en est la Bourse de Kinshasa en septembre 2026 ?",
    options: [
      { id: 'a', texte: "Elle cote déjà les obligations de l'État et des grandes sociétés minières" },
      { id: 'b', texte: "La loi relative aux marchés boursiers a été promulguée le 20 août 2026, mais le régulateur, le règlement général et la plateforme restent à mettre en place ; les premières cotations sont annoncées entre juin et décembre 2027" },
      { id: 'c', texte: "Le projet a été abandonné au profit de la BRVM" },
      { id: 'd', texte: "La loi est encore en discussion au Sénat" },
    ],
    reponseCorrecte: 'b', articleRef: 'RFI, 6 septembre 2026',
    explication: "Selon RFI (6 septembre 2026), la loi, promulguée le 20 août, a été publiée au Journal officiel le 2 septembre 2026. Aucune transaction n'est encore possible : il reste à installer l'Autorité de régulation, adopter le règlement général, agréer la Kinshasa Stock Exchange, désigner le dépositaire central et mettre en service la plateforme de cotation.",
  },
  {
    id: 'ch6-q5', question: "Quel organe a qualité pour décider l'émission d'obligations dans une SA ?",
    options: [
      { id: 'a', texte: "Le conseil d'administration seul" },
      { id: 'b', texte: "Le directeur général, sur avis du commissaire aux comptes" },
      { id: 'c', texte: "L'assemblée générale des actionnaires, qui peut déléguer au conseil ou à l'administrateur général le pouvoir d'émettre en une ou plusieurs fois dans un délai de deux ans" },
      { id: 'd', texte: "L'assemblée générale des obligataires" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 783 et 546 AUSCGIE',
    explication: "L'assemblée a « seule qualité » pour décider ou autoriser l'émission (art. 783), et l'article 546, 5°, range cette décision dans les compétences de l'assemblée générale ordinaire. La délégation au conseil ou à l'administrateur général est limitée à deux ans.",
  },
  {
    id: 'ch6-q6', question: "Quelle est la sanction d'une émission d'obligations réalisée par une SA de dix-huit mois ?",
    options: [
      { id: 'a', texte: "Une simple amende" },
      { id: 'b', texte: "La nullité de l'émission" },
      { id: 'c', texte: "La conversion d'office des obligations en actions" },
      { id: 'd', texte: "Aucune, si les obligataires sont d'accord" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 780 et 783-1 AUSCGIE',
    explication: "L'article 783-1 frappe de nullité toute émission réalisée en violation des articles 780 à 783. Une SA de dix-huit mois ne remplit pas la condition de deux années d'existence et de deux bilans approuvés.",
  },
  {
    id: 'ch6-q7', question: "Que deviennent les obligations rachetées par la société émettrice et remboursées ?",
    options: [
      { id: 'a', texte: "Elles sont conservées en portefeuille et peuvent être revendues" },
      { id: 'b', texte: "Elles sont annulées et ne peuvent être remises en circulation" },
      { id: 'c', texte: "Elles sont converties en actions propres" },
      { id: 'd', texte: "Elles sont attribuées gratuitement aux salariés" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 784 AUSCGIE',
    explication: "L'annulation est définitive (art. 784). En comptabilité, le rachat passe par le compte 5031 « Obligations émises par la société et rachetées par elle », puis l'annulation débite le 161 par le crédit du 5031 et, s'il y a gain, du 841 (AUDCIF, chapitre 20, § 1.8 et 1.9).",
  },
  {
    id: 'ch6-q8', question: "La masse des obligataires :",
    options: [
      { id: 'a', texte: "Est une association facultative que les obligataires peuvent créer" },
      { id: 'b', texte: "Regroupe de plein droit les porteurs d'une même émission et jouit de la personnalité juridique" },
      { id: 'c', texte: "N'existe que si le contrat d'émission la prévoit" },
      { id: 'd', texte: "Est un organe de la société émettrice" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 785 AUSCGIE',
    explication: "Le groupement est automatique et doté de la personnalité juridique (art. 785). Il peut réunir les porteurs de plusieurs émissions successives lorsque chaque contrat d'émission le prévoit et que les droits sont identiques.",
  },
  {
    id: 'ch6-q9', question: "Combien de représentants la masse peut-elle compter ?",
    options: [
      { id: 'a', texte: "Un seul, nommé par le conseil d'administration" },
      { id: 'b', texte: "De un à trois mandataires, élus par l'assemblée générale des obligataires" },
      { id: 'c', texte: "Autant que de tranches de 10 % de l'emprunt" },
      { id: 'd', texte: "Deux, dont un désigné par le commissaire aux comptes" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 786, 788 et 789 AUSCGIE',
    explication: "L'assemblée des obligataires élit un à trois mandataires (art. 786) et peut les révoquer (art. 789). En cas d'urgence, la juridiction compétente peut les désigner à la demande de tout intéressé (art. 788).",
  },
  {
    id: 'ch6-q10', question: "Lequel peut être désigné représentant de la masse ?",
    options: [
      { id: 'a', texte: "Le directeur financier salarié de la société débitrice" },
      { id: 'b', texte: "Le commissaire aux comptes de la société débitrice" },
      { id: 'c', texte: "Une société de conseil résidente, sans lien avec la débitrice ni avec ses garants" },
      { id: 'd', texte: "La banque qui garantit l'emprunt" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 787 AUSCGIE',
    explication: "L'article 787 exige la résidence dans l'État partie du siège de la débitrice et exclut la débitrice, ses actionnaires sociétés, ses garants, leurs dirigeants et administrateurs (et leurs proches), leurs employés et leur commissaire aux comptes, ainsi que les personnes interdites de banque ou déchues du droit de gérer.",
  },
  {
    id: 'ch6-q11', question: "Les représentants de la masse peuvent-ils voter à l'assemblée des actionnaires ?",
    options: [
      { id: 'a', texte: "Oui, avec une voix par obligation" },
      { id: 'b', texte: "Oui, mais seulement sur la fusion" },
      { id: 'c', texte: "Non : ils peuvent y participer sans voix délibérative et obtiennent les documents communiqués aux actionnaires" },
      { id: 'd', texte: "Non, ils n'ont même pas le droit d'y assister" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 791 AUSCGIE',
    explication: "L'article 791 interdit toute immixtion dans la gestion, admet la présence aux assemblées d'actionnaires sans voix délibérative et ouvre le même droit de communication que celui des actionnaires.",
  },
  {
    id: 'ch6-q12', question: "Qui peut demander la convocation de l'assemblée des obligataires ?",
    options: [
      { id: 'a', texte: "Seul le conseil d'administration" },
      { id: 'b', texte: "Les obligataires représentant au moins le trentième des titres, en plus des représentants de la masse, du conseil ou de l'administrateur général et du liquidateur" },
      { id: 'c', texte: "Tout obligataire, quel que soit le nombre de ses titres" },
      { id: 'd', texte: "Les obligataires représentant la moitié des titres" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 795-796 AUSCGIE',
    explication: "L'assemblée peut être réunie à toute époque (art. 795). Elle est convoquée par les représentants de la masse, le conseil, l'administrateur général ou le liquidateur ; des obligataires détenant au moins le trentième des titres peuvent la faire convoquer (art. 796) et faire inscrire des projets de résolution (art. 800).",
  },
  {
    id: 'ch6-q13', question: "À quelle majorité l'assemblée extraordinaire des obligataires statue-t-elle sur un report d'échéance ?",
    options: [
      { id: 'a', texte: "À la majorité simple des voix exprimées" },
      { id: 'b', texte: "À l'unanimité" },
      { id: 'c', texte: "À la majorité des deux tiers des voix dont disposent les porteurs présents ou représentés, avec le quorum de l'article 553" },
      { id: 'd', texte: "À la majorité des trois quarts du montant de l'emprunt" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 804 AUSCGIE',
    explication: "L'assemblée extraordinaire délibère sur toute modification du contrat d'emprunt : changement de forme ou d'objet, fusion, scission, transaction, garanties ou report d'échéance, transfert du siège, dissolution (art. 804). Quorum de l'AGE des actionnaires (art. 553) et majorité des deux tiers.",
  },
  {
    id: 'ch6-q14', question: "Une société détenant 25 % du capital de l'émettrice possède aussi des obligations. Peut-elle voter avec elles ?",
    options: [
      { id: 'a', texte: "Oui, comme tout obligataire" },
      { id: 'b', texte: "Oui, mais avec une voix seulement" },
      { id: 'c', texte: "Non : la société qui détient au moins 10 % du capital de la débitrice ne peut voter avec ses obligations" },
      { id: 'd', texte: "Non, sauf accord du représentant de la masse" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 806 AUSCGIE',
    explication: "L'article 806 écarte le conflit d'intérêts : un actionnaire significatif ne doit pas peser sur les décisions de la masse. Le droit de vote est sinon proportionnel à la quotité de l'emprunt représentée, avec au moins une voix par obligation (art. 805).",
  },
  {
    id: 'ch6-q15', question: "L'assemblée des obligataires peut-elle décider de réduire le taux d'intérêt pour les seuls porteurs de moins de 100 titres ?",
    options: [
      { id: 'a', texte: "Oui, à la majorité des deux tiers" },
      { id: 'b', texte: "Oui, si les petits porteurs sont absents" },
      { id: 'c', texte: "Non : les assemblées ne peuvent ni accroître les charges des obligataires ni établir un traitement inégal entre obligataires d'une même émission" },
      { id: 'd', texte: "Oui, avec l'accord du conseil d'administration" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 808 AUSCGIE',
    explication: "La délibération serait nulle (art. 808). La majorité peut modifier le contrat d'emprunt dans le cadre de l'article 804, mais jamais au détriment d'une partie seulement des porteurs, puisque l'article 779 fonde l'obligation sur l'égalité des droits dans une même émission.",
  },
  {
    id: 'ch6-q16', question: "La société émettrice est dissoute par décision de ses actionnaires (hors fusion ou scission). Quel est le sort de l'emprunt ?",
    options: [
      { id: 'a', texte: "Il se poursuit selon le tableau d'amortissement" },
      { id: 'b', texte: "Le remboursement des obligations devient aussitôt exigible" },
      { id: 'c', texte: "Les obligations sont converties en parts de liquidation" },
      { id: 'd', texte: "Les obligataires perdent leurs droits" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 811 AUSCGIE',
    explication: "L'article 811 rend l'emprunt exigible en cas de dissolution non provoquée par une fusion ou une scission. En cas de fusion ou de scission refusée par l'assemblée des obligataires, la société peut passer outre, mais la masse peut faire opposition en justice (art. 810).",
  },
  {
    id: 'ch6-q17', question: "La société peut-elle imposer aux obligataires un remboursement anticipé pour profiter d'une baisse des taux ?",
    options: [
      { id: 'a', texte: "Oui, à tout moment" },
      { id: 'b', texte: "Oui, avec l'accord du conseil d'administration" },
      { id: 'c', texte: "Non, sauf stipulation particulière du contrat d'émission" },
      { id: 'd', texte: "Non, en aucun cas" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 814 AUSCGIE',
    explication: "L'article 814 protège l'obligataire contre le remboursement forcé. Une clause peut toutefois l'organiser : c'est le cas des obligations à fenêtres, dont le remboursement anticipé à l'initiative de l'émetteur augmente la prime de remboursement (AUDCIF, chapitre 20, § 3.2). Le rachat en bourse, lui, suppose un vendeur consentant.",
  },
  {
    id: 'ch6-q18', question: "Une sûreté a été constituée avant l'émission pour le compte de la masse en formation. Dans quel délai le résultat de la souscription doit-il être constaté ?",
    options: [
      { id: 'a', texte: "Dans les trente jours de l'ouverture de la souscription, par acte sous seing privé" },
      { id: 'b', texte: "Dans les six mois de l'ouverture de la souscription, par acte notarié, puis mention en marge de la sûreté dans les trente jours" },
      { id: 'c', texte: "À la clôture de l'exercice, dans l'annexe" },
      { id: 'd', texte: "Aucun délai n'est prévu" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 816-818 AUSCGIE',
    explication: "La sûreté est constituée par acte spécial et publiée avant toute souscription (art. 816). L'acceptation résulte du seul fait des souscriptions (art. 817). Le résultat est constaté par acte notarié dans les six mois, puis mentionné en marge dans les trente jours ; faute de souscription suffisante, l'inscription est radiée (art. 818).",
  },
  {
    id: 'ch6-q19', question: "Sur le plan comptable, la prime de remboursement est égale à :",
    options: [
      { id: 'a', texte: "La valeur nominale moins le prix d'émission" },
      { id: 'b', texte: "Le prix de remboursement moins le prix d'émission" },
      { id: 'c', texte: "Le prix de remboursement moins la valeur nominale, uniquement" },
      { id: 'd', texte: "Le coupon annuel multiplié par la durée" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 20, § 1.2.1',
    explication: "L'AUDCIF distingue la prime d'émission (nominal − prix d'émission) et la prime de remboursement au sens strict (prix de remboursement − nominal), puis précise que la prime comptable est « généralement » la différence entre prix de remboursement et prix d'émission : une double prime.",
  },
  {
    id: 'ch6-q20', question: "À l'émission d'un emprunt avec prime, la dette inscrite au compte 1611 est égale :",
    options: [
      { id: 'a', texte: "Au prix de remboursement total" },
      { id: 'b', texte: "À la valeur nominale totale" },
      { id: 'c', texte: "Au prix d'émission total" },
      { id: 'd', texte: "Au prix d'émission diminué des frais" },
    ],
    reponseCorrecte: 'c', articleRef: 'AUDCIF, ch. 20, § 1.5.2.1',
    explication: "Dans le SYSCOHADA révisé, la dette est constatée au prix d'émission. La prime n'est jamais portée à l'actif : elle est prise en charge au fil de l'emprunt par le compte 6714.",
  },
  {
    id: 'ch6-q21', question: "Comment les frais d'émission d'un emprunt obligataire sont-ils comptabilisés ?",
    options: [
      { id: 'a', texte: "En charges de l'exercice d'engagement, au compte 6316" },
      { id: 'b', texte: "À l'actif en charges à répartir, amorties sur la durée de l'emprunt" },
      { id: 'c', texte: "En déduction de l'emprunt au compte 1611" },
      { id: 'd', texte: "En diminution de la prime d'émission 1051" },
    ],
    reponseCorrecte: 'a', articleRef: 'AUDCIF, ch. 20, § 1.5.2.2',
    explication: "Publicité, impression des titres, commissions bancaires : tous ces frais passent en charges de l'exercice où ils sont engagés (débit 6316, crédit trésorerie). Les anciens comptes 2026 et 206 ont disparu avec le SYSCOHADA révisé.",
  },
  {
    id: 'ch6-q22', question: "Application 78 : prime totale de 2 000 000, 10 000 obligations remboursées par 2 500 chaque année. Quelle quote-part de prime l'exercice N supporte-t-il ?",
    options: [
      { id: 'a', texte: "2 000 000" },
      { id: 'b', texte: "800 000, au prorata des intérêts" },
      { id: 'c', texte: "500 000, au prorata des obligations échues" },
      { id: 'd', texte: "Rien avant le dernier remboursement" },
    ],
    reponseCorrecte: 'c', articleRef: 'Guide SYSCOHADA, Application 78',
    explication: "Pour un emprunt amorti par séries, le Guide étale la prime au prorata des obligations échues : 2 500 / 10 000 × 2 000 000 = 500 000 par an, portés au 6714 dans l'écriture de l'annuité.",
  },
  {
    id: 'ch6-q23', question: "Dans un emprunt remboursable par annuités constantes :",
    options: [
      { id: 'a', texte: "Le même nombre d'obligations est remboursé chaque année" },
      { id: 'b', texte: "La même somme couvre chaque année coupons et remboursements, et le nombre d'obligations remboursées s'accroît" },
      { id: 'c', texte: "Seul le coupon est payé jusqu'au terme" },
      { id: 'd', texte: "Les intérêts sont constants" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 20, § 1.3.1',
    explication: "L'AUDCIF distingue trois lois d'amortissement : amortissement constant (même nombre d'obligations, annuités décroissantes), annuité constante (même somme, remboursements croissants) et remboursement in fine (coupons seuls jusqu'au terme).",
  },
  {
    id: 'ch6-q24', question: "Emprunt in fine avec prime : quelle écriture de clôture rattache la prime à l'exercice ?",
    options: [
      { id: 'a', texte: "Débit 1611 / crédit 6714" },
      { id: 'b', texte: "Débit 6714 / crédit 1661, au prorata des intérêts courus" },
      { id: 'c', texte: "Débit 6714 / crédit 521" },
      { id: 'd', texte: "Aucune : la prime est constatée au remboursement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide SYSCOHADA, Application 79',
    explication: "Aucune obligation n'est échue avant le terme : la prime est étalée au prorata des intérêts courus et s'accumule au 1661. Application 79 : 5 000 000 × 3 000 000 / 15 000 000 = 1 000 000 par an.",
  },
  {
    id: 'ch6-q25', question: "Le coupon d'un emprunt est payable le 30 juin. Que faut-il faire au 31 décembre ?",
    options: [
      { id: 'a', texte: "Rien, le coupon sera comptabilisé au paiement" },
      { id: 'b', texte: "Constater les intérêts courus de six mois : débit 6711 / crédit 1661, écriture contrepassée à l'ouverture" },
      { id: 'c', texte: "Payer le coupon par anticipation" },
      { id: 'd', texte: "Constater une provision pour charges au compte 1988" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 20, § 1.6',
    explication: "Les intérêts courus de l'exercice sont débités au 6711 par le crédit du 1661, puis l'écriture est contrepassée à l'ouverture de l'exercice suivant (AUDCIF, chapitre 20, § 1.6). C'est l'application du principe d'indépendance des exercices.",
  },
  {
    id: 'ch6-q26', question: "La société rachète en bourse, à 9 600, des obligations inscrites au 1611 pour 9 800 puis les annule. Comment traiter l'écart ?",
    options: [
      { id: 'a', texte: "En produit financier au 7745" },
      { id: 'b', texte: "En prime d'émission au 1051" },
      { id: 'c', texte: "En produit HAO au 841, lors de l'annulation qui débite le 161 et crédite le 5031" },
      { id: 'd', texte: "En diminution du compte 6714" },
    ],
    reponseCorrecte: 'c', articleRef: 'AUDCIF, ch. 20, § 1.7-1.9',
    explication: "Rachat : débit 5031 / crédit trésorerie. Annulation : débit 161 / crédit 5031 et 841 Produits HAO pour le gain. L'AUDCIF note que l'opération se fait le plus souvent quand le cours en bourse est inférieur à la valeur de remboursement.",
  },
  {
    id: 'ch6-q27', question: "Obligations convertibles avec prime de remboursement : que constate-t-on à l'émission et à la clôture ?",
    options: [
      { id: 'a', texte: "La dette au prix de remboursement au 1612" },
      { id: 'b', texte: "La dette au prix d'émission au 1612 et, à la clôture, une provision pour le risque de payer la prime (6971 / 1988)" },
      { id: 'c', texte: "La dette au prix d'émission et l'étalement de la prime au 6714" },
      { id: 'd', texte: "Une augmentation de capital immédiate" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 20, § 2.2.4 ; Application 80',
    explication: "La prime n'est ni comptabilisée ni étalée, car elle ne sera due qu'en cas de remboursement en numéraire. Le risque est provisionné, pour la prime totale ou selon la probabilité de non-conversion, puis repris au fil des conversions (1988 / 7971).",
  },
  {
    id: 'ch6-q28', question: "Application 80 : 4 000 obligations émises à 13 000 sont converties en 3 000 actions de nominal 10 000. Quel est le montant crédité au compte 1054 ?",
    options: [
      { id: 'a', texte: "8 000 000" },
      { id: 'b', texte: "22 000 000" },
      { id: 'c', texte: "30 000 000" },
      { id: 'd', texte: "52 000 000" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide SYSCOHADA, Application 80',
    explication: "Dette convertie : 4 000 × 13 000 = 52 000 000. Capital créé : 3 000 × 10 000 = 30 000 000. Prime de conversion (1054) : 22 000 000. L'opération ne mobilise aucune trésorerie.",
  },
  {
    id: 'ch6-q29', question: "Les actionnaires doivent-ils exercer un droit préférentiel de souscription au moment où les obligataires convertissent ?",
    options: [
      { id: 'a', texte: "Oui, à chaque conversion" },
      { id: 'b', texte: "Non : la décision d'émettre des valeurs mobilières donnant accès au capital emporte renonciation à leur DPS sur les titres de capital à provenir" },
      { id: 'c', texte: "Oui, sauf si la conversion porte sur moins de 10 % du capital" },
      { id: 'd', texte: "Non, car les actionnaires n'ont jamais de DPS en matière d'obligations" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 587-2 et 822-1 AUSCGIE',
    explication: "Le DPS joue une seule fois, lors de l'émission des valeurs mobilières donnant accès au capital (art. 822-1, qui renvoie aux art. 573 à 587-2 et 593 à 597). La décision d'émission emporte ensuite renonciation au DPS sur les actions à provenir de la conversion (art. 587-2).",
  },
  {
    id: 'ch6-q30', question: "En RDC, les intérêts qu'une SA verse à ses obligataires :",
    options: [
      { id: 'a', texte: "Sont exonérés d'impôt quel que soit l'émetteur" },
      { id: 'b', texte: "Sont des revenus d'obligations soumis à la retenue à la source de 20 %, reversée au plus tard le 15 du mois suivant" },
      { id: 'c', texte: "Sont soumis à la TVA" },
      { id: 'd', texte: "Ne sont imposés qu'au remboursement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 77, 80 et 120 ; AM n° 008/2025',
    explication: "Les intérêts et primes de remboursement des obligations émises par les sociétés sont des revenus d'obligations (art. 77), soumis à la retenue de 20 % (art. 120), reversée au plus tard le 15 du mois suivant le versement (AM n° 008/2025). Seuls les titres d'emprunt négociables de l'État, des Provinces et des ETD sont exonérés (art. 80).",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '6.1',
    titre: "L'obligation et les conditions d'émission",
    navLabel: "Conditions d'émission",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Kolwezi, capitale du cuivre et du cobalt. **KOLWEZI INFRA SA**, constituée en 2019, veut construire un dépôt logistique pour les exploitations minières voisines. Plutôt que d'emprunter auprès d'une seule banque, son conseil propose d'émettre un emprunt obligataire : 20 000 obligations de 10 000 FC, au taux de 8 %, remboursables en une fois au bout de cinq ans, et garanties par une hypothèque sur le futur dépôt. Ce chapitre étudie les conditions d'émission des obligations, la protection des porteurs et la comptabilisation de la dette, des coupons et de la prime de remboursement ; il suit KOLWEZI INFRA de l'émission au paiement de ses premiers coupons.",
      },
      { type: 'intertitre', texte: "6.1.1 La nature de l'obligation" },
      {
        type: 'paragraphe',
        texte: "Une société qui a besoin de ressources longues a deux voies. Elle peut demander des **capitaux propres** à ses associés (augmentation de capital, chapitre 4) ou s'endetter. L'endettement peut venir d'une banque ou, pour les plus grandes sociétés, directement de l'épargne, par l'**emprunt obligataire**. L'emprunt est alors fractionné en titres de même valeur, les **obligations**, que des investisseurs souscrivent et peuvent revendre. L'article 779 de l'AUSCGIE les définit comme « des titres négociables qui dans une même émission, confèrent les mêmes droits de créance pour une même valeur nominale ». Trois idées tiennent dans cette phrase. L'obligation est un titre **négociable** : elle circule sans les formalités d'une cession de créance. Elle confère un **droit de créance** : son porteur est un prêteur, pas un associé. Et ce droit est **identique** pour tous les titres d'une même émission, ce qui justifie leur organisation collective en masse.",
      },
      {
        type: 'paragraphe',
        texte: "Cette nature de créance commande tout le régime. L'obligataire reçoit un **intérêt** (le coupon), fixé à l'avance, que la société ait fait des bénéfices ou non. Il a droit au **remboursement** de sa créance selon les modalités du contrat d'émission. En revanche, il ne vote pas aux assemblées d'actionnaires, ne perçoit pas de dividende et ne supporte pas les pertes tant que la société reste solvable. Pour la société, l'emprunt obligataire ne dilue pas le pouvoir des actionnaires, mais il crée une charge fixe et une dette à rembourser. Les obligations peuvent être au porteur ou nominatives (art. 745), et leur valeur nominale est identique pour toutes les obligations d'une même émission.",
      },
      { type: 'intertitre', texte: "6.1.2 Les conditions de l'émission" },
      {
        type: 'carte',
        titre: "Tableau 6.1 — Les conditions de l'émission (art. 780 à 783-1)",
        tableau: {
          entetes: ["Condition", "Règle", "Raison d'être"],
          lignes: [
            ["Forme sociale", "Seules les **sociétés anonymes** et les **GIE constitués de SA** peuvent émettre (art. 780). L'article 58 interdit déjà aux sociétés autres que les sociétés par actions d'émettre des titres négociables, et même d'en garantir l'émission.", "L'appel à l'épargne suppose l'organisation et les contrôles de la SA."],
            ["Ancienneté", "**Deux années d'existence** et **deux bilans régulièrement approuvés** par les actionnaires (art. 780).", "Les souscripteurs doivent pouvoir juger la société sur des comptes réels."],
            ["Capital libéré", "Émission **interdite** si le capital n'est pas entièrement libéré (art. 781).", "Les actionnaires doivent avoir tenu leur engagement avant qu'on sollicite des prêteurs."],
            ["Obligations à lots", "**Interdites** (art. 782).", "Pas de loterie : l'égalité des porteurs d'une même émission est la règle."],
            ["Compétence", "L'assemblée générale des actionnaires a **seule qualité** pour décider ou autoriser l'émission ; délégation possible au conseil ou à l'administrateur général pour émettre en une ou plusieurs fois dans un délai de **deux ans** (art. 783). L'article 546, 5°, range l'émission d'obligations parmi les compétences de l'**AGO**.", "L'endettement engage l'avenir de la société : les actionnaires en décident."],
            ["Sanction", "Toute émission réalisée en violation des articles 780 à 783 est **nulle** (art. 783-1).", "La nullité protège autant les actionnaires que les futurs obligataires."],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Ces conditions valent pour l'**obligation ordinaire**. Lorsque l'emprunt donne accès au capital (obligations convertibles, remboursables en actions, obligations à bons de souscription d'actions), il relève en outre du régime des **valeurs mobilières composées** (art. 822 et suivants). Ces émissions sont autorisées par l'**assemblée générale extraordinaire**, selon les règles de l'augmentation de capital, sur rapport du conseil (ou de l'administrateur général) et rapport spécial du commissaire aux comptes, à peine de nullité (art. 822-5). La section 6.8 y revient. Quant à la **SAS**, elle ne peut faire publiquement appel à l'épargne (art. 853-4). L'article 780 ne vise que les SA et les GIE de SA, et l'article 853-3 n'étend à la SAS les règles de la SA que « dans la mesure où elles sont compatibles » avec son régime propre. Une SAS qui voudrait émettre des obligations ordinaires doit donc faire vérifier la question par un juriste plutôt que la tenir pour acquise.",
      },
      { type: 'intertitre', texte: "6.1.3 L'intérêt de l'emprunt obligataire" },
      {
        type: 'paragraphe',
        texte: "Une société peut préférer l'obligation au crédit bancaire pour plusieurs raisons. D'abord pour la **durée** : un emprunt obligataire court souvent sur cinq, sept ou dix ans, là où les banques prêtent volontiers à plus court terme. Ensuite pour le **coût** : en s'adressant directement aux épargnants et aux investisseurs institutionnels, la société supprime la marge de l'intermédiaire. Enfin pour la **diversification** : une société qui ne dépend que d'une ou deux banques est vulnérable à leurs propres difficultés. En contrepartie, l'emprunt obligataire est rigide. Le taux, l'échéancier et les garanties sont fixés pour toute la durée de l'emprunt, et les modifier suppose de réunir la masse. L'émission elle-même coûte cher en frais de placement, de publicité et d'impression. C'est pourquoi l'obligation reste l'instrument des sociétés d'une certaine taille, établies et transparentes. Les conditions de l'article 780 (deux ans d'existence et deux bilans approuvés) traduisent cette exigence de transparence.",
      },
      { type: 'intertitre', texte: "6.1.4 L'appel public à l'épargne et la décision d'émettre" },
      {
        type: 'filet',
        titre: "Émission par appel public à l'épargne (art. 842-844)",
        texte: "Si l'emprunt est placé dans le public, la société publie dans un journal d'annonces légales une **notice** signée. Elle indique notamment l'objet social, le montant non amorti des emprunts antérieurs et leurs garanties, le montant de l'émission, la valeur nominale, le taux et le mode de calcul des intérêts, l'époque et les conditions de remboursement et de rachat, et les garanties offertes (art. 842). Y sont annexés le dernier bilan approuvé, une situation de moins de dix mois si ce bilan est plus ancien, et des renseignements sur la marche des affaires (art. 843). Les circulaires, affiches et annonces reproduisent ces mentions et indiquent le prix d'émission (art. 844).",
      },
      {
        type: 'paragraphe',
        texte: "Les deux régimes de décision ne se confondent pas. Pour l'obligation **ordinaire**, qui ne touche pas au capital, l'article 546, 5°, confie la décision à l'**assemblée générale ordinaire** : l'endettement est un acte de gestion important, mais il ne modifie pas les statuts. Pour les valeurs mobilières **donnant accès au capital**, la décision relève de l'**assemblée générale extraordinaire** (art. 822-5), parce qu'elle prépare une augmentation de capital future et prive les actionnaires de leur DPS sur les actions à créer (art. 587-2). Dans les deux cas, la délégation au conseil ou à l'administrateur général est courante. L'assemblée fixe l'enveloppe et le cadre, et le conseil choisit le moment de l'émission et en arrête les modalités (taux, durée, prix), dans la limite des deux ans de l'article 783. Le procès-verbal de l'assemblée est une pièce que l'auditeur vérifie avant de valider la comptabilisation de l'emprunt.",
      },
    ],
  },
  {
    numero: '6.2',
    titre: "La masse des obligataires et ses représentants",
    navLabel: "La masse",
    blocs: [
      { type: 'intertitre', texte: "6.2.1 La masse" },
      {
        type: 'paragraphe',
        texte: "Un emprunt de plusieurs milliers de titres peut compter des centaines de porteurs, dispersés et souvent anonymes. Face à la société émettrice, chacun pèse peu. L'Acte uniforme les regroupe donc **de plein droit**, pour la défense de leurs intérêts, dans une **masse** qui jouit de la **personnalité juridique** (art. 785). La masse n'est pas une association que les obligataires choisiraient de créer : elle naît avec l'émission. En cas d'émissions successives, la société peut réunir en un groupement unique les porteurs ayant des droits identiques, à condition qu'une clause de **chaque** contrat d'émission le prévoie.",
      },
      { type: 'intertitre', texte: "6.2.2 Les représentants de la masse" },
      {
        type: 'paragraphe',
        texte: "La masse agit par ses **représentants**, **un à trois** mandataires élus par l'assemblée générale des obligataires (art. 786) et révocables par elle (art. 789). En cas d'urgence, la juridiction compétente peut les désigner à la demande de tout intéressé (art. 788). Leur rémunération est fixée par l'assemblée ou le contrat d'émission, et elle est **à la charge de la société débitrice**. À défaut de fixation, ou en cas de contestation, le juge la fixe (art. 794). Pour le comptable de la société, c'est une charge d'exploitation courante liée au service de l'emprunt.",
      },
      {
        type: 'carte',
        titre: "Encadré 6.1 — Les incompatibilités des représentants de la masse (art. 787)",
        liste: [
          "Condition positive : être une personne physique ou morale **résidente** dans l'État partie du siège de la société débitrice.",
          "La **société débitrice** elle-même, les **sociétés qui ont une participation** dans son capital et les **sociétés garantes** de tout ou partie de ses engagements.",
          "Les **dirigeants sociaux ou administrateurs** de la débitrice ou d'une société qui participe à son capital, ainsi que leurs ascendants, descendants ou conjoints.",
          "Les **employés** de ces sociétés et leur **commissaire aux comptes**.",
          "Les personnes à qui l'exercice de la profession de banquier est interdit, ou qui sont **déchues** du droit de diriger, administrer ou gérer une société.",
        ],
        note: "Ces exclusions visent un seul risque : que le défenseur des prêteurs dépende de l'emprunteur. Les mêmes personnes ne peuvent pas non plus représenter des obligataires à l'assemblée (art. 801).",
      },
      {
        type: 'filet',
        titre: "La masse des obligataires de KOLWEZI INFRA",
        texte: "Les porteurs des 20 000 obligations de KOLWEZI INFRA forment de plein droit une masse dotée de la personnalité juridique (art. 785). Ils élisent un à trois représentants, résidents en RDC et indépendants de la société : ni la société débitrice, ni les sociétés qui détiennent une participation dans son capital, ni ses dirigeants, ni ses employés, ni son commissaire aux comptes (art. 787). Le directeur financier de KOLWEZI INFRA, qui connaît le mieux l'emprunt, est précisément celui qui ne peut pas défendre les prêteurs : il est l'employé de l'emprunteur.",
      },
      { type: 'intertitre', texte: "6.2.3 Les pouvoirs des représentants" },
      {
        type: 'paragraphe',
        texte: "Sauf restriction décidée par l'assemblée des obligataires, les représentants accomplissent au nom du groupement et de tous les obligataires **tous les actes de gestion** pour la défense des intérêts communs (art. 790). Ils ne peuvent pas **s'immiscer dans la gestion** de la société. Ils peuvent assister aux assemblées d'actionnaires, mais **sans voix délibérative**, et obtiennent communication des documents mis à la disposition des actionnaires, dans les mêmes conditions (art. 791). Ils savent donc tout ce que savent les actionnaires, mais ne décident de rien. Leur rôle devient décisif si la société connaît des difficultés. En cas de redressement judiciaire ou de liquidation des biens, ils déclarent au passif, pour **tous** les obligataires, les sommes dues en capital et en intérêts, sans avoir à produire les titres (art. 792). Les frais de cette représentation incombent à la société comme frais d'administration judiciaire (art. 793), et le redressement judiciaire ne met pas fin au rôle de l'assemblée des obligataires (art. 812).",
      },
      {
        type: 'paragraphe',
        texte: "En pratique, le représentant de la masse est souvent un établissement ou un cabinet spécialisé, choisi pour sa compétence et sa neutralité. Sa mission est de veiller à l'exécution du contrat d'émission : paiement des coupons à bonne date, respect des engagements de la société (maintien des garanties, limites d'endettement éventuellement stipulées), renouvellement des inscriptions hypothécaires (art. 819). S'il constate un manquement, il réunit l'assemblée des obligataires et peut agir en justice au nom de tous. Pour la société émettrice, la relation avec le représentant fait partie du coût de l'emprunt. Sa rémunération (art. 794), les frais de convocation des assemblées et, le cas échéant, les frais de procédure sont des charges que le budget de l'emprunt doit prévoir. Le commissaire aux comptes de la société, lui, ne peut pas être représentant de la masse (art. 787, 6°), afin qu'il n'ait pas à contrôler des comptes où il défend en même temps les intérêts des créanciers.",
      },
    ],
  },
  {
    numero: '6.3',
    titre: "L'assemblée générale des obligataires et les droits individuels",
    navLabel: "Assemblée des obligataires",
    blocs: [
      { type: 'intertitre', texte: "6.3.1 La réunion et les compétences de l'assemblée" },
      {
        type: 'paragraphe',
        texte: "L'assemblée générale des obligataires d'une même masse peut être réunie **à toute époque** (art. 795). Elle est convoquée par les représentants de la masse, par le conseil d'administration ou l'administrateur général, ou par le liquidateur. Des obligataires représentant au moins **le trentième** des titres peuvent aussi en obtenir la convocation, par les représentants ou par un mandataire ad hoc désigné par le juge (art. 796). La convocation suit les formes et délais des assemblées d'actionnaires (art. 797) et comporte des mentions obligatoires : l'emprunt concerné, l'auteur de la convocation et, le cas échéant, la décision de justice qui l'a désigné (art. 798). Une assemblée irrégulièrement convoquée peut être annulée, sauf si tous les obligataires de la masse étaient présents ou représentés (art. 799). L'ordre du jour est arrêté par l'auteur de la convocation, et des porteurs du trentième des titres peuvent y faire inscrire des projets de résolution (art. 800).",
      },
      {
        type: 'carte',
        titre: "Tableau 6.2 — Assemblée ordinaire et assemblée extraordinaire des obligataires",
        tableau: {
          entetes: ["", "Assemblée ordinaire (art. 803)", "Assemblée extraordinaire (art. 804)"],
          lignes: [
            ["Objet", "Nomination des représentants, durée et rémunération de leurs fonctions, mesures de défense des obligataires et d'exécution du contrat, dépenses de gestion, mesures conservatoires ou d'administration", "Toute modification du contrat d'emprunt : changement d'objet ou de forme, fusion ou scission, compromis ou transaction sur droits litigieux, modification des garanties ou report d'échéance, transfert du siège, dissolution"],
            ["Quorum", "Celui de l'AGO des actionnaires (art. 549) : le quart des titres sur première convocation, aucun sur deuxième", "Celui de l'AGE des actionnaires (art. 553) : la moitié sur première convocation, le quart sur deuxième"],
            ["Majorité", "Majorité des voix dont disposent les porteurs présents ou représentés", "**Deux tiers** des voix dont disposent les porteurs présents ou représentés"],
            ["Sanction", "Nullité de toute délibération contraire", "Nullité de toute délibération contraire"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "L'assemblée des obligataires prend tout son sens quand la société traverse une passe difficile. Un report d'échéance, une réduction de garanties ou une transaction sur une créance litigieuse ne peuvent être imposés par la société : ils doivent être acceptés par l'assemblée extraordinaire, à la majorité renforcée des deux tiers (art. 804). La majorité lie ensuite la minorité, ce qui évite qu'un seul porteur bloque un accord favorable à tous, dans la limite de l'article 808 : pas de charge nouvelle, pas d'inégalité. Si la société est placée en redressement judiciaire, l'assemblée des obligataires continue de fonctionner (art. 812) et les représentants déclarent la créance de toute la masse (art. 792). Pour le comptable, un report d'échéance voté par l'assemblée modifie le tableau d'amortissement : il faut recalculer les échéances, la ventilation à moins d'un an et, pour un emprunt avec prime, le rythme de l'étalement.",
      },
      { type: 'intertitre', texte: "6.3.2 Droit de vote et majorités" },
      {
        type: 'paragraphe',
        texte: "Le **droit de vote** est proportionnel à la quotité de l'emprunt que représentent les obligations, avec au moins une voix par obligation, et le vote par correspondance ou à distance est admis comme pour les actionnaires (art. 805). Deux règles écartent les conflits d'intérêts. La société qui détient **au moins 10 %** du capital de la débitrice ne peut pas voter avec ses obligations (art. 806). En cas de démembrement, le vote appartient au nu-propriétaire, sauf convention contraire (art. 807). Surtout, la majorité a des limites : les assemblées ne peuvent **ni accroître les charges** des obligataires, **ni établir un traitement inégal** entre obligataires d'une même émission, à peine de nullité (art. 808).",
      },
      {
        type: 'carte',
        titre: "Exemple 6.1 — Le calcul d'une majorité à l'assemblée extraordinaire",
        tableau: {
          entetes: ["Élément", "Nombre de voix", "Commentaire"],
          lignes: [
            ["Obligations émises", "10 000", "Une voix par obligation (art. 805)"],
            ["Obligations de la société actionnaire à 15 %", "1 200", "Privées de vote (art. 806)"],
            ["Obligations présentes ou représentées", "6 000", "Dont 1 200 de l'actionnaire à 15 %"],
            ["Voix dont disposent les porteurs présents ou représentés", "4 800", "6 000 − 1 200"],
            ["Majorité des deux tiers requise", "3 200", "4 800 × 2/3"],
          ],
        },
        note: "Le quorum de l'article 553 s'apprécie sur première convocation (la moitié) puis sur deuxième (le quart). Ici, 6 000 titres présents sur 10 000 dépassent la moitié. La neutralisation des titres de l'actionnaire à 15 % dans le calcul du quorum n'est pas réglée expressément par l'article 806, qui ne vise que le vote : dans le doute, mieux vaut s'assurer que le quorum est atteint même sans eux.",
      },
      {
        type: 'filet',
        titre: "Le contrôle d'un report d'échéance",
        texte: "Lorsque KOLWEZI INFRA proposera un report d'échéance, l'auditeur vérifiera le procès-verbal de l'assemblée extraordinaire des obligataires : quorum de l'article 553, majorité des deux tiers, et surtout exclusion des voix de la société qui détient 12 % du capital de KOLWEZI INFRA et possède 2 000 obligations (art. 806). Ses titres ne votent pas, même s'ils représentent un dixième de l'emprunt. Une délibération qui les aurait comptés serait fragile, et le nouvel échéancier inscrit dans les comptes le serait avec elle.",
      },
      { type: 'intertitre', texte: "6.3.3 Le refus des obligataires et les droits individuels" },
      {
        type: 'carte',
        titre: "Tableau 6.3 — Les conséquences d'un refus des obligataires",
        tableau: {
          entetes: ["Projet de la société", "Refus de l'assemblée des obligataires", "Conséquence"],
          lignes: [
            ["Changement de forme ou d'objet", "La société peut passer outre", "À condition de **rembourser** les obligations avant la réalisation du changement (art. 809)"],
            ["Fusion ou scission", "La société peut passer outre, après en avoir informé le représentant de la masse", "Les obligataires deviennent créanciers de l'absorbante ou des sociétés nouvelles ; la masse peut faire **opposition** en justice, et le juge rejette l'opposition ou ordonne le remboursement ou des garanties suffisantes (art. 810)"],
            ["Dissolution (hors fusion ou scission)", "—", "Le remboursement devient **aussitôt exigible** (art. 811)"],
          ],
        },
        note: "Ces règles relient ce chapitre aux fusions (chapitre 8) et à la liquidation (chapitre 9) : l'emprunt obligataire en cours pèse sur toute restructuration.",
      },
      {
        type: 'filet',
        titre: "Pas de contrôle individuel (art. 813)",
        texte: "Pris isolément, l'obligataire ne peut ni contrôler les opérations de la société ni obtenir communication des documents sociaux. Il peut seulement obtenir, à ses frais, copie des procès-verbaux et feuilles de présence des assemblées de sa masse. L'information passe par les représentants : c'est le prix de l'organisation collective.",
      },
    ],
  },
  {
    numero: '6.4',
    titre: "Garanties, remboursement anticipé, rachat et annulation",
    navLabel: "Garanties et rachat",
    blocs: [
      { type: 'intertitre', texte: "6.4.1 Les garanties" },
      {
        type: 'paragraphe',
        texte: "Pour attirer les souscripteurs ou abaisser le taux, l'assemblée qui décide l'émission peut assortir les obligations d'une **sûreté** (hypothèque, nantissement, gage). Elle la détermine elle-même ou délègue ce pouvoir au conseil ou à l'administrateur général (art. 815). La difficulté est pratique : au moment où la sûreté est constituée, les créanciers bénéficiaires n'existent pas encore. L'Acte uniforme la fait donc constituer par un **acte spécial**, pour le compte du groupement des obligataires **en formation**, et impose d'en accomplir la publicité **avant toute souscription** (art. 816). Chaque souscription vaut acceptation de la garantie, avec effet rétroactif à la date de l'inscription pour les sûretés inscrites (art. 817).",
      },
      {
        type: 'carte',
        titre: "Encadré 6.2 — Le calendrier des sûretés",
        liste: [
          "**Avant la souscription** : acte spécial et publicité de la sûreté (art. 816).",
          "**Dans les six mois** de l'ouverture de la souscription : constatation du résultat par **acte notarié**, à la diligence du représentant légal (art. 818).",
          "**Dans les trente jours** de cet acte : mention du résultat en marge de l'inscription. Si l'émission échoue faute de souscriptions suffisantes, l'inscription est radiée (art. 818).",
          "**Pendant l'emprunt** : renouvellement aux frais de la société, sous la vigilance des représentants de la masse (art. 819).",
          "**Au terme** : mainlevée par les représentants seulement, après remboursement intégral et paiement de tous les intérêts, sur autorisation expresse de l'assemblée des obligataires (art. 820).",
          "**Garantie ajoutée après l'émission** : conférée sur autorisation de l'AGO des actionnaires (ou du conseil si les statuts le prévoient) et acceptée expressément par le groupement (art. 821). Les sûretés constituées en violation de ces règles sont nulles (art. 821-1).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Les sûretés obéissent à un formalisme strict parce qu'elles sont opposables aux autres créanciers. Une hypothèque inscrite au profit de la masse donne aux obligataires un rang préférentiel sur le bien grevé. Les autres créanciers doivent pouvoir le savoir, d'où la publicité préalable à toute souscription (art. 816). La sanction du non-respect des articles 815, 816 et 821 est la **nullité** de la sûreté (art. 821-1). Les obligataires redeviendraient alors de simples créanciers chirographaires. Pour le comptable et l'auditeur, les sûretés consenties sont des **engagements donnés** : l'emprunt garanti est signalé dans les Notes annexes parmi les dettes garanties par des sûretés réelles, avec le montant et la nature de la garantie. Un lecteur des états financiers doit pouvoir savoir quels actifs de la société ne sont plus librement disponibles pour les autres créanciers.",
      },
      { type: 'intertitre', texte: "6.4.2 Remboursement anticipé, rachat et annulation" },
      {
        type: 'paragraphe',
        texte: "Le contrat d'émission fixe l'échéancier de remboursement, et la société ne peut pas le raccourcir unilatéralement. En l'absence de stipulation particulière, elle **ne peut pas imposer** un remboursement anticipé (art. 814). Pour se désendetter plus tôt, par exemple après une baisse des taux, elle doit donc avoir prévu une clause (c'est le principe des **obligations à fenêtres**) ou **racheter** les titres à des porteurs consentants. Le rachat est fréquent pour les obligations cotées, surtout quand le cours est inférieur au prix de remboursement : la société éteint sa dette pour moins que ce qu'elle devrait au terme. Les obligations rachetées et remboursées sont **annulées** et ne peuvent pas être remises en circulation (art. 784).",
      },
      {
        type: 'carte',
        titre: "Exemple 6.2 — Rachat en bourse puis annulation (AUDCIF, ch. 20, § 1.7 à 1.9)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["5031", "", "Rachat de 500 obligations au cours de 9 600", "4 800 000", ""],
            ["", "521", "Banques", "", "4 800 000"],
            ["1611", "", "Annulation : dette au prix d'émission (500 × 9 800)", "4 900 000", ""],
            ["", "5031", "Obligations émises par la société et rachetées par elle", "", "4 800 000"],
            ["", "841", "Produits HAO constatés (gain de rachat)", "", "100 000"],
          ],
        },
        note: "Montants pédagogiques. Si l'emprunt comportait une prime déjà en partie prise en charge au 1661, la quote-part afférente aux titres annulés est soldée en même temps. L'AUDCIF classe le gain en HAO, parce que le rachat est une opération non récurrente, étrangère au service normal de l'emprunt.",
      },
      {
        type: 'paragraphe',
        texte: "L'intérêt économique du rachat se comprend avec les taux. Une obligation à taux fixe de 8 % vaut moins que son nominal lorsque les taux du marché montent à 12 % : l'acheteur exige un rendement de marché et paie donc moins cher un titre qui ne rapporte que 8 %. À l'inverse, si les taux baissent, le cours de l'obligation dépasse le nominal. L'émettrice qui dispose de trésorerie a intérêt à racheter quand le cours est bas : elle éteint une dette pour moins que sa valeur de remboursement et constate un gain. Quand les taux baissent, elle aimerait rembourser par anticipation pour se refinancer moins cher, mais l'article 814 l'en empêche sans clause. D'où l'intérêt, pour l'émetteur, de négocier dès l'émission une faculté de remboursement anticipé, que les souscripteurs feront payer par une pénalité ou une prime plus élevée.",
      },
    ],
  },
  {
    numero: '6.5',
    titre: "Le vocabulaire financier et le tableau d'amortissement",
    navLabel: "Tableau d'amortissement",
    blocs: [
      { type: 'intertitre', texte: "6.5.1 Le vocabulaire du contrat d'émission" },
      {
        type: 'paragraphe',
        texte: "La comptabilisation suppose la lecture du contrat d'émission. L'AUDCIF (Titre VIII, chapitre 20) fixe la terminologie. La **valeur nominale** (ou pair) est la quote-part de l'emprunt qui sert au calcul des intérêts ; elle est fixée librement par l'émetteur. Le **prix d'émission** est ce que verse le souscripteur : égal au nominal (émission au pair) ou inférieur. Le **prix de remboursement** est ce que la société restitue : au minimum le nominal, parfois davantage. L'Acte uniforme n'interdit que les obligations à lots : l'émission au-dessous ou au-dessus du pair est donc libre.",
      },
      {
        type: 'carte',
        titre: "Tableau 6.4 — Les trois primes d'un emprunt obligataire",
        tableau: {
          entetes: ["Prime", "Calcul", "Application 78 (par obligation)"],
          lignes: [
            ["Prime d'émission", "Valeur nominale − prix d'émission", "5 000 − 4 900 = 100"],
            ["Prime de remboursement (sens financier)", "Prix de remboursement − valeur nominale", "5 100 − 5 000 = 100"],
            ["Prime de remboursement (sens comptable)", "Prix de remboursement − prix d'émission : une « double prime »", "5 100 − 4 900 = 200"],
          ],
        },
        note: "C'est la prime au sens comptable (200 par titre, 2 000 000 pour 10 000 titres) qui est étalée au compte 6714. Attention : la « prime d'émission » d'une obligation n'a rien à voir avec la prime d'émission d'actions du compte 1051 (chapitre 4). Pour l'obligation, c'est un rabais consenti au prêteur ; pour l'action, c'est un supplément payé par le nouvel associé.",
      },
      { type: 'intertitre', texte: "6.5.2 Le service de l'emprunt et le tableau d'amortissement" },
      {
        type: 'paragraphe',
        texte: "Le **service de l'emprunt** comprend les coupons et le remboursement des obligations échues. L'obligation remboursée est dite **amortie** (« morte ») ; les autres sont **vivantes**. L'AUDCIF distingue trois lois d'amortissement. Avec l'**amortissement constant**, le même nombre d'obligations est remboursé chaque année, si bien que les intérêts et les annuités décroissent. Avec l'**annuité constante**, la même somme couvre chaque année coupons et remboursements : les intérêts baissent et le nombre de titres remboursés augmente. L'annuité se calcule par la formule financière a = E × i / (1 − (1 + i)^−n), où E est l'emprunt au prix de remboursement, et le nombre de titres est arrondi à l'entier. Avec le **remboursement in fine**, seuls les coupons sont payés jusqu'au terme, où tout l'emprunt est remboursé en une fois.",
      },
      {
        type: 'carte',
        titre: "Exemple 6.3 — Emprunt remboursable par annuités constantes",
        tableau: {
          entetes: ["Année", "Obligations vivantes", "Intérêts (10 %)", "Obligations amorties", "Remboursement", "Annuité"],
          lignes: [
            ["1", "1 000", "1 000 000", "302", "3 020 000", "4 020 000"],
            ["2", "698", "698 000", "332", "3 320 000", "4 018 000"],
            ["3", "366", "366 000", "366", "3 660 000", "4 026 000"],
            ["Total", "—", "2 064 000", "1 000", "10 000 000", "12 064 000"],
          ],
        },
        note: "Données : 1 000 obligations de 10 000 remboursables au pair, taux 10 %, trois ans. Annuité théorique : 10 000 000 × 0,10 / (1 − 1,10^−3) ≈ 4 021 148. Le premier amortissement théorique (3 021 148) donne 302 titres après arrondi. Les amortissements théoriques suivants croissent au taux de l'emprunt (× 1,10), et la dernière année rembourse les titres restants. Les annuités réelles s'écartent légèrement de l'annuité théorique à cause des arrondis.",
      },
      {
        type: 'carte',
        titre: "Exemple 6.4 — Le tableau d'amortissement de l'Application 78",
        tableau: {
          entetes: ["Exercice", "Obligations vivantes", "Intérêts", "Obligations amorties", "Remboursement (× 5 100)", "Annuité"],
          lignes: [
            ["N", "10 000", "5 000 000", "2 500", "12 750 000", "17 750 000"],
            ["N+1", "7 500", "3 750 000", "2 500", "12 750 000", "16 500 000"],
            ["N+2", "5 000", "2 500 000", "2 500", "12 750 000", "15 250 000"],
            ["N+3", "2 500", "1 250 000", "2 500", "12 750 000", "14 000 000"],
            ["Total", "—", "12 500 000", "10 000", "51 000 000", "63 500 000"],
          ],
        },
        note: "Données : 10 000 obligations, nominal 5 000, émises à 4 900, remboursables à 5 100 par amortissements constants sur quatre ans. [texte officiel] Le Guide annonce un taux de 5 % et écrit « coupon 10 000 × 5 % × 5 000 = 500/oblig ». Or 5 % × 5 000 donne 250 par obligation, soit 2 500 000 pour 10 000 titres. Les intérêts du tableau (5 000 000 en N, soit 500 par obligation) correspondent à un taux de **10 %**. Le tableau est reproduit tel que le Guide l'imprime, et il est cohérent en lui-même avec un coupon de 500. À l'examen, calculez avec le taux de l'énoncé qui vous est donné.",
      },
      {
        type: 'paragraphe',
        texte: "Ce tableau est l'outil central de l'emprunt. Il sert au trésorier pour prévoir les décaissements. Il sert au comptable, qui en tire chaque année la ventilation de l'annuité entre remboursement (compte 1611), intérêts (6711) et prime (6714). Il sert enfin à l'annexe, pour ventiler la dette selon ses échéances. Il permet aussi de mesurer le **coût réel** de la ressource. Dans l'Application 78, la société reçoit 49 000 000 et décaisse 63 500 000, auxquels s'ajoutent 750 000 de frais d'émission. Ce coût actuariel dépasse le taux nominal, parce que la société rembourse plus qu'elle n'a reçu.",
      },
    ],
  },
  {
    numero: '6.6',
    titre: "Comptabiliser l'émission et le service de l'emprunt (Application 78)",
    navLabel: "Émission et service",
    blocs: [
      { type: 'intertitre', texte: "6.6.1 L'émission" },
      {
        type: 'paragraphe',
        texte: "L'AUDCIF décrit l'émission en **trois phases** : ouverture de la souscription, souscription, versement des fonds. À l'ouverture, la société constate l'emprunt au crédit du **1611 Emprunts obligataires ordinaires**, pour le **prix d'émission**, par le débit d'un compte d'attente, le **47131 Obligataires, obligations à placer**. Au fur et à mesure des souscriptions, l'engagement des obligataires passe au **47132 Obligataires, compte de souscription**. Enfin, la libération des fonds débite la banque par le crédit du 47132. Les sous-comptes 47131 et 47132 sont ceux de l'AUDCIF et du Guide, au sein du compte 4713 Obligataires du plan de comptes. Lorsqu'une banque prend ferme l'emprunt, elle verse d'un coup le produit et se charge du placement : une écriture unique, débit 521 et crédit 1611, suffit.",
      },
      {
        type: 'carte',
        titre: "Exemple 6.5 — Application 78 : émission au 01/01/N (10 000 × 4 900 = 49 000 000)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["47131", "", "Obligataires, obligations à placer", "49 000 000", ""],
            ["", "1611", "Emprunts obligataires ordinaires", "", "49 000 000"],
            ["47132", "", "Obligataires, compte de souscription", "49 000 000", ""],
            ["", "47131", "Obligataires, obligations à placer", "", "49 000 000"],
            ["521", "", "Banques", "49 000 000", ""],
            ["", "47132", "Obligataires, compte de souscription", "", "49 000 000"],
            ["6316", "", "Frais d'émission d'emprunts", "750 000", ""],
            ["", "521", "Banques", "", "750 000"],
          ],
        },
        note: "La dette naît au **prix d'émission**, non au nominal ni au prix de remboursement. Les frais d'émission (publicité, impression, commissions bancaires) sont des charges de l'exercice d'engagement : le SYSCOHADA révisé a supprimé les charges à répartir. Lorsqu'il est passé au SYSCOHADA révisé, l'AUDCIF a fait solder les anciens comptes 206 (primes) et 2026 (frais) qui figuraient à l'actif (chapitre 41 du Titre VIII).",
      },
      {
        type: 'filet',
        titre: "L'étalement des primes selon l'AUDCIF",
        texte: "Après avoir posé l'étalement de la prime au 6714 par le crédit du 1661, l'AUDCIF ajoute : « les primes afférentes à la fraction d'emprunts remboursée ne peuvent en aucun cas être maintenues au bilan ». Cette phrase est un vestige de l'ancien SYSCOHADA, où la prime figurait à l'actif (compte 206) et s'amortissait. Dans le référentiel révisé, la prime n'est jamais inscrite à l'actif : la phrase n'a plus d'objet et ne doit pas faire croire qu'un actif « primes de remboursement » existe encore. Le seul lien subsistant avec l'ancien système est la première application : les primes non échues figurent dans les Notes annexes parmi les engagements hors bilan.",
      },
      { type: 'intertitre', texte: "6.6.2 La prise ferme et la prime de remboursement" },
      {
        type: 'paragraphe',
        texte: "La **prise ferme** transfère le risque de placement à la banque. Elle s'engage à acheter l'ensemble des titres au prix convenu, puis les revend à ses clients. Si le placement se passe mal, c'est elle qui garde les obligations. Pour la société émettrice, l'opération est sûre : elle connaît dès le premier jour le montant exact qu'elle recevra. Ce service a un prix : la commission de prise ferme, qui s'ajoute aux frais d'émission du compte 6316. Dans l'écriture, les comptes d'attente 47131 et 47132 deviennent inutiles, puisqu'il n'y a qu'un souscripteur et un versement unique : débit 521, crédit 1611. Pour un emprunt placé par la société elle-même, au contraire, le suivi des souscriptions et des versements justifie les trois phases de l'AUDCIF, et le contrôle de la concordance entre bulletins, fonds reçus et dette inscrite.",
      },
      {
        type: 'filet',
        titre: "La prime de remboursement n'est plus un actif",
        texte: "La prime de remboursement ne s'inscrit plus à l'actif, comme le faisait l'ancien SYSCOHADA avec le compte 206. Dans le référentiel révisé, la dette est constatée au prix d'émission, et la prime est prise en charge au fil de l'emprunt par le compte 6714, par le crédit du 1661 pour un emprunt in fine. Chez KOLWEZI INFRA, les obligations sont émises au pair à 10 000 FC et remboursables à 10 400 FC : la prime de 8 000 000 FC n'apparaît pas à l'émission, et elle est rattachée aux exercices au prorata des intérêts courus.",
      },
      {
        type: 'paragraphe',
        texte: "Si la dette est inscrite à 4 900 par titre alors que la société remboursera 5 100, les 200 d'écart sont une charge financière supplémentaire, qu'il faut répartir sur la durée de l'emprunt. L'AUDCIF pose le principe d'un étalement « au prorata des intérêts courus », par le débit du **6714 Primes de remboursement des obligations** et le crédit du **1661 Intérêts courus sur emprunts obligataires**. Le Guide d'application affine la règle. Pour un emprunt remboursé par séries (amortissements constants ou annuités constantes), il étale la prime **au prorata du nombre d'obligations échues**. Chaque série remboursée emporte sa part de prime, directement dans l'écriture de l'annuité. Pour l'emprunt in fine, il retient le prorata des intérêts courus. Dans l'Application 78, 2 500 obligations sur 10 000 étant remboursées chaque année, la prime de 2 000 000 est prise en charge par quarts de 500 000.",
      },
      { type: 'intertitre', texte: "6.6.3 La première annuité" },
      {
        type: 'carte',
        titre: "Exemple 6.6 — Application 78 : première annuité au 31/12/N",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1611", "", "Emprunts obligataires ordinaires : 2 500 × 4 900", "12 250 000", ""],
            ["6711", "", "Intérêts des emprunts obligataires", "5 000 000", ""],
            ["6714", "", "Primes de remboursement des obligations : 2 500 × 200", "500 000", ""],
            ["", "521", "Banques : annuité", "", "17 750 000"],
          ],
        },
        note: "Contrôle : 12 250 000 + 500 000 = 12 750 000, soit 2 500 titres au prix de remboursement de 5 100. Les annuités suivantes suivent le même schéma : en N+1, 12 250 000 / 3 750 000 / 500 000 pour 16 500 000. Au terme, le 1611 est soldé (4 × 12 250 000 = 49 000 000) et la prime totale (2 000 000) a été entièrement prise en charge.",
      },
      { type: 'intertitre', texte: "6.6.4 L'émission surcouverte et le rattachement de la prime" },
      {
        type: 'paragraphe',
        texte: "L'AUDCIF envisage aussi l'**émission surcouverte**. Lorsque les souscriptions sont recueillies aux guichets de plusieurs banques, elles peuvent dépasser le nombre de titres offerts. On distingue alors les souscriptions à titre **irréductible**, servies en priorité pour un nombre assez faible de titres, et les souscriptions à titre **réductible**, servies au prorata du reste. La société peut appeler tout ou partie du prix à la souscription, le solde étant versé à la clôture de la souscription. Les comptes 47131 et 47132 permettent de suivre ces étapes : le 47131 mesure ce qui reste à placer, le 47132 ce que les souscripteurs doivent encore verser. À la fin de l'opération, les deux comptes sont soldés, et le 1611 porte la dette au prix d'émission des seuls titres placés.",
      },
      {
        type: 'filet',
        titre: "Deux méthodes, deux profils de charge",
        texte: "Si l'on appliquait à l'Application 78 le prorata des intérêts courus, l'exercice N supporterait 5 000 000 / 12 500 000 × 2 000 000 = 800 000 de prime, et N+3 seulement 200 000. Le prorata des obligations échues donne 500 000 chaque année. Le Guide réserve le prorata des intérêts à l'emprunt in fine, où aucune obligation n'est échue avant le terme. L'essentiel est de retenir une méthode cohérente avec la loi d'amortissement et de l'appliquer sur toute la durée de l'emprunt.",
      },
    ],
  },
  {
    numero: '6.7',
    titre: "L'emprunt in fine, les intérêts courus et les obligations à coupon zéro",
    navLabel: "In fine et intérêts courus",
    blocs: [
      { type: 'intertitre', texte: "6.7.1 L'emprunt in fine" },
      {
        type: 'paragraphe',
        texte: "L'Application 79 porte sur 5 000 obligations de nominal 10 000, émises à 9 500 le 01/01/N et remboursables **in fine** le 31/12/N+4 à 10 500, avec un intérêt de 6 % l'an à terme échu. Les écritures d'émission sont celles de la section précédente, pour 47 500 000. Chaque 31/12, la société paie le coupon : 5 000 × 6 % × 10 000 = 3 000 000, débit 6711, crédit 521. Aucune obligation n'étant remboursée avant le terme, la prime ne peut pas suivre les titres échus. Elle est rattachée **au prorata des intérêts courus**. Les intérêts totaux s'élèvent à 15 000 000, dont 3 000 000 par exercice, et chaque exercice porte donc un cinquième de la prime de 5 000 000 (5 000 × 1 000), soit 1 000 000.",
      },
      {
        type: 'carte',
        titre: "Exemple 6.7 — Application 79 : les écritures de l'emprunt in fine",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["6711", "", "31/12/N à N+4 : intérêts de l'exercice", "3 000 000", ""],
            ["", "521", "Banques", "", "3 000 000"],
            ["6714", "", "31/12/N à N+4 : quote-part de prime (5 000 000 × 3/15)", "1 000 000", ""],
            ["", "1661", "Intérêts courus sur emprunts obligataires", "", "1 000 000"],
            ["1611", "", "31/12/N+4 : remboursement, dette au prix d'émission", "47 500 000", ""],
            ["1661", "", "Prime cumulée", "5 000 000", ""],
            ["", "521", "Banques : 5 000 × 10 500", "", "52 500 000"],
          ],
        },
        note: "Le 1661 accumule la prime exercice après exercice. Au bilan, il figure avec l'emprunt dans les dettes financières (rubrique DA, comptes 16), de sorte que la dette présentée au 31/12/N+3 (47 500 000 + 4 000 000 = 51 500 000) se rapproche peu à peu du montant à rembourser.",
      },
      {
        type: 'paragraphe',
        texte: "À la clôture, l'auditeur contrôle l'emprunt obligataire en quelques points simples. Il rapproche le solde du 1611 du tableau d'amortissement : nombre d'obligations vivantes multiplié par le prix d'émission. Il recalcule les intérêts courus du 1661 depuis la dernière échéance du coupon, ainsi que la quote-part de prime de l'exercice. Il vérifie que les coupons échus ont été payés et que la retenue à la source a été déclarée et reversée. Il s'assure que les obligations rachetées ont été annulées plutôt que conservées (art. 784), et que les sûretés promises ont été constituées et renouvelées. Il contrôle enfin la ventilation par échéance dans les Notes annexes : la part remboursable dans l'année qui suit est une information essentielle pour apprécier la liquidité. Un emprunt in fine qui arrive à échéance l'année suivante peut à lui seul transformer une situation confortable en tension de trésorerie.",
      },
      { type: 'intertitre', texte: "6.7.2 Les intérêts courus" },
      {
        type: 'paragraphe',
        texte: "Le coupon tombe rarement le jour de la clôture. Supposons un emprunt de 100 000 000 au taux de 9 %, dont le coupon annuel de 9 000 000 est payable le **30 juin**. Au 31 décembre, six mois d'intérêts ont couru sans être payés : 9 000 000 × 6/12 = 4 500 000. Le principe d'indépendance des exercices impose de les rattacher à l'exercice clos, par le débit du **6711** et le crédit du **1661**. L'écriture est **contrepassée** à l'ouverture de l'exercice suivant (AUDCIF, chapitre 20, § 1.6). Le 30 juin suivant, le paiement du coupon entier au débit du 6711 ne laissera alors à la charge du nouvel exercice que les six mois qui le concernent. Si les intérêts sont soumis à une retenue à la source (section 6.9), celle-ci n'est due qu'au paiement ; les intérêts courus sont constatés pour leur montant brut.",
      },
      {
        type: 'paragraphe',
        texte: "Le Guide porte la prime de l'emprunt in fine au crédit du **1661 Intérêts courus** plutôt qu'au 1611 parce que la prime est économiquement un **supplément d'intérêt** : le prêteur est rémunéré à la fois par le coupon annuel et par l'écart entre ce qu'il a versé et ce qu'il recevra. Le 1661 regroupe donc, à la clôture, les intérêts courus non échus et la prime acquise jusqu'à cette date. Dans l'annexe, il est utile d'en distinguer les deux composantes, car les intérêts courus sont contrepassés à l'ouverture alors que la prime cumulée ne l'est pas. Elle reste au 1661 jusqu'au remboursement. L'obligation à coupon zéro pousse la logique à son terme. Tout le rendement prend la forme de la prime, et celle-ci est rattachée chaque année au taux actuariel, exactement comme des intérêts capitalisés (AUDCIF, ch. 20, § 3.1).",
      },
      {
        type: 'filet',
        titre: "Les intérêts courus de KOLWEZI INFRA à la clôture",
        texte: "Le coupon de KOLWEZI INFRA est payable le 30 juin. À chaque clôture, six mois d'intérêts ont donc couru sans être payés : 200 000 000 × 8 % × 6/12 = 8 000 000 FC, constatés par débit 6711 et crédit 1661, puis contrepassés à l'ouverture. Si le coupon tombait le 31 décembre, il n'y aurait aucun intérêt couru à la clôture : le coupon entier serait comptabilisé à son paiement, dans l'exercice qu'il rémunère. Le décalage entre la date du coupon et la date de clôture est ce qui crée le travail d'inventaire.",
      },
      { type: 'intertitre', texte: "6.7.3 Les autres emprunts obligataires" },
      {
        type: 'carte',
        titre: "Tableau 6.5 — Les autres emprunts obligataires (AUDCIF, ch. 20, section 3)",
        tableau: {
          entetes: ["Titre", "Caractéristique", "Traitement chez l'émetteur"],
          lignes: [
            ["Obligation à coupon zéro", "Aucun intérêt annuel ; forte prime, remboursement au nominal à l'échéance", "Compte **1618 Autres emprunts obligataires** pour le prix d'émission ; la prime, assimilée à des intérêts capitalisés au taux actuariel, est étalée au prorata des intérêts courus (6714 / 1661)"],
            ["Obligation à fenêtres", "Remboursement anticipé possible pendant certaines périodes, à la demande de l'émetteur ou du porteur, avec pénalités contractuelles", "Si l'émetteur a l'intention de rembourser, **provision** pour la charge de pénalité"],
            ["Titre participatif", "Remboursable à très long terme, rémunération fixe et variable, rang juste avant les actions", "Autres fonds propres, compte **167** (ch. 16 du Titre VIII) ; l'AUDCIF décrit au chapitre 20 le côté du souscripteur (5035, 2742)"],
          ],
        },
      },
    ],
  },
  {
    numero: '6.8',
    titre: "Obligations convertibles et autres valeurs mobilières composées",
    navLabel: "Convertibles",
    blocs: [
      { type: 'intertitre', texte: "6.8.1 Le régime des valeurs mobilières composées" },
      {
        type: 'paragraphe',
        texte: "Depuis la révision de 2014, les sociétés par actions peuvent émettre des **valeurs mobilières donnant accès au capital** ou donnant droit à l'attribution de titres de créance (art. 822) : obligations convertibles en actions (OCA), obligations remboursables en actions (ORA), obligations à bons de souscription d'actions (OBSA). Ces titres mêlent dette et capital. Le porteur prête aujourd'hui avec la faculté (OCA) ou l'obligation (ORA) de devenir actionnaire demain. En échange de cette option, il accepte généralement un taux plus faible. L'inverse n'est pas possible : des titres de capital ne peuvent pas être convertis en titres de créance (art. 822-3).",
      },
      {
        type: 'carte',
        titre: "Encadré 6.3 — Le régime juridique des valeurs mobilières composées",
        liste: [
          "**Décision** : AGE des actionnaires, selon les règles de l'augmentation de capital (art. 562-572 et 588-618), sur rapport du conseil (ou du président de SAS, ou de l'administrateur général) et rapport spécial du commissaire aux comptes, à peine de nullité (art. 822-5).",
          "**DPS** : les actionnaires ont un droit préférentiel à la souscription de ces valeurs, proportionnel à leurs actions (art. 822-1), et la décision d'émission emporte **renonciation** à leur DPS sur les actions à provenir de la conversion (art. 587-2).",
          "**Gel de certaines décisions** : dès l'émission, la société ne peut plus modifier sa forme ou son objet (art. 822-7) ni sa répartition des bénéfices, amortir son capital ou réserver une augmentation de capital à des personnes dénommées (art. 822-8), sauf autorisation du contrat d'émission ou de la masse des titulaires (art. 822-14).",
          "**Protection des titulaires** : en cas d'émission avec DPS, de distribution de réserves ou de primes, ou de création d'actions de préférence, la société ouvre l'exercice anticipé, réserve leurs droits ou ajuste la parité (art. 822-10 à 822-10-6). L'art. 822-10-3 répète deux fois le même alinéa dans le texte officiel.",
          "**Masse** : les titulaires sont groupés en masse, soumise aux art. 786 à 814 ; chaque titre donne une voix ; quorum et majorité de l'AGE (art. 822-14).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Le choix entre obligation ordinaire et obligation convertible est aussi une question de signal. Une société qui offre la conversion dit aux investisseurs qu'elle croit à la hausse future de son action : sinon, l'option ne vaudrait rien et le taux d'intérêt consenti en échange serait trop bas. Pour les obligataires, la convertible combine un plancher et une option. Le plancher est la créance, remboursée au terme si l'action a déçu. L'option est la possibilité de devenir actionnaire à un prix fixé d'avance si l'action a monté. Cette double nature explique le traitement comptable. Tant que les porteurs n'ont pas choisi, l'emprunt reste une dette au prix d'émission, et seul le risque de devoir payer la prime est provisionné. Au jour de la conversion, la dette disparaît au profit du capital et de la prime de conversion, sans aucun mouvement de trésorerie.",
      },
      { type: 'intertitre', texte: "6.8.2 Les obligations convertibles" },
      {
        type: 'paragraphe',
        texte: "Comptablement, tout dépend de la prime. Une **OCA sans prime de remboursement** suit le schéma de l'ORA : l'emprunt est inscrit au crédit du **1612 Emprunts obligataires convertibles** (1613 pour l'ORA), les intérêts sont servis normalement, et chaque conversion débite le 1612 par le crédit du **1013** pour le nominal des actions et du **1054 Primes de conversion** pour le solde. Une **OCA avec prime** pose une difficulté : la prime ne sera due que si le porteur choisit d'être remboursé en numéraire. L'AUDCIF en tire deux règles. Seul le **prix d'émission** est constaté au 1612, et la prime n'est ni comptabilisée ni étalée. En revanche, une **provision** pour le risque de devoir la payer est constituée à la clôture de l'exercice d'émission, pour la prime totale ou selon la probabilité de non-conversion au vu de l'état du marché, puis reprise au fil des conversions.",
      },
      {
        type: 'carte',
        titre: "Exemple 6.8 — Application 80 : 25 000 OCA de nominal 15 000, émises à 13 000 (prise ferme)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["521", "", "01/01/N : Banques, 25 000 × 13 000", "325 000 000", ""],
            ["", "1612", "Emprunts obligataires convertibles en actions", "", "325 000 000"],
            ["6971", "", "31/12/N : dotation, 25 000 × (15 000 − 13 000)", "50 000 000", ""],
            ["", "1988", "Provisions pour divers risques et charges", "", "50 000 000"],
            ["1612", "", "01/01/N+2 : conversion de 4 000 obligations (× 13 000)", "52 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti : 3 000 × 10 000", "", "30 000 000"],
            ["", "1054", "Primes de conversion", "", "22 000 000"],
            ["1988", "", "Reprise : 4 000 × 2 000", "8 000 000", ""],
            ["", "7971", "Reprises de provisions financières pour risques et charges", "", "8 000 000"],
          ],
        },
        note: "Parité : 4 obligations pour 3 actions de nominal 10 000, conversion possible à chaque date anniversaire à partir de deux ans, remboursement au terme de six ans. [texte officiel] Le Guide date la reprise de la provision du 31/12/N+3, alors que la conversion intervient le 01/01/N+2 : la reprise se rattache logiquement à l'exercice N+2. Pour les obligations finalement remboursées en numéraire, la quote-part de provision est reprise et la prime est portée au débit du 6714.",
      },
      {
        type: 'paragraphe',
        texte: "Pour l'actionnaire en place, la conversion a un coût : la **dilution**. Dans l'Application 80, si les 25 000 obligations étaient toutes converties, 18 750 actions nouvelles seraient créées (25 000 × 3/4). Leur prix implicite est de 13 000 × 4/3 ≈ 17 333 par action, soit la dette éteinte divisée par le nombre d'actions reçues. Tant que ce prix reste supérieur à la valeur réelle de l'action, la conversion n'appauvrit pas les anciens actionnaires. S'il devient inférieur, les obligataires convertissent volontiers, et ce sont les anciens actionnaires qui supportent l'écart. C'est la raison pour laquelle l'AUSCGIE soumet l'émission à l'AGE et au rapport du commissaire aux comptes (art. 822-5), et protège ensuite les titulaires contre les opérations qui modifieraient la valeur de leurs droits (art. 822-8 et 822-10). Le rapport d'échange est un prix fixé à l'avance, que les deux parties ont intérêt à surveiller.",
      },
      { type: 'intertitre', texte: "6.8.3 ORA, OBSA et bons autonomes" },
      {
        type: 'paragraphe',
        texte: "Les **obligations remboursables en actions** (ORA) illustrent l'autre bout de l'éventail. Leur remboursement se fait obligatoirement par remise d'actions, selon un rapport fixé dès l'émission et intangible, sauf opérations spécifiques sur les capitaux propres. Exemple : 2 000 ORA de 10 000, remboursables chacune en une action de nominal 8 000. À l'émission, débit 521 et crédit 1613 pour 20 000 000. Les intérêts sont servis normalement, et il n'y a pas de prime de remboursement. Au terme, débit 1613 pour 20 000 000, crédit 1013 pour 16 000 000 et crédit 1054 pour 4 000 000. Pour l'analyste, l'ORA est presque des capitaux propres différés : la société sait dès l'origine qu'elle ne remboursera pas en argent. Le plan de comptes la maintient pourtant parmi les emprunts (compte 16) jusqu'au remboursement, parce que la société doit servir les intérêts jusqu'à l'échéance.",
      },
      {
        type: 'filet',
        titre: "OBSA et bons autonomes",
        texte: "Dans l'OBSA, l'obligation est comptabilisée comme un emprunt ordinaire, et la contrepartie du bon n'est pas constatée, car elle ne crée pas de dette. À l'exercice du bon, l'augmentation de capital est portée au 101 et au 1051. Émis de manière **autonome**, les bons de souscription d'actions sont crédités définitivement au **1051**, même s'ils ne sont jamais exercés. Les bons de souscription d'**obligations** transitent, eux, par le 4719, puis sont rapportés au 7745 sur la durée de l'emprunt (AUDCIF, ch. 20, § 2.2.5 et 2.3).",
      },
    ],
  },
  {
    numero: '6.9',
    titre: "Fiscalité congolaise et présentation dans les états financiers",
    navLabel: "Fiscalité et présentation",
    blocs: [
      { type: 'intertitre', texte: "6.9.1 La fiscalité des revenus obligataires" },
      {
        type: 'paragraphe',
        texte: "Depuis le 1er janvier 2026, la loi n° 23/053 du 30 novembre 2023 range les **revenus des obligations** parmi les revenus des capitaux mobiliers soumis à l'IRPP (art. 72). L'article 77 vise les intérêts, arrérages et tous autres produits des obligations et titres d'emprunt négociables émis notamment par les sociétés et entreprises quelconques, ainsi que les « lots et primes de remboursement » payés aux porteurs d'obligations émises en RDC. La base est l'intérêt ou le revenu distribué durant l'exercice et, pour les primes de remboursement, la différence entre la somme remboursée et le taux d'émission (art. 81). Ces revenus font l'objet d'une **retenue à la source de 20 %** opérée par le débiteur (art. 120), c'est-à-dire par la société émettrice, et reversée **au plus tard le 15 du mois qui suit** le versement (arrêté ministériel n° 008/2025). Sont exonérés les intérêts des titres d'emprunt négociables émis par l'**État, les Provinces et les ETD** (art. 80).",
      },
      {
        type: 'carte',
        titre: "Exemple 6.9 — Paiement d'un coupon de 5 000 000 soumis à la retenue",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["6711", "", "Intérêts des emprunts obligataires (brut)", "5 000 000", ""],
            ["", "447", "État, impôts retenus à la source : 20 %", "", "1 000 000"],
            ["", "521", "Banques : net versé aux obligataires", "", "4 000 000"],
            ["447", "", "Reversement au plus tard le 15 du mois suivant", "1 000 000", ""],
            ["", "521", "Banques", "", "1 000 000"],
          ],
        },
        note: "La charge d'intérêts reste le montant brut : la retenue est un impôt de l'obligataire, que la société collecte. Les conventions fiscales peuvent réduire le taux pour un porteur non résident ; il faut alors vérifier la convention applicable, comme au chapitre 3 pour les dividendes.",
      },
      { type: 'intertitre', texte: "6.9.2 L'obligation chez l'investisseur" },
      {
        type: 'paragraphe',
        texte: "Côté investisseur, une société qui souscrit des obligations d'une autre société les inscrit, selon l'intention de détention, en titres de placement (compte **503 Obligations**) ou en titres immobilisés, et comptabilise les coupons au compte **7745 Revenus des obligations**. Le coupon qu'elle encaisse a subi la retenue de 20 % prélevée par l'émettrice : elle enregistre le produit pour son montant brut. Le traitement de la retenue dans sa propre déclaration d'IS doit être vérifié dans la loi n° 23/053 avant toute conclusion. Cette symétrie est utile en audit. Le coupon payé par l'émettrice (6711) se retrouve en produit chez le souscripteur (7745), et la retenue déclarée par l'une doit correspondre à celle que l'autre a subie. Dans un groupe, l'élimination de ces opérations réciproques fait partie de la consolidation.",
      },
      { type: 'intertitre', texte: "6.9.3 La déductibilité et la présentation" },
      {
        type: 'paragraphe',
        texte: "Du côté de l'IS, les intérêts et la prime de remboursement sont des charges financières déductibles s'ils remplissent les conditions générales de l'article 20 : intérêt direct de l'entreprise, charge effective et justifiée, diminution de l'actif net, rattachement à l'exercice d'engagement. Pour les sommes soumises à retenue, la société doit en outre prouver la **déclaration et le paiement de la retenue**. Oublier de reverser la retenue coûte donc deux fois : des pénalités de recouvrement et la déductibilité de la charge. Les articles 39 à 42 encadrent par ailleurs les intérêts versés aux associés et aux entités liées. Une filiale qui placerait l'essentiel de son emprunt auprès de sa société mère doit donc vérifier ces plafonds.",
      },
      {
        type: 'carte',
        titre: "Tableau 6.6 — L'emprunt obligataire dans les états financiers",
        tableau: {
          entetes: ["État", "Poste", "Contenu"],
          lignes: [
            ["Bilan, passif", "DA Emprunts et dettes financières diverses", "Comptes 16 : 1611, 1612, 1613, 1618 et intérêts courus 1661"],
            ["Bilan, passif", "DC Provisions pour risques et charges", "Compte 19 : provision pour prime des convertibles (1988)"],
            ["Bilan, capitaux propres", "CD Primes liées au capital social", "1054 Primes de conversion, après conversion"],
            ["Compte de résultat", "RM Frais financiers et charges assimilées", "67 : 6711 intérêts, 6714 primes de remboursement"],
            ["Compte de résultat", "RN / TL Dotations et reprises financières", "697 et 797 : provision pour prime des convertibles"],
            ["Compte de résultat", "Charges d'exploitation", "6316 Frais d'émission d'emprunts"],
            ["Compte de résultat", "Hors activités ordinaires", "841 : gain de rachat d'obligations"],
            ["Tableau des flux", "Flux des capitaux étrangers", "Variation des comptes 16 **hors intérêts courus** : émissions en encaissements, remboursements en décaissements"],
          ],
        },
        note: "La conversion d'obligations en actions est une opération sans trésorerie : elle ne figure ni en flux de capitaux propres ni en remboursement d'emprunt. Les Notes annexes détaillent les dettes financières par nature et par échéance, et les dettes garanties par des sûretés réelles, ce qui concerne les emprunts assortis d'une hypothèque (section 6.4).",
      },
    ],
  },
  {
    numero: '6.10',
    titre: "Le marché obligataire en RDC : l'État ouvre la voie, la Bourse se construit",
    navLabel: "Marché congolais",
    blocs: [
      { type: 'intertitre', texte: "6.10.1 Le contexte congolais" },
      {
        type: 'paragraphe',
        texte: "En RDC, l'emprunt obligataire des sociétés reste rare. Faute de bourse des valeurs, une SA congolaise qui voulait emprunter auprès du public devait placer ses titres par les banques, sans marché secondaire pour les revendre. Les grandes entreprises se financent surtout par le crédit bancaire et par les capitaux de leurs groupes. Le cadre OHADA étudié dans ce chapitre est pourtant pleinement applicable en RDC depuis son adhésion à l'OHADA, et deux événements de 2026 changent la perspective.",
      },
      {
        type: 'paragraphe',
        texte: "Le premier est la **première émission obligataire internationale de l'État congolais** (eurobond). Selon MediaCongo (9 avril 2026), l'opération visait 750 millions USD, en titres à cinq et dix ans amortissables, avec des rendements indicatifs d'environ 9,125 % pour l'échéance 2032 et 10 % pour l'échéance 2037. RFI (11 août 2026) fait état de 1,25 milliard USD levés en avril, dont 650 millions programmés pour 2026 et 138 millions dépensés à cette date. Des parlementaires se sont inquiétés du coût de portage de fonds empruntés mais non encore utilisés. L'opération ne relève pas de l'AUSCGIE, qui ne régit que les sociétés. Elle illustre toutefois les notions du chapitre : taux facial, amortissement, et coût de la ressource tant qu'elle n'est pas employée. Pour un investisseur congolais, les titres d'emprunt négociables de l'État bénéficient de l'exonération de l'article 80 de la loi n° 23/053.",
      },
      {
        type: 'paragraphe',
        texte: "Le second est la **loi relative aux marchés boursiers**, promulguée le **20 août 2026** et publiée au Journal officiel le **2 septembre 2026** (RFI, 6 septembre 2026). Elle doit permettre aux entreprises de lever des capitaux en actions ou d'**emprunter à moyen et long terme en émettant des obligations** sur la future **Kinshasa Stock Exchange**. Selon la même source, le marché reste à bâtir. Il faut installer l'Autorité de régulation, adopter le règlement général, agréer la bourse, désigner le dépositaire central et les banques de règlement, et mettre en service la plateforme de cotation. Les premières cotations sont annoncées entre juin et décembre 2027. Le contenu détaillé de la loi n'ayant pas été consulté pour ce cours, on s'en tient ici à ces éléments datés et sourcés.",
      },
      { type: 'intertitre', texte: "6.10.2 La préparation à la bourse" },
      {
        type: 'paragraphe',
        texte: "Pour une SA congolaise qui envisage un jour d'émettre des obligations sur la future bourse, le travail commence bien avant l'ouverture du marché. Il faut vérifier les conditions de l'AUSCGIE : forme de SA, deux ans d'existence, deux bilans approuvés, capital entièrement libéré. Il faut disposer de comptes certifiés, établis selon le SYSCOHADA révisé, que des investisseurs pourront analyser. Il faut enfin apprécier sa capacité à servir l'emprunt : un tableau d'amortissement prévisionnel confronté aux flux de trésorerie attendus. Le taux obtenu par l'État lors de son eurobond donne un ordre de grandeur. Une société privée, plus risquée que l'État, devra en principe offrir davantage, sauf garanties solides. Ces chiffres rappellent que l'obligation n'est pas une ressource bon marché : c'est une ressource longue et stable, dont le coût doit être comparé à celui du crédit bancaire et des capitaux propres.",
      },
      { type: 'intertitre', texte: "6.10.3 Application : KOLWEZI INFRA" },
      {
        type: 'paragraphe',
        texte: "Retour à KOLWEZI INFRA, dont le cas 5 détaille les écritures. La société réunissait les conditions de l'émission : SA ancienne de plusieurs exercices, capital entièrement libéré, décision de l'assemblée des actionnaires. Elle a garanti son emprunt par une hypothèque publiée avant la souscription, émis 20 000 obligations au pair, et comptabilisé la dette au prix d'émission au 1611. Chaque clôture lui impose de constater six mois d'intérêts courus et une quote-part de la prime de remboursement. Chaque 30 juin, elle paie le coupon en retenant 20 % à la source, qu'elle reverse avant le 15 juillet. Si la Bourse de Kinshasa ouvre comme prévu, une société comme KOLWEZI INFRA pourra un jour placer un tel emprunt auprès du public, avec les obligations d'information de l'appel public à l'épargne.",
      },
      {
        type: 'filet',
        titre: "Les obligations d'information à anticiper",
        texte: "Dès que la bourse fonctionnera, les SA congolaises cotées relèveront des règles de publicité renforcée de l'AUSCGIE : publication des états financiers dans les quatre mois de la clôture, puis des comptes approuvés dans les quarante-cinq jours (art. 846-848). Les règles de l'appel public à l'épargne s'y ajouteront, dont la notice d'émission des obligations (art. 842-844) et les avis de convocation des assemblées d'obligataires (art. 845). Le règlement général à venir fixera les exigences propres au marché de Kinshasa, et il faudra le lire à sa publication.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: "ÉQUATEUR PALMIER SA : emprunt à amortissements constants",
    contexte: "ÉQUATEUR PALMIER SA (constituée depuis six ans, capital intégralement libéré) émet le 01/01/N, sur décision de son assemblée générale, 8 000 obligations de nominal 10 000, au prix d'émission de 9 800, remboursables à 10 200 par amortissements constants sur 4 ans (2 000 obligations par an), au taux de 6 % l'an à terme échu. Frais d'émission : 1 200 000. Les fonds sont reçus directement (prise ferme bancaire).",
    questions: [
      {
        num: 1,
        enonce: "Vérifiez la validité juridique de l'émission.",
        correction: "Émetteur qualifié : SA (art. 780) ayant plus de deux ans d'existence — donc au moins deux bilans approuvés à vérifier, condition remplie à six ans d'activité normale ; capital entièrement libéré (art. 781) ; pas d'obligations à lots (art. 782) ; décision de l'assemblée générale des actionnaires, seule compétente (art. 783 ; art. 546, 5°). Toute émission contraire serait nulle (art. 783-1).",
      },
      {
        num: 2,
        enonce: "Passez les écritures d'émission.",
        correction: "Prise ferme : écriture unique — débit 521 Banques 78 400 000 (8 000 × 9 800) / crédit 1611 Emprunts obligataires ordinaires 78 400 000. Frais d'émission en charges : débit 6316 Frais d'émission d'emprunts 1 200 000 / crédit 521 pour 1 200 000. La prime totale (8 000 × 400 = 3 200 000) n'est pas comptabilisée à l'émission.",
      },
      {
        num: 3,
        enonce: "Dressez le tableau de service de l'emprunt.",
        correction: "Intérêt par obligation : 6 % × 10 000 = 600. N : 8 000 vivantes, intérêts 4 800 000, 2 000 amorties à 10 200 = 20 400 000, annuité 25 200 000. N+1 : 6 000 vivantes, intérêts 3 600 000, amortissement 20 400 000, annuité 24 000 000. N+2 : 4 000 vivantes, intérêts 2 400 000, annuité 22 800 000. N+3 : 2 000 vivantes, intérêts 1 200 000, annuité 21 600 000. Totaux : intérêts 12 000 000 ; remboursements 81 600 000 ; annuités 93 600 000.",
      },
      {
        num: 4,
        enonce: "Passez l'écriture de la première annuité (31/12/N).",
        correction: "Prime étalée au prorata des obligations échues : 3 200 000 / 4 = 800 000 par an. Écriture : débit 1611 pour 19 600 000 (20 400 000 − 800 000, soit 2 000 × 9 800), débit 6711 Charges d'intérêts 4 800 000, débit 6714 Primes de remboursement des obligations 800 000 / crédit 521 Banques 25 200 000 (schéma de l'Application 78).",
      },
      {
        num: 5,
        enonce: "La société rachète en bourse, en N+2, 500 de ses obligations et les rembourse. Peut-elle les replacer ultérieurement ?",
        correction: "Non : les obligations rachetées par la société émettrice et remboursées sont annulées et ne peuvent être remises en circulation (art. 784). Le rachat-annulation éteint définitivement la fraction correspondante de la dette.",
      },
    ],
  },
  {
    id: 'cas2',
    titre: "CONGO CENTRAL CIMENTS SA : emprunt in fine",
    contexte: "CONGO CENTRAL CIMENTS SA émet le 01/01/N 10 000 obligations de nominal 8 000, au prix d'émission de 7 600, remboursables in fine le 31/12/N+3 à 8 300, au taux de 7 % l'an à terme échu (prise ferme).",
    questions: [
      {
        num: 1,
        enonce: "Passez l'écriture d'émission et calculez la prime totale.",
        correction: "Débit 521 Banques 76 000 000 (10 000 × 7 600) / crédit 1611 pour 76 000 000. Prime de remboursement : 10 000 × (8 300 − 7 600) = 7 000 000, non comptabilisée à l'émission.",
      },
      {
        num: 2,
        enonce: "Comment la prime est-elle rattachée aux exercices ? Passez l'écriture du 31/12/N.",
        correction: "Remboursement in fine : toutes les obligations vivent jusqu'au terme, l'étalement se fait au prorata des intérêts courus (Application 79). Intérêts annuels : 10 000 × 7 % × 8 000 = 5 600 000, identiques sur 4 exercices (total 22 400 000) : chaque exercice porte un quart de la prime, soit 1 750 000. Écritures du 31/12/N : débit 6711 5 600 000 / crédit 521 pour 5 600 000 (paiement du coupon) ; débit 6714 1 750 000 / crédit 1661 Intérêts courus sur emprunts obligataires 1 750 000 (rattachement de la prime).",
      },
      {
        num: 3,
        enonce: "Passez les écritures du dénouement au 31/12/N+3.",
        correction: "Dernier coupon : débit 6711 5 600 000 / crédit 521. Dernière quote-part de prime : débit 6714 1 750 000 / crédit 1661 (le 1661 cumule alors 7 000 000). Remboursement : 10 000 × 8 300 = 83 000 000 — débit 1611 76 000 000 et débit 1661 7 000 000 / crédit 521 Banques 83 000 000. La dette au prix d'émission et la prime accumulée sont soldées ensemble.",
      },
      {
        num: 4,
        enonce: "Comparez la charge financière totale de l'emprunt pour la société et son taux de revient apparent.",
        correction: "Charges totales : intérêts 22 400 000 + prime 7 000 000 = 29 400 000 (hors frais d'émission éventuels), pour 76 000 000 effectivement reçus sur 4 ans. Le coût effectif excède donc le taux facial de 7 % : la décote d'émission (400 par titre) et la prime de remboursement (300 par titre) renchérissent la ressource — c'est tout l'objet de l'étalement du 6714, qui rattache ce surcoût aux exercices qui bénéficient du financement plutôt qu'au seul exercice du remboursement.",
      },
    ],
  },
  {
    id: 'cas3',
    titre: "KINSHASA DIGITAL SA : obligations convertibles",
    contexte: "KINSHASA DIGITAL SA émet le 01/01/N, avec prise ferme, 10 000 obligations convertibles de nominal 12 000, au prix d'émission de 10 800, convertibles à partir du deuxième anniversaire à raison de 2 obligations contre 1 action de nominal 20 000, ou remboursables au terme de 5 ans à 12 000. Au 01/01/N+3, 6 000 obligations sont converties.",
    questions: [
      {
        num: 1,
        enonce: "Passez les écritures d'émission et de clôture N.",
        correction: "Émission : débit 521 Banques 108 000 000 (10 000 × 10 800) / crédit 1612 Emprunts obligataires convertibles 108 000 000 — seul le prix d'émission est constaté, la prime n'est ni comptabilisée ni étalée (Application 80). Provision du risque de prime au 31/12/N : 10 000 × (12 000 − 10 800) = 12 000 000 — débit 6971 Dotations aux provisions financières pour risques et charges / crédit 1988 Autres provisions pour divers risques et charges 12 000 000.",
      },
      {
        num: 2,
        enonce: "Passez l'écriture de conversion du 01/01/N+3.",
        correction: "6 000 obligations converties → 6 000 / 2 = 3 000 actions de nominal 20 000, soit 60 000 000 de capital. Dette convertie : 6 000 × 10 800 = 64 800 000. Écriture : débit 1612 64 800 000 / crédit 1013 pour 60 000 000 et crédit 1054 Primes de conversion 4 800 000. Aucun flux de trésorerie : la dette devient des capitaux propres.",
      },
      {
        num: 3,
        enonce: "Quel sort pour la provision après la conversion ?",
        correction: "La quote-part de provision afférente aux 6 000 obligations converties est reprise : 6 000 × 1 200 = 7 200 000 — débit 1988 / crédit 7971 Reprises de provisions financières pour risques et charges 7 200 000. La provision résiduelle (4 800 000) couvre les 4 000 obligations restantes ; si elles sont remboursées en numéraire au terme, la prime (4 000 × 1 200 = 4 800 000) sera portée au débit du 6714 et la provision reprise en conséquence.",
      },
      {
        num: 4,
        enonce: "Pourquoi les actionnaires n'ont-ils pas eu à exercer de droit préférentiel de souscription lors de la conversion ?",
        correction: "Parce que la décision d'émission de valeurs mobilières donnant accès au capital emporte, de plein droit, renonciation des actionnaires à leur droit préférentiel de souscription aux titres de capital auxquels ces valeurs donnent droit (art. 587-2, vu au chapitre 4). Le consentement des actionnaires a été donné en amont, lors du vote de l'émission des convertibles.",
      },
    ],
  },
  {
    id: 'cas4',
    titre: "LULUA FINANCE : questions de régularité et de masse",
    contexte: "Plusieurs situations indépendantes : (a) MBUJI TRANS SARL, prospère depuis dix ans, veut émettre des obligations pour financer sa flotte ; (b) LOMAMI STEEL SA, constituée depuis quatre ans, a un capital libéré aux trois quarts ; (c) KAMINA AGRI SA, éligible, a émis en N−1 des obligations ; son directeur général propose que le directeur financier de la société soit désigné représentant de la masse « pour faciliter la coordination » ; (d) les obligataires de KAMINA AGRI, inquiets d'un projet de fusion, veulent faire entendre leur voix à l'assemblée des actionnaires.",
    questions: [
      {
        num: 1,
        enonce: "MBUJI TRANS SARL peut-elle émettre des obligations ?",
        correction: "Non. L'article 780 réserve l'émission aux sociétés anonymes et aux GIE constitués de SA ; la SARL en est exclue — et l'article 58 lui interdisait déjà d'émettre des titres négociables ou d'en garantir l'émission, à peine de nullité. Son financement de marché passe par une transformation en société par actions, ou par l'emprunt bancaire classique.",
      },
      {
        num: 2,
        enonce: "LOMAMI STEEL SA peut-elle émettre ?",
        correction: "Non, pas en l'état : l'émission d'obligations est interdite aux sociétés dont le capital n'est pas entièrement libéré (art. 781 ; déjà l'art. 389, avant-dernier alinéa). La société remplit la condition d'ancienneté (quatre ans, deux bilans approuvés), mais doit d'abord appeler et obtenir la libération du dernier quart. Une émission passée outre serait nulle (art. 783-1).",
      },
      {
        num: 3,
        enonce: "Le directeur financier de KAMINA AGRI peut-il représenter la masse ?",
        correction: "Non. L'article 787 exclut du mandat de représentant, entre autres, les dirigeants sociaux de la société débitrice et ses employés — le directeur financier cumule les deux qualités. Le représentant est élu par l'assemblée générale des obligataires (un à trois mandataires, art. 786), parmi des personnes indépendantes de la débitrice, résidentes de l'État partie du siège ; en cas d'urgence, désignation judiciaire (art. 788).",
      },
      {
        num: 4,
        enonce: "Comment les obligataires peuvent-ils peser sur le projet de fusion ?",
        correction: "La masse, dotée de la personnalité juridique (art. 785), agit par ses représentants : ceux-ci accomplissent tous les actes de gestion pour la défense des intérêts communs (art. 790) et peuvent participer aux assemblées d'actionnaires — mais sans voix délibérative (art. 791) : les obligataires ne votent pas la fusion. Leur assemblée générale peut être réunie à toute époque (art. 795), notamment sur convocation demandée par des obligataires représentant au moins le trentième des titres (art. 796), pour arrêter la position du groupement.",
      },
    ],
  },
  {
    id: 'cas5',
    titre: "KOLWEZI INFRA SA : emprunt garanti, coupon décalé et retenue à la source",
    contexte: "KOLWEZI INFRA SA, constituée en 2019, au capital entièrement libéré, clôture ses comptes au 31 décembre. Son AGO du 15/02/N autorise l'émission d'un emprunt garanti par une hypothèque sur son dépôt logistique. Le 01/07/N, elle émet 20 000 obligations de nominal 10 000 FC, au pair, remboursables in fine le 30/06/N+5 à 10 400. Le coupon est de 8 % l'an, payable le 30 juin. Les souscriptions sont recueillies par la société ; les fonds sont reçus le 01/07/N. Frais d'émission : 3 000 000 FC. Une société qui détient 12 % du capital de KOLWEZI INFRA a souscrit 2 000 obligations.",
    questions: [
      {
        num: 1,
        enonce: "Quelles formalités la garantie hypothécaire impose-t-elle, et dans quel ordre ?",
        correction: "L'AGO qui décide l'émission détermine la sûreté ou délègue ce pouvoir (art. 815). Constituée avant l'émission, l'hypothèque fait l'objet d'un acte spécial pour le compte du groupement des obligataires en formation, et sa publicité est accomplie avant toute souscription (art. 816). Les souscriptions valent acceptation, avec effet rétroactif à la date d'inscription (art. 817). Le résultat de la souscription est constaté par acte notarié dans les six mois de son ouverture, puis mentionné en marge de l'inscription dans les trente jours (art. 818). La mainlevée ne pourra être donnée que par les représentants de la masse, après remboursement intégral et paiement des intérêts, sur autorisation de l'assemblée des obligataires (art. 820).",
      },
      {
        num: 2,
        enonce: "Passez les écritures d'émission.",
        correction: "Émission au pair : 20 000 × 10 000 = 200 000 000. Ouverture : débit 47131 / crédit 1611 pour 200 000 000. Souscription : débit 47132 / crédit 47131 pour 200 000 000. Versement : débit 521 / crédit 47132 pour 200 000 000. Frais : débit 6316 / crédit 521 pour 3 000 000. Prime de remboursement : 20 000 × (10 400 − 10 000) = 8 000 000, non comptabilisée à l'émission.",
      },
      {
        num: 3,
        enonce: "Passez les écritures d'inventaire au 31/12/N.",
        correction: "Intérêts courus de six mois : 200 000 000 × 8 % × 6/12 = 8 000 000 ; débit 6711 / crédit 1661. Prime, emprunt in fine, donc au prorata des intérêts courus : intérêts totaux sur cinq ans = 16 000 000 × 5 = 80 000 000, dont 8 000 000 courus en N. Quote-part : 8 000 000 × 8/80 = 800 000 ; débit 6714 / crédit 1661.",
      },
      {
        num: 4,
        enonce: "Passez les écritures de l'exercice N+1 relatives au coupon, jusqu'au reversement de la retenue.",
        correction: "01/01/N+1 : contrepassation des intérêts courus, débit 1661 / crédit 6711 pour 8 000 000. 30/06/N+1 : coupon brut de 16 000 000, débit 6711 16 000 000 / crédit 447 pour 3 200 000 (retenue de 20 %, art. 120 de la loi n° 23/053) et crédit 521 pour 12 800 000. Au plus tard le 15/07/N+1 : débit 447 / crédit 521 pour 3 200 000 (AM n° 008/2025). 31/12/N+1 : nouveaux intérêts courus, débit 6711 / crédit 1661 pour 8 000 000. Charge nette de N+1 : 16 000 000 − 8 000 000 + 8 000 000 = 16 000 000, soit exactement une année d'intérêts.",
      },
      {
        num: 5,
        enonce: "Calculez la quote-part de prime de N+1 et le montant présenté en rubrique DA au 31/12/N+1.",
        correction: "Intérêts courus sur N+1 : 16 000 000 sur 80 000 000, soit 8 000 000 × 16/80 = 1 600 000 ; débit 6714 / crédit 1661. Au 31/12/N+1, DA comprend le 1611 (200 000 000) et le 1661 : intérêts courus 8 000 000 + prime cumulée 2 400 000 (800 000 + 1 600 000) = 10 400 000. Total : 210 400 000. Dans le tableau des flux, seule la variation du 1611 (hors intérêts courus) constitue un flux de capitaux étrangers : l'encaissement de 200 000 000 en N.",
      },
      {
        num: 6,
        enonce: "En N+2, la société propose de reporter l'échéance d'un an. Qui décide, à quelle majorité, et la société actionnaire à 12 % peut-elle voter ?",
        correction: "Le report d'échéance modifie le contrat d'emprunt : il relève de l'assemblée extraordinaire des obligataires (art. 804, 4°), qui délibère avec le quorum de l'article 553 et statue à la majorité des deux tiers des voix des porteurs présents ou représentés. La société qui détient au moins 10 % du capital de la débitrice ne peut pas voter avec ses obligations (art. 806) : ses 2 000 titres sont exclus du vote. La décision ne pourrait en aucun cas traiter inégalement les porteurs de l'émission (art. 808).",
      },
    ],
  },
  {
    id: 'cas6',
    titre: "MATADI PORT SERVICES SA : cycle de vie d'un emprunt convertible",
    contexte: "Le 01/01/N, MATADI PORT SERVICES SA émet, avec prise ferme, 8 000 obligations convertibles de nominal 20 000 FC, au prix d'émission de 18 000. Chaque obligation est convertible, à partir du 01/01/N+2, en une action de nominal 15 000 ; à défaut, elle est remboursée le 31/12/N+4 à 20 000. Le coupon (4 %) est payé normalement chaque année. La société provisionne la prime totale à la clôture de N. Le 01/01/N+3, 5 000 obligations sont converties ; les 3 000 autres sont remboursées au terme. En N+2, le conseil envisage de proposer à l'AGE un amortissement du capital.",
    questions: [
      {
        num: 1,
        enonce: "Quelles décisions sociales l'émission supposait-elle, et quel est le sort du DPS des actionnaires ?",
        correction: "L'émission de valeurs mobilières donnant accès au capital est autorisée par l'AGE, selon les règles de l'augmentation de capital, sur rapport du conseil et rapport spécial du commissaire aux comptes, à peine de nullité (art. 822-5). Les actionnaires disposent d'un droit préférentiel à la souscription des obligations convertibles (art. 822-1), et la décision d'émission emporte renonciation à leur DPS sur les actions à provenir de la conversion (art. 587-2).",
      },
      {
        num: 2,
        enonce: "Passez les écritures du 01/01/N et du 31/12/N (hors coupon).",
        correction: "Émission : débit 521 / crédit 1612 pour 144 000 000 (8 000 × 18 000). Seul le prix d'émission est constaté ; la prime n'est ni comptabilisée ni étalée (AUDCIF, ch. 20, § 2.2.4). Provision au 31/12/N : 8 000 × (20 000 − 18 000) = 16 000 000 ; débit 6971 / crédit 1988.",
      },
      {
        num: 3,
        enonce: "Le projet d'amortissement du capital de N+2 est-il possible ?",
        correction: "Pas librement. Dès l'émission de valeurs mobilières donnant accès au capital, la société ne peut plus amortir son capital, sauf autorisation dans les conditions de l'article 822-14 (assemblée de la masse des titulaires) et à condition de prendre les mesures de maintien de leurs droits prévues aux articles 822-10 et suivants ou par le contrat d'émission (art. 822-8). À défaut, la délibération est nulle. Le conseil doit donc soit renoncer, soit réunir la masse des porteurs d'OCA et organiser la protection de leurs droits, par exemple par un ajustement de la parité.",
      },
      {
        num: 4,
        enonce: "Passez les écritures de la conversion du 01/01/N+3.",
        correction: "5 000 obligations converties en 5 000 actions de 15 000 : capital 75 000 000. Dette convertie : 5 000 × 18 000 = 90 000 000. Débit 1612 90 000 000 / crédit 1013 pour 75 000 000 et crédit 1054 Primes de conversion pour 15 000 000. Reprise de la provision afférente : 5 000 × 2 000 = 10 000 000 ; débit 1988 / crédit 7971, rattachée à l'exercice N+3. Aucun flux de trésorerie.",
      },
      {
        num: 5,
        enonce: "Passez les écritures du remboursement du 31/12/N+4.",
        correction: "3 000 obligations remboursées à 20 000 : 60 000 000. Débit 1612 pour 54 000 000 (3 000 × 18 000) et débit 6714 pour 6 000 000 (prime) / crédit 521 pour 60 000 000. Reprise du solde de provision : débit 1988 / crédit 7971 pour 6 000 000. La charge de prime et la reprise se compensent dans le résultat de N+4, mais la charge avait été anticipée dès N par la dotation.",
      },
      {
        num: 6,
        enonce: "Quel est l'effet global de l'emprunt sur les capitaux propres et sur le tableau des flux ?",
        correction: "Capitaux propres : + 75 000 000 de capital et + 15 000 000 de prime de conversion, sans apport de trésorerie nouveau au moment de la conversion. Tableau des flux : encaissement de 144 000 000 en N (flux des capitaux étrangers, variation du compte 16) et décaissement de 54 000 000 en N+4 au titre du remboursement de la dette ; la part de prime (6 000 000) est une charge financière décaissée. La conversion n'apparaît pas dans le tableau, faute de flux réel. Les coupons à 4 % sont traités comme ceux d'un emprunt ordinaire, avec la retenue à la source de 20 %.",
      },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 6,
  id: 'ue3-chapitre-6',
  titre: "L'emprunt obligataire",
  sousTitre: "AUSCGIE révisé, art. 779-822-15 et 842-845 · AUDCIF, Titre VIII, ch. 20 · SYSCOHADA, Applications 78, 79 et 80 · loi n° 23/053, art. 77, 80 et 120",
  infoBulle: "Conditions d'émission (SA de deux ans, capital libéré, assemblée seule compétente), masse des obligataires et ses représentants, assemblée des obligataires, sûretés, rachat et annulation, tableau d'amortissement, comptabilisation de l'émission, de la prime (6714) et des intérêts courus (1661), emprunt in fine, obligations convertibles et valeurs mobilières composées, retenue à la source de 20 % sur les intérêts, eurobond de l'État et future Bourse de Kinshasa.",
  loiRef: "Art. 58, 546, 587-2, 779-822-15, 842-848 AUSCGIE · AUDCIF, Titre VIII, ch. 20 · App. 78-80 · loi n° 23/053, art. 20, 77, 80, 81, 120 · AM n° 008/2025",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Définir l'obligation et vérifier les conditions d'une émission régulière (art. 58, 779-784, 842-844)",
    "Expliquer l'organisation de la masse des obligataires, le statut de ses représentants et le fonctionnement de l'assemblée des obligataires (art. 785-813)",
    "Mettre en œuvre les sûretés, le remboursement anticipé, le rachat et l'annulation des obligations (art. 814-821-1 ; AUDCIF, ch. 20, § 1.7-1.9)",
    "Distinguer les primes et construire un tableau d'amortissement selon la loi d'amortissement retenue",
    "Comptabiliser l'émission, le service, la prime de remboursement et les intérêts courus (Applications 78 et 79)",
    "Traiter les obligations convertibles et les autres valeurs mobilières composées (art. 822-822-14 ; Application 80)",
    "Appliquer la retenue à la source congolaise sur les intérêts et présenter l'emprunt dans les états financiers",
    "Situer l'emprunt obligataire dans le contexte congolais de 2026 : eurobond de l'État et loi relative aux marchés boursiers",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Obligations : titres négociables conférant, dans une même émission, les mêmes droits de créance pour une même valeur nominale (art. 779). L'obligataire est un créancier, pas un associé.",
    "Émission réservée aux SA et GIE de SA ayant deux ans d'existence et deux bilans approuvés, capital entièrement libéré, sans obligations à lots, sur décision de l'assemblée des actionnaires (délégation de deux ans), à peine de nullité (art. 780-783-1).",
    "Masse de plein droit dotée de la personnalité juridique ; un à trois représentants élus, résidents et indépendants de la débitrice ; pas d'immixtion dans la gestion, présence sans vote aux assemblées d'actionnaires (art. 785-794).",
    "Assemblée ordinaire des obligataires : quorum de l'art. 549, majorité simple ; assemblée extraordinaire, pour toute modification du contrat : quorum de l'art. 553, deux tiers ; ni charges accrues ni traitement inégal ; vote interdit à la société qui détient 10 % du capital (art. 803-808).",
    "Pas de remboursement anticipé imposé sans clause (art. 814) ; obligations rachetées et remboursées annulées (art. 784), avec un gain de rachat porté au 841.",
    "Émission : dette au prix d'émission au 1611 (47131 et 47132 pendant la souscription) ; frais au 6316 ; prime comptable = prix de remboursement − prix d'émission.",
    "Prime étalée au 6714 : au prorata des obligations échues pour un emprunt amorti par séries (Application 78), au prorata des intérêts courus pour l'emprunt in fine, par le crédit du 1661 (Application 79). Intérêts courus à la clôture : 6711 / 1661, contrepassés à l'ouverture.",
    "Convertibles : prix d'émission au 1612, provision du risque de prime (6971 / 1988), conversion portée au 1013 et au 1054 sans trésorerie, reprise de la provision ; les actionnaires ont renoncé à leur DPS sur les actions à provenir (art. 587-2).",
    "RDC : intérêts et primes de remboursement des obligations = revenus des capitaux mobiliers, retenue de 20 % reversée au plus tard le 15 du mois suivant ; titres de l'État, des Provinces et des ETD exonérés (loi n° 23/053, art. 77, 80, 120).",
    "Contexte 2026 : premier eurobond de l'État congolais (avril 2026) ; loi relative aux marchés boursiers promulguée le 20 août 2026, premières cotations annoncées pour 2027.",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "30 janvier 2014 ; art. 58, 546, 549, 553, 587-2, 745, 779 à 822-15, 842 à 848, 853-3 et 853-4" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)", precision: "Titre VIII, chapitre 20 (emprunt obligataire) et chapitre 41 (première application) ; Titre VII, comptes 161, 166, 4713, 5031 et 671" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Guide d'application", precision: "Applications 78 (amortissements constants avec prime), 79 (remboursement in fine) et 80 (emprunt convertible en actions)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, plan de comptes et maquette des états financiers", precision: "comptes 1054, 1611 à 1618, 1661, 1988, 447, 47131, 47132, 5031, 6316, 6711, 6714, 6971, 7971, 841 ; rubriques DA, DC, RM, RN et TL" },
    { genre: 'texte', intitule: "Loi n° 23/053 du 30 novembre 2023 relative à l'impôt sur les sociétés et à l'impôt sur le revenu des personnes physiques", precision: "art. 20, 39 à 42, 72, 77, 80, 81 et 120" },
    { genre: 'texte', intitule: "Arrêté ministériel n° 008/CAB/MIN/FINANCES/2025 du 19 février 2025 (retenue IRPP sur les revenus des capitaux mobiliers)", precision: "reversement au plus tard le 15 du mois suivant" },
    { genre: 'article', auteur: "MediaCongo", titre: "Marchés financiers : la RDC réussit sa première émission obligataire internationale et vise 750 millions USD", support: "mediacongo.net", precision: "9 avril 2026, consulté le 24 septembre 2026" },
    { genre: 'article', auteur: "RFI", titre: "RDC : Kinshasa défend son milliard de dollars issu d'eurobonds pour des grands projets", support: "rfi.fr", precision: "11 août 2026, consulté le 24 septembre 2026" },
    { genre: 'article', auteur: "RFI", titre: "RDC : une loi ouvre la voie à la création d'une Bourse de Kinshasa, le marché reste à construire", support: "rfi.fr", precision: "6 septembre 2026, consulté le 24 septembre 2026" },
    { genre: 'ouvrage', auteur: "Mapapa Mbangala A., Nkoy Mbangala C. et Mensah Freitas C.", titre: "Comptabilité des sociétés OHADA", editeur: "Droit Afrique", lieu: "s.l.", annee: "2026" },
    { genre: 'ouvrage', auteur: "Dobill M.", titre: "Comptabilité OHADA, tome 3 : comptabilité des sociétés", editeur: "Karthala", lieu: "Paris", annee: "2013" },
    { genre: 'ouvrage', auteur: "Nzoimbengene Luyindula B. D.", titre: "Comptabilité des sociétés suivant le système comptable OHADA révisé", editeur: "2e éd., à compte d'auteur", lieu: "s.l.", annee: "2025" },
    { genre: 'ouvrage', auteur: "Pougoué P.-G. (dir.)", titre: "Encyclopédie du droit OHADA", editeur: "Lamy", lieu: "Paris", annee: "2011" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · AUDCIF et SYSCOHADA révisé (Applications 78, 79, 80) · loi n° 23/053 du 30 novembre 2023 · arrêté ministériel n° 008/2025 · MediaCongo (9 avril 2026) et RFI (11 août et 6 septembre 2026).",
}

export default chapitre
