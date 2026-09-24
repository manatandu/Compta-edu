// Chapitre 4 du module UE3, Comptabilité des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014 : art. 44, 62-63, 68, 357-363 (SARL),
//   562-626-6 (SA : procédés, compétence, DPS, libération, dépôt, DNSV,
//   apports en nature, attribution gratuite d'actions), 853-3 et 853-11
//   (SAS), skill auscgie-acte-uniforme ;
// - AUDCIF, Titre VII, compte 105 (primes et imputation des frais
//   d'augmentation) ; SYSCOHADA révisé, Applications 60, 61, 76 et 77 ;
//   plan de comptes (1013, 1051-1054, 1132, 118, 4615, 4719, 5021, 6772,
//   781), skills audcif-acte-uniforme et syscohada ;
// - ANAPI, « Comment créer une banque ? » (février 2026) ; Bankable,
//   23 avril et 18 juin 2025 ; ACP, 26 novembre 2025 ; Droit Médias
//   Finance, janvier 2026 (réforme de la loi n° 22/069, non promulguée à
//   notre connaissance), consultés le 24 septembre 2026 via Firecrawl.
// La valeur théorique des droits est présentée comme technique financière
// de la pratique, non comme règle légale.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch4-q1', question: "Par quels procédés le capital d'une SA peut-il être augmenté ?",
    options: [
      { id: 'a', texte: "Uniquement par apports en numéraire" },
      { id: 'b', texte: "Par émission d'actions ordinaires ou de préférence, ou par majoration du nominal des actions existantes" },
      { id: 'c', texte: "Par simple réévaluation des actifs" },
      { id: 'd', texte: "Par emprunt bancaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 562 AUSCGIE',
    explication: "Le capital est augmenté soit par émission d'actions ordinaires ou de préférence, soit par majoration du nominal des actions existantes ; il peut aussi l'être par l'exercice de droits attachés à des valeurs mobilières donnant accès au capital (art. 562).",
  },
  {
    id: 'ch4-q2', question: "La majoration du nominal des actions existantes, hors incorporation, exige :",
    options: [
      { id: 'a', texte: "La majorité des deux tiers" },
      { id: 'b', texte: "Le consentement unanime des actionnaires" },
      { id: 'c', texte: "Une décision du conseil" },
      { id: 'd', texte: "Aucune condition particulière" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 562 AUSCGIE',
    explication: "Elle n'est décidée qu'avec le consentement unanime des actionnaires, à moins qu'elle ne soit réalisée par incorporation de réserves, bénéfices ou primes (art. 562, al. 3) : payer plus pour chaque action existante augmente les engagements de chacun.",
  },
  {
    id: 'ch4-q3', question: "Quel organe est compétent pour décider une augmentation de capital dans la SA ?",
    options: [
      { id: 'a', texte: "Le conseil d'administration" },
      { id: 'b', texte: "L'assemblée générale extraordinaire, sur les rapports du conseil et du commissaire aux comptes" },
      { id: 'c', texte: "Le directeur général" },
      { id: 'd', texte: "Le commissaire aux comptes" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 564 et 569 AUSCGIE',
    explication: "L'AGE est seule compétente pour décider ou autoriser l'augmentation (art. 564). Toute clause conférant au conseil le pouvoir de la décider est réputée non écrite (art. 569) ; le conseil peut seulement recevoir une délégation.",
  },
  {
    id: 'ch4-q4', question: "Pour une augmentation par incorporation de réserves, quelles conditions de quorum et de majorité s'appliquent ?",
    options: [
      { id: 'a', texte: "Celles de l'AGE" },
      { id: 'b', texte: "Celles de l'AGO (art. 549 et 550)" },
      { id: 'c', texte: "L'unanimité" },
      { id: 'd', texte: "Aucune, le conseil décide seul" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 565 AUSCGIE',
    explication: "Lorsque l'augmentation est réalisée par incorporation de réserves, bénéfices ou primes, l'assemblée statue aux conditions de quorum et de majorité des assemblées ordinaires (art. 565) : l'opération ne modifie ni les droits ni les engagements respectifs des actionnaires.",
  },
  {
    id: 'ch4-q5', question: "Dans quel délai une augmentation de capital doit-elle être réalisée ?",
    options: [
      { id: 'a', texte: "Six mois" },
      { id: 'b', texte: "Trois ans à compter de l'assemblée qui l'a décidée ou autorisée" },
      { id: 'c', texte: "Un an" },
      { id: 'd', texte: "Sans délai" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 571 AUSCGIE',
    explication: "L'augmentation doit être réalisée dans les trois ans de l'assemblée ; elle est réputée réalisée au jour de l'établissement de la déclaration notariée de souscription et de versement (art. 571).",
  },
  {
    id: 'ch4-q6', question: "Une SA dont le capital n'est libéré qu'à moitié veut émettre des actions nouvelles en numéraire. Est-ce possible ?",
    options: [
      { id: 'a', texte: "Oui, sans condition" },
      { id: 'b', texte: "Non : le capital doit être intégralement libéré avant toute émission d'actions à libérer en numéraire" },
      { id: 'c', texte: "Oui, si le conseil l'autorise" },
      { id: 'd', texte: "Oui, avec une prime d'émission" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 572 et 389 AUSCGIE',
    explication: "« Le capital doit être intégralement libéré avant toute émission d'actions nouvelles à libérer en numéraire » (art. 572). Une augmentation par apport en nature reste possible (art. 389).",
  },
  {
    id: 'ch4-q7', question: "Qu'est-ce que le droit préférentiel de souscription à titre irréductible ?",
    options: [
      { id: 'a', texte: "Le droit de souscrire toutes les actions nouvelles" },
      { id: 'b', texte: "Le droit, proportionnel au nombre d'actions détenues, de souscrire par préférence les actions de numéraire émises" },
      { id: 'c', texte: "Le droit de refuser l'augmentation" },
      { id: 'd', texte: "Le droit au dividende des actions nouvelles" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 573 AUSCGIE',
    explication: "Les actionnaires ont, proportionnellement au montant de leurs actions, un droit de préférence irréductible à la souscription des actions de numéraire émises (art. 573). Le titre réductible, qui répartit les actions non souscrites, suppose une décision expresse de l'assemblée (art. 575).",
  },
  {
    id: 'ch4-q8', question: "Quel est le délai minimal de souscription ouvert aux actionnaires ?",
    options: [
      { id: 'a', texte: "Huit jours" },
      { id: 'b', texte: "Vingt jours à compter de l'ouverture de la souscription" },
      { id: 'c', texte: "Trois mois" },
      { id: 'd', texte: "Aucun délai" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 577 AUSCGIE',
    explication: "Le délai accordé aux actionnaires pour exercer leur droit ne peut être inférieur à vingt jours à compter de l'ouverture de la souscription (art. 577) ; il se clôt par anticipation lorsque tous les droits ont été exercés ou que l'augmentation est intégralement souscrite (art. 578).",
  },
  {
    id: 'ch4-q9', question: "Les souscriptions atteignent 97 % de l'augmentation prévue. Que peut faire le conseil ?",
    options: [
      { id: 'a', texte: "Il doit annuler l'opération" },
      { id: 'b', texte: "Il peut limiter d'office l'augmentation au montant atteint" },
      { id: 'c', texte: "Il doit convoquer une nouvelle AGE" },
      { id: 'd', texte: "Il doit souscrire lui-même le solde" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 579-580 AUSCGIE',
    explication: "Le conseil peut limiter d'office l'augmentation au montant atteint lorsque les souscriptions représentent 97 % de l'augmentation. En deçà, la limitation suppose trois quarts au moins et une autorisation expresse de l'assemblée.",
  },
  {
    id: 'ch4-q10', question: "L'AGE supprime le DPS au profit d'un actionnaire nommément désigné. Cet actionnaire peut-il voter ?",
    options: [
      { id: 'a', texte: "Oui, avec toutes ses actions" },
      { id: 'b', texte: "Non : il ne vote ni pour lui ni comme mandataire, et ses actions sont exclues du quorum et de la majorité" },
      { id: 'c', texte: "Oui, s'il détient moins de 10 %" },
      { id: 'd', texte: "Oui, à titre consultatif" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 586-587 AUSCGIE',
    explication: "Les bénéficiaires de la suppression du DPS ne prennent pas part au vote et leurs actions ne sont pas prises en compte pour le quorum et la majorité (art. 587).",
  },
  {
    id: 'ch4-q11', question: "Quelle est la sanction d'une délibération supprimant le DPS prise sans le rapport du conseil ou du commissaire aux comptes ?",
    options: [
      { id: 'a', texte: "Une simple amende" },
      { id: 'b', texte: "La nullité de la délibération" },
      { id: 'c', texte: "Aucune sanction" },
      { id: 'd', texte: "La responsabilité du notaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 588-591 AUSCGIE',
    explication: "Les délibérations prises en l'absence des rapports du conseil (ou de l'administrateur général) et du commissaire aux comptes sont nulles ; des rapports incomplets les rendent annulables.",
  },
  {
    id: 'ch4-q12', question: "Lors d'une augmentation en numéraire avec prime, que doit verser le souscripteur au minimum ?",
    options: [
      { id: 'a', texte: "Le quart du nominal seulement" },
      { id: 'b', texte: "Le quart du nominal et la totalité de la prime d'émission" },
      { id: 'c', texte: "La totalité du prix" },
      { id: 'd', texte: "La moitié du prix" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 604 AUSCGIE',
    explication: "Les actions souscrites en numéraire sont libérées lors de la souscription d'un quart au moins de leur valeur nominale et, le cas échéant, de la totalité de la prime d'émission (art. 604) ; le surplus du nominal est appelé dans les trois ans de la réalisation (art. 605).",
  },
  {
    id: 'ch4-q13', question: "Quand les fonds versés lors d'une augmentation de capital de SA peuvent-ils être retirés ?",
    options: [
      { id: 'a', texte: "Dès le dépôt" },
      { id: 'b', texte: "Une fois l'augmentation réalisée, sur présentation de la déclaration notariée" },
      { id: 'c', texte: "Après la prochaine AGO" },
      { id: 'd', texte: "Après l'inscription modificative au RCCM uniquement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 615 AUSCGIE',
    explication: "Le retrait ne peut avoir lieu qu'une fois l'augmentation réalisée ; il est effectué par un mandataire de la société sur présentation au dépositaire de la déclaration notariée (art. 615).",
  },
  {
    id: 'ch4-q14', question: "Comment une créance d'un fournisseur sur la SA peut-elle servir à libérer des actions nouvelles ?",
    options: [
      { id: 'a', texte: "Sur simple accord du DG" },
      { id: 'b', texte: "Si elle est certaine, liquide et exigible et fait l'objet d'un arrêté des comptes du conseil certifié exact par le commissaire aux comptes" },
      { id: 'c', texte: "Jamais" },
      { id: 'd', texte: "Seulement si elle est inférieure à 10 % du capital" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 44, 562 et 611 AUSCGIE',
    explication: "La libération par compensation vise des créances certaines, liquides et exigibles (art. 44, 562) ; elles font l'objet d'un arrêté des comptes établi par le conseil ou l'administrateur général et certifié exact par le commissaire aux comptes (art. 611).",
  },
  {
    id: 'ch4-q15', question: "Dans une SARL, quelle majorité faut-il pour une augmentation de capital par apports nouveaux ?",
    options: [
      { id: 'a', texte: "La moitié des parts" },
      { id: 'b', texte: "Les trois quarts du capital social" },
      { id: 'c', texte: "L'unanimité" },
      { id: 'd', texte: "La majorité simple des présents" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 358 AUSCGIE',
    explication: "Les modifications des statuts sont décidées par les associés représentant au moins les trois quarts du capital (art. 358). L'unanimité n'est requise que si l'opération augmente les engagements des associés (art. 359).",
  },
  {
    id: 'ch4-q16', question: "Et pour une augmentation de capital de SARL par incorporation de réserves ?",
    options: [
      { id: 'a', texte: "Les trois quarts du capital" },
      { id: 'b', texte: "Les associés représentant au moins la moitié des parts sociales" },
      { id: 'c', texte: "L'unanimité" },
      { id: 'd', texte: "Le gérant seul" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 360 AUSCGIE',
    explication: "Par dérogation à l'article 358, l'incorporation de bénéfices, réserves ou primes est décidée par les associés représentant au moins la moitié des parts sociales (art. 360). Toute délibération contraire aux art. 358 à 360 est nulle (art. 360-1).",
  },
  {
    id: 'ch4-q17', question: "Dans une augmentation de capital de SARL, comment les parts nouvelles de numéraire sont-elles libérées ?",
    options: [
      { id: 'a', texte: "Du quart, solde en trois ans" },
      { id: 'b', texte: "De la moitié au moins, le surplus dans les deux ans à compter du jour où l'augmentation est devenue définitive" },
      { id: 'c', texte: "Intégralement" },
      { id: 'd', texte: "Selon le choix du gérant" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 361-1 AUSCGIE',
    explication: "Les parts sont libérées de la moitié au moins lors de la souscription ; le surplus l'est dans les deux ans à compter du jour où l'augmentation est devenue définitive (art. 361-1).",
  },
  {
    id: 'ch4-q18', question: "Une SARL augmente son capital par un apport en nature de 3 000 000 FCFA sans commissaire aux apports et sans avantage particulier. Est-ce régulier ?",
    options: [
      { id: 'a', texte: "Non, le commissaire est toujours requis" },
      { id: 'b', texte: "Oui, le seuil de 5 000 000 FCFA n'est pas dépassé ; tout associé peut néanmoins demander au juge d'en nommer un" },
      { id: 'c', texte: "Non, la délibération est nulle" },
      { id: 'd', texte: "Oui, à condition que le gérant l'évalue" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 363 AUSCGIE',
    explication: "Le commissaire aux apports est obligatoire au-delà de 5 000 000 FCFA par apport ou pour l'ensemble des apports, et toujours en cas d'avantages particuliers ; il peut aussi être nommé par le juge à la demande de tout associé (art. 363). Sans lui, lorsqu'il est requis, les délibérations sont nulles.",
  },
  {
    id: 'ch4-q19', question: "Dans l'Application 60 (5 000 actions de 10 000 émises à 15 000), quelle écriture constate la réalisation ?",
    options: [
      { id: 'a', texte: "Débit 521 / crédit 1013 75 000 000" },
      { id: 'b', texte: "Débit 4615 75 000 000 / crédit 1013 50 000 000 et crédit 1051 25 000 000" },
      { id: 'c', texte: "Débit 1051 / crédit 1013" },
      { id: 'd', texte: "Débit 4613 / crédit 109" },
    ],
    reponseCorrecte: 'b', articleRef: 'App. 60',
    explication: "Les fonds reçus par le notaire ont été portés au crédit du 4615 Apporteurs, versements reçus sur augmentation de capital ; à la réalisation, le 4615 est soldé par le crédit du capital (nominal) et de la prime d'émission.",
  },
  {
    id: 'ch4-q20', question: "Comment l'AUDCIF permet-il de traiter les frais d'une augmentation de capital ?",
    options: [
      { id: 'a', texte: "Ils sont obligatoirement immobilisés" },
      { id: 'b', texte: "Ils peuvent être imputés sur la prime : débit 105, crédit 78 Transferts de charges" },
      { id: 'c', texte: "Ils diminuent le capital" },
      { id: 'd', texte: "Ils sont portés au 4615" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, Titre VII, compte 105',
    explication: "Le compte 105 est débité, en cas d'augmentation du capital, « du montant des frais de cette augmentation, par le crédit du 78 (Transferts de charges) en cas d'imputation de ces frais ». Les frais, d'abord en charges, sont ainsi transférés sur la prime.",
  },
  {
    id: 'ch4-q21', question: "Quel est l'effet d'une augmentation par incorporation de réserves sur les capitaux propres ?",
    options: [
      { id: 'a', texte: "Ils augmentent du montant incorporé" },
      { id: 'b', texte: "Ils restent inchangés : virement interne entre réserves et capital" },
      { id: 'c', texte: "Ils diminuent" },
      { id: 'd', texte: "Ils doublent" },
    ],
    reponseCorrecte: 'b', articleRef: 'App. 61',
    explication: "L'Application 61 débite 1181 Réserves facultatives et crédite 1013 : le total des capitaux propres ne change pas, aucune trésorerie n'entre. Seule la composition change, et le capital devient plus élevé et moins disponible.",
  },
  {
    id: 'ch4-q22', question: "Les actions remises en rémunération d'un apport en nature lors d'une augmentation de capital sont :",
    options: [
      { id: 'a', texte: "Libérées du quart" },
      { id: 'b', texte: "Intégralement libérées dès leur émission" },
      { id: 'c', texte: "Libérées dans les trois ans" },
      { id: 'd', texte: "Non libérées" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 626 AUSCGIE',
    explication: "« Les actions d'apports sont intégralement libérées dès leur émission » (art. 626).",
  },
  {
    id: 'ch4-q23', question: "Le commissaire aux apports d'une augmentation de capital de SA peut-il être le commissaire aux comptes de la société ?",
    options: [
      { id: 'a', texte: "Oui, c'est même recommandé" },
      { id: 'b', texte: "Non" },
      { id: 'c', texte: "Oui, avec l'accord de l'AGE" },
      { id: 'd', texte: "Seulement dans les SA non cotées" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 620 AUSCGIE',
    explication: "Le commissaire aux apports est soumis aux incompatibilités des art. 697 et 698 et « ne peut être le commissaire aux comptes de la société » (art. 620). Son rapport est déposé au siège et au RCCM huit jours au moins avant l'AGE, à peine de nullité (art. 622).",
  },
  {
    id: 'ch4-q24', question: "Un apport en nature de 60 000 000 est rémunéré par 4 000 actions de nominal 10 000. Comment le comptabiliser ?",
    options: [
      { id: 'a', texte: "Crédit 1013 60 000 000" },
      { id: 'b', texte: "Crédit 1013 40 000 000 et crédit 1052 Primes d'apport 20 000 000" },
      { id: 'c', texte: "Crédit 1051 60 000 000" },
      { id: 'd', texte: "Crédit 4615 60 000 000" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, compte 105 ; art. 626',
    explication: "La prime d'apport est la différence entre la valeur du bien apporté et le nominal des actions qui le rémunèrent : 60 000 000 − 4 000 × 10 000 = 20 000 000, au compte 1052. Le bien entre à l'actif pour 60 000 000.",
  },
  {
    id: 'ch4-q25', question: "Quel plafond global l'article 626-1 impose-t-il à l'attribution gratuite d'actions aux salariés ?",
    options: [
      { id: 'a', texte: "5 % du capital" },
      { id: 'b', texte: "10 % du capital social à la date de la décision d'attribution" },
      { id: 'c', texte: "25 % du capital" },
      { id: 'd', texte: "Aucun plafond" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 626-1 AUSCGIE',
    explication: "Le nombre total des actions attribuées gratuitement ne peut excéder 10 % du capital à la date de la décision d'attribution. L'autorisation de l'AGE vaut au plus trente-six mois ; la période d'acquisition et l'obligation de conservation sont chacune de deux ans au moins (art. 626-1).",
  },
  {
    id: 'ch4-q26', question: "Un salarié détient déjà 12 % du capital d'une SA non cotée dont les statuts sont muets. Peut-il recevoir des actions gratuites ?",
    options: [
      { id: 'a', texte: "Oui, sans limite" },
      { id: 'b', texte: "Non : il ne peut être attribué d'actions aux salariés détenant chacun plus de 10 % du capital (20 % si les statuts d'une société non cotée le prévoient)" },
      { id: 'c', texte: "Oui, s'il est dirigeant" },
      { id: 'd', texte: "Oui, dans la limite de 5 %" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 626-1-2-1 AUSCGIE',
    explication: "Il ne peut pas être attribué d'actions aux salariés et dirigeants détenant chacun plus de 10 % du capital, ni l'attribution avoir pour effet de leur faire dépasser ce seuil ; dans les sociétés non cotées, les statuts peuvent prévoir un pourcentage plus élevé, sans dépasser 20 %.",
  },
  {
    id: 'ch4-q27', question: "Dans l'Application 77, comment l'attribution gratuite d'actions nouvelles au personnel est-elle comptabilisée ?",
    options: [
      { id: 'a', texte: "Par une charge de personnel" },
      { id: 'b', texte: "Affectation du résultat à une réserve, puis virement de cette réserve au capital (débit réserve / crédit 1013)" },
      { id: 'c', texte: "Par un rachat d'actions propres" },
      { id: 'd', texte: "Par un emprunt" },
    ],
    reponseCorrecte: 'b', articleRef: 'App. 77',
    explication: "L'AGO affecte 30 000 000 du résultat à une réserve (compte 118 dans l'Application ; le plan prévoit aussi le 1132), puis l'augmentation de capital vire cette réserve au 1013. Avec des actions existantes rachetées (Application 76), le mali éventuel est une charge au 6772.",
  },
  {
    id: 'ch4-q28', question: "10 000 actions valent 16 000 ; on émet 2 500 actions à 12 000. Quelle est la valeur théorique du droit de souscription ?",
    options: [
      { id: 'a', texte: "4 000" },
      { id: 'b', texte: "800" },
      { id: 'c', texte: "1 000" },
      { id: 'd', texte: "3 200" },
    ],
    reponseCorrecte: 'b', articleRef: 'Pratique financière (art. 574 : droit négociable)',
    explication: "Valeur après = (10 000 × 16 000 + 2 500 × 12 000) / 12 500 = 15 200. Droit = 16 000 − 15 200 = 800. Contrôle : il faut 4 droits pour une action nouvelle ; 12 000 + 4 × 800 = 15 200.",
  },
  {
    id: 'ch4-q29', question: "Selon l'ANAPI, quel est le capital minimum d'une banque en RDC ?",
    options: [
      { id: 'a', texte: "L'équivalent en francs congolais de 10 millions de dollars" },
      { id: 'b', texte: "L'équivalent en francs congolais de 50 millions de dollars depuis le 31 décembre 2020" },
      { id: 'c', texte: "10 000 000 FCFA, comme toute SA" },
      { id: 'd', texte: "100 millions de dollars" },
    ],
    reponseCorrecte: 'b', articleRef: 'ANAPI, « Comment créer une banque ? » (2026)',
    explication: "La banque se constitue en SA selon le droit OHADA et doit justifier d'un capital souscrit et libéré ; l'ANAPI indique que, depuis le 31 décembre 2020, le minimum est relevé à l'équivalent en francs congolais de 50 millions de dollars. Le droit bancaire complète ici le minimum de l'art. 387 AUSCGIE.",
  },
  {
    id: 'ch4-q30', question: "Qu'en est-il de la règle des quatre actionnaires imposée aux établissements de crédit par la loi n° 22/069 ?",
    options: [
      { id: 'a', texte: "Elle a été abrogée en 2023" },
      { id: 'b', texte: "Elle figure à l'article 11 ; une proposition de loi la ramenant à deux actionnaires a été votée par l'Assemblée nationale en juin 2025 et examinée au Sénat, sans promulgation connue à ce jour" },
      { id: 'c', texte: "Elle ne concerne que les microfinances" },
      { id: 'd', texte: "Elle a été annulée par la Cour constitutionnelle" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 22/069, art. 11 ; Bankable, 18 juin 2025 ; ACP, 26 novembre 2025',
    explication: "L'article 11 exige au moins quatre actionnaires détenant chacun une quotité significative, fixée à 15 % par l'Instruction n° 18 de la BCC. La proposition de loi modificative n'est, selon les sources consultées, pas encore promulguée : la règle de 2022 reste le droit applicable.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '4.1',
    titre: "Les procédés d'augmentation et la compétence de l'assemblée",
    navLabel: "Procédés et compétence",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Kinshasa. **MONGALA ENERGIE SA**, producteur d'électricité au capital de 120 000 000 FC divisé en 12 000 actions de 10 000 FC, veut financer une nouvelle centrale. La banque accepte de prêter, à condition que les actionnaires renforcent d'abord les fonds propres. Le conseil d'administration étudie les options : émettre des actions nouvelles contre de l'argent frais, faire entrer un partenaire par un apport, incorporer des réserves, ou transformer des dettes en capital. Ce chapitre examine chacune de ces voies. Il suit MONGALA ENERGIE, qui choisira d'émettre 3 000 actions nouvelles à 14 000 FC, alors que l'action est estimée à 18 000 FC.",
      },
      {
        type: 'paragraphe',
        texte: "Une société augmente son capital pour trois raisons principales : lever des fonds propres nouveaux pour financer sa croissance, consolider des réserves accumulées afin de rendre le capital plus représentatif, ou faire entrer un partenaire qui apporte un actif, une créance ou un savoir-faire. L'article 68 l'annonçait : le capital peut être augmenté par de **nouveaux apports** ou par l'**incorporation** de réserves, de bénéfices ou de primes. Pour la SA, l'article 562 précise les deux procédés : émission d'actions ordinaires ou de préférence, ou **majoration du montant nominal** des actions existantes, cette dernière exigeant le consentement unanime des actionnaires sauf incorporation. Il énumère aussi les modes de libération des actions nouvelles : espèces, **compensation** avec des créances certaines, liquides et exigibles, incorporation de réserves, bénéfices ou primes, ou apport en nature. Le capital peut encore être augmenté par l'exercice de droits attachés à des valeurs mobilières donnant accès au capital (art. 562, al. 4). Les actions nouvelles sont émises à leur nominal, ou à ce nominal majoré d'une **prime d'émission** (art. 563).",
      },
      {
        type: 'carte',
        titre: "Qui décide ? (art. 564-569)",
        tableau: {
          entetes: ["Situation", "Règle"],
          lignes: [
            ["Principe", "L'assemblée générale **extraordinaire** est seule compétente pour décider ou autoriser l'augmentation, sur les rapports du conseil d'administration (ou de l'administrateur général) et du commissaire aux comptes (art. 564)."],
            ["Incorporation de réserves, bénéfices ou primes", "L'assemblée statue aux conditions de quorum et de majorité des assemblées générales **ordinaires** (art. 565)."],
            ["Délégation de compétence", "L'assemblée qui autorise peut déléguer au conseil (ou à l'administrateur général) la **décision**, pour une durée maximale de **24 mois** et dans la limite d'un plafond global (art. 567-1)."],
            ["Délégation de pouvoirs", "L'assemblée qui décide peut déléguer la **réalisation** : fixer les modalités, constater l'opération, modifier les statuts (art. 568)."],
            ["Verrou", "Toute clause conférant au conseil le pouvoir de décider l'augmentation est **réputée non écrite** (art. 569)."],
          ],
        },
        note: "Deux contraintes de calendrier : l'augmentation doit être réalisée dans les **trois ans** de l'assemblée, et elle est réputée réalisée au jour de la déclaration notariée de souscription et de versement (art. 571) ; le capital ancien doit être **intégralement libéré** avant toute émission d'actions de numéraire (art. 572).",
      },
      {
        type: 'paragraphe',
        texte: "La distinction entre augmentation en numéraire et incorporation est la clé de tout le chapitre. Une augmentation **en numéraire** ou **en nature** apporte à la société des ressources nouvelles : l'actif et les capitaux propres augmentent ensemble, et de nouveaux actionnaires peuvent entrer. Une augmentation **par incorporation** n'apporte rien : elle transforme des réserves ou des primes déjà présentes dans les capitaux propres en capital, sans flux de trésorerie. D'où la différence de régime : la première modifie l'équilibre entre actionnaires et exige une AGE, avec un droit préférentiel pour protéger les anciens ; la seconde ne change rien aux droits respectifs et relève des conditions de l'AGO (art. 565). Le comptable doit identifier la nature de l'opération avant toute écriture, car les comptes mouvementés ne sont pas les mêmes.",
      },
      {
        type: 'paragraphe',
        texte: "Le déroulement type d'une augmentation de capital en numéraire dans une SA s'enchaîne ainsi. Le conseil d'administration prépare l'opération et rédige son rapport ; le commissaire aux comptes établit le sien. L'AGE décide l'augmentation, ou autorise le conseil à la décider par délégation de compétence (art. 567-1), ou décide et délègue au conseil la réalisation (art. 568). La souscription est ouverte pendant vingt jours au moins ; les souscripteurs signent leurs bulletins et versent au moins le quart du nominal et toute la prime ; les fonds sont déposés dans les huit jours. Le notaire établit la déclaration notariée de souscription et de versement, qui marque la réalisation (art. 571) ; les statuts sont modifiés, l'inscription modificative est demandée au RCCM, et les fonds peuvent être retirés (art. 615). Chacune de ces étapes a sa date, et le comptable doit les connaître pour dater ses écritures.",
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
      {
        type: 'paragraphe',
        texte: "La **délégation de compétence** mérite une attention particulière, car elle est souvent mal comprise. Lorsque l'assemblée *autorise* l'augmentation sans la décider elle-même, elle peut déléguer au conseil la compétence pour la décider, pour une durée maximale de vingt-quatre mois et dans la limite d'un plafond global qu'elle fixe (art. 567-1). Le conseil choisit alors le moment et les modalités, ce qui permet de saisir une occasion de marché ou d'attendre l'arrivée d'un investisseur. Mais la compétence de principe reste celle de l'AGE : toute clause qui confierait au conseil, de façon permanente, le pouvoir de décider une augmentation serait réputée non écrite (art. 569). Pour le comptable, la décision du conseil agissant sur délégation est la pièce justificative de l'opération, et elle doit viser la résolution de l'AGE et respecter son plafond.",
      },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
    ],
  },
  {
    numero: '4.2',
    titre: "Le droit préférentiel de souscription et sa valeur",
    navLabel: "Le DPS",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les actions comportent un **droit préférentiel de souscription** aux augmentations de capital : les actionnaires ont, proportionnellement au montant de leurs actions, un droit de préférence **irréductible** à la souscription des actions de numéraire émises (art. 573). Pendant la souscription, ce droit est **négociable** lorsqu'il est détaché d'actions elles-mêmes négociables ; sinon, il est cessible dans les mêmes conditions que l'action (art. 574). Si l'assemblée le décide expressément, les actionnaires bénéficient en outre d'un droit de souscription **à titre réductible** : les actions non souscrites à titre irréductible sont attribuées à ceux qui en ont demandé davantage, dans la limite de leur demande (art. 575-576).",
      },
      {
        type: 'carte',
        titre: "Le déroulement de la souscription",
        liste: [
          "**Délai** : vingt jours au moins à compter de l'ouverture de la souscription (art. 577), avec clôture anticipée dès que tous les droits sont exercés ou que l'augmentation est intégralement souscrite après renonciations (art. 578).",
          "**Souscriptions insuffisantes** (art. 579-580) : le conseil peut, dans l'ordre qu'il détermine, limiter l'augmentation au montant souscrit s'il atteint les trois quarts du montant prévu et si l'assemblée l'a expressément permis, répartir librement les actions non souscrites, ou les offrir au public si l'assemblée l'a admis ; à défaut, l'opération n'est pas réalisée. Faculté d'office : limiter au montant atteint dès que les souscriptions représentent **97 %** de l'augmentation.",
          "**Usufruit** (art. 581-585) : sauf accord contraire, le DPS appartient au **nu-propriétaire** ; s'il néglige de l'exercer, l'usufruitier peut se substituer à lui ; les actions nouvelles appartiennent au nu-propriétaire pour la nue-propriété et à l'usufruitier pour l'usufruit.",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Le DPS a une valeur économique : il compense la **dilution** subie par l'action ancienne lorsque le prix d'émission est inférieur à sa valeur. La pratique financière, et non l'Acte uniforme, qui se borne à rendre le droit négociable ou cessible (art. 574), en calcule la valeur théorique en comparant la valeur de l'action avant et après l'opération. Un actionnaire qui ne souhaite pas souscrire peut vendre ses droits : il reçoit alors l'équivalent de la perte de valeur de ses actions. Un investisseur extérieur qui veut souscrire doit acheter les droits nécessaires : il paie ainsi, en plus du prix d'émission, sa part des réserves accumulées par les anciens.",
      },
      {
        type: 'carte',
        titre: "Formules de la pratique",
        liste: [
          "**Valeur de l'action après l'opération** = (N × V + n × E) / (N + n), où N = actions anciennes, V = valeur de l'action avant, n = actions nouvelles, E = prix d'émission.",
          "**Droit de souscription (ds)** = V − valeur après = n × (V − E) / (N + n).",
          "**Droit d'attribution (da)**, pour des actions gratuites (E = 0) : da = n × V / (N + n).",
          "Vérification : pour souscrire une action nouvelle, il faut N/n droits ; le coût pour un non-actionnaire, E + (N/n) × ds, doit égaler la valeur de l'action après l'opération.",
        ],
        note: "Exemple : N = 10 000 actions valant V = 16 000 ; émission de n = 2 500 actions à E = 12 000. Valeur après = (10 000 × 16 000 + 2 500 × 12 000) / 12 500 = 15 200. ds = 16 000 − 15 200 = 800. Contrôle : 4 droits par action nouvelle ; 12 000 + 4 × 800 = 15 200.",
      },
      {
        type: 'paragraphe',
        texte: "Reprenons l'exemple de la carte ci-dessus du point de vue d'un actionnaire qui détient 400 actions anciennes valant 16 000 chacune, soit 6 400 000. S'il souscrit, il exerce ses 400 droits pour obtenir 100 actions nouvelles à 12 000, soit 1 200 000 à verser ; il détient alors 500 actions valant 15 200, soit 7 600 000, pour une mise totale de 6 400 000 + 1 200 000 = 7 600 000 : il ne perd rien, et sa part dans le capital est maintenue. S'il ne souscrit pas mais vend ses droits à 800, il encaisse 320 000 et conserve 400 actions valant 15 200, soit 6 080 000 : au total 6 400 000, sa richesse est intacte, mais sa part dans le capital diminue. S'il ne fait rien, il perd 320 000 : c'est pourquoi le droit doit être négociable ou cessible pendant la souscription (art. 574).",
      },
      {
        type: 'filet',
        titre: "Question d'étudiant : pourquoi vendre moins cher que la valeur ?",
        texte: "MONGALA ENERGIE émet ses actions nouvelles à 14 000 FC alors que l'action vaut 18 000 FC. Ce prix attractif facilite le placement, mais il appauvrit les anciens actionnaires : après l'opération, l'action ne vaut plus que 17 200 FC en théorie. Le droit préférentiel de souscription corrige cette dilution. Chaque action ancienne porte un droit, qui vaut théoriquement 800 FC (18 000 − 17 200), et il faut quatre droits pour souscrire une action nouvelle. L'actionnaire qui souscrit garde sa part ; celui qui ne souscrit pas vend ses droits et récupère la valeur perdue. Un nouveau venu, lui, paie 14 000 FC plus quatre droits, soit exactement 17 200 FC.",
      },
      { type: 'controle', question: QCM[6] },
      {
        type: 'paragraphe',
        texte: "Le **titre réductible** complète le titre irréductible lorsque l'assemblée l'a expressément prévu. Soit une émission de 3 000 actions à raison d'une action nouvelle pour quatre anciennes. Un actionnaire de 400 actions a droit, à titre irréductible, à 100 actions ; il peut demander en outre, à titre réductible, 50 actions supplémentaires. Si d'autres actionnaires n'exercent pas tous leurs droits, les actions restées disponibles sont attribuées aux actionnaires qui ont souscrit plus que leur droit irréductible, dans la limite de leur demande (art. 575-576) ; les modalités de répartition entre eux relèvent de la décision d'émission. Le titre réductible évite ainsi que les actions non souscrites échappent aux actionnaires existants avant d'être offertes à des tiers ; il ne se présume pas et doit figurer dans la décision de l'assemblée.",
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[27] },
    ],
  },
  {
    numero: '4.3',
    titre: "Suppression du DPS, prix d'émission et rapports obligatoires",
    navLabel: "Suppression du DPS",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'assemblée qui décide ou autorise l'augmentation peut **supprimer le DPS** en faveur d'un ou plusieurs bénéficiaires nommément désignés, pour la totalité de l'augmentation ou pour certaines tranches (art. 586) ; les bénéficiaires actionnaires ne prennent pas part au vote, ni pour eux-mêmes ni comme mandataires, et leurs actions sont exclues du quorum et de la majorité (art. 587). Chaque actionnaire peut par ailleurs **renoncer individuellement** à son droit, au profit de personnes dénommées, la renonciation devant être accompagnée de leur acceptation, ou sans indication de bénéficiaire, en avisant la société avant l'expiration du délai de souscription (art. 593-595).",
      },
      {
        type: 'filet',
        titre: "L'information sanctionnée par la nullité (art. 588-591)",
        texte: "Le prix d'émission, ou ses conditions de fixation, est déterminé par l'assemblée générale extraordinaire sur le rapport du conseil (ou de l'administrateur général) et sur celui du commissaire aux comptes (art. 588). Le rapport du conseil indique le montant maximal et les motifs de l'augmentation, les motifs de la suppression du DPS, le nom des attributaires, le nombre de titres et le prix d'émission justifié (art. 589), ainsi que l'incidence de l'émission sur la quote-part de capitaux propres de chaque actionnaire (art. 590). Le commissaire aux comptes donne son avis sur la suppression du DPS, les éléments de calcul et le montant du prix, et l'incidence de l'opération (art. 591). **Les délibérations prises en l'absence de ces rapports sont nulles** ; des rapports incomplets les rendent annulables.",
      },
      {
        type: 'paragraphe',
        texte: "La suppression du DPS est l'outil de l'entrée d'un partenaire stratégique : une banque qui veut faire entrer un investisseur pour respecter une exigence prudentielle, une société familiale qui accueille un fonds d'investissement, une entreprise qui rémunère un fournisseur par des actions. Elle comporte un risque réel pour les actionnaires existants : si le prix d'émission est inférieur à la valeur réelle de l'action, la différence est transférée aux nouveaux venus. C'est précisément ce que mesure l'« incidence sur la quote-part de capitaux propres » exigée par l'article 590. Le comptable prépare ce calcul : capitaux propres par action avant l'opération, capitaux propres par action après, et écart. Un prix fixé au-dessus des capitaux propres par action protège les anciens ; un prix fixé en dessous les appauvrit.",
      },
      {
        type: 'paragraphe',
        texte: "La **renonciation individuelle** au DPS est l'outil souple de l'entrée d'un nouvel actionnaire lorsque l'assemblée ne veut pas supprimer le droit de tous. Chaque actionnaire peut renoncer à titre individuel à son droit, soit au profit de personnes dénommées, qui doivent accepter, soit sans indication de bénéficiaire, en avisant la société avant l'expiration du délai de souscription (art. 593-595). Un actionnaire familial qui ne peut pas suivre l'augmentation peut ainsi laisser sa part à un partenaire désigné, sans que l'assemblée ait à statuer sur une suppression générale et sans les rapports spéciaux exigés dans ce cas. Pour le comptable, rien ne change : le souscripteur, quel qu'il soit, verse le nominal et la prime, et les écritures sont les mêmes.",
      },
      { type: 'controle', question: QCM[9] },
      {
        type: 'paragraphe',
        texte: "Une augmentation de capital irrégulière n'est pas une simple anomalie de procédure : si la délibération est annulée, l'opération tombe, et la comptabilité doit en tirer les conséquences. Les fonds versés par les souscripteurs redeviennent une dette de la société envers eux ; le capital et la prime crédités à tort doivent être contrepassés, par le débit du 1013 et du 1051 et le crédit d'un compte de tiers, jusqu'au remboursement. C'est pourquoi le comptable et le commissaire aux comptes vérifient, avant la réalisation, l'existence et le contenu des rapports exigés, le respect des majorités, l'exclusion des bénéficiaires du vote et la libération intégrale préalable du capital ancien. Une vérification en amont évite des corrections lourdes après coup.",
      },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '4.4',
    titre: "Libération, dépôt des fonds et réalisation dans la SA",
    navLabel: "Libération et DNSV",
    blocs: [
      {
        type: 'carte',
        titre: "La libération des actions nouvelles (art. 604-606, 611, 626)",
        tableau: {
          entetes: ["Situation", "Règle"],
          lignes: [
            ["Numéraire", "Un **quart au moins du nominal** à la souscription et la **totalité de la prime d'émission** ; surplus appelé par le conseil dans les **trois ans** de la réalisation (art. 604-605)."],
            ["Libération mixte (espèces + incorporation)", "Libération **intégrale** dès la souscription (art. 606)."],
            ["Compensation de créances", "Créances certaines, liquides et exigibles, constatées par un **arrêté des comptes** du conseil certifié exact par le commissaire aux comptes (art. 611)."],
            ["Apport en nature", "Actions d'apport **intégralement libérées** dès leur émission (art. 626)."],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Les fonds sont déposés par les dirigeants sociaux, dans les **huit jours** de leur réception, dans un établissement de crédit ou de microfinance agréé de l'État partie du siège ou chez un notaire, avec la liste des souscripteurs et de leurs versements (art. 607-608) ; le dépositaire délivre un certificat (art. 610) et communique la liste à tout souscripteur qui la demande (art. 609). Les souscriptions et versements sont constatés par la **déclaration notariée de souscription et de versement**, et l'augmentation est réputée réalisée au jour de son établissement (art. 571). Le **retrait des fonds** ne peut intervenir qu'une fois l'augmentation réalisée, par un mandataire de la société, sur présentation de cette déclaration au dépositaire (art. 615).",
      },
      {
        type: 'paragraphe',
        texte: "La règle de la prime intégralement versée mérite une explication. La prime n'est pas une fraction du capital : elle rémunère la valeur accumulée par la société avant l'entrée du nouveau souscripteur. Il serait anormal qu'il acquière des droits sur des réserves dont il n'aurait pas payé le prix. Le souscripteur verse donc toute la prime dès la souscription, et seul le nominal peut être libéré par fractions. Pour une action de nominal 10 000 émise à 15 000 et libérée du quart, le souscripteur verse 2 500 + 5 000 = 7 500 ; il reste devoir 7 500, qui seront appelés dans les trois ans de la réalisation. Le comptable suit cette créance par les comptes 109 et 4613, exactement comme à la constitution.",
      },
      {
        type: 'paragraphe',
        texte: "La **déclaration notariée de souscription et de versement** joue dans l'augmentation le même rôle qu'à la constitution. Le notaire y affirme, au vu des bulletins et du certificat du dépositaire, que le montant des souscriptions est conforme aux bulletins et que celui des versements est conforme aux sommes déposées. C'est à sa date que l'augmentation est réputée réalisée (art. 571) : c'est donc aussi la date de l'écriture qui solde le 4615 par le crédit du capital et de la prime. Si une clôture d'exercice intervient entre le versement des fonds et la déclaration, les fonds figurent au bilan de clôture comme une dette envers les souscripteurs (4615), et non comme du capital ; ils ne deviendront capital qu'à l'exercice suivant.",
      },
      {
        type: 'filet',
        titre: "Erreur fréquente",
        texte: "Créditer le capital dès la réception des fonds. Tant que l'augmentation n'est pas réalisée, rien n'est acquis : si elle échoue, les fonds doivent être restitués aux souscripteurs. Les versements transitent donc par le compte 4615 Apporteurs, versements reçus sur augmentation de capital, et ce n'est qu'au jour de la réalisation, constatée par la déclaration notariée de souscription et de versement, que le 4615 est soldé au crédit du capital (1013) et de la prime (1051). Chez MONGALA ENERGIE, les 42 000 000 FC reçus par le notaire restent au 4615 jusqu'à cette date.",
      },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
    ],
  },
  {
    numero: '4.5',
    titre: "L'augmentation de capital dans la SARL et la SAS",
    navLabel: "SARL et SAS",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Dans la SARL, l'augmentation de capital est une modification des statuts, décidée par les associés représentant au moins **les trois quarts du capital social** (art. 358) ; l'unanimité est requise si elle augmente les engagements des associés (art. 359), par exemple si elle obligeait chacun à souscrire. Par dérogation, l'augmentation **par incorporation** de bénéfices, réserves ou primes est décidée par les associés représentant au moins **la moitié des parts sociales** (art. 360). Toute délibération contraire aux articles 358 à 360 est nulle (art. 360-1). Les parts de la SARL n'étant pas négociables, il n'existe pas de DPS négociable au sens de la SA ; l'entrée d'un tiers suppose en outre, selon les statuts, l'agrément des associés étudié en UE2.",
      },
      {
        type: 'carte',
        titre: "Le régime de l'augmentation de capital de SARL (art. 361-363)",
        liste: [
          "**Dépôt des fonds** : en banque, dans un établissement de crédit ou de microfinance agréé, ou chez un notaire, comme à la constitution ; le gérant en dispose sur remise au dépositaire d'un certificat du RCCM attestant le dépôt d'une inscription modificative (art. 361).",
          "**Libération** : moitié au moins lors de la souscription ; surplus dans les deux ans à compter du jour où l'augmentation est devenue définitive (art. 361-1).",
          "**Réalisation** : l'augmentation est réputée réalisée dès qu'elle a été constatée dans un procès-verbal d'assemblée (art. 361-2).",
          "**Échec** : si l'augmentation n'est pas réalisée dans les six mois du premier dépôt, tout souscripteur peut demander au juge l'autorisation de retirer les fonds (art. 362).",
          "**Apports en nature** : commissaire aux apports désigné par les associés au-delà de 5 000 000 FCFA par apport ou pour l'ensemble, et toujours en cas d'avantages particuliers ; il peut aussi être nommé par le juge à la demande de tout associé ; délibérations nulles en son absence (art. 363).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Dans la SAS, les attributions des assemblées de SA « en matière d'augmentation [...] de capital » sont exercées collectivement par les associés, dans les conditions prévues par les statuts, à peine de nullité (art. 853-11). Les statuts fixent donc la majorité ; mais, par le renvoi de l'article 853-3, les règles de la SA compatibles avec le livre de la SAS s'appliquent : DPS, libération du quart et de la totalité de la prime, dépôt des fonds et déclaration notariée, commissaire aux apports. La SAS ne peut toutefois pas faire publiquement appel à l'épargne (art. 853-4) : ses augmentations de capital se font entre associés ou auprès d'investisseurs choisis, jamais par offre au public. C'est ce qui en fait la forme privilégiée des levées de fonds privées.",
      },
      {
        type: 'paragraphe',
        texte: "Pour le comptable, les écritures d'une augmentation de SARL sont identiques à celles de la SA : versements reçus au crédit du 4615, réalisation par le crédit du 1013 et, s'il y a lieu, d'une prime au 1051 ou au 1052, fraction non appelée au débit du 109. Deux différences de calendrier doivent être suivies. D'abord, les fonds ne sont disponibles qu'après l'inscription modificative au RCCM (art. 361), et non après une déclaration notariée. Ensuite, le délai de libération du solde est de deux ans à compter du jour où l'augmentation est devenue définitive (art. 361-1), et non de trois ans. Un tableau de suivi des appels, tenu par associé, évite les dépassements de délai.",
      },
      {
        type: 'paragraphe',
        texte: "Un exemple chiffré fixe les idées. Une SARL au capital de 20 000 000 (2 000 parts de 10 000) décide, à l'unanimité des trois associés (plus des trois quarts requis par l'art. 358), une augmentation de 8 000 000 par création de 800 parts nouvelles de 10 000, souscrites en numéraire par un nouvel associé agréé. Il libère la moitié, soit 4 000 000, versés sur un compte bancaire. Après le procès-verbal constatant la réalisation (art. 361-2) et l'inscription modificative au RCCM, le gérant dispose des fonds (art. 361). Écritures : débit 521 4 000 000 et débit 109 4 000 000 / crédit 1013 4 000 000 et crédit 1011 4 000 000. Le solde de 4 000 000 devra être appelé dans les deux ans de la date où l'augmentation est devenue définitive (art. 361-1).",
      },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      {
        type: 'paragraphe',
        texte: "La SAS qui accueille un investisseur illustre la souplesse de la forme. Supposons que les statuts d'une SAS de Kinshasa prévoient que les augmentations de capital sont décidées par les associés représentant les deux tiers des actions. Les associés adoptent à cette majorité une augmentation réservée à un fonds d'investissement, avec suppression du DPS à son profit ; le rapport du président, qui exerce les attributions du conseil en l'absence de clause contraire (art. 853-3), et celui du commissaire aux comptes s'il en existe un, éclairent la décision. Le fonds libère le quart du nominal et toute la prime. Les écritures sont celles de la SA ; la différence tient à l'organe qui décide, fixé par les statuts, et à l'impossibilité d'une offre au public.",
      },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
    ],
  },
  {
    numero: '4.6',
    titre: "Comptabilisation de l'augmentation en numéraire (Application 60)",
    navLabel: "Écritures en numéraire",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'Application 60 du Guide comptabilise une augmentation en numéraire : 5 000 actions de nominal 10 000 émises à **15 000**, fonds appelés dès la souscription et reçus par le notaire le 08/05/N, augmentation réalisée le 09/05/N, fonds reversés le 10/05/N. Le compte pivot est **4615 Apporteurs, versements reçus sur augmentation de capital** ; la prime loge au compte **1051 Primes d'émission**, que l'AUDCIF définit comme « l'excédent du prix d'émission en numéraire (prix payé par le souscripteur) sur la valeur nominale des actions ou parts ».",
      },
      {
        type: 'carte',
        titre: "Application 60 : augmentation en numéraire avec prime",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4732", "", "08/05/N : Mandataires, notaire (fonds reçus)", "75 000 000", ""],
            ["", "4615", "Apporteurs, versements reçus sur augmentation de capital", "", "75 000 000"],
            ["4615", "", "09/05/N : réalisation de l'augmentation", "75 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti (5 000 × 10 000)", "", "50 000 000"],
            ["", "1051", "Primes d'émission (5 000 × 5 000)", "", "25 000 000"],
            ["521", "", "10/05/N : Banques (reversement)", "75 000 000", ""],
            ["", "4732", "Mandataires, notaire", "", "75 000 000"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Pourquoi un compte d'attente, le 4615, plutôt qu'un crédit direct du capital ? Parce qu'entre le versement et la réalisation, rien n'est encore acquis : si l'augmentation n'est pas réalisée, par exemple parce que les souscriptions n'atteignent pas le seuil de l'article 580, les fonds doivent être restitués aux souscripteurs. Le 4615 constate donc une dette de la société envers les souscripteurs, qui ne se transforme en capital et en prime qu'au jour de la réalisation, c'est-à-dire de la déclaration notariée (art. 571). À la clôture, un solde créditeur du 4615 révèle une augmentation en cours et non encore réalisée, qui ne doit pas être présentée comme du capital.",
      },
      {
        type: 'carte',
        titre: "Variante : augmentation libérée du quart, avec prime",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4615", "", "Réalisation : fonds reçus (1/4 du nominal + prime)", "37 500 000", ""],
            ["109", "", "Apporteurs, capital souscrit, non appelé (3/4 du nominal)", "37 500 000", ""],
            ["", "1013", "Capital appelé et versé (1/4 du nominal)", "", "12 500 000"],
            ["", "1011", "Capital souscrit, non appelé", "", "37 500 000"],
            ["", "1051", "Primes d'émission", "", "25 000 000"],
          ],
        },
        note: "Mêmes 5 000 actions de 10 000 émises à 15 000, libérées du minimum légal : chaque souscripteur verse 2 500 de nominal et 5 000 de prime (art. 604), soit 37 500 000 au total. Les appels ultérieurs suivent le cycle de l'Application 59 (chapitre 1).",
      },
      {
        type: 'filet',
        titre: "Les frais d'augmentation de capital (AUDCIF, compte 105)",
        texte: "Les frais d'une augmentation (honoraires du notaire, du commissaire aux comptes, publicité légale, commissions bancaires) sont d'abord enregistrés en charges, par nature. L'AUDCIF prévoit que le compte 105 est débité, en cas d'augmentation du capital, « du montant des frais de cette augmentation, par le crédit du 78 (Transferts de charges) en cas d'imputation de ces frais ». L'entité peut donc imputer ces frais sur la prime : débit 1051, crédit 781 Transferts de charges d'exploitation. La prime est réduite d'autant, et le résultat n'est pas affecté.",
      },
      {
        type: 'paragraphe',
        texte: "L'imputation des frais sur la prime est une faculté, non une obligation, et elle suppose l'existence d'une prime suffisante. Elle a un sens économique : ces frais sont le coût d'obtention des capitaux propres nouveaux, et il est logique de les retrancher de ce que les souscripteurs ont apporté au-delà du nominal plutôt que de faire supporter une charge au résultat de l'exercice. Sans prime, les frais restent en charges. Dans tous les cas, ils ne peuvent jamais être imputés sur le capital lui-même, qui ne se réduit que par une décision régulière de réduction (chapitre 5).",
      },
      {
        type: 'paragraphe',
        texte: "Dans le **tableau des flux de trésorerie**, l'augmentation de capital en numéraire est un flux de financement. Le Guide d'application la mesure, sur la ligne « Augmentation de capital par apport nouveau », par la variation des comptes de la classe 10 hors écarts de réévaluation (106) et capital non appelé (109), du compte 467 et du compte 4581. Une augmentation par incorporation de réserves ne modifie pas la trésorerie ; une augmentation par compensation de créances ou par conversion d'obligations n'en modifie pas davantage, puisque la société ne reçoit aucun fonds : ces opérations doivent être identifiées et neutralisées lors de l'établissement du TFT, qui ne retrace que les flux réels.",
      },
      {
        type: 'filet',
        titre: "Le regard de l'auditeur",
        texte: "Dans le dossier d'augmentation de MONGALA ENERGIE, l'auditeur vérifie la chaîne des pièces : procès-verbal de l'AGE et rapports du conseil et du commissaire aux comptes, bulletins de souscription, certificat du dépositaire, déclaration notariée, et publicité. Il contrôle que les fonds ont été déposés dans les huit jours de leur réception, que la prime a été intégralement versée, et que les fonds n'ont été utilisés qu'après la réalisation de l'augmentation (art. 615). Une écriture de réalisation datée d'avant la déclaration notariée est une anomalie à corriger.",
      },
      { type: 'controle', question: QCM[18] },
      {
        type: 'paragraphe',
        texte: "Lorsque l'augmentation n'a été libérée que partiellement, l'appel ultérieur du solde suit exactement le cycle de la constitution. Au jour de l'appel décidé par le conseil, dans les trois ans de la réalisation (art. 605), on débite 4613 par le crédit du 109, et l'on vire le 1011 au 1012 pour le montant appelé ; au versement, on débite la banque par le crédit du 4613, et l'on vire le 1012 au 1013. La prime, versée intégralement dès la souscription, n'intervient plus à ce stade. Un actionnaire qui ne répond pas à l'appel devient défaillant et relève des articles 775 à 777 étudiés au chapitre 2 ; tant que ces sommes restent dues, la société ne peut ni émettre de nouvelles actions en numéraire (art. 572), ni émettre d'obligations (art. 389).",
      },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '4.7',
    titre: "L'augmentation par incorporation de réserves et le droit d'attribution",
    navLabel: "Incorporation",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'augmentation par incorporation transforme en capital des réserves, des bénéfices ou des primes. Elle est réalisée, au choix, par l'émission d'actions nouvelles distribuées gratuitement aux actionnaires, ou par l'élévation du nominal des actions existantes ; les deux procédés peuvent être combinés (art. 63). L'Application 61 du Guide comptabilise l'émission, le 01/04/N, de 2 000 actions gratuites de 10 000 prélevées sur les réserves facultatives.",
      },
      {
        type: 'carte',
        titre: "Application 61 : incorporation de réserves (2 000 actions gratuites de 10 000)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1181", "", "01/04/N : Réserves facultatives", "20 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti", "", "20 000 000"],
          ],
        },
        note: "Virement interne aux capitaux propres : aucun flux de trésorerie, total des capitaux propres inchangé. On peut incorporer de la même façon la réserve légale, des réserves statutaires si les statuts le permettent, le report à nouveau créditeur ou des primes (débit 1051, 1052 ou 1053).",
      },
      {
        type: 'paragraphe',
        texte: "Pourquoi incorporer des réserves, puisque cela ne rapporte rien à la société ? D'abord pour rendre le capital plus représentatif de la taille réelle de l'entreprise, ce qui améliore son image auprès des banques et des partenaires. Ensuite pour rendre ces sommes définitivement indisponibles : une réserve facultative peut être distribuée, un capital ne peut être rendu que par une réduction entourée de garanties pour les créanciers. Enfin, pour ajuster le capital à une exigence légale ou réglementaire, comme le capital minimum imposé à certaines activités. Pour la réserve légale, l'incorporation a une conséquence : le capital ayant augmenté, le plafond du cinquième monte aussi, et la dotation annuelle redevient obligatoire (chapitre 3).",
      },
      {
        type: 'paragraphe',
        texte: "L'actionnaire ne s'enrichit pas avec des actions gratuites : il détient plus d'actions, mais chacune vaut moins, puisque les capitaux propres n'ont pas changé. La pratique mesure cette perte de valeur unitaire par le **droit d'attribution**, da = n × V / (N + n). Soit 8 000 actions valant 14 000 et l'attribution d'une action gratuite pour quatre anciennes (n = 2 000) : valeur après = 8 000 × 14 000 / 10 000 = 11 200 ; da = 14 000 − 11 200 = 2 800. Un actionnaire qui possède 130 actions a droit à 32 actions gratuites pour 128 droits ; il lui reste 2 **rompus**, c'est-à-dire des droits qui ne suffisent pas pour une action entière. Il peut les vendre, ou acheter 2 droits supplémentaires pour obtenir une 33e action.",
      },
      {
        type: 'paragraphe',
        texte: "L'élévation du nominal est l'autre technique : au lieu de créer des actions nouvelles, on porte par exemple le nominal de 10 000 à 12 500, en incorporant 2 500 par action. Elle évite les rompus mais n'est possible sans unanimité que si elle est financée par incorporation (art. 562, al. 3). Comptablement, l'écriture est la même : débit du compte de réserve ou de prime, crédit du 1013. Pour une SARL, l'incorporation est décidée par les associés représentant au moins la moitié des parts (art. 360) ; pour une SA, aux conditions de l'AGO (art. 565).",
      },
      {
        type: 'paragraphe',
        texte: "L'incorporation peut porter sur tout poste de capitaux propres disponible à cet effet : réserves facultatives, réserve légale, réserves statutaires si les statuts le permettent, report à nouveau créditeur, bénéfice de l'exercice, primes d'émission, d'apport ou de fusion (art. 62 et 562). L'incorporation d'une prime est fréquente après une augmentation en numéraire à prix élevé : la prime rejoint ainsi le capital et devient définitivement indisponible. En revanche, un poste débiteur, comme un report à nouveau débiteur, ne s'incorpore pas : il faudrait d'abord l'apurer. Et l'incorporation n'est possible que si la réserve existe réellement dans les comptes approuvés : on n'incorpore pas un bénéfice d'exercice non encore approuvé par l'assemblée.",
      },
      {
        type: 'filet',
        titre: "Et si MONGALA ENERGIE avait incorporé ses réserves ?",
        texte: "Une augmentation par incorporation de réserves n'apporte aucun franc à la société : elle déplace des sommes d'un poste des capitaux propres à un autre (réserves vers capital). Les actionnaires reçoivent des actions gratuites ou voient le nominal de leurs actions relevé, mais les capitaux propres et la trésorerie ne changent pas. Pour financer un nouveau barrage ou une ligne électrique, MONGALA ENERGIE a besoin d'argent frais : seule une augmentation en numéraire, ou l'entrée d'un investisseur par apport, peut le lui apporter.",
      },
      { type: 'controle', question: QCM[20] },
    ],
  },
  {
    numero: '4.8',
    titre: "L'augmentation par apport en nature et par compensation de créances",
    navLabel: "Nature et compensation",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Lorsque l'augmentation est réalisée par **apports en nature** ou comporte des **avantages particuliers**, la SA doit faire désigner un ou plusieurs commissaires aux apports, à l'unanimité des actionnaires ou, à défaut, par la juridiction compétente (art. 619). Le commissaire est soumis aux incompatibilités des commissaires aux comptes et « ne peut être le commissaire aux comptes de la société » (art. 620). Son rapport décrit chaque apport, en indique la valeur, précise le mode d'évaluation et établit que la valeur correspond au moins au nominal des actions à émettre (art. 621) ; il est déposé au siège et au RCCM huit jours au moins avant l'AGE, à peine de nullité (art. 622). L'apporteur ne vote pas sur son apport (art. 623), la réduction de l'évaluation suppose son approbation expresse (art. 625), et les actions d'apport sont intégralement libérées dès leur émission (art. 626).",
      },
      {
        type: 'carte',
        titre: "Comptabiliser un apport en nature avec prime d'apport",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["4611", "", "Apporteurs, apports en nature (promesse)", "60 000 000", ""],
            ["", "1013", "Capital (4 000 actions × 10 000)", "", "40 000 000"],
            ["", "1052", "Primes d'apport", "", "20 000 000"],
            ["2311", "", "Bâtiments industriels (valeur d'apport)", "60 000 000", ""],
            ["", "4611", "Apporteurs, apports en nature", "", "60 000 000"],
          ],
        },
        note: "Un bâtiment évalué à 60 000 000 est rémunéré par 4 000 actions de nominal 10 000. La prime d'apport est « la différence entre la valeur du/des bien(s) apporté(s) et la valeur nominale des actions ou parts rémunérant l'apport » (AUDCIF, compte 105). Le bien entre pour sa valeur d'apport (art. 36 AUDCIF).",
      },
      {
        type: 'paragraphe',
        texte: "Comment fixe-t-on le nombre d'actions remises à l'apporteur ? En divisant la valeur de l'apport par la **valeur réelle** de l'action, et non par son nominal. Si l'action vaut 15 000 et que l'apport vaut 60 000 000, l'apporteur reçoit 4 000 actions : la prime d'apport de 20 000 000 correspond à sa contribution aux réserves existantes, comme la prime d'émission pour un souscripteur en numéraire. Remettre 6 000 actions (60 000 000 / 10 000) reviendrait à lui donner, gratuitement, une part des réserves accumulées par les anciens actionnaires. L'évaluation de l'action, étudiée au chapitre 7, commande donc la parité de l'apport ; le chapitre 8 appliquera la même logique aux fusions.",
      },
      {
        type: 'paragraphe',
        texte: "La **compensation de créances** permet à un créancier de la société de devenir actionnaire en renonçant à sa créance. Elle vise des créances certaines, liquides et exigibles (art. 44 et 562), constatées par un arrêté des comptes du conseil ou de l'administrateur général certifié exact par le commissaire aux comptes (art. 611). Comptablement, la dette disparaît et le capital augmente : un associé qui détient une créance de 30 000 000 en compte courant souscrit 2 000 actions à 15 000 ; la société débite 4621 Associés, comptes courants pour 30 000 000 et crédite 1013 pour 20 000 000 et 1051 pour 10 000 000, en passant le cas échéant par le 4615. Aucune trésorerie n'entre, mais l'endettement diminue et les capitaux propres augmentent : c'est une opération de restructuration du passif, fréquente pour les sociétés en difficulté.",
      },
      {
        type: 'paragraphe',
        texte: "Le capital peut enfin être augmenté par la conversion de valeurs mobilières donnant accès au capital, en particulier d'obligations convertibles (art. 562, al. 4 ; art. 822-1 et suivants). L'emprunt obligataire convertible (compte 1612) disparaît au profit du capital et d'une éventuelle prime de conversion (compte 1054), définie par l'AUDCIF comme « la différence entre la valeur de conversion du/des titre(s) de créances et la valeur nominale des actions ou parts rémunérant l'apport ». L'Application 80 du Guide, étudiée au chapitre 6, en détaille les écritures. C'est une technique utilisée en RDC pour renforcer les fonds propres des banques (section 4.10).",
      },
      {
        type: 'paragraphe',
        texte: "L'augmentation par apport en nature et la compensation de créances sont deux façons de faire entrer au capital autre chose que de l'argent frais. Le comptable doit y porter une vigilance particulière, car la valeur d'entrée ne résulte pas d'un encaissement. Pour l'apport, c'est le rapport du commissaire aux apports qui fonde la valeur d'entrée du bien, exactement comme à la constitution (art. 36 AUDCIF). Pour la compensation, c'est l'arrêté des comptes certifié par le commissaire aux comptes qui établit l'existence et le montant de la créance (art. 611). Dans les deux cas, une surévaluation gonflerait artificiellement les capitaux propres ; c'est pourquoi l'Acte uniforme entoure ces opérations de contrôles préalables sanctionnés par la nullité.",
      },
      { type: 'controle', question: QCM[21] },
      { type: 'controle', question: QCM[22] },
      { type: 'controle', question: QCM[23] },
    ],
  },
  {
    numero: '4.9',
    titre: "L'attribution gratuite d'actions au personnel et aux dirigeants",
    navLabel: "Actions gratuites",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'Acte uniforme révisé en 2014 a introduit l'**attribution gratuite d'actions** au personnel salarié. L'AGE, sur le rapport du conseil ou de l'administrateur général et sur le rapport spécial du commissaire aux comptes, peut autoriser l'attribution d'actions existantes ou à émettre au profit des salariés ou de certaines catégories d'entre eux ; les délibérations prises sans ces rapports sont nulles (art. 626-1). Le dispositif est étendu, sous conditions, aux dirigeants de SA et de SAS (art. 626-1-2) et aux salariés de certaines sociétés liées (art. 626-2).",
      },
      {
        type: 'carte',
        titre: "Les limites de l'attribution gratuite (art. 626-1 à 626-3)",
        liste: [
          "**Plafond global** : 10 % du capital à la date de la décision d'attribution par le conseil ; autorisation valable 36 mois au plus (art. 626-1).",
          "**Plafond individuel** : aucune attribution aux salariés et dirigeants détenant chacun plus de 10 % du capital, ni attribution ayant pour effet de leur faire dépasser ce seuil ; 20 % au plus si les statuts d'une société non cotée le prévoient (art. 626-1-2-1).",
          "**Période d'acquisition** : au moins deux ans avant l'attribution définitive ; **obligation de conservation** d'au moins deux ans ensuite, sauf invalidité, et réductible si l'acquisition a duré au moins quatre ans (art. 626-1).",
          "**Actions à émettre** : l'autorisation emporte renonciation des actionnaires à leur DPS, et l'augmentation de capital est réalisée du seul fait de l'attribution définitive (art. 626-1).",
          "**Droits incessibles** jusqu'au terme de la période d'acquisition ; les héritiers d'un bénéficiaire décédé peuvent demander l'attribution dans les six mois (art. 626-3).",
          "**Information** : rapport spécial annuel du conseil à l'AGO sur les attributions, notamment aux dirigeants et aux dix salariés les mieux servis (art. 626-4).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Le Guide d'application présente deux techniques comptables. Avec des **actions existantes** rachetées par la société (Application 76), l'achat est enregistré au compte 5021 Actions ou parts propres ; lors de l'attribution, le coût d'acquisition non couvert par la somme éventuellement réglée par le bénéficiaire est une charge au compte **6772 Mali provenant d'attribution gratuite d'actions au personnel salarié et aux dirigeants**. Dans l'Application, 1 000 actions rachetées à 15 000 sont attribuées aux dirigeants contre règlement de leur nominal de 12 000 : le mali est de 3 000 000. Avec des **actions à émettre** (Application 77), l'assemblée affecte une partie du résultat à une réserve, puis l'augmentation de capital vire cette réserve au 1013 : c'est une incorporation de réserves au profit des seuls bénéficiaires.",
      },
      {
        type: 'carte',
        titre: "Application 77 : attribution gratuite par prélèvement sur le résultat",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1301", "", "15/05/N : Résultat en instance d'affectation", "30 000 000", ""],
            ["", "118", "Autres réserves (réserve pour actions gratuites)", "", "30 000 000"],
            ["118", "", "20/05/N : Autres réserves", "30 000 000", ""],
            ["", "1013", "Capital souscrit, appelé, versé, non amorti", "", "30 000 000"],
          ],
        },
        note: "L'Application utilise le compte 118 ; le plan de comptes comporte aussi un compte spécifique, 1132 Réserves d'attribution gratuite d'actions au personnel salarié et aux dirigeants, parmi les réserves réglementées.",
      },
      {
        type: 'paragraphe',
        texte: "L'attribution gratuite d'actions répond à une logique de fidélisation : elle associe les salariés et les dirigeants à la réussite de l'entreprise, en différant leur accès aux actions (période d'acquisition) et leur liberté de les céder (obligation de conservation). Elle a un coût pour les actionnaires existants, qui voient leur part diluée, d'où l'intervention de l'AGE, du commissaire aux comptes et d'un rapport annuel spécial à l'AGO (art. 626-4). Pour les sociétés cotées, l'Acte uniforme ajoute des fenêtres négatives autour de la publication des comptes et des informations privilégiées (art. 626-1-1) et subordonne l'attribution aux dirigeants à une attribution à l'ensemble des salariés (art. 626-6). Les délibérations prises en violation de ces règles sont nulles.",
      },
      { type: 'controle', question: QCM[24] },
      { type: 'controle', question: QCM[25] },
      {
        type: 'paragraphe',
        texte: "Les deux techniques comptables de l'attribution gratuite n'ont pas le même effet sur les comptes. Avec des actions rachetées (Application 76), la société décaisse le prix de rachat et supporte une charge, le mali, qui diminue son résultat ; le nombre d'actions en circulation ne change pas, puisque des actions existantes passent des mains de la société à celles des bénéficiaires. Avec des actions à émettre (Application 77), la société ne décaisse rien : elle affecte une partie de ses bénéfices à une réserve, puis l'incorpore au capital au profit des seuls bénéficiaires ; le nombre d'actions augmente et les actionnaires existants sont dilués. Le choix entre les deux dépend de la trésorerie disponible, du régime du rachat d'actions propres (chapitre 5) et de l'acceptation de la dilution par les actionnaires.",
      },
      { type: 'controle', question: QCM[26] },
    ],
  },
  {
    numero: '4.10',
    titre: "Augmenter le capital en RDC : l'exemple des banques",
    navLabel: "Le cas des banques",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le secteur bancaire congolais offre une illustration concrète des augmentations de capital. Une banque doit se constituer en **société anonyme** selon le droit OHADA et justifier d'un capital social minimum souscrit et libéré ; selon l'Agence nationale pour la promotion des investissements (page « Comment créer une banque ? », mise à jour en février 2026), ce minimum a été relevé à l'équivalent en francs congolais de **50 millions de dollars** depuis le 31 décembre 2020. Le droit bancaire vient ici compléter le minimum de 10 000 000 FCFA de l'article 387 de l'AUSCGIE, que l'article 1er de l'Acte uniforme permet d'articuler avec les lois nationales non contraires. Pour se conformer, les banques ont dû augmenter leur capital, souvent par incorporation de réserves ou par apports nouveaux de leurs actionnaires.",
      },
      {
        type: 'paragraphe',
        texte: "Les techniques du chapitre y sont toutes mobilisées. Selon le média économique Bankable (23 avril 2025), une grande banque congolaise a mobilisé 35 millions de dollars au premier semestre 2024 au moyen d'**obligations convertibles** souscrites par ses deux actionnaires, pour respecter l'exigence de capital minimum : c'est l'augmentation par conversion de valeurs mobilières donnant accès au capital (art. 562, al. 4). La loi n° 22/069 du 27 décembre 2022 relative à l'activité et au contrôle des établissements de crédit impose par ailleurs, en son article 11, que les établissements de crédit comptent au moins **quatre actionnaires**, associés ou sociétaires détenant chacun une quotité significative, que la Banque centrale a fixée à 15 % par son Instruction n° 18. Respecter cette règle suppose de faire entrer de nouveaux actionnaires, donc souvent une augmentation de capital avec suppression du DPS au profit d'investisseurs désignés (art. 586), ou des cessions d'actions.",
      },
      {
        type: 'filet',
        titre: "Une réforme parlementaire non encore promulguée",
        texte: "Constatant qu'aucun établissement ne s'était conformé à l'exigence de quatre actionnaires, un député a déposé une proposition de loi modifiant les articles 11 et 190 de la loi n° 22/069 pour ramener ce nombre à deux et accorder un délai de trente-six mois. Selon Bankable (18 juin 2025), l'Assemblée nationale l'a adoptée le 15 juin 2025 ; selon l'Agence congolaise de presse (26 novembre 2025), le Sénat devait en examiner le rapport en seconde lecture le 27 novembre 2025, et Droit Médias Finance indiquait en janvier 2026 que la réforme était « en cours ». Nous n'avons trouvé aucune trace de sa promulgation : il s'agit d'une initiative parlementaire, et l'article 11 dans sa rédaction de 2022 reste le droit applicable tant qu'une loi modificative n'est pas promulguée et publiée.",
      },
      {
        type: 'paragraphe',
        texte: "Pour le comptable d'une banque ou de toute société soumise à un capital minimum sectoriel, deux vigilances en découlent. D'abord, le capital **libéré**, et non seulement souscrit, est souvent exigé : les fractions non appelées (compte 109) ne comptent pas, et une augmentation libérée du quart ne suffit pas à atteindre le seuil. Ensuite, la conversion des montants exprimés en dollars se fait en francs congolais au cours du jour, comme pour tout apport en devises (art. 51 et 52 AUDCIF, chapitre 1) : une dépréciation du franc congolais peut faire passer un capital en dessous de l'équivalent requis, même si aucun actionnaire ne s'est retiré. Le suivi du capital réglementaire devient alors un exercice permanent, qui dépasse la seule comptabilité des sociétés.",
      },
      {
        type: 'carte',
        titre: "Synthèse : quelle écriture pour quelle augmentation ?",
        tableau: {
          entetes: ["Procédé", "Écriture de réalisation", "Effet sur les capitaux propres"],
          lignes: [
            ["Numéraire avec prime", "Débit 4615 / crédit 1013, 1051 (et 109/1011 si libération partielle)", "Augmentation du montant souscrit"],
            ["Apport en nature", "Débit actifs apportés / crédit 4611, puis 4611 / 1013, 1052", "Augmentation de la valeur d'apport"],
            ["Compensation de créances", "Débit 4621 (ou 40, 16) / crédit 1013, 1051", "Augmentation ; dette éteinte"],
            ["Conversion d'obligations", "Débit 1612 / crédit 1013, 1054 (chapitre 6)", "Augmentation ; dette éteinte"],
            ["Incorporation de réserves ou primes", "Débit 11, 12 ou 105 / crédit 1013", "Aucun : simple reclassement"],
            ["Actions gratuites au personnel (à émettre)", "Débit 1301, puis réserve / crédit 1013", "Aucun à l'attribution : reclassement"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Au-delà du secteur bancaire, d'autres activités réglementées imposent en RDC des exigences de capital ou de fonds propres, que le comptable doit connaître lorsqu'il accompagne une augmentation : assurances, microfinance, monnaie électronique, par exemple. La méthode est la même. On identifie le texte sectoriel et le seuil, on vérifie s'il vise le capital souscrit, le capital libéré ou les fonds propres, on convertit les seuils exprimés en devises au cours pertinent, et l'on choisit la technique d'augmentation la mieux adaptée : incorporation si les réserves suffisent, apports nouveaux sinon, conversion de dettes lorsque les actionnaires ont déjà financé la société en compte courant ou par obligations.",
      },
      { type: 'controle', question: QCM[28] },
      {
        type: 'paragraphe',
        texte: "Retour à MONGALA ENERGIE, dont le cas 1 détaille les écritures. L'assemblée extraordinaire a décidé l'émission de 3 000 actions à 14 000 FC, sur les rapports du conseil et du commissaire aux comptes, après avoir vérifié que l'ancien capital était entièrement libéré. Le droit préférentiel de souscription, d'une valeur théorique de 800 FC, a protégé les anciens actionnaires contre la dilution. Les 42 000 000 FC versés chez le notaire ont transité par le 4615, puis la réalisation a porté 30 000 000 FC au capital et 12 000 000 FC à la prime d'émission. Le capital passe de 120 000 000 à 150 000 000 FC. KIVU CRÉDIT (cas 5) montre la même mécanique à l'échelle d'une banque, avec une suppression du DPS au profit d'investisseurs désignés.",
      },
      { type: 'controle', question: QCM[29] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: "MONGALA ENERGIE SA : augmentation en numéraire avec prime et DPS",
    contexte: "MONGALA ENERGIE SA (capital 120 000 000, 12 000 actions de 10 000 intégralement libérées, valeur de l'action estimée à 18 000) décide en assemblée générale extraordinaire d'émettre 3 000 actions nouvelles de numéraire au prix de 14 000, fonds intégralement appelés à la souscription et versés chez le notaire. La souscription est ouverte 25 jours ; l'augmentation est intégralement souscrite.",
    questions: [
      {
        num: 1,
        enonce: "Vérifiez la régularité de l'opération : organe compétent, rapports, préalables, délai de souscription.",
        correction: "AGE seule compétente, sur les rapports du conseil d'administration et du commissaire aux comptes (art. 564, 588-591 — leur absence rendrait les délibérations nulles). Préalable : le capital ancien est intégralement libéré (art. 572). Le prix d'émission (14 000) excède le nominal : la différence est une prime d'émission (art. 563). Le délai de souscription (25 jours) respecte le minimum de vingt jours (art. 577). L'opération devra être réalisée dans les trois ans (art. 571).",
      },
      {
        num: 2,
        enonce: "Calculez la valeur théorique du droit de souscription et vérifiez-la du point de vue d'un non-actionnaire.",
        correction: "Valeur après l'opération = (12 000 × 18 000 + 3 000 × 14 000) / 15 000 = (216 000 000 + 42 000 000) / 15 000 = 17 200. ds = 18 000 − 17 200 = 800. Il faut 12 000 / 3 000 = 4 droits par action nouvelle : un non-actionnaire paie 14 000 + 4 × 800 = 17 200, soit exactement la valeur de l'action après l'opération — le DPS neutralise la dilution (technique de la pratique ; le texte rend simplement le droit négociable, art. 574).",
      },
      {
        num: 3,
        enonce: "Passez les écritures : réception des fonds, réalisation, reversement par le notaire.",
        correction: "Réception : débit 4732 Mandataires — Notaire 42 000 000 / crédit 4615 Apporteurs, versements reçus sur augmentation de capital 42 000 000. Réalisation (au jour de la DNSV, art. 571) : débit 4615 42 000 000 / crédit 1013 pour 30 000 000 (3 000 × 10 000) et crédit 1051 Primes d'émission 12 000 000 (3 000 × 4 000). Reversement : débit 521 / crédit 4732 pour 42 000 000 — le retrait ne pouvant intervenir qu'une fois l'augmentation réalisée (art. 615). Schéma de l'Application 60.",
      },
      {
        num: 4,
        enonce: "Un actionnaire détenant 800 actions ne souhaite pas souscrire. Que peut-il faire de ses droits, et que percevrait-il en théorie ?",
        correction: "Son DPS est négociable pendant la durée de la souscription (art. 574) : il peut vendre ses 800 droits, pour une valeur théorique de 800 × 800 = 640 000, qui compense la baisse de valeur de ses actions (800 × (18 000 − 17 200) = 640 000). Il peut aussi renoncer individuellement, au profit de personnes dénommées (avec leur acceptation) ou sans indication de bénéficiaire, en avisant la société avant la clôture de la souscription (art. 593-595).",
      },
      {
        num: 5,
        enonce: "Si la souscription n'avait atteint que 2 400 actions (80 %), l'opération aurait-elle pu aboutir ?",
        correction: "Oui, à conditions : 2 400/3 000 = 80 % ≥ trois quarts, donc le conseil aurait pu limiter l'augmentation au montant souscrit si l'assemblée avait expressément prévu cette faculté (art. 579, 1°) ; il aurait aussi pu répartir librement les actions non souscrites ou les offrir au public si l'assemblée l'avait admis (art. 579, 2° et 3°), dans l'ordre de son choix (art. 580). À défaut de ces facultés, l'augmentation n'aurait pas été réalisée — le seuil de limitation d'office (97 %) n'étant pas atteint.",
      },
    ],
  },
  {
    id: 'cas2',
    titre: "UBANGI BRASSERIES SA : incorporation de réserves et rompus",
    contexte: "UBANGI BRASSERIES SA (capital 60 000 000, 6 000 actions de 10 000, réserves facultatives 35 000 000, valeur de l'action 22 000) décide d'incorporer 15 000 000 de réserves facultatives par émission de 1 500 actions gratuites (une action nouvelle pour quatre anciennes).",
    questions: [
      {
        num: 1,
        enonce: "Quelles conditions de vote s'appliquent à cette décision ?",
        correction: "L'augmentation par incorporation de réserves est votée par l'assemblée aux conditions de quorum et de majorité des assemblées générales ordinaires (art. 565) — dérogation à la compétence de droit commun de l'AGE statuant aux conditions extraordinaires. Si la société avait choisi la majoration du nominal plutôt que l'émission d'actions, la voie de l'incorporation aurait également dispensé de l'unanimité exigée en principe pour la majoration (art. 562, al. 3).",
      },
      {
        num: 2,
        enonce: "Passez l'écriture et décrivez son effet sur les capitaux propres.",
        correction: "Débit 1181 Réserves facultatives 15 000 000 / crédit 1013 Capital souscrit, appelé, versé, non amorti 15 000 000 (Application 61). Aucun flux : le total des capitaux propres est inchangé, leur structure se déplace des réserves vers le capital — qui devient indisponible à due concurrence, renforçant le gage des créanciers.",
      },
      {
        num: 3,
        enonce: "Calculez la valeur théorique du droit d'attribution.",
        correction: "Valeur après = (6 000 × 22 000) / 7 500 = 17 600. da = 22 000 − 17 600 = 4 400. Vérification : 4 droits pour une action gratuite, 4 × 4 400 = 17 600 = valeur de l'action reçue. L'actionnaire qui vend ses droits est indemnisé de la dilution ; celui qui les exerce conserve sa quote-part.",
      },
      {
        num: 4,
        enonce: "Un actionnaire détient 130 actions. Combien d'actions gratuites reçoit-il, et que deviennent ses rompus ?",
        correction: "130 / 4 = 32 actions gratuites, avec un rompu de 2 droits. Les droits formant rompus sont négociables et cessibles (art. 566) : il peut acheter 2 droits pour obtenir une 33e action, ou vendre ses 2 droits. L'assemblée peut toutefois décider expressément que les rompus ne sont pas négociables et que les actions correspondantes sont vendues, les sommes étant allouées aux titulaires dans les trente jours de l'inscription en compte des actions entières (art. 566, al. 2-3, et 567).",
      },
    ],
  },
  {
    id: 'cas3',
    titre: "TANGANYIKA AGRO SARL : augmentation par apports en nature et en numéraire",
    contexte: "TANGANYIKA AGRO SARL (capital 15 000 000, parts de 5 000) augmente son capital : M. K. apporte un matériel agricole évalué à 7 200 000, rémunéré par 1 200 parts nouvelles de 5 000 (valeur d'apport supérieure au nominal émis : 7 200 000 pour 6 000 000 de nominal) ; Mme L. souscrit 400 parts de numéraire au nominal, libérées de moitié.",
    questions: [
      {
        num: 1,
        enonce: "Un commissaire aux apports est-il requis, et quelle est la sanction de son absence ?",
        correction: "Oui : en cas d'augmentation réalisée totalement ou partiellement par apports en nature, un commissaire aux apports doit être désigné dès que la valeur de chaque apport considéré ou de l'ensemble excède 5 000 000 (art. 363) — le matériel (7 200 000) dépasse le seuil. Il peut aussi être nommé par la juridiction compétente à la demande de tout associé. Sanction : les délibérations prises en l'absence du commissaire aux apports sont nulles ; un rapport incomplet rend les délibérations annulables (art. 363, avant-dernier al.).",
      },
      {
        num: 2,
        enonce: "Vérifiez la régularité de la libération de Mme L. et le calendrier de l'opération.",
        correction: "Les parts de numéraire sont obligatoirement libérées de la moitié au moins à la souscription (art. 361-1) : 400 × 5 000 × 1/2 = 1 000 000 versés, régulier. Le surplus (1 000 000) doit être libéré dans les deux ans du jour où l'augmentation est devenue définitive — celle-ci étant réputée réalisée dès sa constatation dans un procès-verbal d'assemblée (art. 361-2). Les fonds sont déposés comme à la constitution, et le gérant en dispose en remettant au dépositaire un certificat du RCCM attestant l'inscription modificative (art. 361). Si l'augmentation n'est pas réalisée dans les six mois du premier dépôt, restitution possible sur autorisation judiciaire (art. 362).",
      },
      {
        num: 3,
        enonce: "Passez les écritures de l'apport en nature de M. K.",
        correction: "Promesse : débit 4611 Apporteurs, apports en nature 7 200 000 / crédit 1011 pour 7 200 000 (ou directement le schéma d'appel). Réalisation : débit 2411 Matériel (agricole) 7 200 000 / crédit 4613 pour 7 200 000 ; et virement de capital : débit 1011/1012 / crédit 1013 pour 6 000 000 de nominal et crédit 1052 Primes d'apport pour 1 200 000 — l'excédent de la valeur de l'apport sur le nominal émis constitue la prime d'apport. L'apport en nature est intégralement libéré dès la souscription.",
      },
      {
        num: 4,
        enonce: "Passez les écritures du numéraire de Mme L.",
        correction: "Souscription : débit 4615 (fraction appelée reçue) et 109 pour la fraction non appelée : débit 109 1 000 000 ; débit 521 Banques 1 000 000 / crédit 1011 pour 1 000 000 et crédit 1012 puis 1013 pour la fraction versée — en pratique : débit 109 1 000 000, débit 4613 1 000 000 / crédit 1011 1 000 000, crédit 1012 1 000 000 ; puis débit 521 / crédit 4613 1 000 000 et débit 1012 / crédit 1013 1 000 000. L'appel du solde interviendra dans les deux ans (art. 361-1), selon le cycle 4613 à 109, 1011 à 1012, puis 521 à 4613 et 1012 à 1013.",
      },
    ],
  },
  {
    id: 'cas4',
    titre: "ITURI MINES SA : suppression du DPS et libération par compensation",
    contexte: "ITURI MINES SA doit renforcer ses fonds propres. Son principal fournisseur, la société KIBALI SUPPLY (déjà actionnaire à 15 %), détient une créance commerciale échue de 25 000 000 sur la société. L'AGE envisage : (1) de supprimer le droit préférentiel de souscription au profit de KIBALI SUPPLY ; (2) de lui émettre 2 000 actions de nominal 10 000 au prix de 12 500, libérées par compensation avec sa créance.",
    questions: [
      {
        num: 1,
        enonce: "KIBALI SUPPLY peut-elle voter la suppression du DPS dont elle bénéficie ?",
        correction: "Non. L'article 587 : les bénéficiaires de la suppression, lorsqu'ils sont actionnaires, ne prennent pas part au vote, ni pour eux-mêmes ni comme mandataires, et leurs actions ne sont pas prises en compte pour le calcul du quorum et de la majorité. L'assemblée statue sur le rapport du conseil — indiquant les motifs de la suppression, le nom de l'attributaire, le nombre de titres et le prix justifié (art. 589) — et sur l'avis du commissaire aux comptes (art. 591), à peine de nullité.",
      },
      {
        num: 2,
        enonce: "La libération par compensation est-elle possible, et à quelles conditions ?",
        correction: "Oui : l'article 562 admet la libération par compensation avec des créances certaines, liquides et exigibles sur la société — la créance commerciale échue de KIBALI SUPPLY l'est. Formalités : arrêté des comptes des créances établi par le conseil d'administration et certifié exact par le commissaire aux comptes (art. 611) ; le notaire constate la libération au vu de cet arrêté, annexé à la DNSV (art. 614). Rappel : le capital ancien doit être intégralement libéré (art. 572).",
      },
      {
        num: 3,
        enonce: "Passez l'écriture de réalisation de l'augmentation.",
        correction: "Prix total : 2 000 × 12 500 = 25 000 000, égal à la créance compensée. Écriture : débit 401 Fournisseurs (créance de KIBALI SUPPLY éteinte) 25 000 000 / crédit 1013 pour 20 000 000 (nominal) et crédit 1051 Primes d'émission 5 000 000. La dette fournisseur se transforme en capitaux propres — sans mouvement de trésorerie. La prime, exigible en totalité à la souscription (art. 604), est ici couverte par la compensation.",
      },
      {
        num: 4,
        enonce: "Quel est l'intérêt et quel est le risque de cette opération pour les autres actionnaires ?",
        correction: "Intérêt : désendettement immédiat (25 000 000 de dettes en moins), amélioration de la structure financière sans sortie de trésorerie, consolidation d'un partenaire stratégique. Risque : dilution — la participation de KIBALI SUPPLY augmente et la quote-part des autres actionnaires diminue, sans qu'ils aient pu souscrire. C'est précisément pourquoi le législateur encadre la suppression du DPS : rapports justifiant le prix (art. 589-591, à peine de nullité), exclusion du bénéficiaire du vote (art. 587), et information sur l'incidence de l'émission sur la quote-part des capitaux propres de chaque actionnaire (art. 590).",
      },
    ],
  },

  {
    id: 'cas5',
    titre: "KIVU CRÉDIT SA : recapitaliser une banque congolaise",
    contexte: "KIVU CRÉDIT SA, banque établie à Goma, a un capital de 120 000 000 000 FC (1 200 000 actions de 100 000 FC, entièrement libérées), détenu à parts égales par deux actionnaires. Pour atteindre l'équivalent de 50 millions de dollars (cours retenu : 2 850 FC le dollar, hypothèse) et compter quatre actionnaires détenant chacun au moins 15 %, l'AGE décide une augmentation de 540 000 actions au prix de 150 000 FC, avec suppression du DPS au profit de deux investisseurs nommément désignés, qui souscrivent chacun 270 000 actions et libèrent intégralement. Les fonds sont déposés en banque. Les frais de l'opération (honoraires, notaire, publicité) s'élèvent à 400 000 000 FC et la société décide de les imputer sur la prime.",
    questions: [
      { num: 1, enonce: "Vérifiez la régularité de la décision au regard de l'AUSCGIE.", correction: "AGE seule compétente, sur les rapports du conseil et du commissaire aux comptes (art. 564). La suppression du DPS au profit de bénéficiaires nommément désignés est possible (art. 586) ; les rapports doivent indiquer les motifs, les attributaires, le prix justifié et l'incidence sur la quote-part de capitaux propres de chaque actionnaire, faute de quoi la délibération est nulle (art. 588-591). Les bénéficiaires, non encore actionnaires, ne votent pas de toute façon (art. 587). Préalable : le capital ancien est entièrement libéré (art. 572)." },
      { num: 2, enonce: "Calculez le capital et la prime, puis passez les écritures de versement et de réalisation.", correction: "Fonds : 540 000 × 150 000 = 81 000 000 000 ; nominal : 540 000 × 100 000 = 54 000 000 000 ; prime : 27 000 000 000. Versement : débit 521 (compte spécial) 81 000 000 000 / crédit 4615 81 000 000 000. Réalisation au jour de la déclaration notariée (art. 571) : débit 4615 81 000 000 000 / crédit 1013 54 000 000 000 et crédit 1051 27 000 000 000. Les fonds ne sont disponibles qu'après la réalisation (art. 615)." },
      { num: 3, enonce: "Comptabilisez les frais et leur imputation sur la prime.", correction: "Les frais sont d'abord enregistrés en charges par nature, par exemple débit 6324 Honoraires et 6271 Annonces, insertions pour 400 000 000 / crédit 521. Imputation sur la prime, faculté prévue par l'AUDCIF (compte 105) : débit 1051 Primes d'émission 400 000 000 / crédit 781 Transferts de charges d'exploitation 400 000 000. La prime nette s'établit à 26 600 000 000 ; le résultat n'est pas affecté." },
      { num: 4, enonce: "La banque respecte-t-elle ensuite le capital minimum et la règle des quatre actionnaires ?", correction: "Capital : 120 000 000 000 + 54 000 000 000 = 174 000 000 000 FC, supérieur à 50 000 000 × 2 850 = 142 500 000 000 FC : le minimum indiqué par l'ANAPI est atteint, et le capital est libéré. Actionnariat : 1 740 000 actions ; chaque ancien actionnaire détient 600 000 actions, soit 34,5 %, chaque investisseur 270 000, soit 15,5 % : quatre actionnaires à 15 % au moins, conformément à l'article 11 de la loi n° 22/069 et à l'Instruction n° 18 de la BCC." },
      { num: 5, enonce: "Deux ans plus tard, le franc congolais s'est déprécié à 3 600 FC le dollar. Quelle conséquence, et quelles solutions ?", correction: "L'équivalent de 50 millions de dollars devient 180 000 000 000 FC, supérieur au capital de 174 000 000 000 FC : la banque passe sous le seuil sans qu'aucun actionnaire ne se soit retiré, puisque le capital est inscrit en francs congolais (art. 17 AUDCIF). Solutions : incorporation de réserves au capital (art. 565, Application 61), si la banque en dispose, nouvel apport en numéraire des actionnaires, ou conversion d'obligations convertibles (art. 562, al. 4). Le suivi du capital réglementaire doit donc tenir compte du taux de change." },
    ],
  },
  {
    id: 'cas6',
    titre: "TANGANYIKA TÉLÉCOM SA : actions gratuites pour le personnel",
    contexte: "TANGANYIKA TÉLÉCOM SA, non cotée, a un capital de 8 000 000 000 FC (800 000 actions de 10 000). Ses statuts ne prévoient pas de dérogation au seuil individuel de 10 %. Le 20/05/N, l'AGE, sur le rapport du conseil et le rapport spécial du commissaire aux comptes, autorise pour 36 mois l'attribution gratuite de 60 000 actions à émettre au profit des cadres, avec une période d'acquisition de deux ans et une obligation de conservation de deux ans. Le conseil attribue le 01/07/N ; parmi les bénéficiaires figure M. S., cadre qui détient déjà 88 000 actions. Par ailleurs, la société a racheté en N 5 000 de ses propres actions au prix de 13 000 pour les attribuer gratuitement à son directeur général, sans contrepartie.",
    questions: [
      { num: 1, enonce: "L'autorisation respecte-t-elle les plafonds de l'article 626-1 ?", correction: "Plafond global : 10 % du capital à la date de la décision d'attribution, soit 80 000 actions ; 60 000 actions (7,5 %) le respectent. Durée de l'autorisation : 36 mois au plus, respectée. Période d'acquisition et obligation de conservation d'au moins deux ans chacune : respectées. L'autorisation emporte renonciation des actionnaires à leur DPS sur les actions à émettre." },
      { num: 2, enonce: "M. S. peut-il recevoir des actions gratuites ?", correction: "Il détient 88 000 actions sur 800 000, soit 11 % du capital. Or il ne peut pas être attribué d'actions aux salariés détenant chacun plus de 10 % du capital (art. 626-1-2-1) ; la société n'étant pas cotée, ses statuts auraient pu relever le seuil jusqu'à 20 %, mais ils ne le prévoient pas. M. S. doit être exclu de l'attribution ; à défaut, l'attribution serait nulle." },
      { num: 3, enonce: "Comptabilisez l'attribution des 60 000 actions à émettre selon le schéma de l'Application 77.", correction: "Lors de l'affectation du résultat par l'AGO, constitution d'une réserve de 60 000 × 10 000 = 600 000 000 : débit 1301 / crédit 1132 Réserves d'attribution gratuite d'actions au personnel salarié et aux dirigeants (ou 118, comme dans l'Application) 600 000 000. À l'attribution définitive, au terme de la période d'acquisition le 01/07/N+2, l'augmentation de capital est réalisée du seul fait de l'attribution (art. 626-1) : débit 1132 / crédit 1013 600 000 000." },
      { num: 4, enonce: "Comptabilisez le rachat et l'attribution des 5 000 actions au directeur général (Application 76).", correction: "Rachat : débit 5021 Actions ou parts propres 65 000 000 / crédit 521 65 000 000 (5 000 × 13 000). Attribution gratuite sans contrepartie : débit 6772 Mali provenant d'attribution gratuite d'actions au personnel salarié et aux dirigeants 65 000 000 / crédit 5021 65 000 000. Le DG d'une SA peut en bénéficier dans les mêmes conditions que les salariés (art. 626-1-2) ; le conseil décide qu'il ne pourra les céder avant la cessation de ses fonctions ou fixe la quantité à conserver au nominatif." },
      { num: 5, enonce: "Quelle information l'AGO doit-elle recevoir chaque année ?", correction: "Un rapport spécial du conseil l'informe des opérations d'attribution gratuite, du nombre et de la valeur des actions attribuées à chaque dirigeant, ainsi qu'aux dix salariés non dirigeants les mieux servis, et de la répartition entre catégories de bénéficiaires (art. 626-4). Pendant la période d'acquisition, les droits sont incessibles ; en cas de décès, les héritiers peuvent demander l'attribution dans les six mois (art. 626-3)." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 4,
  id: 'ue3-chapitre-4',
  titre: "L'augmentation de capital",
  sousTitre: "AUSCGIE révisé, art. 357-363 (SARL), 562-626-6 (SA), 853-11 (SAS) · AUDCIF, compte 105 · SYSCOHADA, Applications 60, 61, 76 et 77 · loi bancaire n° 22/069",
  infoBulle: "Procédés et compétence, droit préférentiel de souscription et sa valeur, suppression du DPS, libération et réalisation dans la SA, régime de la SARL et de la SAS, écritures en numéraire avec prime et frais imputés, incorporation de réserves et droit d'attribution, apports en nature, compensation et conversion, attribution gratuite d'actions au personnel, et l'exemple des banques congolaises.",
  loiRef: "Art. 44, 62-63, 358-363, 562-626-6, 853-3, 853-4, 853-11 AUSCGIE · AUDCIF, compte 105 · App. 60, 61, 76, 77 · loi n° 22/069, art. 11",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Distinguer les procédés d'augmentation et identifier l'organe compétent et les majorités (art. 562-569 ; 358-360)",
    "Appliquer le droit préférentiel de souscription et calculer la valeur théorique du droit de souscription et du droit d'attribution",
    "Maîtriser la suppression du DPS et les rapports exigés à peine de nullité (art. 586-591)",
    "Suivre la libération, le dépôt des fonds et la réalisation dans la SA et dans la SARL (art. 604-615 ; 361-362)",
    "Comptabiliser une augmentation en numéraire avec prime, libération partielle et imputation des frais (Application 60 ; AUDCIF, compte 105)",
    "Comptabiliser une incorporation de réserves, un apport en nature avec prime d'apport et une compensation de créances",
    "Mettre en œuvre l'attribution gratuite d'actions au personnel et aux dirigeants (art. 626-1 à 626-6 ; Applications 76 et 77)",
    "Replacer l'augmentation de capital dans le contexte bancaire congolais : capital minimum, actionnariat, réforme en cours",
  ],
  sections: SECTIONS,
  aRetenir: [
    "L'augmentation se fait par apports nouveaux (numéraire, nature, compensation, conversion) ou par incorporation de réserves, bénéfices ou primes ; majoration du nominal hors incorporation à l'unanimité (art. 562).",
    "SA : AGE seule compétente sur les rapports du conseil et du commissaire aux comptes ; conditions de l'AGO pour l'incorporation ; délégation de compétence 24 mois au plus ; réalisation dans les trois ans ; capital ancien entièrement libéré avant toute émission en numéraire (art. 564-572).",
    "DPS irréductible et proportionnel, négociable ou cessible, délai de souscription de vingt jours au moins, limitation possible à 75 % si l'assemblée l'a prévu et d'office à 97 % (art. 573-580).",
    "Suppression du DPS au profit de personnes désignées, qui ne votent pas ; rapports du conseil et du commissaire aux comptes à peine de nullité, avec l'incidence sur la quote-part de capitaux propres (art. 586-591).",
    "Libération en numéraire : un quart du nominal et toute la prime à la souscription, solde dans les trois ans ; actions d'apport intégralement libérées ; compensation sur arrêté des comptes certifié ; retrait des fonds après réalisation (art. 604-615, 626).",
    "SARL : trois quarts du capital pour décider, moitié des parts pour l'incorporation ; libération de moitié et solde en deux ans ; commissaire aux apports au-delà de 5 000 000 FCFA (art. 358-363). SAS : décision collective selon les statuts, règles de la SA par renvoi, pas d'offre au public (art. 853-3, 853-4, 853-11).",
    "Application 60 : fonds au 4615, réalisation par le crédit du 1013 (nominal) et du 1051 (prime). Les frais d'augmentation peuvent être imputés sur la prime : débit 105, crédit 78 (AUDCIF).",
    "Incorporation (Application 61) : débit réserve ou prime, crédit 1013, capitaux propres inchangés ; droit d'attribution da = n × V / (N + n) ; rompus négociables sauf décision contraire de l'AGE (art. 566).",
    "Apport en nature : commissaire aux apports distinct du commissaire aux comptes, rapport déposé huit jours avant l'AGE ; prime d'apport au 1052 ; nombre d'actions fixé sur la valeur réelle de l'action (art. 619-626).",
    "Actions gratuites : plafond global de 10 % du capital, seuil individuel de 10 % (20 % si statuts d'une société non cotée), acquisition et conservation de deux ans au moins ; mali au 6772 pour des actions rachetées, virement réserve vers capital pour des actions à émettre (art. 626-1 s. ; Applications 76-77).",
    "En RDC, les banques doivent justifier d'un capital libéré équivalant à 50 millions de dollars et, selon l'art. 11 de la loi n° 22/069, d'au moins quatre actionnaires ; la réforme parlementaire ramenant ce nombre à deux n'est pas promulguée à notre connaissance.",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "30 janvier 2014 ; art. 1, 44, 62-63, 68, 357-363, 387, 562-626-6, 822-1 s., 853-3, 853-4 et 853-11" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)", precision: "art. 17, 36, 51-52 ; Titre VII, compte 105 (primes et imputation des frais d'augmentation)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Guide d'application", precision: "Applications 59, 60 (augmentation en numéraire), 61 (incorporation de réserves), 76 et 77 (attribution gratuite d'actions), 80 (obligations convertibles)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, plan de comptes", precision: "comptes 1011-1013, 1051-1054, 109, 1132, 118, 1612, 4611, 4615, 4621, 5021, 6772, 781" },
    { genre: 'texte', intitule: "Loi n° 22/069 du 27 décembre 2022 relative à l'activité et au contrôle des établissements de crédit", precision: "art. 11 (forme et actionnariat des établissements de crédit), dans sa rédaction de 2022" },
    { genre: 'article', auteur: "Agence nationale pour la promotion des investissements (ANAPI)", titre: "Comment créer une banque ?", support: "anapi.cd", precision: "mise à jour du 21 février 2026, consultée le 24 septembre 2026" },
    { genre: 'article', auteur: "Bamba G. A.", titre: "Les banques de RDC sous pression pour attirer de nouveaux actionnaires d'ici juillet 2026", support: "Bankable", precision: "23 avril 2025" },
    { genre: 'article', auteur: "Kabeya B.", titre: "Banque : la RDC fait un pas vers la réduction du nombre minimum d'actionnaires", support: "Bankable", precision: "18 juin 2025" },
    { genre: 'article', auteur: "Lutete C.", titre: "Sénat : audition jeudi du rapport sur une proposition de loi des établissements bancaires", support: "Agence congolaise de presse (acp.cd)", precision: "26 novembre 2025" },
    { genre: 'article', auteur: "Rédaction de Droit Médias Finance", titre: "RDC, réglementation bancaire : une réforme en cours de la loi n° 22-069 du 27 décembre 2022", support: "droitmediasfinance.com", precision: "janvier 2026" },
    { genre: 'ouvrage', auteur: "Mapapa Mbangala A., Nkoy Mbangala C. et Mensah Freitas C.", titre: "Comptabilité des sociétés OHADA", editeur: "Droit Afrique", lieu: "s.l.", annee: "2026" },
    { genre: 'ouvrage', auteur: "Dobill M.", titre: "Comptabilité OHADA, tome 3 : comptabilité des sociétés", editeur: "Karthala", lieu: "Paris", annee: "2013" },
    { genre: 'ouvrage', auteur: "Nzoimbengene Luyindula B. D.", titre: "Comptabilité des sociétés suivant le système comptable OHADA révisé", editeur: "2e éd., à compte d'auteur", lieu: "s.l.", annee: "2025" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · AUDCIF et SYSCOHADA révisé (Applications 60, 61, 76, 77) · loi n° 22/069 du 27 décembre 2022 · ANAPI (2026) · Bankable (2025) · ACP (2025) · Droit Médias Finance (2026).",
}

export default chapitre
