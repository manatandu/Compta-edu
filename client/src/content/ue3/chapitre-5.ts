// Chapitre 5 du module UE3, Comptabilité des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014 : art. 66, 69-70, 143, 269-1 à
//   269-7, 366-373 (SARL), 627-669 (SA : réduction, rachat d'actions
//   propres, amortissement et reconversion, capitaux propres inférieurs à
//   la moitié du capital), 853-3 et 853-11 (SAS), skill
//   auscgie-acte-uniforme. L'art. 627 et l'art. 668 comportent des phrases
//   tronquées dans le texte officiel : le sens est restitué sans être cité.
// - AUDCIF, Titre VII, comptes 101, 105, 13 et 50 ; SYSCOHADA révisé,
//   Applications 62, 63 et 64 ; plan de comptes (1013, 1014, 1291, 4619,
//   5021) ; logique du tableau des flux (prélèvements sur le capital),
//   skills audcif-acte-uniforme et syscohada ;
// - loi n° 23/053 du 30 novembre 2023, art. 74 (remboursements d'apports),
//   skill fiscalite-rdc ; arrêté du 30 décembre 2014 (capital de la SARL).
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch5-q1', question: "Comment le capital d'une SA peut-il être réduit ?",
    options: [
      { id: 'a', texte: "Uniquement par remboursement en espèces" },
      { id: 'b', texte: "Par diminution de la valeur nominale des actions ou par diminution de leur nombre" },
      { id: 'c', texte: "Par réévaluation négative des actifs" },
      { id: 'd', texte: "Par décision du directeur général" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 627 AUSCGIE',
    explication: "L'article 627 vise la diminution de la valeur nominale ou du nombre des actions ; le texte officiel comporte une phrase tronquée, mais son sens est constant. La réduction peut être motivée par des pertes ou non (remboursement, rachat pour annulation).",
  },
  {
    id: 'ch5-q2', question: "Quel organe décide ou autorise la réduction de capital dans la SA ?",
    options: [
      { id: 'a', texte: "Le conseil d'administration" },
      { id: 'b', texte: "L'assemblée générale extraordinaire, qui peut déléguer au conseil les pouvoirs pour la réaliser" },
      { id: 'c', texte: "L'assemblée générale ordinaire" },
      { id: 'd', texte: "Le commissaire aux comptes" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 628 AUSCGIE',
    explication: "La réduction est autorisée ou décidée par l'AGE, qui peut déléguer au conseil ou à l'administrateur général tous pouvoirs pour la réaliser (art. 628) ; en ce cas, le conseil dresse un procès-verbal soumis à publicité et modifie les statuts (art. 631).",
  },
  {
    id: 'ch5-q3', question: "Une réduction de capital peut-elle favoriser certains actionnaires ?",
    options: [
      { id: 'a', texte: "Oui, librement" },
      { id: 'b', texte: "Non, sauf consentement exprès des actionnaires défavorisés" },
      { id: 'c', texte: "Oui, si le conseil le décide" },
      { id: 'd', texte: "Oui, dans la limite de 10 %" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 628 et 638-1 AUSCGIE',
    explication: "La réduction ne peut en aucun cas porter atteinte à l'égalité des actionnaires, sauf consentement exprès des actionnaires défavorisés (art. 628) ; les délibérations contraires sont nulles (art. 638-1). En SARL, toute atteinte à l'égalité est nulle (art. 366).",
  },
  {
    id: 'ch5-q4', question: "Quand le projet de réduction doit-il être communiqué au commissaire aux comptes de la SA ?",
    options: [
      { id: 'a', texte: "Huit jours avant l'AGE" },
      { id: 'b', texte: "Quarante-cinq jours au moins avant l'AGE" },
      { id: 'c', texte: "Après l'AGE" },
      { id: 'd', texte: "Il n'a pas à l'être" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 629-630 AUSCGIE',
    explication: "Le projet est communiqué quarante-cinq jours au moins avant l'AGE (art. 629). Le commissaire présente un rapport sur les causes et conditions de la réduction ; toute délibération prise sans ce rapport est nulle (art. 630). En SARL, le délai est de trente jours, s'il existe un commissaire (art. 367).",
  },
  {
    id: 'ch5-q5', question: "Les créanciers peuvent-ils s'opposer à une réduction de capital motivée par des pertes ?",
    options: [
      { id: 'a', texte: "Oui, dans les trente jours" },
      { id: 'b', texte: "Non" },
      { id: 'c', texte: "Oui, s'ils sont banquiers" },
      { id: 'd', texte: "Oui, si leur créance dépasse 10 % du capital" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 632 AUSCGIE',
    explication: "« Les créanciers de la société ne peuvent pas s'opposer à la réduction de capital lorsque celle-ci est motivée par des pertes » (art. 632) : la réduction ne fait que constater une perte de substance déjà subie.",
  },
  {
    id: 'ch5-q6', question: "Quels créanciers peuvent s'opposer à une réduction non motivée par des pertes ?",
    options: [
      { id: 'a', texte: "Tous les créanciers, même postérieurs" },
      { id: 'b', texte: "Ceux dont la créance est antérieure à la date de l'avis publié relatif au procès-verbal de l'assemblée" },
      { id: 'c', texte: "Seulement l'État" },
      { id: 'd', texte: "Aucun" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 633 AUSCGIE',
    explication: "Les créanciers dont la créance est antérieure à la date de l'avis publié dans un journal d'annonces légales relatif au procès-verbal de la délibération peuvent s'opposer (art. 633) ; le délai est de trente jours à compter de la publication (art. 634).",
  },
  {
    id: 'ch5-q7', question: "Une opposition est formée. La société peut-elle rembourser les actionnaires ?",
    options: [
      { id: 'a', texte: "Oui, immédiatement" },
      { id: 'b', texte: "Non : les opérations ne peuvent commencer pendant le délai d'opposition ni avant la décision de première instance ; si l'opposition est accueillie, il faut rembourser les créances ou constituer des garanties suffisantes" },
      { id: 'c', texte: "Oui, avec l'accord du commissaire aux comptes" },
      { id: 'd', texte: "Oui, à moitié" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 636-637 AUSCGIE',
    explication: "Les opérations de réduction ne peuvent commencer pendant le délai d'opposition ni, le cas échéant, avant qu'il ait été statué en première instance (art. 636) ; si l'opposition est accueillie, la procédure est interrompue jusqu'au remboursement des créances ou à la constitution de garanties jugées suffisantes (art. 637).",
  },
  {
    id: 'ch5-q8', question: "Comment l'Application 62 comptabilise-t-elle une réduction de capital par imputation de pertes de 80 000 000 ?",
    options: [
      { id: 'a', texte: "Débit 521 / crédit 1013" },
      { id: 'b', texte: "Débit 1013 / crédit 1291 Perte nette à reporter" },
      { id: 'c', texte: "Débit 1291 / crédit 1013" },
      { id: 'd', texte: "Débit 4619 / crédit 1013" },
    ],
    reponseCorrecte: 'b', articleRef: 'App. 62',
    explication: "Le capital est diminué et le report à nouveau débiteur apuré : débit 1013, crédit 1291. Aucune trésorerie ne sort ; les capitaux propres ne changent pas, seule leur composition change.",
  },
  {
    id: 'ch5-q9', question: "Dans l'Application 63 (réduction par remboursement), quel compte enregistre la dette envers les actionnaires ?",
    options: [
      { id: 'a', texte: "4613" },
      { id: 'b', texte: "4619 Apporteurs, capital à rembourser" },
      { id: 'c', texte: "465" },
      { id: 'd', texte: "4616" },
    ],
    reponseCorrecte: 'b', articleRef: 'App. 63',
    explication: "À la décision : débit 1013, crédit 4619 ; au remboursement : débit 4619, crédit 521. Le paiement n'intervient qu'après le délai d'opposition des créanciers (art. 634-636).",
  },
  {
    id: 'ch5-q10', question: "Dans une SARL, une réduction de capital peut-elle ramener le capital sous le minimum légal ?",
    options: [
      { id: 'a', texte: "Oui, librement" },
      { id: 'b', texte: "Non, sauf augmentation corrélative décidée lors de la même assemblée pour le porter au moins au minimum" },
      { id: 'c', texte: "Oui, si les associés sont unanimes" },
      { id: 'd', texte: "Oui, pendant deux ans" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 368-369 AUSCGIE',
    explication: "La réduction ne peut ramener le capital sous le minimum légal, sauf augmentation corrélative lors de la même assemblée (art. 368) ; à défaut, tout intéressé peut demander la dissolution après mise en demeure (art. 369). En RDC, le capital de la SARL étant librement fixé, la contrainte est allégée.",
  },
  {
    id: 'ch5-q11', question: "La SARL peut-elle acheter ses propres parts sociales ?",
    options: [
      { id: 'a', texte: "Oui, librement" },
      { id: 'b', texte: "Non, sauf si l'assemblée qui a décidé une réduction non motivée par des pertes autorise le gérant à en acheter un nombre déterminé pour les annuler" },
      { id: 'c', texte: "Oui, dans la limite de 10 %" },
      { id: 'd', texte: "Oui, pour les revendre" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 367 AUSCGIE',
    explication: "« L'achat de ses propres parts par la société est interdit. Toutefois, l'assemblée qui a décidé une réduction de capital non motivée par des pertes peut autoriser le gérant à acheter un nombre déterminé de parts sociales pour les annuler » (art. 367).",
  },
  {
    id: 'ch5-q12', question: "Quel est le principe posé par l'article 639 pour la SA ?",
    options: [
      { id: 'a', texte: "La société peut acheter librement ses actions" },
      { id: 'b', texte: "La souscription ou l'achat par la société de ses propres actions est interdit, ainsi que le financement de leur acquisition par un tiers, sauf dérogations" },
      { id: 'c', texte: "La société doit détenir 10 % de ses actions" },
      { id: 'd', texte: "Les actions propres donnent droit au dividende" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 639 AUSCGIE',
    explication: "La souscription ou l'achat par la société de ses propres actions, directement ou par personne interposée, est interdit, de même que l'avance de fonds, les prêts ou les sûretés pour leur acquisition par un tiers. L'AGE qui décide une réduction non motivée par des pertes peut autoriser l'achat d'un nombre déterminé d'actions pour les annuler.",
  },
  {
    id: 'ch5-q13', question: "Pour une attribution gratuite d'actions, quelle part maximale de ses propres actions la société peut-elle détenir ?",
    options: [
      { id: 'a', texte: "5 %" },
      { id: 'b', texte: "10 % du total de ses propres actions, à attribuer dans l'année" },
      { id: 'c', texte: "25 %" },
      { id: 'd', texte: "Aucune limite" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 640 AUSCGIE',
    explication: "Les actions acquises en vue d'une attribution gratuite doivent être attribuées dans un délai d'un an ; la société ne peut posséder plus de 10 % de ses propres actions ; elles sont nominatives et entièrement libérées, ne donnent pas droit aux dividendes, et l'acquisition ne peut abaisser les capitaux propres sous le capital augmenté des réserves non distribuables (art. 640).",
  },
  {
    id: 'ch5-q14', question: "Une SA rachète ses actions pour les annuler. Comment présente-t-elle son offre ?",
    options: [
      { id: 'a', texte: "À quelques actionnaires choisis" },
      { id: 'b', texte: "À tous les actionnaires, par avis dans un journal d'annonces légales (ou notification si toutes les actions sont nominatives), avec un délai d'au moins trente jours" },
      { id: 'c', texte: "Par décision du conseil sans publicité" },
      { id: 'd', texte: "En bourse uniquement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 643-644 AUSCGIE',
    explication: "L'offre d'achat est présentée à tous les actionnaires, par un avis contenant notamment le nombre d'actions, le prix offert, le mode de paiement et un délai d'au moins trente jours (art. 643) ; si toutes les actions sont nominatives, une notification individuelle peut remplacer l'avis (art. 644).",
  },
  {
    id: 'ch5-q15', question: "Les actions présentées à l'achat excèdent le nombre prévu. Que fait la société ?",
    options: [
      { id: 'a', texte: "Elle choisit librement les vendeurs" },
      { id: 'b', texte: "Elle réduit proportionnellement, pour chaque vendeur, au nombre d'actions dont il justifie être propriétaire" },
      { id: 'c', texte: "Elle achète tout" },
      { id: 'd', texte: "Elle annule l'offre" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 645 AUSCGIE',
    explication: "Il est procédé, pour chaque actionnaire vendeur, à une réduction proportionnelle au nombre d'actions dont il justifie être propriétaire ou titulaire (art. 645). Si les actions présentées sont insuffisantes, le capital est réduit à due concurrence des actions achetées (art. 646).",
  },
  {
    id: 'ch5-q16', question: "Dans quel délai les actions rachetées pour réduire le capital doivent-elles être annulées ?",
    options: [
      { id: 'a', texte: "Un an" },
      { id: 'b', texte: "Quinze jours suivant l'expiration du délai de maintien de l'offre" },
      { id: 'c', texte: "Deux ans" },
      { id: 'd', texte: "À la prochaine AGO" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 649-650 AUSCGIE',
    explication: "Les actions achetées en vue d'une réduction du capital doivent être annulées dans les quinze jours suivant l'expiration du délai de maintien de l'offre (art. 649). L'annulation est constatée par mention au registre des actions nominatives, ou par virement à un compte d'ordre pour les titres au porteur (art. 650).",
  },
  {
    id: 'ch5-q17', question: "La SA peut-elle prendre ses propres actions en nantissement ?",
    options: [
      { id: 'a', texte: "Oui, librement" },
      { id: 'b', texte: "Non, sauf opérations courantes des établissements de crédit, de microfinance ou d'assurance caution agréés" },
      { id: 'c', texte: "Oui, dans la limite de 10 %" },
      { id: 'd', texte: "Oui, si elles sont cotées" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 642 AUSCGIE',
    explication: "La prise en nantissement de ses propres actions est interdite ; les actions ainsi reçues doivent être restituées dans un an (deux ans en cas de transmission universelle ou de décision de justice), à défaut de quoi le contrat est nul de plein droit. L'interdiction ne vise pas les opérations courantes des établissements de crédit, de microfinance ou d'assurance caution agréés (art. 642).",
  },
  {
    id: 'ch5-q18', question: "Qu'est-ce que l'amortissement du capital ?",
    options: [
      { id: 'a', texte: "Une réduction de capital" },
      { id: 'b', texte: "Le remboursement aux actionnaires de tout ou partie du nominal de leurs actions, à titre d'avance sur le produit de la liquidation future, sans réduction du capital" },
      { id: 'c', texte: "La dépréciation des immobilisations" },
      { id: 'd', texte: "Un emprunt" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 651 et 654 AUSCGIE',
    explication: "L'amortissement rembourse le nominal « à titre d'avance sur le produit de la liquidation future » (art. 651) ; il est réalisé par remboursement égal pour chaque action d'une même catégorie et n'entraîne pas de réduction de capital (art. 654).",
  },
  {
    id: 'ch5-q19', question: "Quel organe décide l'amortissement du capital ?",
    options: [
      { id: 'a', texte: "Toujours l'AGE" },
      { id: 'b', texte: "L'AGO lorsqu'il est prévu dans les statuts ; l'AGE dans leur silence" },
      { id: 'c', texte: "Le conseil" },
      { id: 'd', texte: "Les obligataires" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 652 AUSCGIE',
    explication: "L'amortissement est décidé par l'assemblée ordinaire lorsqu'il est prévu dans les statuts, par l'assemblée extraordinaire dans leur silence ; toute délibération contraire est nulle (art. 652).",
  },
  {
    id: 'ch5-q20', question: "Sur quelles sommes l'amortissement peut-il être prélevé ?",
    options: [
      { id: 'a', texte: "Sur la réserve légale" },
      { id: 'b', texte: "Sur les bénéfices ou les réserves non statutaires ; jamais sur la réserve légale ; sur les réserves statutaires seulement sur décision de l'AGE" },
      { id: 'c', texte: "Sur le capital" },
      { id: 'd', texte: "Sur un emprunt" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 655 AUSCGIE',
    explication: "Les sommes sont prélevées sur les bénéfices ou sur les réserves non statutaires ; ni sur la réserve légale, ni, sauf décision contraire de l'AGE, sur les réserves statutaires ; et le remboursement ne peut ramener les capitaux propres sous le capital augmenté des réserves indisponibles (art. 655).",
  },
  {
    id: 'ch5-q21', question: "Quelle écriture l'Application 64 passe-t-elle pour isoler le capital amorti ?",
    options: [
      { id: 'a', texte: "Débit 1014 / crédit 1013" },
      { id: 'b', texte: "Débit 1013 / crédit 1014 Capital souscrit, appelé, versé, amorti" },
      { id: 'c', texte: "Débit 1013 / crédit 521" },
      { id: 'd', texte: "Débit 1188 / crédit 1013" },
    ],
    reponseCorrecte: 'b', articleRef: 'App. 64',
    explication: "Le capital amorti est reclassé du 1013 au 1014 (le total du 101 est inchangé), puis la réserve finance le remboursement : débit 1188, crédit 4619 ; enfin débit 4619, crédit 521.",
  },
  {
    id: 'ch5-q22', question: "Quels droits les actions intégralement amorties (actions de jouissance) perdent-elles ?",
    options: [
      { id: 'a', texte: "Tous leurs droits" },
      { id: 'b', texte: "Le droit au premier dividende et le remboursement du nominal, à due concurrence" },
      { id: 'c', texte: "Le droit de vote" },
      { id: 'd', texte: "Le droit au boni de liquidation" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 653 et 656 AUSCGIE',
    explication: "Les actions amorties conservent tous leurs droits, à l'exception du droit au premier dividende (art. 145) et du remboursement du nominal, qu'elles perdent à due concurrence (art. 656). Intégralement amorties, elles sont dites actions de jouissance (art. 653).",
  },
  {
    id: 'ch5-q23', question: "Comment des actions amorties peuvent-elles être reconverties en actions de capital ?",
    options: [
      { id: 'a', texte: "Automatiquement après cinq ans" },
      { id: 'b', texte: "Sur décision de l'AGE, par prélèvement obligatoire sur les bénéfices revenant à ces actions ou par reversement des actionnaires, avec ratification des assemblées spéciales" },
      { id: 'c', texte: "Par décision du conseil" },
      { id: 'd', texte: "C'est impossible" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 657-661 AUSCGIE',
    explication: "L'AGE peut décider la reconversion (art. 657), réalisée par prélèvement obligatoire sur les bénéfices revenant aux actions concernées ou par reversement du montant amorti par les actionnaires (art. 658) ; ratification des assemblées spéciales (art. 659) ; sommes inscrites à un compte de réserve (art. 660) ; reconversion réalisée lorsque la réserve égale le montant amorti (art. 661).",
  },
  {
    id: 'ch5-q24', question: "Quand les dirigeants d'une SA doivent-ils convoquer l'AGE pour statuer sur une éventuelle dissolution anticipée ?",
    options: [
      { id: 'a', texte: "Dès que la société fait une perte" },
      { id: 'b', texte: "Dans les quatre mois de l'approbation des comptes faisant apparaître des capitaux propres inférieurs à la moitié du capital" },
      { id: 'c', texte: "Dans les deux ans" },
      { id: 'd', texte: "Jamais" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 664 AUSCGIE',
    explication: "Si, du fait de pertes constatées, les capitaux propres deviennent inférieurs à la moitié du capital, le conseil ou l'administrateur général convoque l'AGE dans les quatre mois de l'approbation des comptes pour décider s'il y a lieu à dissolution anticipée (art. 664).",
  },
  {
    id: 'ch5-q25', question: "La dissolution est écartée. Que doit faire la SA ?",
    options: [
      { id: 'a', texte: "Rien" },
      { id: 'b', texte: "Au plus tard à la clôture du deuxième exercice suivant la constatation des pertes, reconstituer ses capitaux propres à la moitié du capital, ou réduire son capital d'au moins les pertes non imputées sur les réserves" },
      { id: 'c', texte: "Augmenter son capital dans le mois" },
      { id: 'd', texte: "Se transformer en SARL" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 665 AUSCGIE',
    explication: "La société est tenue, au plus tard à la clôture du deuxième exercice suivant celui de la constatation, de réduire son capital d'un montant au moins égal aux pertes non imputées sur les réserves si les capitaux propres n'ont pas été reconstitués à la moitié au moins du capital (art. 665). La décision est déposée au RCCM et publiée (art. 666).",
  },
  {
    id: 'ch5-q26', question: "Une demande de dissolution est portée devant le juge. La société peut-elle encore l'éviter ?",
    options: [
      { id: 'a', texte: "Non" },
      { id: 'b', texte: "Oui : le juge peut accorder un délai de six mois au plus, et ne peut prononcer la dissolution si la régularisation a eu lieu au jour où il statue" },
      { id: 'c', texte: "Oui, en payant une amende" },
      { id: 'd', texte: "Oui, si les créanciers l'acceptent" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 667-668 AUSCGIE',
    explication: "Tout intéressé peut demander la dissolution si l'AGE n'a pas été réunie ou si l'article 665 n'a pas été appliqué (art. 667) ; le juge peut accorder un délai maximal de six mois pour régulariser, et ne peut prononcer la dissolution si la régularisation a eu lieu au jour où il statue (art. 668).",
  },
  {
    id: 'ch5-q27', question: "Ces règles sur la perte de la moitié du capital s'appliquent-elles à une société en redressement judiciaire ?",
    options: [
      { id: 'a', texte: "Oui" },
      { id: 'b', texte: "Non, ni en redressement judiciaire ni en liquidation des biens" },
      { id: 'c', texte: "Seulement à la SARL" },
      { id: 'd', texte: "Seulement aux sociétés cotées" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 669 AUSCGIE',
    explication: "Les articles 664 à 668 ne sont pas applicables aux sociétés en redressement judiciaire ou en liquidation des biens (art. 669), qui relèvent du droit des procédures collectives (AUPCAP).",
  },
  {
    id: 'ch5-q28', question: "Qu'est-ce que le « coup d'accordéon » ?",
    options: [
      { id: 'a', texte: "Une fusion" },
      { id: 'b', texte: "Une réduction de capital motivée par des pertes suivie d'une augmentation de capital, souvent réservée à un repreneur" },
      { id: 'c', texte: "Un amortissement du capital" },
      { id: 'd', texte: "Une distribution de réserves" },
    ],
    reponseCorrecte: 'b', articleRef: 'Pratique ; art. 368, 632 et 586 AUSCGIE',
    explication: "L'expression désigne l'enchaînement d'une réduction d'assainissement (sans opposition des créanciers, art. 632) et d'une augmentation de recapitalisation, souvent avec suppression du DPS au profit d'un repreneur (art. 586). Elle permet aussi de passer temporairement sous le minimum légal, sous réserve d'une augmentation corrélative (art. 368).",
  },
  {
    id: 'ch5-q29', question: "Au regard de la loi n° 23/053, un remboursement d'apports aux associés est-il un revenu distribué ?",
    options: [
      { id: 'a', texte: "Toujours" },
      { id: 'b', texte: "Non, mais seulement si tous les bénéfices et réserves autres que la réserve légale ont été auparavant répartis" },
      { id: 'c', texte: "Jamais" },
      { id: 'd', texte: "Oui, s'il dépasse 10 % du capital" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 74',
    explication: "Ne sont pas des revenus distribués les répartitions présentant le caractère de remboursement d'apports ou de primes d'émission, mais une répartition ne présente ce caractère que si tous les bénéfices et réserves autres que la réserve légale ont été auparavant répartis (art. 74).",
  },
  {
    id: 'ch5-q30', question: "Dans le tableau des flux de trésorerie, où figure un remboursement de capital aux associés ?",
    options: [
      { id: 'a', texte: "Dans les flux d'exploitation" },
      { id: 'b', texte: "Dans les flux de financement, sur la ligne des prélèvements sur le capital" },
      { id: 'c', texte: "Dans les flux d'investissement" },
      { id: 'd', texte: "Il n'y figure pas" },
    ],
    reponseCorrecte: 'b', articleRef: "Guide d'application, logique du TFT",
    explication: "Le prélèvement sur le capital se mesure par la variation des comptes de la classe 10 (hors 106 et 109), dans les flux de financement. Une réduction par imputation des pertes, qui ne déplace aucune trésorerie, n'y figure pas.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '5.1',
    titre: "La réduction de capital : motifs, décision et contrôle",
    navLabel: "Réduction : décision",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Boma, à l'embouchure du fleuve Congo. **BOMA ÉNERGIE SA**, au capital de 60 000 000 FC, a accumulé des pertes : son report à nouveau débiteur atteint 64 000 000 FC, et ses capitaux propres sont devenus négatifs. Un investisseur, SOLAR INVEST, est prêt à apporter 40 000 000 FC, à condition que le passé soit d'abord apuré. La société doit choisir entre dissoudre, réduire le capital ou recapitaliser, et vérifier à quelles conditions les créanciers peuvent s'y opposer. Ce chapitre étudie les opérations qui font baisser le capital ou le rendent aux associés : réduction, rachat d'actions propres, amortissement. Il suit BOMA ÉNERGIE jusqu'à son coup d'accordéon.",
      },
      { type: 'intertitre', texte: "5.1.1 Les motifs de la réduction" },
      {
        type: 'paragraphe',
        texte: "Le capital est fixe, mais il n'est pas immuable. L'article 69 annonçait qu'il peut être réduit « par remboursement aux associés d'une partie de leurs apports » ou par imputation des pertes, et l'article 70 précise que le remboursement peut se faire en numéraire ou par attribution d'actifs. Réduire le capital, c'est donc soit **constater** une perte de substance déjà subie, soit **restituer** aux associés une partie de ce qu'ils ont apporté. Ces deux situations n'ont ni la même cause ni les mêmes risques, et l'Acte uniforme les traite différemment, notamment à l'égard des créanciers. La comptabilité suit : une réduction pour pertes est un simple reclassement interne aux capitaux propres, une réduction par remboursement fait sortir de la trésorerie.",
      },
      {
        type: 'carte',
        titre: "Tableau 5.1 — Les trois motifs de réduction",
        tableau: {
          entetes: ["Motif", "Mécanisme", "Effet sur la trésorerie", "Opposition des créanciers"],
          lignes: [
            ["Apurement de pertes", "Imputation du report à nouveau débiteur sur le capital", "Aucun", "Non (art. 632)"],
            ["Remboursement d'apports", "Restitution d'une partie du nominal, en numéraire ou en actifs", "Sortie de fonds", "Oui (art. 633)"],
            ["Rachat d'actions pour annulation", "Achat puis annulation d'actions (art. 639, 643-650)", "Sortie de fonds", "Oui, réduction non motivée par des pertes"],
          ],
        },
      },
      { type: 'intertitre', texte: "5.1.2 Les modalités et le contrôle" },
      {
        type: 'paragraphe',
        texte: "Dans la SA, le capital est réduit par **diminution de la valeur nominale** des actions ou par **diminution de leur nombre** (art. 627, dont le texte officiel comporte une phrase tronquée, le sens étant celui restitué ici). La réduction est **autorisée ou décidée par l'assemblée générale extraordinaire**, qui peut déléguer au conseil d'administration ou à l'administrateur général tous pouvoirs pour la réaliser ; elle ne peut **en aucun cas porter atteinte à l'égalité des actionnaires**, sauf consentement exprès des actionnaires défavorisés (art. 628). Les délibérations prises en violation de ces règles sont nulles (art. 638-1). Lorsque le conseil réalise la réduction sur délégation, il en dresse un procès-verbal soumis à publicité et modifie les statuts (art. 631), et la réduction fait l'objet des formalités de publicité de l'article 264 (art. 638).",
      },
      {
        type: 'filet',
        titre: "Le contrôle du commissaire aux comptes (art. 629-630)",
        texte: "Le projet de réduction est communiqué au commissaire aux comptes **quarante-cinq jours au moins** avant l'AGE. Le commissaire présente à l'assemblée un rapport livrant son appréciation sur **les causes et les conditions** de la réduction, et toute délibération prise à défaut de ce rapport est **nulle**.",
      },
      {
        type: 'paragraphe',
        texte: "Le choix entre diminution du nominal et diminution du nombre d'actions n'est pas neutre. Diminuer le nominal, par exemple de 10 000 à 7 500, touche tous les actionnaires de la même façon et respecte naturellement l'égalité exigée par l'article 628. Diminuer le nombre d'actions, par regroupement ou par rachat, peut créer des rompus pour les petits porteurs, ou ne concerner que certains actionnaires : c'est pourquoi l'égalité est protégée et que le rachat pour annulation obéit à une procédure d'offre à tous les actionnaires (section 5.5). Pour le comptable, la technique retenue ne change pas l'écriture de principe, qui porte toujours sur le compte 1013 ; elle change la tenue du registre des actions et la répartition entre associés.",
      },
      { type: 'intertitre', texte: "5.1.3 La pratique congolaise et l'égalité des actionnaires" },
      {
        type: 'paragraphe',
        texte: "Dans la pratique congolaise, les réductions de capital accompagnent surtout deux situations. La première est celle de sociétés dont les pertes accumulées ont vidé le capital de sa substance : l'assainissement par réduction est alors le préalable à toute recapitalisation, à toute entrée d'un investisseur ou à toute demande de crédit, car un bilan affichant un capital de 500 000 000 FC et des capitaux propres négatifs n'inspire confiance à personne. La seconde est celle de sociétés qui disposent de fonds propres excédentaires, par exemple après la cession d'une activité, et qui souhaitent les restituer aux associés sans liquider la société. Dans les deux cas, le comptable prépare les chiffres sur lesquels l'assemblée délibère : montant des pertes à apurer, capitaux propres avant et après l'opération, respect du minimum légal et des seuils sectoriels (chapitre 4).",
      },
      {
        type: 'paragraphe',
        texte: "L'égalité entre actionnaires est la ligne rouge de toute réduction. Elle interdit, par exemple, de rembourser les seuls actionnaires majoritaires, ou d'imputer les pertes sur les seules actions d'une catégorie, sans le consentement exprès des actionnaires défavorisés (art. 628). Elle n'interdit pas les différences qui découlent des droits attachés aux titres : des actions de préférence peuvent avoir un droit prioritaire au remboursement si les statuts le prévoient. Le comptable qui prépare un tableau de réduction vérifie donc que chaque action d'une même catégorie est traitée de la même façon : même réduction de nominal, même montant remboursé, même prix de rachat.",
      },
    ],
  },
  {
    numero: '5.2',
    titre: "La protection des créanciers : le droit d'opposition",
    navLabel: "Opposition des créanciers",
    blocs: [
      { type: 'intertitre', texte: "5.2.1 Le droit d'opposition selon le motif" },
      {
        type: 'paragraphe',
        texte: "Tout dépend du **motif** de la réduction. Motivée par des pertes, elle ne fait que mettre le capital au niveau d'un actif net déjà entamé : les créanciers **ne peuvent pas s'y opposer** (art. 632). Non motivée par des pertes, elle restitue aux associés une fraction du gage commun : les créanciers dont la créance est **antérieure** à la publication de l'avis relatif au procès-verbal de l'assemblée peuvent s'y opposer (art. 633). Le capital est en effet, dans les sociétés à risque limité, la garantie minimale des créanciers : ils ont prêté ou vendu à crédit en sachant que les associés avaient apporté un certain montant qui ne pouvait leur être rendu librement. Réduire ce montant sans leur accord reviendrait à diminuer leur garantie en cours de contrat.",
      },
      {
        type: 'carte',
        titre: "Tableau 5.2 — La procédure d'opposition (art. 634 à 637)",
        tableau: {
          entetes: ["Étape", "Règle"],
          lignes: [
            ["Délai", "Trente jours à compter de la publication de l'avis dans un journal d'annonces légales du siège, après dépôt au RCCM du procès-verbal de la délibération (art. 634)."],
            ["Forme", "Exploit d'huissier ou tout moyen établissant la réception effective ; opposition portée devant la juridiction compétente statuant à bref délai (art. 635)."],
            ["Effet suspensif", "Les opérations de réduction ne peuvent commencer pendant le délai d'opposition, ni avant la décision de première instance (art. 636)."],
            ["Opposition accueillie", "Procédure interrompue jusqu'au remboursement des créances ou jusqu'à la constitution de garanties offertes par la société et jugées suffisantes (art. 637)."],
          ],
        },
        note: "En SARL, l'article 370 prévoit le même délai de trente jours et le même effet suspensif ; la juridiction rejette l'opposition ou ordonne le remboursement des créances ou la constitution de garanties.",
      },
      { type: 'intertitre', texte: "5.2.2 Le calendrier et l'enjeu pour le créancier" },
      {
        type: 'paragraphe',
        texte: "Le calendrier d'une réduction par remboursement se construit donc à rebours. Après l'AGE, le procès-verbal est déposé au RCCM et un avis est publié dans un journal habilité ; le délai de trente jours court à compter de cette publication. Ce n'est qu'à son expiration, sans opposition, ou après la décision de première instance rejetant l'opposition, que la société peut payer. Si une banque créancière forme opposition et obtient gain de cause, la société doit la rembourser ou lui offrir une garantie suffisante, par exemple une caution bancaire ou un nantissement, avant de pouvoir rendre les apports. Le comptable ne passe l'écriture de remboursement (débit 4619, crédit 521) qu'à ce moment, même si la dette envers les associés a été constatée dès la décision.",
      },
      {
        type: 'paragraphe',
        texte: "Du point de vue du créancier, l'enjeu se chiffre facilement. Une société au capital de 300 000 000 FC, avec 50 000 000 de réserves et 400 000 000 de dettes, dispose de 350 000 000 de capitaux propres pour absorber d'éventuelles pertes avant que les créanciers ne soient touchés. Si elle rembourse 150 000 000 de capital à ses associés, ce coussin tombe à 200 000 000, alors même que les dettes n'ont pas changé. Le créancier qui a prêté en considération du premier chiffre voit sa sécurité réduite de plus de 40 %. Le droit d'opposition lui permet d'exiger d'être payé, ou garanti, avant que la société ne se dessaisisse. À l'inverse, une réduction pour pertes ne change rien à sa situation : les pertes ont déjà consommé le coussin, la réduction ne fait que le reconnaître.",
      },
      {
        type: 'filet',
        titre: "Pas d'opposition à une réduction motivée par des pertes",
        texte: "Les créanciers de BOMA ÉNERGIE ne peuvent pas s'opposer, car la réduction qu'envisage la société est motivée par des pertes. Elle ne fait sortir aucun franc de la société : elle aligne simplement le chiffre du capital sur un actif net déjà entamé. Le gage des créanciers n'est pas diminué par l'écriture, il l'avait déjà été par les pertes. Il en irait autrement d'une réduction par remboursement, qui fait sortir de la trésorerie au profit des associés : les créanciers antérieurs peuvent alors former opposition dans les trente jours de la publication, et les opérations sont suspendues jusqu'au règlement de l'opposition (art. 633-637).",
      },
      { type: 'intertitre', texte: "5.2.3 Les garanties offertes aux créanciers" },
      {
        type: 'paragraphe',
        texte: "Les garanties que la société peut offrir pour lever une opposition sont variées : caution bancaire, nantissement d'un compte bloqué, hypothèque sur un immeuble, ou simple remboursement anticipé de la créance. Leur coût doit être intégré au projet de réduction. Une réduction destinée à rendre 150 000 000 aux associés, mais qui oblige la société à bloquer 150 000 000 en garantie au profit d'une banque, n'atteint pas son objectif ; il peut alors être plus simple de rembourser d'abord la banque. Comptablement, une caution bancaire obtenue pour garantir un créancier est un engagement hors bilan, que les Notes annexes mentionnent ; un dépôt bloqué reste à l'actif mais n'est plus disponible, ce qui doit être indiqué pour une lecture honnête de la trésorerie.",
      },
    ],
  },
  {
    numero: '5.3',
    titre: "Comptabilisation de la réduction : pertes ou remboursement",
    navLabel: "Écritures de réduction",
    blocs: [
      { type: 'intertitre', texte: "5.3.1 Imputation des pertes et remboursement" },
      {
        type: 'paragraphe',
        texte: "L'AUDCIF décrit le fonctionnement : le compte 101 Capital social est **débité** des réductions de capital décidées par les assemblées « par le crédit du 12 (Report à nouveau) pour l'absorption des pertes antérieures reportées ; ou par le crédit du 109 (Apporteurs, capital souscrit non appelé) en cas de renonciation à une partie du capital non libéré ; ou par le crédit du 46 (Apporteurs, Associés et Groupe) en cas de remboursement d'une partie du capital ». Les Applications 62 et 63 du Guide illustrent les deux cas principaux.",
      },
      {
        type: 'carte',
        titre: "Exemple 5.1 — Application 62 : réduction par imputation des pertes (80 000 000)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1013", "", "10/06/N : Capital souscrit, appelé, versé, non amorti", "80 000 000", ""],
            ["", "1291", "Perte nette à reporter", "", "80 000 000"],
          ],
        },
        note: "Opération interne aux capitaux propres, sans trésorerie : le capital rejoint l'actif net réel. Aucune opposition des créanciers (art. 632).",
      },
      {
        type: 'carte',
        titre: "Exemple 5.2 — Application 63 : réduction par remboursement (moitié du nominal, 5 000 actions de 10 000)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1013", "", "01/10/N : Capital souscrit, appelé, versé, non amorti", "25 000 000", ""],
            ["", "4619", "Apporteurs, capital à rembourser", "", "25 000 000"],
            ["4619", "", "01/11/N : Apporteurs, capital à rembourser", "25 000 000", ""],
            ["", "521", "Banques", "", "25 000 000"],
          ],
        },
        note: "Réduction non motivée par des pertes : le remboursement ne peut intervenir qu'après l'expiration du délai d'opposition de trente jours et, le cas échéant, le sort de l'opposition (art. 633-637). Le remboursement peut aussi se faire par attribution d'actifs (art. 70).",
      },
      { type: 'intertitre', texte: "5.3.2 La renonciation au capital non libéré" },
      {
        type: 'paragraphe',
        texte: "La troisième hypothèse de l'AUDCIF, la **renonciation au capital non libéré**, est plus rare mais instructive. Une société dont le capital n'est libéré qu'en partie peut décider de réduire son capital en dispensant les actionnaires de verser le solde : c'est une réduction non motivée par des pertes, puisque la société renonce à une créance. L'écriture solde la créance conditionnelle : débit 1011 Capital souscrit, non appelé, crédit 109 Apporteurs, capital souscrit, non appelé. Aucune trésorerie ne sort, mais le gage des créanciers diminue, puisqu'ils pouvaient compter sur l'appel futur de ces sommes : les créanciers antérieurs disposent donc du droit d'opposition.",
      },
      { type: 'intertitre', texte: "5.3.3 Le remboursement par attribution d'actifs" },
      {
        type: 'paragraphe',
        texte: "Lorsque le remboursement se fait par **attribution d'actifs** (art. 70), par exemple la remise d'un terrain ou de titres à un associé, la société constate la sortie de l'actif à sa valeur comptable et l'extinction de la dette 4619 pour la valeur retenue. La différence éventuelle entre la valeur de remboursement et la valeur comptable du bien est un résultat de cession, enregistré dans les comptes hors activités ordinaires comme toute cession d'immobilisation. La valeur de l'actif attribué doit être justifiée, car une sous-évaluation avantagerait l'associé au détriment des créanciers et des autres associés, et porterait atteinte à l'égalité protégée par l'article 628.",
      },
      {
        type: 'paragraphe',
        texte: "Soit une SA qui décide une réduction de capital de 30 000 000 par remboursement à un associé qui se retire, sous forme d'un terrain d'une valeur de 30 000 000 et d'une valeur nette comptable de 18 000 000. Après expiration du délai d'opposition, la société constate sa dette (débit 1013, crédit 4619 pour 30 000 000), puis la sortie du terrain : la valeur comptable sort de l'actif (débit du compte de charges hors activités ordinaires correspondant, crédit 22 pour 18 000 000), et la valeur de remboursement éteint la dette (débit 4619, crédit du compte de produits de cession pour 30 000 000). Le résultat hors activités ordinaires enregistre une plus-value de 12 000 000, qui entre dans le résultat imposable. L'associé reçoit un bien au lieu d'argent, mais la société réalise fiscalement la plus-value latente.",
      },
      {
        type: 'filet',
        titre: "L'imputation des pertes passe par le report à nouveau",
        texte: "Deux erreurs sont à éviter : imputer les pertes sur le capital sans passer par le report à nouveau ou, à l'inverse, laisser les pertes au report à nouveau alors que l'assemblée a voté la réduction. Dans une réduction pour pertes, le compte 101 (1013) est débité par le crédit du compte 129 Report à nouveau débiteur (1291) : l'écriture ne touche ni la trésorerie ni le résultat. Chez BOMA ÉNERGIE, la réduction de 60 000 000 FC solde le capital ancien, et il subsiste un report à nouveau débiteur de 4 000 000 FC, que les premiers bénéfices devront apurer.",
      },
    ],
  },
  {
    numero: '5.4',
    titre: "La réduction de capital dans la SARL et la SAS",
    navLabel: "SARL et SAS",
    blocs: [
      { type: 'intertitre', texte: "5.4.1 La SARL" },
      {
        type: 'paragraphe',
        texte: "Dans la SARL, la réduction de capital est une modification des statuts, décidée à la majorité des trois quarts du capital (art. 358). L'article 366 pose le principe d'égalité : « La réduction de capital ne peut en aucun cas porter atteinte à l'égalité des associés », toute délibération contraire étant nulle. Elle peut être réalisée par réduction du nominal des parts ou par diminution de leur nombre ; s'il existe un commissaire aux comptes, le projet lui est communiqué dans les trente jours précédant l'assemblée, et il fait connaître son appréciation sur les causes et conditions de la réduction (art. 367).",
      },
      {
        type: 'carte',
        titre: "Encadré 5.1 — Les règles propres à la SARL (art. 366 à 370)",
        liste: [
          "**Égalité** des associés, à peine de nullité (art. 366).",
          "**Commissaire aux comptes**, s'il existe : projet communiqué dans les trente jours précédant l'assemblée (art. 367).",
          "**Rachat de parts** : interdit, sauf si l'assemblée qui a décidé une réduction non motivée par des pertes autorise le gérant à acheter un nombre déterminé de parts pour les annuler (art. 367).",
          "**Minimum légal** : la réduction ne peut ramener le capital sous le minimum légal, sauf augmentation corrélative lors de la même assemblée ; à défaut, tout intéressé peut demander la dissolution après mise en demeure, l'action s'éteignant si la cause a cessé au jour où le juge statue (art. 368-369).",
          "**Opposition** des créanciers antérieurs dans les trente jours de la publication de l'avis, pour une réduction non motivée par des pertes ; opérations suspendues pendant ce délai (art. 370).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "La règle du minimum légal a une portée particulière en RDC. L'article 311 fixe le capital minimum de la SARL à un million de FCFA « sauf dispositions nationales contraires », et l'arrêté interministériel du 30 décembre 2014 dispose que le capital de la SARL congolaise « est librement fixé par les associés en tenant compte de l'objet social de la société » (art. 2). Il n'existe donc pas, pour la SARL congolaise, de plancher chiffré sous lequel une réduction serait interdite ; l'exigence de cohérence avec l'objet social demeure, et un capital réduit à un montant dérisoire exposerait la société à la défiance de ses partenaires. Dans la SA, en revanche, le minimum de l'article 387 s'applique pleinement, et l'article 66 impose la dissolution si le capital est réduit sous ce minimum sans être reconstitué.",
      },
      { type: 'intertitre', texte: "5.4.2 La SAS" },
      {
        type: 'paragraphe',
        texte: "Dans la SAS, les attributions des assemblées de SA en matière de réduction de capital sont exercées collectivement par les associés, dans les conditions prévues par les statuts, à peine de nullité (art. 853-11). Les règles de la SA compatibles avec le livre de la SAS s'appliquent par renvoi (art. 853-3) : rapport du commissaire aux comptes s'il en existe un, droit d'opposition des créanciers, rachat pour annulation selon la procédure d'offre. Rappelons enfin que dans les SA non cotées et les SAS à **capital variable** (chapitre 1), les diminutions de capital par reprise d'apports ne sont soumises ni à publicité ni à opposition, mais sont limitées par le plancher statutaire (art. 269-3 et 269-5).",
      },
      { type: 'intertitre', texte: "5.4.3 Application : le retrait d'un associé de SARL" },
      {
        type: 'paragraphe',
        texte: "Prenons une SARL congolaise au capital de 40 000 000 FC, sans pertes, dont un associé détenant 25 % souhaite se retirer. Les associés décident, à la majorité des trois quarts du capital (art. 358), une réduction de capital non motivée par des pertes de 10 000 000, et autorisent le gérant à acheter pour les annuler les 1 000 parts de l'associé sortant (art. 367), au prix de leur valeur réelle, soit 14 000 000. Après le délai d'opposition de trente jours (art. 370), la société paie : débit 1013 10 000 000 et débit 1181 4 000 000, crédit 4619 14 000 000 ; puis débit 4619, crédit 521. Le capital tombe à 30 000 000. La société doit veiller à ce que l'excédent payé sur le nominal ne porte pas atteinte au butoir des capitaux propres (art. 143), et à l'égalité entre associés (art. 366).",
      },
    ],
  },
  {
    numero: '5.5',
    titre: "Le rachat par la société de ses propres actions",
    navLabel: "Rachat d'actions",
    blocs: [
      { type: 'intertitre', texte: "5.5.1 L'interdiction et ses dérogations" },
      {
        type: 'paragraphe',
        texte: "Le principe est l'**interdiction** : « La souscription ou l'achat par la société de ses propres actions, soit directement, soit par une personne agissant en son nom propre mais pour le compte de la société est interdite. » La société ne peut pas davantage avancer des fonds, accorder des prêts ou consentir une sûreté en vue de la souscription ou de l'achat de ses propres actions par un tiers (art. 639, al. 1er). La raison est simple : une société qui achète ses propres actions rend à certains associés leur apport, en dehors de toute procédure de réduction, et elle vide son capital de sa substance tout en l'affichant intact au bilan. Les fondateurs ou administrateurs sont tenus de libérer les actions souscrites ou acquises en violation de cette règle (art. 639, al. 3).",
      },
      {
        type: 'carte',
        titre: "Tableau 5.3 — Les dérogations à l'interdiction du rachat (art. 639 à 642)",
        tableau: {
          entetes: ["Situation", "Règle"],
          lignes: [
            ["Rachat pour annulation", "L'AGE qui a décidé une réduction non motivée par des pertes peut autoriser le conseil à acquérir un nombre déterminé d'actions pour les annuler (art. 639, al. 2)."],
            ["Attribution gratuite au personnel", "Rachat possible pour attribuer les actions dans l'année ; détention limitée à 10 % des actions ; actions nominatives, entièrement libérées, sans droit aux dividendes ; butoir des capitaux propres (art. 640)."],
            ["Transmission universelle ou décision de justice", "Actions entièrement libérées acquises à ce titre : à céder dans les deux ans, à défaut annulées (art. 641)."],
            ["Nantissement", "Prise en nantissement de ses propres actions interdite, sauf opérations courantes des établissements de crédit, de microfinance ou d'assurance caution agréés (art. 642)."],
          ],
        },
      },
      { type: 'intertitre', texte: "5.5.2 Le rachat en vue d'annulation" },
      {
        type: 'paragraphe',
        texte: "Lorsque la société achète ses actions **en vue de les annuler** et de réduire son capital, elle présente son offre à **tous** les actionnaires, par un avis dans un journal habilité précisant notamment le nombre d'actions visées, le prix offert, le mode de paiement et un délai d'au moins trente jours (art. 643), ou par notification individuelle si toutes les actions sont nominatives (art. 644). Si les actions présentées excèdent le nombre prévu, chaque vendeur subit une réduction proportionnelle (art. 645) ; si elles sont insuffisantes, le capital est réduit à due concurrence, le conseil pouvant renouveler l'opération dans le délai fixé par l'assemblée (art. 646). Les actions sont annulées dans les quinze jours suivant l'expiration du délai de l'offre (art. 649). Ces règles protègent l'égalité : tous les actionnaires ont la même chance de vendre au même prix.",
      },
      {
        type: 'carte',
        titre: "Exemple 5.3 — Rachat d'actions suivi d'annulation",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1013", "", "Annulation : nominal des actions rachetées (2 000 × 10 000)", "20 000 000", ""],
            ["1181", "", "Réserves facultatives : excédent du prix sur le nominal (2 000 × 4 000)", "8 000 000", ""],
            ["", "4619", "Apporteurs, capital à rembourser (2 000 × 14 000)", "", "28 000 000"],
            ["4619", "", "Paiement aux actionnaires vendeurs", "28 000 000", ""],
            ["", "521", "Banques", "", "28 000 000"],
          ],
        },
        note: "Schéma cohérent avec l'Application 63 et le fonctionnement des comptes 101 et 105 de l'AUDCIF (débités, en cas de remboursement du capital, par le crédit d'un compte d'associés). L'excédent du prix sur le nominal est une restitution de réserves : il suppose des réserves disponibles et le respect du butoir des capitaux propres (art. 143). Si les actions transitent un temps à l'actif avant annulation, on peut utiliser le compte 5021 Actions ou parts propres.",
      },
      { type: 'intertitre', texte: "5.5.3 Le prix et les motifs du rachat" },
      {
        type: 'paragraphe',
        texte: "Le prix de rachat pose une question de valeur. S'il est supérieur à la valeur réelle de l'action, les vendeurs sont avantagés au détriment de ceux qui restent ; s'il est inférieur, c'est l'inverse. D'où le rôle du commissaire aux comptes, qui donne son avis sur l'opportunité et les modalités de l'achat envisagé lorsque le rachat vise à faciliter une augmentation de capital, une fusion ou une scission, dans la limite d'un pour cent du capital (art. 647). Lorsque des actions sont grevées d'usufruit, l'offre est faite au nu-propriétaire, et le rachat n'est définitif qu'avec le consentement exprès de l'usufruitier (art. 648). Le chapitre 7 donnera les méthodes d'évaluation qui permettent de fixer un prix justifié.",
      },
      {
        type: 'paragraphe',
        texte: "Les motifs du rachat varient selon la société. Dans une société non cotée, le rachat est souvent le seul moyen d'offrir une sortie à un actionnaire minoritaire qui ne trouve pas d'acheteur : les titres d'une SA familiale de Lubumbashi ne se négocient sur aucun marché. Il peut aussi permettre de reprendre les actions d'un cessionnaire que le conseil a refusé d'agréer, hypothèse que l'article 647 dispense de la procédure d'offre à tous les actionnaires. Il peut enfin servir à restituer des fonds propres excédentaires en concentrant le capital entre moins d'actions. Dans tous les cas, l'opération reste une réduction de capital non motivée par des pertes, avec ses garanties pour les créanciers.",
      },
      { type: 'intertitre', texte: "5.5.4 Les dispenses de procédure et la détention temporaire" },
      {
        type: 'paragraphe',
        texte: "La procédure d'offre publique ou de notification à tous les actionnaires n'est pas toujours exigée. L'article 647 en dispense deux hypothèses : lorsque l'assemblée, pour faciliter une augmentation de capital, une fusion ou une scission, a autorisé le conseil à acheter un nombre d'actions représentant au plus 1 % du capital en vue de les annuler, afin par exemple de supprimer des rompus ; et en cas de rachat des actions d'un cessionnaire que la société n'a pas agréé. Dans ces cas, le commissaire aux comptes donne son avis, dans son rapport sur l'opération projetée, sur l'opportunité et les modalités de l'achat. Les opérations de rachat réalisées en violation des articles 643 à 646 sont nulles (art. 646-1).",
      },
      {
        type: 'paragraphe',
        texte: "La société qui détient temporairement ses propres actions, dans les cas où la loi l'y autorise, doit en tirer les conséquences. Les actions possédées par la société ne donnent pas droit aux dividendes (art. 640) : lors de la répartition, le dividende se calcule sur les seules actions en circulation, et la part qui aurait dû revenir aux actions propres reste dans la société. Ces actions ne peuvent pas non plus servir à consolider artificiellement une majorité. Enfin, leur détention immobilise des fonds : une SA qui rachète ses actions pour les attribuer à son personnel doit les attribuer dans l'année (art. 640), et une SA qui les a reçues par transmission universelle ou décision de justice doit les céder dans les deux ans, faute de quoi elles sont annulées (art. 641).",
      },
    ],
  },
  {
    numero: '5.6',
    titre: "L'amortissement du capital",
    navLabel: "Amortissement",
    blocs: [
      { type: 'intertitre', texte: "5.6.1 Notion et décision" },
      {
        type: 'paragraphe',
        texte: "L'**amortissement du capital** est l'opération par laquelle la société rembourse aux actionnaires tout ou partie du montant nominal de leurs actions, **à titre d'avance sur le produit de la liquidation future** (art. 651). Il ne faut pas le confondre avec l'amortissement des immobilisations, qui constate une dépréciation, ni avec la réduction de capital : l'amortissement « est réalisé par voie de remboursement égal pour chaque action d'une même catégorie et n'entraîne pas de réduction de capital » (art. 654). Le capital social reste inchangé au bilan ; ce sont des bénéfices ou des réserves qui financent le remboursement. L'actionnaire reçoit par avance ce qu'il aurait reçu à la liquidation au titre de son apport.",
      },
      {
        type: 'paragraphe',
        texte: "Il est décidé par l'assemblée générale **ordinaire** lorsqu'il est prévu par les statuts, par l'assemblée générale **extraordinaire** dans leur silence, à peine de nullité (art. 652). Les actions peuvent être intégralement ou partiellement amorties ; intégralement amorties, elles deviennent des **actions de jouissance** (art. 653). L'amortissement a une justification économique claire dans les sociétés dont l'actif est destiné à disparaître : une société concessionnaire dont les installations reviendront à l'État à la fin de la concession, une société d'exploitation d'un gisement minier limité, une société constituée pour un projet d'une durée déterminée. Rembourser progressivement le nominal évite d'accumuler une trésorerie inutile en attendant une liquidation lointaine.",
      },
      { type: 'intertitre', texte: "5.6.2 Les ressources et la comptabilisation" },
      {
        type: 'carte',
        titre: "Encadré 5.2 — Les ressources et les limites de l'amortissement (art. 655 et 656)",
        liste: [
          "Prélèvement sur les **bénéfices** ou les **réserves non statutaires** ; jamais sur la **réserve légale** ; sur les réserves statutaires seulement par décision contraire de l'AGE (art. 655, al. 1-2).",
          "Butoir : le remboursement ne peut réduire les capitaux propres sous le montant du capital augmenté des réserves indisponibles (art. 655, al. 3). Opérations contraires **nulles** (art. 655-1).",
          "Les actions amorties **conservent tous leurs droits** (vote, part aux bénéfices, boni de liquidation) sauf le **premier dividende** (art. 145) et le **remboursement du nominal**, perdus à due concurrence (art. 656).",
        ],
      },
      {
        type: 'carte',
        titre: "Exemple 5.4 — Application 64 : amortissement de la moitié du capital (7 500 actions de 10 000, sur réserves diverses)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1013", "", "01/08/N : Capital souscrit, appelé, versé, non amorti", "37 500 000", ""],
            ["", "1014", "Capital souscrit, appelé, versé, amorti", "", "37 500 000"],
            ["1188", "", "Réserves diverses", "37 500 000", ""],
            ["", "4619", "Apporteurs, capital à rembourser", "", "37 500 000"],
            ["4619", "", "Apporteurs, capital à rembourser", "37 500 000", ""],
            ["", "521", "Banques", "", "37 500 000"],
          ],
        },
        note: "Le total du compte 101 est inchangé (1013 + 1014 = capital social, art. 654) ; ce sont les réserves qui financent le remboursement. La distinction entre 1013 et 1014 permet de suivre les droits différenciés des actions amorties (art. 656).",
      },
      { type: 'intertitre', texte: "5.6.3 Amortissement et réduction comparés" },
      {
        type: 'paragraphe',
        texte: "L'amortissement doit être comparé à la réduction par remboursement de l'Application 63. Dans les deux cas, les actionnaires reçoivent de l'argent. Mais la réduction diminue le capital, donc le gage des créanciers, d'où leur droit d'opposition ; l'amortissement laisse le capital intact et consomme des réserves distribuables, si bien qu'il se rapproche économiquement d'une distribution de dividendes, encadrée par le même butoir des capitaux propres. L'AUDCIF résume la situation : les organes compétents peuvent rembourser aux associés tout ou partie du nominal « à titre d'avances sur le produit de la liquidation future ; le capital demeure inchangé, les actions amorties devenant actions de jouissance, dont la contre-valeur est isolée au compte 1014 » (commentaires du compte 101).",
      },
      {
        type: 'paragraphe',
        texte: "L'effet sur les dividendes se chiffre ainsi. Une SA de 10 000 actions de 10 000 amortit intégralement 4 000 actions d'une catégorie donnée ; ses statuts prévoient un premier dividende de 6 %. L'année suivante, l'assemblée distribue 10 000 000. Les 6 000 actions non amorties reçoivent d'abord le premier dividende de 600 chacune, soit 3 600 000 ; les 4 000 actions de jouissance n'y ont pas droit (art. 656). Le solde de 6 400 000 est réparti également entre toutes les actions comme superdividende, soit 640 par action. Dividende total : 1 240 par action non amortie, 640 par action de jouissance. L'écart rémunère, chaque année, le fait que les porteurs d'actions amorties ont déjà récupéré leur apport.",
      },
      {
        type: 'paragraphe',
        texte: "L'amortissement du capital suppose des sommes disponibles, exactement comme un dividende. Le butoir de l'article 655 reprend celui de l'article 143 : après le remboursement, les capitaux propres doivent rester au moins égaux au capital augmenté des réserves que la loi ou les statuts ne permettent pas de distribuer. Or l'amortissement ne réduit pas le capital : le seuil protégé reste donc inchangé, alors que les capitaux propres diminuent du montant remboursé. Une société au capital de 100 000 000, avec une réserve légale de 20 000 000 et des réserves facultatives de 30 000 000, peut donc amortir au plus 30 000 000 : au-delà, les capitaux propres (150 000 000 avant l'opération) tomberaient sous 120 000 000. C'est pourquoi l'amortissement ne peut être financé ni par le capital, ni par la réserve légale (art. 655).",
      },
    ],
  },
  {
    numero: '5.7',
    titre: "Les actions amorties et leur reconversion en actions de capital",
    navLabel: "Reconversion",
    blocs: [
      { type: 'intertitre', texte: "5.7.1 Les droits des actions amorties" },
      {
        type: 'paragraphe',
        texte: "Les actions amorties conservent tous leurs droits, à l'exception du premier dividende et du remboursement du nominal, qu'elles perdent à due concurrence (art. 656). Concrètement, une action de jouissance vote, reçoit le superdividende et participe au boni de liquidation, mais elle ne touche pas l'intérêt statutaire et, à la liquidation, son porteur ne sera pas remboursé une seconde fois du nominal qu'il a déjà perçu. Une action partiellement amortie ne perd ces droits qu'à proportion du montant amorti. La coexistence d'actions amorties et non amorties crée donc, de fait, deux catégories d'actions aux droits différents, que le comptable doit suivre séparément.",
      },
      { type: 'intertitre', texte: "5.7.2 La reconversion" },
      {
        type: 'carte',
        titre: "Encadré 5.3 — La reconversion en actions de capital (art. 657 à 663-1)",
        liste: [
          "**Décision** : l'AGE, aux conditions de quorum et de majorité de la modification des statuts (art. 657).",
          "**Financement** : prélèvement obligatoire, à concurrence du montant amorti, sur la part des bénéfices revenant à ces actions après paiement du premier dividende des actions partiellement amorties, ou reversement par les actionnaires du montant amorti, augmenté le cas échéant du premier dividende de la période (art. 658).",
          "**Ratification** par les assemblées spéciales de chaque catégorie d'actionnaires ayant les mêmes droits (art. 659).",
          "**Compte de réserve** où sont inscrites les sommes prélevées ou versées ; un compte par catégorie d'actions intégralement amorties (art. 660).",
          "**Réalisation** lorsque la réserve atteint le montant amorti ; le conseil modifie les statuts (art. 661-662).",
          "**Premier dividende** pendant la reconversion, calculé sur le montant libéré et non amorti, ou sur la réserve constituée (art. 663). Violations sanctionnées par la nullité (art. 663-1).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Comptablement, la reconversion est le mouvement inverse de l'amortissement. Les bénéfices prélevés, ou les sommes reversées par les actionnaires, alimentent un compte de réserve spécifique, par exemple un sous-compte de 1188 Réserves diverses. Lorsque cette réserve égale le montant amorti, la reconversion est réalisée : le capital amorti redevient capital non amorti, par le débit du 1014 et le crédit du 1013, et la réserve de reconversion, qui a rempli son office, est reclassée. Si les actionnaires ont reversé des fonds, la société a encaissé de la trésorerie, par le débit du 521 et le crédit du compte de réserve. Le total du capital n'a jamais changé ; seule la nature des actions, et donc leurs droits, est rétablie.",
      },
      {
        type: 'paragraphe',
        texte: "La reconversion répond à un changement de perspective. Une société qui avait amorti son capital en prévision de la fin d'une concession peut obtenir le renouvellement de celle-ci : l'hypothèse de liquidation s'éloigne, et il devient logique de rétablir l'égalité entre toutes les actions. La reconversion supprime la catégorie des actions de jouissance et simplifie la répartition des bénéfices. Elle a un coût pour les porteurs d'actions amorties, qui renoncent à une part de leurs dividendes ou reversent des fonds ; c'est pourquoi l'Acte uniforme exige la ratification des assemblées spéciales de chaque catégorie.",
      },
      {
        type: 'paragraphe',
        texte: "Un exemple : 4 000 actions intégralement amorties pour 40 000 000 doivent être reconverties par prélèvement sur les bénéfices qui leur reviennent. Chaque année, l'assemblée affecte à un compte de réserve de reconversion la part des bénéfices revenant à ces actions : par exemple 8 000 000 en N, 12 000 000 en N+1, 20 000 000 en N+2 (débit 1301, crédit du sous-compte de réserve). Au terme de N+2, la réserve atteint 40 000 000, montant amorti : la reconversion est réalisée (art. 661). Le capital amorti redevient non amorti (débit 1014, crédit 1013 pour 40 000 000), et la réserve, dont la fonction est épuisée, est reclassée selon la décision de l'assemblée. Pendant ces trois années, les actions concernées ont droit au premier dividende calculé sur le montant de la réserve constituée à la clôture de l'exercice précédent (art. 663).",
      },
    ],
  },
  {
    numero: '5.8',
    titre: "Capitaux propres inférieurs à la moitié du capital",
    navLabel: "Perte de la moitié",
    blocs: [
      { type: 'intertitre', texte: "5.8.1 La procédure" },
      {
        type: 'paragraphe',
        texte: "Lorsque les pertes s'accumulent, l'Acte uniforme oblige les associés à se prononcer sur l'avenir de la société. Le déclencheur est comptable : il faut que, « du fait de pertes constatées dans les états financiers de synthèse, les capitaux propres de la société deviennent inférieurs à la moitié du capital social » (art. 664 pour la SA, 371 pour la SARL). Le calcul se fait donc sur les comptes approuvés, en comparant le total des capitaux propres (capital, primes, réserves, report à nouveau, résultat de l'exercice, subventions d'investissement et provisions réglementées selon la maquette) à la moitié du capital social. C'est au comptable qu'il revient de faire ce calcul dès l'arrêté des comptes et d'alerter les dirigeants.",
      },
      {
        type: 'carte',
        titre: "Tableau 5.4 — Capitaux propres inférieurs à la moitié du capital : SA (art. 664 à 669) et SARL (art. 371 à 373)",
        tableau: {
          entetes: ["Étape", "SA", "SARL"],
          lignes: [
            ["Déclencheur", "Capitaux propres inférieurs à la moitié du capital du fait de pertes constatées dans les états financiers", "Identique"],
            ["Consultation", "Le conseil ou l'administrateur général convoque l'AGE dans les 4 mois de l'approbation des comptes, pour décider s'il y a lieu à dissolution anticipée (art. 664)", "Le gérant ou le commissaire aux comptes consulte les associés dans les 4 mois (art. 371)"],
            ["Si la dissolution est écartée", "Reconstitution à la moitié du capital au plus tard à la clôture du 2e exercice suivant la constatation ; à défaut, réduction du capital d'au moins les pertes non imputées sur les réserves (art. 665)", "Reconstitution dans les 2 ans de la clôture de l'exercice déficitaire ; à défaut, réduction, sans passer sous le capital légal (art. 372)"],
            ["Publicité", "Dépôt au RCCM et publication dans un journal d'annonces légales (art. 666)", "—"],
            ["Sanction", "Tout intéressé peut demander la dissolution ; délai de régularisation de 6 mois au plus ; pas de dissolution si régularisation au jour où le juge statue (art. 667-668)", "Tout intéressé peut demander la dissolution ; action éteinte si la cause a cessé au jour où le juge statue (art. 373)"],
          ],
        },
        note: "Ces dispositions ne s'appliquent pas aux sociétés en redressement judiciaire ou en liquidation des biens (art. 669). L'article 668 comporte dans le texte officiel une formule tronquée (« peut accorder à la maximal de six mois ») : le sens est celui d'un délai maximal de six mois.",
      },
      { type: 'intertitre', texte: "5.8.2 Les trois issues" },
      {
        type: 'paragraphe',
        texte: "La procédure offre trois issues. La **dissolution anticipée**, si les associés estiment que l'entreprise n'est pas viable : c'est l'objet du chapitre 9. La **reconstitution des capitaux propres**, par des bénéfices futurs, par un apport nouveau en capital ou, plus fréquemment, par une augmentation de capital ; notez qu'un apport en compte courant d'associé, qui est une dette, ne reconstitue pas les capitaux propres, à la différence d'une augmentation de capital ou d'une conversion de ce compte courant en capital (chapitre 4). La **réduction du capital**, enfin, d'un montant au moins égal aux pertes non imputées sur les réserves : elle ne crée aucune ressource, mais rapproche le capital de l'actif net réel, ce qui suffit mécaniquement à repasser au-dessus du seuil de la moitié.",
      },
      { type: 'intertitre', texte: "5.8.3 Application et calcul des délais" },
      {
        type: 'paragraphe',
        texte: "Soit une SA au capital de 100 000 000 qui a une réserve légale de 6 000 000 et un report à nouveau débiteur de 60 000 000 après la perte de l'exercice : ses capitaux propres sont de 46 000 000, inférieurs à 50 000 000. Si l'AGE écarte la dissolution et que la situation n'est pas rétablie dans le délai légal, la société doit réduire son capital d'au moins les pertes non imputées sur les réserves. Si elle impute d'abord la réserve légale (débit 111, crédit 1291 pour 6 000 000), il reste 54 000 000 de pertes ; une réduction de 54 000 000 (débit 1013, crédit 1291) ramène le capital à 46 000 000 et les capitaux propres à 46 000 000, soit bien plus que la moitié du nouveau capital. Mais le capital d'une SA ne peut descendre sous le minimum de l'article 387 sans augmentation corrélative (art. 66) : pour une grande société, la contrainte est rarement mordante ; pour une petite SA, elle l'est souvent.",
      },
      {
        type: 'paragraphe',
        texte: "Les délais doivent être calculés avec précision. Pour une SA qui approuve le 15 mai N+1 des comptes N révélant des capitaux propres inférieurs à la moitié du capital, l'AGE doit être convoquée au plus tard le 15 septembre N+1 (art. 664). Si elle écarte la dissolution, la société dispose jusqu'à la clôture du deuxième exercice suivant celui au cours duquel la constatation est intervenue, soit, pour une constatation en N+1, jusqu'au 31 décembre N+3, pour reconstituer ses capitaux propres ou réduire son capital (art. 665). En SARL, le délai est de deux ans à compter de la clôture de l'exercice déficitaire, soit jusqu'au 31 décembre N+2 pour l'exercice N (art. 372). La décision de l'AGE de SA est déposée au RCCM et publiée (art. 666), ce qui informe les tiers de la situation.",
      },
      {
        type: 'filet',
        titre: "Le délai de l'article 664 appliqué à BOMA ÉNERGIE",
        texte: "Les comptes de BOMA ÉNERGIE, approuvés le 20/05/N+1, font apparaître des capitaux propres de − 4 000 000 FC, inférieurs à la moitié du capital. Le conseil doit convoquer l'AGE dans les quatre mois, soit avant le 20/09/N+1, pour décider s'il y a lieu à dissolution anticipée (art. 664). S'il ne le fait pas, ou si la société ne régularise pas sa situation dans le délai légal, tout intéressé peut demander au juge la dissolution de la société (chapitre 9). Le juge ne peut toutefois la prononcer si la régularisation est intervenue au jour où il statue sur le fond.",
      },
      { type: 'intertitre', texte: "5.8.4 Le cas de la SARL" },
      {
        type: 'paragraphe',
        texte: "Dans la SARL, la consultation des associés est déclenchée par le gérant ou, le cas échéant, par le commissaire aux comptes (art. 371). Cette précision n'est pas anodine : si le gérant ne réagit pas, le commissaire aux comptes a le pouvoir, et le devoir, de provoquer la consultation. À défaut de décision, ou si les associés n'ont pu délibérer valablement, tout intéressé, créancier, associé minoritaire ou salarié, peut demander au juge la dissolution de la société (art. 373). Le juge ne la prononcera pas si, au jour où il statue sur le fond, la cause a cessé d'exister : une recapitalisation réalisée pendant la procédure sauve la société. Le comptable qui constate la franchise du seuil doit le signaler clairement dans les documents de clôture.",
      },
    ],
  },
  {
    numero: '5.9',
    titre: "Le « coup d'accordéon » : assainir puis recapitaliser",
    navLabel: "Coup d'accordéon",
    blocs: [
      { type: 'intertitre', texte: "5.9.1 Le mécanisme" },
      {
        type: 'paragraphe',
        texte: "Pour sortir d'une situation de capitaux propres dégradés, la pratique enchaîne fréquemment une **réduction motivée par les pertes** et une **augmentation immédiate**. Le capital « se replie » sur l'actif net réel, puis « se déploie » par des apports nouveaux : c'est le « coup d'accordéon », expression doctrinale qui ne figure pas dans l'Acte uniforme. Chaque temps de l'opération obéit à ses propres règles. La réduction pour pertes n'ouvre pas de droit d'opposition aux créanciers (art. 632) ; l'augmentation relève du chapitre 4 : AGE, DPS ou suppression du DPS au profit d'un repreneur (art. 586-587), libération et déclaration notariée. Lorsque la réduction ramène provisoirement le capital sous le minimum légal, l'augmentation corrélative décidée par la même assemblée la rend régulière (art. 368 pour la SARL ; art. 66 et 387 pour la SA).",
      },
      {
        type: 'carte',
        titre: "Exemple 5.5 — Réduction à zéro puis augmentation réservée",
        tableau: {
          entetes: ["Étape", "Écriture", "Capital après l'étape"],
          lignes: [
            ["Situation initiale", "Capital 50 000 000 ; report à nouveau débiteur 58 000 000 ; capitaux propres − 8 000 000", "50 000 000"],
            ["1. Réduction pour pertes", "Débit 1013 / crédit 1291 : 50 000 000", "0"],
            ["2. Augmentation réservée au repreneur", "Débit 4615 / crédit 1013 : 30 000 000 ; puis débit 521 / crédit 4615 à l'encaissement", "30 000 000"],
            ["3. Situation finale", "Report à nouveau débiteur résiduel 8 000 000 ; capitaux propres 22 000 000", "30 000 000"],
          ],
        },
        note: "La réduction à zéro fait disparaître les anciens actionnaires s'ils ne participent pas à l'augmentation : c'est pourquoi l'assemblée doit être pleinement informée, et le DPS respecté sauf suppression régulière au profit du repreneur. Les deux décisions sont prises par la même assemblée. La SA doit reconstituer un capital au moins égal au minimum légal (art. 387).",
      },
      {
        type: 'paragraphe',
        texte: "L'opération est brutale pour les anciens actionnaires : si le capital est ramené à zéro, leurs actions sont annulées, et ils ne restent associés que s'ils souscrivent à l'augmentation. Elle est pourtant souvent la seule issue lorsque les pertes ont absorbé toute la valeur de la société : un repreneur n'acceptera d'apporter des fonds que si ceux-ci ne servent pas d'abord à combler un passé dont il n'est pas responsable. La réduction préalable « purge » les pertes, et l'apport nouveau recapitalise une société assainie. Pour le comptable, la clé est la chronologie : la réduction est comptabilisée avant l'augmentation, et le report à nouveau débiteur qui subsiste éventuellement après l'opération continuera de peser sur les distributions futures (art. 143).",
      },
      { type: 'intertitre', texte: "5.9.2 Les variantes" },
      {
        type: 'paragraphe',
        texte: "Une variante consiste à faire entrer le repreneur par **compensation** avec une créance qu'il détient déjà sur la société, par exemple un prêt consenti pendant la crise (chapitre 4, art. 611) : l'augmentation n'apporte alors pas de trésorerie, mais elle transforme une dette en capitaux propres, ce qui améliore d'autant la structure financière. Dans les sociétés congolaises en difficulté, où les associés financent souvent l'exploitation par des avances en compte courant, cette conversion est un levier courant de reconstitution des capitaux propres. Dans tous les cas, si la société est déjà en redressement judiciaire, les règles des articles 664 à 668 cèdent la place au droit des procédures collectives (art. 669), étudié en UE2.",
      },
      {
        type: 'paragraphe',
        texte: "Toutes les opérations d'assainissement ne vont pas jusqu'à zéro. Lorsque les pertes sont inférieures au capital, l'assemblée peut ne réduire le capital que du montant des pertes, puis l'augmenter par des apports nouveaux auxquels les anciens actionnaires peuvent participer grâce à leur DPS. Si l'augmentation se fait à un prix supérieur au nominal, une prime d'émission apparaît, qui reflète la valeur que le marché ou l'investisseur accorde à la société assainie. L'ordre des opérations est toujours le même : constater les pertes, les imputer sur les réserves disponibles, réduire le capital du solde, puis recapitaliser. Le rapport du commissaire aux comptes sur la réduction (art. 630) et ceux exigés pour l'augmentation (art. 588-591) éclairent chaque étape.",
      },
      {
        type: 'filet',
        titre: "Le contrôle d'un coup d'accordéon",
        texte: "Dans un coup d'accordéon comme celui de BOMA ÉNERGIE, l'auditeur vérifie que la réduction et l'augmentation sont votées par la même assemblée, pour que le capital ne reste pas sous le minimum légal, et que les rapports du commissaire aux comptes existent pour chacune des deux opérations. Il contrôle aussi la suppression du DPS au profit de SOLAR INVEST : motifs, nom du bénéficiaire, justification du prix et incidence sur la situation des actionnaires doivent figurer dans les rapports (art. 588-591), à peine de nullité. Enfin, il rapproche le versement de 40 000 000 FC de la déclaration notariée avant de valider la réalisation.",
      },
    ],
  },
  {
    numero: '5.10',
    titre: "Fiscalité, présentation et contrôle des opérations sur le capital",
    navLabel: "Fiscalité et contrôle",
    blocs: [
      { type: 'intertitre', texte: "5.10.1 La fiscalité des remboursements" },
      {
        type: 'paragraphe',
        texte: "Rendre de l'argent aux associés n'est pas fiscalement neutre. La loi n° 23/053 range parmi les revenus distribués, soumis à la retenue de 20 % (chapitre 3), les bénéfices qui ne demeurent pas investis dans l'entreprise. Elle exclut en revanche des revenus distribués les répartitions présentant le caractère de **remboursement d'apports** ou de primes d'émission, mais seulement si « tous les bénéfices et réserves autres que la réserve légale ont été auparavant répartis » (art. 74). Autrement dit, une société qui dispose encore de réserves distribuables et qui rembourse du capital est présumée distribuer d'abord ses réserves : le remboursement est alors, pour la part correspondante, imposable comme un dividende. L'article 74 vise aussi les amortissements de capital effectués par les sociétés concessionnaires lorsqu'ils sont justifiés par la caducité de l'actif social, et les remboursements consécutifs à la liquidation portant sur le capital amorti ayant déjà supporté l'impôt.",
      },
      {
        type: 'paragraphe',
        texte: "Cette règle fiscale renverse l'intuition comptable. En comptabilité, un remboursement de capital et une distribution de réserves sont deux opérations distinctes, l'une débitant le 1013, l'autre le 11. En fiscalité, l'ordre d'imputation est imposé : les réserves sont réputées sortir les premières. Le comptable qui prépare une réduction par remboursement doit donc vérifier l'état des réserves distribuables, et, s'il en existe, calculer la retenue à la source due sur la fraction réputée distribuée, la retenir et la reverser au plus tard le 15 du mois suivant le versement (arrêté n° 008/2025). L'amortissement du capital, financé par définition sur des bénéfices ou réserves, relève en principe du même régime, sauf l'exception propre aux sociétés concessionnaires.",
      },
      { type: 'intertitre', texte: "5.10.2 La présentation et le contrôle" },
      {
        type: 'carte',
        titre: "Tableau 5.5 — La présentation des opérations sur le capital dans les états financiers",
        tableau: {
          entetes: ["Opération", "Bilan", "Tableau des flux de trésorerie", "Notes annexes"],
          lignes: [
            ["Réduction pour pertes", "Capital et report à nouveau diminuent ; capitaux propres inchangés", "Aucun flux", "Note 13 : capital diminué, date de l'AGE"],
            ["Réduction par remboursement", "Capital diminue ; dette 4619 jusqu'au paiement", "Prélèvement sur le capital (flux de financement)", "Note 13"],
            ["Rachat pour annulation", "Capital et réserves diminuent", "Prélèvement sur le capital", "Nombre d'actions propres détenues"],
            ["Amortissement du capital", "Capital inchangé (1013 vers 1014) ; réserves diminuent", "Sortie de trésorerie en flux de financement", "Note 13 : actions amorties"],
          ],
        },
        note: "Ligne du TFT : variation des comptes de la classe 10 hors 106 et 109 (logique des postes, Guide d'application). La Note 13 demande d'indiquer si possible les dates des AGE et le montant du capital diminué en cas de réduction.",
      },
      {
        type: 'paragraphe',
        texte: "Pour l'auditeur, les opérations de ce chapitre concentrent des risques élevés : ce sont des sorties de trésorerie au profit des associés, qui peuvent porter atteinte au gage des créanciers et à l'égalité entre associés. Il vérifie la compétence de l'organe qui a décidé, la présence du rapport du commissaire aux comptes (art. 630), le respect du délai d'opposition et le sort des oppositions (art. 634-637), la procédure d'offre à tous les actionnaires en cas de rachat (art. 643-646), la limite de 10 % des actions propres et leur annulation dans les délais (art. 640, 649), le financement de l'amortissement sur des sommes disponibles (art. 655), et le traitement fiscal de la sortie (art. 74 de la loi n° 23/053). Une réduction irrégulière est nulle, et les sommes versées peuvent devoir être restituées.",
      },
      {
        type: 'paragraphe',
        texte: "Un dernier point de vigilance concerne la date des opérations. La réduction pour pertes est comptabilisée à la date de la décision de l'assemblée qui la constate ; la réduction par remboursement donne lieu à une dette dès la décision (compte 4619), mais le paiement n'intervient qu'après le délai d'opposition ; le rachat pour annulation est comptabilisé à l'annulation, dans les quinze jours de l'expiration de l'offre ; l'amortissement du capital est comptabilisé à la date fixée par l'assemblée pour le remboursement. Lorsque ces dates chevauchent une clôture, les états financiers doivent refléter l'étape atteinte : selon l'Application 63, la réduction par remboursement reclasse le capital en dette envers les associés (4619) dès la décision, et cette dette figure au passif circulant tant qu'elle n'est pas payée ; la trésorerie ne sort qu'au paiement.",
      },
      { type: 'intertitre', texte: "5.10.3 Synthèse" },
      {
        type: 'paragraphe',
        texte: "En synthèse, les trois grandes opérations de ce chapitre se distinguent par leur effet sur le capital, sur les capitaux propres et sur la trésorerie. La réduction pour pertes diminue le capital sans toucher aux capitaux propres ni à la trésorerie ; elle ne lèse personne, puisque la perte est déjà là, d'où l'absence d'opposition. La réduction par remboursement, y compris par rachat pour annulation, diminue à la fois le capital, les capitaux propres et la trésorerie ; elle lèse potentiellement les créanciers, d'où leur droit d'opposition, et fiscalement elle peut être requalifiée en distribution tant que des réserves existent. L'amortissement du capital laisse le capital intact mais diminue les capitaux propres et la trésorerie ; il se finance comme un dividende, sur des sommes distribuables, et reste soumis au même butoir. Retenir ce tableau à trois colonnes permet de ne jamais se tromper d'écriture.",
      },
      { type: 'intertitre', texte: "5.10.4 Application : BOMA ÉNERGIE" },
      {
        type: 'paragraphe',
        texte: "Retour à BOMA ÉNERGIE, dont le cas 6 détaille les écritures. Ses pertes cumulées avaient fait fondre ses capitaux propres sous zéro. L'assemblée a écarté la dissolution et voté, dans la même séance, une réduction du capital à zéro par imputation des pertes, sans opposition possible des créanciers, puis une augmentation de 40 000 000 FC réservée à SOLAR INVEST. Après l'opération, les capitaux propres s'élèvent à 36 000 000 FC pour un capital de 40 000 000 FC, au-dessus de la moitié : la situation est régularisée. Le prix de ce redressement est payé par les anciens actionnaires, qui n'ont pas souscrit et perdent leur qualité d'associé. Réduction, rachat, amortissement : chaque opération de ce chapitre se lit ainsi par son effet sur le capital, sur les capitaux propres et sur la trésorerie.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: "KWILU PLASTIQUES SA : réduction motivée par des pertes",
    contexte: "KWILU PLASTIQUES SA présente : capital 90 000 000 (9 000 actions de 10 000), réserve légale 9 000 000, report à nouveau débiteur 34 000 000. Capitaux propres : 65 000 000. L'AGE, réunie sur un projet communiqué au commissaire aux comptes 50 jours plus tôt et au vu de son rapport, décide de réduire le capital de 34 000 000 par diminution du nominal pour apurer l'intégralité des pertes.",
    questions: [
      {
        num: 1,
        enonce: "La situation relevait-elle de la procédure des articles 664-665 ?",
        correction: "Capitaux propres (65 000 000) contre moitié du capital (45 000 000) : 65 000 000 > 45 000 000 — le seuil de l'article 664 n'est pas franchi, la consultation obligatoire sur la dissolution anticipée n'était pas requise. La réduction relève du droit commun des articles 627 et suivants : AGE compétente (art. 628), projet communiqué au CAC 45 jours au moins avant l'assemblée (art. 629) et rapport du CAC à peine de nullité (art. 630) — conditions remplies (50 jours).",
      },
      {
        num: 2,
        enonce: "Les créanciers peuvent-ils s'opposer ? Le calendrier de réalisation est-il contraint ?",
        correction: "Non : la réduction est motivée par des pertes — l'article 632 exclut l'opposition des créanciers. L'opération n'a donc pas à attendre le délai de trente jours de l'article 634, qui ne concerne que les réductions non motivées par des pertes. Restent les formalités de publicité (art. 638, renvoyant à l'art. 264).",
      },
      {
        num: 3,
        enonce: "Passez l'écriture et calculez le nouveau nominal.",
        correction: "Débit 1013 Capital souscrit, appelé, versé, non amorti 34 000 000 / crédit 1291 Perte nette à reporter 34 000 000 (Application 62). Nouveau capital : 90 000 000 − 34 000 000 = 56 000 000 ; nouveau nominal : 56 000 000 / 9 000 ≈ 6 222 — en pratique, l'assemblée retiendra un nominal entier et ajustera (par exemple en combinant diminution du nominal et regroupement d'actions), l'égalité entre actionnaires devant être respectée (art. 628, al. 2).",
      },
      {
        num: 4,
        enonce: "Après l'assainissement, un investisseur propose de souscrire 40 000 000 d'actions nouvelles, DPS supprimé à son profit. Qualifiez l'opération d'ensemble et rappelez ses conditions.",
        correction: "C'est le « coup d'accordéon » de la pratique : réduction d'apurement puis augmentation de recapitalisation. L'augmentation obéit au chapitre 4 : AGE compétente (art. 564), suppression du DPS au profit d'un bénéficiaire dénommé votée sans la participation de celui-ci s'il est actionnaire (art. 586-587), rapports du conseil et du commissaire aux comptes justifiant le prix à peine de nullité (art. 588-591), libération du quart au moins et de la totalité de la prime (art. 604). Préalable de l'article 572 : le capital ancien est intégralement libéré.",
      },
    ],
  },
  {
    id: 'cas2',
    titre: "NORD-UBANGI DISTRIBUTION SA : réduction par remboursement et opposition",
    contexte: "NORD-UBANGI DISTRIBUTION SA (capital 60 000 000, 6 000 actions de 10 000, aucune perte) a une trésorerie excédentaire durable. L'AGE du 01/09/N décide, au vu du rapport du commissaire aux comptes, de rembourser le quart du nominal (2 500 par action). L'avis est publié le 10/09/N. La BANQUE COMMERCIALE DU FLEUVE, créancière depuis N−1 de 20 000 000, forme opposition le 25/09/N.",
    questions: [
      {
        num: 1,
        enonce: "L'opposition est-elle recevable ?",
        correction: "Oui. La réduction n'est pas motivée par des pertes : les créanciers dont la créance est antérieure à la publication de l'avis peuvent s'opposer (art. 633) — la banque est créancière depuis N−1. Le délai est de trente jours à compter de la publication du 10/09/N (art. 634) : l'opposition du 25/09/N est dans le délai. Forme : exploit d'huissier ou tout moyen établissant la réception effective, devant la juridiction compétente statuant à bref délai (art. 635).",
      },
      {
        num: 2,
        enonce: "La société peut-elle rembourser les actionnaires le 05/10/N ?",
        correction: "Non. Les opérations de réduction ne peuvent commencer pendant le délai d'opposition ni, une opposition ayant été formée, avant qu'il ait été statué en première instance (art. 636). Si l'opposition est accueillie, la procédure restera interrompue jusqu'au remboursement de la créance de la banque ou jusqu'à la constitution de garanties jugées suffisantes (art. 637).",
      },
      {
        num: 3,
        enonce: "L'opposition est rejetée le 15/11/N. Passez les écritures de la réduction (décision puis remboursement le 30/11/N).",
        correction: "Montant : 6 000 × 2 500 = 15 000 000. Décision : débit 1013 15 000 000 / crédit 4619 Apporteurs, capital à rembourser 15 000 000. Remboursement du 30/11/N : débit 4619 15 000 000 / crédit 521 Banques 15 000 000 (Application 63). Nouveau capital : 45 000 000 (nominal ramené à 7 500).",
      },
      {
        num: 4,
        enonce: "Ce remboursement est-il un amortissement du capital ?",
        correction: "Non. L'amortissement (art. 651) rembourse le nominal par prélèvement sur les bénéfices ou réserves non statutaires, sans réduction du capital (art. 654) — le capital est simplement reclassé de 1013 vers 1014. Ici, c'est une réduction : le capital diminue réellement (art. 627), les créanciers disposaient d'un droit d'opposition, et le gage commun est réduit. Les deux opérations ne se confondent ni juridiquement ni comptablement.",
      },
    ],
  },
  {
    id: 'cas3',
    titre: "MANIEMA HÔTELS SA : amortissement du capital",
    contexte: "MANIEMA HÔTELS SA (capital 200 000 000, 20 000 actions de 10 000 intégralement libérées ; réserve légale 40 000 000 ; réserves facultatives 90 000 000 ; réserves statutaires 15 000 000) exploite des actifs à concession limitée dans le temps. Ses statuts prévoient la faculté d'amortir le capital. L'assemblée générale ordinaire décide d'amortir le quart du nominal (2 500 par action) par prélèvement sur les réserves facultatives.",
    questions: [
      {
        num: 1,
        enonce: "L'organe et les ressources choisis sont-ils réguliers ?",
        correction: "Oui. L'amortissement étant prévu par les statuts, l'assemblée générale ordinaire est compétente (art. 652) — dans le silence des statuts, il aurait fallu une AGE. Les ressources : bénéfices ou réserves non statutaires (art. 655) — les réserves facultatives (90 000 000) le sont ; la réserve légale est interdite, les réserves statutaires n'auraient été possibles que sur décision d'une AGE. Montant : 20 000 × 2 500 = 50 000 000 ≤ 90 000 000. Butoir de l'article 655, al. 3 : après l'opération, les capitaux propres ne doivent pas être inférieurs au capital (inchangé : 200 000 000) augmenté des réserves indisponibles — à vérifier sur les chiffres complets du bilan.",
      },
      {
        num: 2,
        enonce: "Passez les écritures.",
        correction: "Sur le modèle de l'Application 64 : (1) reclassement — débit 1013 50 000 000 / crédit 1014 Capital souscrit, appelé, versé, amorti 50 000 000 ; (2) prélèvement — débit 1181 Réserves facultatives 50 000 000 / crédit 4619 Apporteurs, capital à rembourser 50 000 000 ; (3) paiement — débit 4619 / crédit 521 pour 50 000 000. Le capital social total au bilan reste de 200 000 000 (art. 654).",
      },
      {
        num: 3,
        enonce: "Quels droits les actions partiellement amorties conservent-elles ? Qu'en serait-il d'un amortissement intégral ?",
        correction: "Elles conservent tous leurs droits — vote, part aux bénéfices au-delà du premier dividende, boni de liquidation — sauf le premier dividende et le remboursement du nominal, perdus à due concurrence du quart amorti (art. 656) : le premier dividende de l'article 145, calculé sur le montant libéré non amorti, ne porte plus que sur 7 500 par action. Intégralement amorties, elles deviendraient des actions de jouissance (art. 653), privées de tout premier dividende et de tout remboursement du nominal à la liquidation — l'amortissement étant précisément une avance sur ce produit de liquidation (art. 651).",
      },
      {
        num: 4,
        enonce: "Pourquoi une société concessionnaire recourt-elle typiquement à l'amortissement du capital ?",
        correction: "Parce que ses actifs — et donc sa substance — disparaissent à l'échéance de la concession sans valeur résiduelle pour elle : rembourser progressivement le nominal aux actionnaires pendant la vie de la concession leur restitue leur mise « à titre d'avance sur le produit de la liquidation future » (art. 651), tout en maintenant le capital social comme gage des créanciers (art. 654 : pas de réduction de capital). Le financement par bénéfices et réserves distribue en réalité des ressources disponibles sous une forme qui organise l'extinction progressive des droits au nominal.",
      },
    ],
  },
  {
    id: 'cas4',
    titre: "SUD-KIVU MOTORS SARL : perte de la moitié du capital",
    contexte: "SUD-KIVU MOTORS SARL (capital 30 000 000 ; réserve légale 4 000 000) approuve le 30/04/N+1 les comptes de l'exercice N, qui font apparaître une perte portant le report à nouveau débiteur cumulé à 22 000 000. Capitaux propres : 30 000 000 + 4 000 000 − 22 000 000 = 12 000 000.",
    questions: [
      {
        num: 1,
        enonce: "La procédure des articles 371-373 est-elle déclenchée ? Qui agit, et dans quel délai ?",
        correction: "Oui : capitaux propres (12 000 000) < moitié du capital (15 000 000). Le gérant — ou, le cas échéant, le commissaire aux comptes — doit consulter les associés sur l'opportunité de prononcer la dissolution anticipée dans les quatre mois de l'approbation des comptes ayant fait apparaître la perte (art. 371), soit avant le 30/08/N+1.",
      },
      {
        num: 2,
        enonce: "Les associés écartent la dissolution. Quelles obligations en découlent, et sous quelle échéance ?",
        correction: "La société doit, dans les deux ans qui suivent la date de clôture de l'exercice déficitaire, reconstituer ses capitaux propres à hauteur de la moitié au moins du capital (15 000 000). À défaut, elle doit réduire son capital d'un montant au moins égal aux pertes qui n'ont pu être imputées sur les réserves — sans que cette réduction ramène le capital sous le capital légal (art. 372).",
      },
      {
        num: 3,
        enonce: "La société choisit la voie de la réduction. Quelle est l'ampleur minimale de la réduction, et quelles écritures ?",
        correction: "Les pertes (22 000 000) sont d'abord imputées sur les réserves existantes, sur décision de l'assemblée : le compte 13 peut être apuré par le débit du compte 11 (AUDCIF, compte 13). Imputation sur la réserve légale : débit 111 4 000 000 / crédit 1291 4 000 000. Pertes non imputées : 18 000 000, montant minimal de la réduction (art. 372). Écriture : débit 1013 18 000 000 / crédit 1291 18 000 000. Après l'opération : capital 12 000 000, réserve légale 0, report à nouveau 0, capitaux propres 12 000 000, au moins égaux à la moitié du nouveau capital. Le capital réduit ne peut descendre sous le capital légal (art. 372, al. 2) ; en RDC, le capital de la SARL est librement fixé (arrêté du 30 décembre 2014, art. 2), si bien que la contrainte tient seulement à la cohérence avec l'objet social. La réserve légale devra ensuite être reconstituée sur les bénéfices futurs.",
      },
      {
        num: 4,
        enonce: "Que risque la société si ni la consultation ni la régularisation n'interviennent ?",
        correction: "Tout intéressé peut demander à la juridiction compétente de prononcer la dissolution — à défaut de consultation provoquée par le gérant ou le commissaire aux comptes, comme à défaut de reconstitution dans les délais (art. 373). Garde-fou : l'action est éteinte lorsque la cause de dissolution a cessé d'exister au jour où la juridiction statue sur le fond — la régularisation tardive sauve la société.",
      },
    ],
  },

  {
    id: 'cas5',
    titre: "LIKASI MÉTAUX SA : rachat d'actions pour annulation",
    contexte: "LIKASI MÉTAUX SA a un capital de 200 000 000 FC (20 000 actions de 10 000, entièrement libérées, toutes nominatives), une réserve légale de 40 000 000 et des réserves facultatives de 90 000 000. L'AGE du 15/03/N décide une réduction de capital non motivée par des pertes et autorise le conseil à racheter 2 000 actions au prix de 16 000 pour les annuler. Les actionnaires présentent 5 000 actions à l'achat ; parmi eux, M. B. en présente 1 500 et Mme C. 500. Tous les actionnaires sont des personnes physiques résidentes.",
    questions: [
      { num: 1, enonce: "Quelles formalités la société doit-elle accomplir avant de payer ?", correction: "Rapport du commissaire aux comptes sur les causes et conditions de la réduction, projet communiqué 45 jours avant l'AGE (art. 629-630). Offre à tous les actionnaires : les actions étant toutes nominatives, par notification individuelle mentionnant le nombre d'actions, le prix, le mode de paiement et un délai d'au moins trente jours (art. 643-644). Réduction non motivée par des pertes : dépôt du procès-verbal au RCCM, avis publié, délai d'opposition de trente jours pendant lequel les opérations ne peuvent commencer (art. 633-636)." },
      { num: 2, enonce: "Combien d'actions la société achète-t-elle à M. B. et à Mme C. ?", correction: "Les actions présentées (5 000) excèdent le nombre à acheter (2 000) : réduction proportionnelle pour chaque vendeur (art. 645), au taux de 2 000 / 5 000 = 40 %. M. B. : 1 500 × 40 % = 600 actions ; Mme C. : 500 × 40 % = 200 actions." },
      { num: 3, enonce: "Passez les écritures de rachat, d'annulation et de paiement.", correction: "Prix : 2 000 × 16 000 = 32 000 000 ; nominal : 20 000 000 ; excédent : 12 000 000, restitution de réserves. Écriture à l'annulation (dans les quinze jours de l'expiration de l'offre, art. 649) : débit 1013 20 000 000 et débit 1181 Réserves facultatives 12 000 000 / crédit 4619 32 000 000. Paiement : débit 4619 / crédit 521 (net de la retenue, question 5). L'annulation est constatée par mention au registre des actions nominatives (art. 650)." },
      { num: 4, enonce: "Vérifiez le butoir des capitaux propres.", correction: "Capitaux propres avant : 200 000 000 + 40 000 000 + 90 000 000 = 330 000 000. Après : 330 000 000 − 32 000 000 = 298 000 000. Seuil : capital après réduction 180 000 000 + réserve légale 40 000 000 = 220 000 000. 298 000 000 ≥ 220 000 000 : le rachat respecte le butoir (art. 143, par analogie avec art. 640 et 655)." },
      { num: 5, enonce: "Quel est le traitement fiscal du prix versé aux actionnaires ?", correction: "Selon l'art. 74 de la loi n° 23/053, une répartition n'a le caractère de remboursement d'apports que si tous les bénéfices et réserves autres que la réserve légale ont été auparavant répartis. Or la société conserve des réserves facultatives (78 000 000 après l'opération) : la totalité des 32 000 000 risque d'être traitée comme revenu distribué, soumis à la retenue de 20 %, soit 6 400 000, retenue et reversée au plus tard le 15 du mois suivant (AM n° 008/2025). Écriture de paiement : débit 4619 32 000 000 / crédit 521 25 600 000 et crédit 447 6 400 000. La prudence commande de faire valider ce traitement par un conseil fiscal." },
    ],
  },
  {
    id: 'cas6',
    titre: "BOMA ÉNERGIE SA : perte de la moitié et coup d'accordéon",
    contexte: "BOMA ÉNERGIE SA, au capital de 60 000 000 FC (6 000 actions de 10 000), sans réserves, clôture l'exercice N avec un report à nouveau débiteur cumulé de 64 000 000. Les comptes sont approuvés le 20/05/N+1. Un investisseur, SOLAR INVEST SA, propose d'entrer au capital pour 40 000 000, à condition que les pertes soient d'abord apurées. Les anciens actionnaires ne souhaitent pas remettre de fonds. On admet que le minimum légal de 10 000 000 FCFA équivaut, en francs congolais, à un montant inférieur à 40 000 000 FC (hypothèse de l'exercice).",
    questions: [
      { num: 1, enonce: "La procédure de l'article 664 est-elle déclenchée ? Dans quel délai ?", correction: "Capitaux propres : 60 000 000 − 64 000 000 = − 4 000 000, inférieurs à la moitié du capital (30 000 000). Le conseil doit convoquer l'AGE dans les quatre mois de l'approbation des comptes, soit avant le 20/09/N+1, pour décider s'il y a lieu à dissolution anticipée (art. 664)." },
      { num: 2, enonce: "L'AGE écarte la dissolution et organise un coup d'accordéon. Décrivez les deux décisions et leurs conditions.", correction: "1) Réduction du capital motivée par les pertes, de 60 000 000 à 0 : aucune opposition des créanciers possible (art. 632), rapport du commissaire aux comptes (art. 630). 2) Augmentation de 40 000 000 réservée à SOLAR INVEST, avec suppression du DPS à son profit (art. 586), sur rapports du conseil et du commissaire aux comptes exposant les motifs, le prix et l'incidence de l'émission (art. 588-591). La même assemblée doit voter les deux décisions, car le capital d'une SA ne peut rester sous le minimum légal (art. 66, 387)." },
      { num: 3, enonce: "Passez les écritures.", correction: "Réduction : débit 1013 60 000 000 / crédit 1291 60 000 000 ; il subsiste un report à nouveau débiteur de 4 000 000. Augmentation (4 000 actions nouvelles de 10 000, sans prime) : versement débit 521 / crédit 4615 40 000 000 ; réalisation au jour de la déclaration notariée (art. 571) : débit 4615 / crédit 1013 40 000 000." },
      { num: 4, enonce: "Quelle est la situation après l'opération ? La société est-elle régularisée ?", correction: "Capital 40 000 000, report à nouveau débiteur 4 000 000 : capitaux propres 36 000 000, supérieurs à la moitié du capital (20 000 000). La situation est régularisée. SOLAR INVEST détient 100 % du capital : les anciens actionnaires, qui n'ont pas souscrit, perdent la qualité d'actionnaire. Le report débiteur de 4 000 000 devra être apuré par les premiers bénéfices avant toute distribution (art. 143)." },
      { num: 5, enonce: "Quelle alternative aurait permis aux anciens actionnaires de rester associés ?", correction: "Ils auraient pu exercer leur DPS si l'augmentation n'avait pas été réservée, ou souscrire aux côtés de l'investisseur. Si l'un d'eux détenait une créance en compte courant sur la société, il aurait pu la convertir en capital par compensation (art. 611, chapitre 4), ce qui reconstitue les capitaux propres sans apport de trésorerie. Enfin, l'AGE aurait pu réduire le capital d'un montant moindre, en conservant une fraction du capital ancien, si les pertes l'avaient permis : ici, elles dépassaient le capital." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 5,
  id: 'ue3-chapitre-5',
  titre: "La réduction et l'amortissement du capital",
  sousTitre: "AUSCGIE révisé, art. 69-70, 366-373 (SARL), 627-669 (SA), 853-11 (SAS) · AUDCIF, comptes 101 et 13 · SYSCOHADA, Applications 62, 63 et 64 · loi n° 23/053, art. 74",
  infoBulle: "Motifs et décision de la réduction de capital, contrôle du commissaire aux comptes, droit d'opposition des créanciers, écritures (pertes, remboursement, renonciation, attribution d'actifs), règles de la SARL et de la SAS, rachat d'actions propres et annulation, amortissement du capital et actions de jouissance, reconversion, capitaux propres inférieurs à la moitié du capital, coup d'accordéon, fiscalité des remboursements et contrôle.",
  loiRef: "Art. 66, 69-70, 143, 269-3, 269-5, 358, 366-373, 627-669, 853-3, 853-11 AUSCGIE · AUDCIF, comptes 101, 105, 13 · App. 62-64 · loi n° 23/053, art. 74",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Distinguer les motifs de réduction du capital et en tirer les conséquences juridiques et comptables (art. 69-70, 627-638-1)",
    "Appliquer le droit d'opposition des créanciers et en respecter le calendrier (art. 632-637, 370)",
    "Comptabiliser une réduction pour pertes, par remboursement, par renonciation ou par attribution d'actifs (Applications 62-63 ; AUDCIF, compte 101)",
    "Appliquer les règles propres à la SARL et à la SAS, dont le minimum légal en RDC (art. 366-370, 853-11)",
    "Maîtriser l'interdiction du rachat d'actions propres, ses dérogations et la procédure d'offre pour annulation (art. 639-650)",
    "Comptabiliser l'amortissement du capital et suivre les actions de jouissance et leur reconversion (art. 651-663-1 ; Application 64)",
    "Conduire la procédure des capitaux propres inférieurs à la moitié du capital et construire un coup d'accordéon (art. 664-669, 371-373)",
    "Mesurer les conséquences fiscales d'un remboursement d'apports en RDC (loi n° 23/053, art. 74) et présenter les opérations dans les états financiers",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Le capital se réduit par imputation des pertes ou par remboursement d'apports, en numéraire ou en actifs (art. 69-70) ; dans la SA, par diminution du nominal ou du nombre d'actions, sur décision de l'AGE, sans atteinte à l'égalité des actionnaires (art. 627-628).",
    "Rapport du commissaire aux comptes sur les causes et conditions, projet communiqué 45 jours avant l'AGE (30 jours en SARL), à peine de nullité (art. 629-630, 367).",
    "Réduction motivée par des pertes : pas d'opposition (art. 632). Réduction non motivée par des pertes : opposition des créanciers antérieurs dans les trente jours de la publication de l'avis, opérations suspendues, remboursement ou garanties si l'opposition est accueillie (art. 633-637, 370).",
    "Écritures : pertes, débit 1013 / crédit 1291 (Application 62) ; remboursement, débit 1013 / crédit 4619 puis 4619 / 521 (Application 63) ; renonciation au non-appelé, débit 1011 / crédit 109.",
    "SARL : égalité des associés, rachat de parts interdit sauf pour annulation, réduction sous le minimum légal interdite sans augmentation corrélative (art. 366-369) ; en RDC, le capital de la SARL étant libre, le plancher est celui de la cohérence avec l'objet social.",
    "SA : achat de ses propres actions interdit (art. 639), sauf rachat pour annulation par offre à tous les actionnaires (art. 643-650) et attribution gratuite dans la limite de 10 % (art. 640) ; annulation dans les quinze jours de l'expiration de l'offre (art. 649).",
    "Amortissement : remboursement du nominal par avance sur la liquidation, sans réduction du capital, sur bénéfices ou réserves non statutaires, jamais sur la réserve légale ; actions de jouissance privées du premier dividende et du remboursement du nominal (art. 651-656 ; Application 64 : 1013 vers 1014).",
    "Reconversion des actions amorties par prélèvement sur leurs bénéfices ou reversement des actionnaires, sur décision de l'AGE ratifiée par les assemblées spéciales (art. 657-663-1).",
    "Capitaux propres inférieurs à la moitié du capital : consultation dans les quatre mois de l'approbation ; si la dissolution est écartée, reconstitution ou réduction d'au moins les pertes non imputées sur les réserves dans le délai légal ; à défaut, dissolution judiciaire évitable par régularisation (art. 664-669, 371-373).",
    "Fiscalité : un remboursement d'apports n'échappe à la qualification de revenu distribué que si tous les bénéfices et réserves autres que la réserve légale ont été auparavant répartis (loi n° 23/053, art. 74).",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "30 janvier 2014 ; art. 66, 69-70, 143, 264, 269-3, 269-5, 358, 366 à 373, 387, 627 à 669, 853-3 et 853-11" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)", precision: "Titre VII, comptes 101 (fonctionnement en cas de réduction et d'amortissement), 105, 13 et 50 ; Titre IX, Note annexe 13" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Guide d'application", precision: "Applications 62 (réduction par imputation des pertes), 63 (réduction par remboursement), 64 (amortissement du capital) ; logique du tableau des flux (prélèvements sur le capital)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, plan de comptes et maquette", precision: "comptes 1011, 1013, 1014, 109, 111, 1181, 1188, 1291, 4615, 4619, 5021 ; rubriques CA à CP du bilan" },
    { genre: 'texte', intitule: "Loi n° 23/053 du 30 novembre 2023 relative à l'impôt sur les sociétés et à l'impôt sur le revenu des personnes physiques", precision: "art. 73, 74 et 120" },
    { genre: 'texte', intitule: "Arrêté interministériel n° 002/CAB/MIN/JGS&DH/014 et n° 243/CAB/MIN/FINANCES/2014 du 30 décembre 2014 déterminant la forme des statuts et le capital social de la SARL", precision: "art. 2" },
    { genre: 'texte', intitule: "Arrêté ministériel n° 008/CAB/MIN/FINANCES/2025 du 19 février 2025 (retenue IRPP sur les revenus des capitaux mobiliers)", precision: "art. 2" },
    { genre: 'ouvrage', auteur: "Mapapa Mbangala A., Nkoy Mbangala C. et Mensah Freitas C.", titre: "Comptabilité des sociétés OHADA", editeur: "Droit Afrique", lieu: "s.l.", annee: "2026" },
    { genre: 'ouvrage', auteur: "Dobill M.", titre: "Comptabilité OHADA, tome 3 : comptabilité des sociétés", editeur: "Karthala", lieu: "Paris", annee: "2013" },
    { genre: 'ouvrage', auteur: "Nzoimbengene Luyindula B. D.", titre: "Comptabilité des sociétés suivant le système comptable OHADA révisé", editeur: "2e éd., à compte d'auteur", lieu: "s.l.", annee: "2025" },
    { genre: 'ouvrage', auteur: "Pougoué P.-G. (dir.)", titre: "Encyclopédie du droit OHADA", editeur: "Lamy", lieu: "Paris", annee: "2011" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · AUDCIF et SYSCOHADA révisé (Applications 62, 63, 64) · loi n° 23/053 du 30 novembre 2023 · arrêté du 30 décembre 2014 · arrêté ministériel n° 008/2025.",
}

export default chapitre
