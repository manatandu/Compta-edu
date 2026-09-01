import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 3 — CHAPITRE 5 : LA RÉDUCTION ET L'AMORTISSEMENT DU CAPITAL
// AUSCGIE art. 627-638-1 (réduction), 651-656 (amortissement), 664-669 (SA :
// capitaux propres < moitié du capital) et 371-373 (SARL). Comptabilisation :
// Applications 62 (imputation des pertes), 63 (remboursement) et 64
// (amortissement) du Guide SYSCOHADA.
// N.B. : l'article 627 comporte dans le texte officiel une phrase tronquée ;
// son sens (diminution de la valeur nominale ou du nombre des actions) est
// restitué sans être présenté comme citation.
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1',
    question: "Par quels procédés le capital d'une SA est-il réduit ?",
    options: [
      { id: 'a', texte: "Uniquement par rachat d'actions en bourse" },
      { id: 'b', texte: "Par diminution de la valeur nominale des actions ou par diminution du nombre des actions" },
      { id: 'c', texte: "Par simple écriture comptable du directeur financier" },
      { id: 'd', texte: "Par prélèvement sur la réserve légale" },
      { id: 'e', texte: "Par conversion du capital en obligations" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 627 vise les deux procédés : diminution de la valeur nominale des actions ou diminution de leur nombre. La réduction est autorisée ou décidée par l'assemblée générale extraordinaire, qui peut déléguer au conseil d'administration ou à l'administrateur général tous pouvoirs pour la réaliser (art. 628) ; les délibérations prises en violation des articles 627 et 628 sont nulles (art. 638-1).",
    articleRef: "AUSCGIE, art. 627-628 et 638-1",
  },
  {
    id: 'q2',
    question: "La réduction de capital peut-elle rompre l'égalité entre actionnaires ?",
    options: [
      { id: 'a', texte: "Oui, librement" },
      { id: 'b', texte: "Non : elle ne peut en aucun cas porter atteinte à l'égalité des actionnaires, sauf consentement exprès des actionnaires défavorisés" },
      { id: 'c', texte: "Oui, si le conseil d'administration le justifie" },
      { id: 'd', texte: "Oui, pour les seuls actionnaires minoritaires" },
      { id: 'e', texte: "La question ne se pose pas en réduction de capital" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 628, alinéa 2 : « En aucun cas elle ne peut porter atteinte à l'égalité des actionnaires sauf consentement exprès des actionnaires défavorisés. » Une réduction ciblée sur certaines actions suppose donc l'accord exprès de leurs titulaires.",
    articleRef: "AUSCGIE, art. 628",
  },
  {
    id: 'q3',
    question: "Quel rôle joue le commissaire aux comptes dans la réduction de capital ?",
    options: [
      { id: 'a', texte: "Aucun" },
      { id: 'b', texte: "Le projet lui est communiqué 45 jours au moins avant l'AGE, et il présente un rapport sur les causes et conditions de la réduction — toute délibération prise à défaut de ce rapport est nulle" },
      { id: 'c', texte: "Il décide lui-même de la réduction" },
      { id: 'd', texte: "Il se borne à publier l'avis dans un journal d'annonces légales" },
      { id: 'e', texte: "Il rembourse les créanciers opposants" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 629 impose la communication du projet au commissaire aux comptes quarante-cinq jours au moins avant l'assemblée générale extraordinaire ; l'article 630 lui fait présenter un rapport livrant son appréciation sur les causes et les conditions de la réduction, et frappe de nullité toute délibération prise à défaut de ce rapport.",
    articleRef: "AUSCGIE, art. 629-630",
  },
  {
    id: 'q4',
    question: "Les créanciers peuvent-ils s'opposer à une réduction de capital motivée par des pertes ?",
    options: [
      { id: 'a', texte: "Oui, dans tous les cas" },
      { id: 'b', texte: "Non : l'opposition est exclue quand la réduction est motivée par des pertes ; elle n'est ouverte qu'aux réductions non motivées par des pertes" },
      { id: 'c', texte: "Oui, pendant un an" },
      { id: 'd', texte: "Seuls les créanciers hypothécaires le peuvent" },
      { id: 'e', texte: "Oui, mais uniquement devant notaire" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 632 : les créanciers ne peuvent pas s'opposer à la réduction motivée par des pertes — elle ne fait que constater un appauvrissement déjà réalisé. En revanche, lorsque la réduction n'est pas motivée par des pertes (remboursement d'apports), les créanciers antérieurs à la publication de l'avis peuvent s'y opposer (art. 633) dans un délai de trente jours à compter de la publication (art. 634), par exploit d'huissier ou tout moyen établissant la réception, devant la juridiction compétente statuant à bref délai (art. 635).",
    articleRef: "AUSCGIE, art. 632-635",
  },
  {
    id: 'q5',
    question: "Quel est l'effet de l'opposition d'un créancier sur le calendrier de la réduction ?",
    options: [
      { id: 'a', texte: "Aucun : l'opération se poursuit" },
      { id: 'b', texte: "Les opérations ne peuvent commencer pendant le délai d'opposition ni avant qu'il ait été statué en première instance ; si l'opposition est accueillie, la procédure est interrompue jusqu'au remboursement des créances ou à la constitution de garanties suffisantes" },
      { id: 'c', texte: "La réduction est définitivement annulée" },
      { id: 'd', texte: "La société est dissoute" },
      { id: 'e', texte: "Le créancier devient actionnaire" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 636 gèle les opérations pendant le délai d'opposition (30 jours) et, le cas échéant, jusqu'à la décision de première instance. L'article 637 : si l'opposition est accueillie, la procédure de réduction est interrompue jusqu'au remboursement des créances ou jusqu'à la constitution de garanties offertes par la société et jugées suffisantes.",
    articleRef: "AUSCGIE, art. 636-637",
  },
  {
    id: 'q6',
    question: "Comment se comptabilise une réduction de capital par imputation des pertes (Application 62 : pertes reportées de 80 000 000) ?",
    options: [
      { id: 'a', texte: "Débit 1291 / crédit 1013 pour 80 000 000" },
      { id: 'b', texte: "Débit 1013 Capital souscrit, appelé, versé, non amorti 80 000 000 / crédit 1291 Perte nette à reporter 80 000 000" },
      { id: 'c', texte: "Débit 111 / crédit 1291 pour 80 000 000" },
      { id: 'd', texte: "Débit 521 / crédit 1291 pour 80 000 000" },
      { id: 'e', texte: "Débit 6811 / crédit 1013 pour 80 000 000" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Application 62 : l'apurement des pertes reportées s'enregistre par le débit du capital (1013) et le crédit du report déficitaire (1291). Opération interne aux capitaux propres, sans flux de trésorerie : le capital est ramené au niveau de l'actif net réel, ce qui assainit le bilan et peut préparer une recapitalisation.",
    articleRef: "SYSCOHADA — Guide d'application, Application 62",
  },
  {
    id: 'q7',
    question: "Comment se comptabilise une réduction par remboursement de la moitié du nominal (Application 63 : 5 000 actions de 10 000) ?",
    options: [
      { id: 'a', texte: "Débit 1013 25 000 000 / crédit 4619 Apporteurs, capital à rembourser 25 000 000 ; puis débit 4619 / crédit 521 au paiement" },
      { id: 'b', texte: "Débit 521 / crédit 1013 pour 25 000 000" },
      { id: 'c', texte: "Débit 1291 / crédit 521 pour 25 000 000" },
      { id: 'd', texte: "Débit 1013 / crédit 111 pour 25 000 000" },
      { id: 'e', texte: "Débit 465 / crédit 521 pour 25 000 000" },
    ],
    reponseCorrecte: 'a',
    explication: "L'Application 63 : à la décision, le capital est réduit par le débit de 1013 et le crédit de 4619 — Apporteurs, capital à rembourser (5 000 × 5 000 = 25 000 000) ; au remboursement, 4619 est soldé par le crédit de 521 Banques. C'est la réduction non motivée par des pertes : elle ouvre le droit d'opposition des créanciers (art. 633-637).",
    articleRef: "SYSCOHADA — Guide d'application, Application 63",
  },
  {
    id: 'q8',
    question: "Qu'est-ce que l'amortissement du capital selon l'article 651 ?",
    options: [
      { id: 'a', texte: "La constatation de l'usure du capital par dotations annuelles" },
      { id: 'b', texte: "L'opération par laquelle la société rembourse aux actionnaires tout ou partie du nominal de leurs actions, à titre d'avance sur le produit de la liquidation future" },
      { id: 'c', texte: "Une réduction de capital motivée par des pertes" },
      { id: 'd', texte: "Le rachat d'actions en vue de leur annulation" },
      { id: 'e', texte: "Le remboursement des obligations" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 651 : l'amortissement du capital est l'opération par laquelle la société rembourse aux actionnaires tout ou partie du montant nominal de leurs actions, à titre d'avance sur le produit de la liquidation future. Contrairement à la réduction, il n'entraîne pas de réduction du capital (art. 654) : le capital social demeure inchangé au bilan, seule sa composition (1013/1014) est modifiée.",
    articleRef: "AUSCGIE, art. 651 et 654",
  },
  {
    id: 'q9',
    question: "Qui décide l'amortissement du capital ?",
    options: [
      { id: 'a', texte: "Toujours l'assemblée générale extraordinaire" },
      { id: 'b', texte: "L'assemblée générale ordinaire lorsqu'il est prévu par les statuts ; à défaut, l'assemblée générale extraordinaire — toute délibération contraire est nulle" },
      { id: 'c', texte: "Le conseil d'administration" },
      { id: 'd', texte: "Le commissaire aux comptes" },
      { id: 'e', texte: "La juridiction compétente" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 652 : l'amortissement est décidé par l'assemblée générale ordinaire lorsqu'il est prévu dans les statuts ; dans le silence des statuts, il est décidé par l'assemblée générale extraordinaire. Toute délibération d'amortissement prise en violation de cet article est nulle.",
    articleRef: "AUSCGIE, art. 652",
  },
  {
    id: 'q10',
    question: "Sur quelles ressources l'amortissement du capital est-il prélevé ?",
    options: [
      { id: 'a', texte: "Sur le capital lui-même" },
      { id: 'b', texte: "Sur les bénéfices ou les réserves non statutaires — jamais sur la réserve légale, et sur les réserves statutaires seulement par décision de l'AGE ; sans ramener les capitaux propres sous le capital augmenté des réserves indisponibles" },
      { id: 'c', texte: "Sur un emprunt bancaire dédié" },
      { id: 'd', texte: "Sur les primes d'émission exclusivement" },
      { id: 'e', texte: "Sur la trésorerie, sans condition" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 655 : les sommes utilisées au remboursement sont prélevées sur les bénéfices ou sur les réserves non statutaires ; elles ne peuvent l'être ni sur la réserve légale ni, sauf décision contraire de l'AGE, sur les réserves statutaires. Et le remboursement ne peut avoir pour effet de réduire les capitaux propres à un montant inférieur au capital augmenté des réserves indisponibles. Les opérations réalisées en violation des articles 654 et 655 sont nulles (art. 655-1).",
    articleRef: "AUSCGIE, art. 655 et 655-1",
  },
  {
    id: 'q11',
    question: "Quels droits conservent les actions intégralement amorties (actions de jouissance) ?",
    options: [
      { id: 'a', texte: "Aucun droit" },
      { id: 'b', texte: "Tous leurs droits, à l'exception du premier dividende (art. 145) et du remboursement du nominal, qu'elles perdent à due concurrence" },
      { id: 'c', texte: "Uniquement le droit de vote" },
      { id: 'd', texte: "Uniquement le droit au dividende" },
      { id: 'e', texte: "Leurs droits sont suspendus cinq ans" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 653 nomme actions de jouissance les actions intégralement amorties. L'article 656 : les actions intégralement ou partiellement amorties conservent tous leurs droits — vote, superdividende, boni de liquidation — à l'exception du droit au premier dividende (calculé sur le montant libéré, déjà remboursé) et du remboursement du nominal, perdus à due concurrence. L'amortissement s'opère par remboursement égal pour chaque action d'une même catégorie (art. 654).",
    articleRef: "AUSCGIE, art. 653-656",
  },
  {
    id: 'q12',
    question: "Comment l'Application 64 comptabilise-t-elle l'amortissement de la moitié du capital (7 500 actions de 10 000, prélevé sur réserves diverses) ?",
    options: [
      { id: 'a', texte: "Débit 1013 37 500 000 / crédit 1014 ; débit 1188 37 500 000 / crédit 4619 ; débit 4619 / crédit 521" },
      { id: 'b', texte: "Débit 1013 / crédit 521 pour 37 500 000" },
      { id: 'c', texte: "Débit 1188 / crédit 1013 pour 37 500 000" },
      { id: 'd', texte: "Débit 1014 / crédit 1013 pour 37 500 000" },
      { id: 'e', texte: "Débit 6811 / crédit 2813 pour 37 500 000" },
    ],
    reponseCorrecte: 'a',
    explication: "Trois temps dans l'Application 64 : (1) reclassement du capital amorti — débit 1013 / crédit 1014 Capital souscrit, appelé, versé, amorti pour 37 500 000 : le capital total reste inchangé (art. 654) ; (2) constatation de la dette envers les actionnaires par prélèvement sur les réserves — débit 1188 Réserves diverses / crédit 4619 Apporteurs, capital à rembourser ; (3) paiement — débit 4619 / crédit 521 Banques.",
    articleRef: "SYSCOHADA — Guide d'application, Application 64",
  },
  {
    id: 'q13',
    question: "Dans une SA, si les capitaux propres deviennent inférieurs à la moitié du capital social du fait de pertes, que doit faire le conseil d'administration ?",
    options: [
      { id: 'a', texte: "Rien : la situation se régularise d'elle-même" },
      { id: 'b', texte: "Convoquer, dans les quatre mois suivant l'approbation des comptes ayant fait apparaître la perte, l'AGE à l'effet de décider s'il y a lieu à dissolution anticipée" },
      { id: 'c', texte: "Déposer immédiatement le bilan" },
      { id: 'd', texte: "Réduire le capital sous huitaine" },
      { id: 'e', texte: "Émettre des obligations convertibles" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 664 : le conseil d'administration ou l'administrateur général est tenu, dans les quatre mois qui suivent l'approbation des comptes ayant fait apparaître cette perte, de convoquer l'AGE à l'effet de décider si la dissolution anticipée a lieu. La décision est déposée au RCCM et publiée dans un journal d'annonces légales (art. 666).",
    articleRef: "AUSCGIE, art. 664 et 666",
  },
  {
    id: 'q14',
    question: "Si la dissolution n'est pas prononcée (SA), quelle obligation pèse sur la société ?",
    options: [
      { id: 'a', texte: "Aucune" },
      { id: 'b', texte: "Reconstituer ses capitaux propres à hauteur de la moitié au moins du capital au plus tard à la clôture du deuxième exercice suivant celui de la constatation des pertes — à défaut, réduire son capital d'un montant au moins égal aux pertes non imputées sur les réserves" },
      { id: 'c', texte: "Doubler son capital dans l'année" },
      { id: 'd', texte: "Se transformer en SARL" },
      { id: 'e', texte: "Verser une amende au greffe" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 665 : à défaut de reconstitution des capitaux propres à concurrence d'au moins la moitié du capital dans le délai — au plus tard la clôture du deuxième exercice suivant celui de la constatation —, la société doit réduire son capital d'un montant au moins égal aux pertes qui n'ont pu être imputées sur les réserves. À défaut de réunion de l'assemblée ou d'application de ces mesures, tout intéressé peut demander en justice la dissolution (art. 667) ; le juge peut accorder un délai maximal de six mois pour régulariser et ne peut prononcer la dissolution si la régularisation a eu lieu au jour où il statue (art. 668).",
    articleRef: "AUSCGIE, art. 665, 667 et 668",
  },
  {
    id: 'q15',
    question: "Quelle est la règle correspondante en SARL ?",
    options: [
      { id: 'a', texte: "Identique en tout point à la SA" },
      { id: 'b', texte: "Le gérant ou le commissaire aux comptes consulte les associés dans les quatre mois sur la dissolution anticipée ; si elle est écartée, reconstitution des capitaux propres dans les deux ans de la clôture de l'exercice déficitaire, ou réduction du capital sans passer sous le capital légal" },
      { id: 'c', texte: "La dissolution est automatique" },
      { id: 'd', texte: "Aucune règle n'existe pour la SARL" },
      { id: 'e', texte: "Seul le commissaire aux comptes peut agir" },
    ],
    reponseCorrecte: 'b',
    explication: "Les articles 371-373 : consultation des associés par le gérant ou le commissaire aux comptes dans les quatre mois de l'approbation des comptes (art. 371) ; si la dissolution est écartée, reconstitution des capitaux propres à hauteur de la moitié au moins du capital dans les deux ans de la clôture de l'exercice déficitaire, ou réduction du capital d'un montant au moins égal aux pertes non imputées sur les réserves — sans réduire le capital sous le capital légal (art. 372) ; à défaut, tout intéressé peut demander la dissolution, l'action s'éteignant si la cause a cessé au jour où le juge statue (art. 373).",
    articleRef: "AUSCGIE, art. 371-373",
  },
  {
    id: 'q16',
    question: "Le « coup d'accordéon » consiste à :",
    options: [
      { id: 'a', texte: "Amortir le capital puis le réduire" },
      { id: 'b', texte: "Réduire le capital pour apurer les pertes, puis l'augmenter aussitôt pour reconstituer les fonds propres — enchaînement de deux opérations régies par les règles vues aux chapitres 4 et 5" },
      { id: 'c', texte: "Distribuer les réserves puis les reconstituer" },
      { id: 'd', texte: "Convertir les dettes en capital sans vote" },
      { id: 'e', texte: "Alterner dividendes et rachats d'actions" },
    ],
    reponseCorrecte: 'b',
    explication: "Le « coup d'accordéon » — dénomination de la pratique, non de l'Acte uniforme — combine une réduction motivée par des pertes (sans opposition des créanciers, art. 632 ; écriture 1013 à 1291) et une augmentation immédiate, souvent réservée à un repreneur avec suppression du DPS (art. 586-587). Il permet de satisfaire l'obligation de l'article 665 et d'assainir le bilan avant recapitalisation. En SARL, la réduction ne peut toutefois pas ramener le capital sous le capital légal (art. 372, al. 2 ; et art. 66 pour le principe général).",
    articleRef: "AUSCGIE, art. 632, 665, 586 (mécanisme : pratique)",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '5.1',
    titre: "La réduction de capital : décision et contrôle",
    navLabel: "Réduction : décision",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le capital est réduit par **diminution de la valeur nominale** des actions ou par **diminution de leur nombre** (art. 627 — dont le texte officiel comporte une phrase tronquée, le sens étant celui restitué ici). La réduction est **autorisée ou décidée par l'assemblée générale extraordinaire**, qui peut déléguer au conseil d'administration ou à l'administrateur général tous pouvoirs pour la réaliser ; elle ne peut **en aucun cas porter atteinte à l'égalité des actionnaires**, sauf consentement exprès des actionnaires défavorisés (art. 628). Les délibérations prises en violation de ces règles sont nulles (art. 638-1). Lorsque le conseil réalise la réduction sur délégation, il en dresse un procès-verbal soumis à publicité et modifie les statuts (art. 631).",
      },
      {
        type: 'filet',
        titre: "Le contrôle du commissaire aux comptes (art. 629-630)",
        texte: "Le projet de réduction est communiqué au commissaire aux comptes **quarante-cinq jours au moins** avant l'AGE. Le commissaire présente à l'assemblée un rapport livrant son appréciation sur **les causes et les conditions** de la réduction — et toute délibération prise à défaut de ce rapport est **nulle**.",
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
    ],
  },
  {
    numero: '5.2',
    titre: "La protection des créanciers : le droit d'opposition",
    navLabel: "Opposition des créanciers",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Tout dépend du **motif** de la réduction. Motivée par des pertes, elle ne fait que mettre le capital au niveau d'un actif net déjà entamé : les créanciers **ne peuvent pas s'y opposer** (art. 632). Non motivée par des pertes — remboursement d'apports —, elle restitue aux associés une fraction du gage commun : les créanciers dont la créance est **antérieure** à la publication de l'avis relatif au procès-verbal de l'assemblée peuvent s'y opposer (art. 633).",
      },
      {
        type: 'carte',
        titre: "La procédure d'opposition (art. 634-637)",
        tableau: {
          entetes: ["Étape", "Règle"],
          lignes: [
            ["Délai", "Trente jours à compter de la publication de l'avis dans un journal d'annonces légales du siège, après dépôt du procès-verbal au RCCM (art. 634)."],
            ["Forme", "Exploit d'huissier ou tout moyen établissant la réception effective ; portée devant la juridiction compétente statuant à bref délai (art. 635)."],
            ["Effet suspensif", "Les opérations de réduction ne peuvent commencer pendant le délai d'opposition, ni avant la décision de première instance (art. 636)."],
            ["Opposition accueillie", "Procédure interrompue jusqu'au remboursement des créances ou jusqu'à la constitution de garanties offertes par la société et jugées suffisantes (art. 637)."],
          ],
        },
        note: "La réduction fait l'objet des formalités de publicité de l'article 264 (art. 638).",
      },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '5.3',
    titre: "Comptabilisation de la réduction : pertes ou remboursement",
    navLabel: "Écritures de réduction",
    blocs: [
      {
        type: 'carte',
        titre: "Application 62 — Réduction par imputation des pertes (80 000 000)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1013", "", "10/06/N — Capital souscrit, appelé, versé, non amorti", "80 000 000", ""],
            ["", "1291", "Perte nette à reporter", "", "80 000 000"],
          ],
        },
        note: "Opération interne aux capitaux propres, sans trésorerie : le capital rejoint l'actif net réel. Aucune opposition des créanciers (art. 632). C'est le premier temps du « coup d'accordéon » de la pratique : réduction d'assainissement suivie d'une augmentation de recapitalisation.",
      },
      {
        type: 'carte',
        titre: "Application 63 — Réduction par remboursement (moitié du nominal, 5 000 actions de 10 000)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1013", "", "01/10/N — Capital souscrit, appelé, versé, non amorti", "25 000 000", ""],
            ["", "4619", "Apporteurs, capital à rembourser", "", "25 000 000"],
            ["4619", "", "01/11/N — Apporteurs, capital à rembourser", "25 000 000", ""],
            ["", "521", "Banques", "", "25 000 000"],
          ],
        },
        note: "Réduction non motivée par des pertes : opposition des créanciers ouverte (art. 633-637) — le remboursement ne peut intervenir qu'après l'expiration du délai de trente jours et, le cas échéant, le sort de l'opposition. L'article 70 rappelle que le remboursement peut aussi se faire par attribution d'actifs.",
      },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[6] },
    ],
  },
  {
    numero: '5.4',
    titre: "L'amortissement du capital",
    navLabel: "Amortissement",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'**amortissement du capital** est l'opération par laquelle la société rembourse aux actionnaires tout ou partie du montant nominal de leurs actions, **à titre d'avance sur le produit de la liquidation future** (art. 651). Il est décidé par l'assemblée générale **ordinaire** lorsqu'il est prévu par les statuts, par l'assemblée générale **extraordinaire** dans leur silence — à peine de nullité (art. 652). Les actions peuvent être intégralement ou partiellement amorties ; intégralement amorties, elles deviennent des **actions de jouissance** (art. 653). Trait décisif : l'amortissement est réalisé par remboursement **égal pour chaque action d'une même catégorie** et **n'entraîne pas de réduction de capital** (art. 654) — le capital social reste inchangé au bilan.",
      },
      {
        type: 'carte',
        titre: "Ressources et limites (art. 655-656)",
        liste: [
          "Prélèvement sur les **bénéfices** ou les **réserves non statutaires** ; jamais sur la **réserve légale** ; sur les réserves statutaires seulement par décision contraire de l'AGE (art. 655, al. 1-2).",
          "Butoir : le remboursement ne peut réduire les capitaux propres sous le montant du capital augmenté des réserves indisponibles (art. 655, al. 3). Opérations contraires **nulles** (art. 655-1).",
          "Les actions amorties **conservent tous leurs droits** — vote, part aux bénéfices, boni de liquidation — sauf le **premier dividende** (art. 145) et le **remboursement du nominal**, perdus à due concurrence (art. 656).",
        ],
      },
      {
        type: 'carte',
        titre: "Application 64 — Amortissement de la moitié du capital (7 500 actions de 10 000, sur réserves diverses)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1013", "", "01/08/N — Capital souscrit, appelé, versé, non amorti", "37 500 000", ""],
            ["", "1014", "Capital souscrit, appelé, versé, amorti", "", "37 500 000"],
            ["1188", "", "Réserves diverses", "37 500 000", ""],
            ["", "4619", "Apporteurs, capital à rembourser", "", "37 500 000"],
            ["4619", "", "Apporteurs, capital à rembourser", "37 500 000", ""],
            ["", "521", "Banques", "", "37 500 000"],
          ],
        },
        note: "Lecture : le total du compte 101 est inchangé (1013 + 1014 = capital social, art. 654) ; ce sont les réserves qui financent le remboursement. La distinction 1013/1014 permet de suivre les droits différenciés des actions amorties (art. 656).",
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
    ],
  },
  {
    numero: '5.5',
    titre: "Capitaux propres inférieurs à la moitié du capital",
    navLabel: "Perte de la moitié",
    blocs: [
      {
        type: 'carte',
        titre: "SA (art. 664-669) et SARL (art. 371-373) : le parallèle",
        tableau: {
          entetes: ["Étape", "SA", "SARL"],
          lignes: [
            ["Déclencheur", "Capitaux propres < moitié du capital du fait de pertes constatées dans les états financiers", "Identique"],
            ["Consultation", "Le conseil (ou l'administrateur général) convoque l'AGE dans les 4 mois de l'approbation des comptes, pour décider s'il y a lieu à dissolution anticipée (art. 664)", "Le gérant ou le commissaire aux comptes consulte les associés dans les 4 mois (art. 371)"],
            ["Si la dissolution est écartée", "Reconstitution des capitaux propres à hauteur de la moitié du capital au plus tard à la clôture du 2e exercice suivant la constatation ; à défaut, réduction du capital d'au moins le montant des pertes non imputées sur les réserves (art. 665)", "Reconstitution dans les 2 ans de la clôture de l'exercice déficitaire ; à défaut, réduction du capital — sans passer sous le capital légal (art. 372)"],
            ["Publicité", "Dépôt au RCCM et publication dans un journal d'annonces légales (art. 666)", "—"],
            ["Sanction", "À défaut, tout intéressé peut demander en justice la dissolution ; délai de régularisation possible de 6 mois ; pas de dissolution si régularisation au jour où le juge statue (art. 667-668)", "Tout intéressé peut demander la dissolution ; l'action s'éteint si la cause a cessé au jour où le juge statue (art. 373)"],
          ],
        },
        note: "Ces dispositions ne s'appliquent pas aux sociétés en redressement judiciaire ou en liquidation de biens (art. 669).",
      },
      {
        type: 'filet',
        titre: "Le « coup d'accordéon » de la pratique",
        texte: "Pour satisfaire l'obligation de reconstitution, la pratique enchaîne fréquemment une **réduction motivée par les pertes** (1013 à 1291 — sans opposition des créanciers, art. 632) et une **augmentation immédiate**, souvent réservée à un repreneur avec suppression du droit préférentiel de souscription (art. 586-587) : le capital « se replie » sur l'actif net réel puis « se déploie » par les apports nouveaux. La dénomination est doctrinale ; chaque temps de l'opération obéit aux règles des chapitres 4 et 5 — y compris, en SARL, l'interdiction de descendre sous le capital légal (art. 372).",
      },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas-1',
    titre: "Cas 1 — KWILU PLASTIQUES SA : réduction motivée par des pertes",
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
    id: 'cas-2',
    titre: "Cas 2 — NORD-UBANGI DISTRIBUTION SA : réduction par remboursement et opposition",
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
    id: 'cas-3',
    titre: "Cas 3 — MANIEMA HÔTELS SA : amortissement du capital",
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
    id: 'cas-4',
    titre: "Cas 4 — SUD-KIVU MOTORS SARL : perte de la moitié du capital",
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
        correction: "Pertes non imputables sur les réserves : la réserve légale (4 000 000) est indisponible et n'a pas vocation à être distribuée, mais l'imputation des pertes sur réserves reste possible sur décision d'assemblée pour les réserves existantes — en l'absence d'autres réserves que la légale, la lecture prudente impute la réduction sur le capital pour l'essentiel des pertes. Réduction minimale : 22 000 000 (les pertes non imputées) — mais 30 000 000 − 22 000 000 = 8 000 000 : il faut vérifier que le capital réduit reste au moins égal au capital légal de la forme (art. 372, al. 2 ; art. 311 : 1 000 000 sauf dispositions nationales contraires — condition satisfaite). Écriture : débit 1013 22 000 000 / crédit 1291 22 000 000. Après réduction : capital 8 000 000, capitaux propres 12 000 000 ≥ moitié du capital (4 000 000) — situation régularisée.",
      },
      {
        num: 4,
        enonce: "Que risque la société si ni la consultation ni la régularisation n'interviennent ?",
        correction: "Tout intéressé peut demander à la juridiction compétente de prononcer la dissolution — à défaut de consultation provoquée par le gérant ou le commissaire aux comptes, comme à défaut de reconstitution dans les délais (art. 373). Garde-fou : l'action est éteinte lorsque la cause de dissolution a cessé d'exister au jour où la juridiction statue sur le fond — la régularisation tardive sauve la société.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 5,
  id: 'ue3-chapitre-5',
  titre: "La réduction et l'amortissement du capital",
  sousTitre: "AUSCGIE, art. 627-638-1, 651-656, 664-669 et 371-373 · SYSCOHADA, Applications 62-64",
  infoBulle: "Réduction du capital (pertes ou remboursement, rapport du commissaire aux comptes à peine de nullité, opposition des créanciers), amortissement du capital (avance sur liquidation, actions de jouissance, comptes 1013/1014) et procédure des capitaux propres inférieurs à la moitié du capital en SA et en SARL.",
  loiRef: "AUSCGIE (30 janvier 2014) · SYSCOHADA révisé (AUDCIF)",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Maîtriser la décision de réduction : AGE, égalité des actionnaires, rapport du CAC à peine de nullité (art. 627-631, 638-1)",
    "Distinguer réduction motivée par des pertes (pas d'opposition) et réduction par remboursement (opposition des créanciers, art. 632-637)",
    "Comptabiliser les deux réductions (Applications 62-63 : 1013 → 1291 ; 1013 → 4619 → 521)",
    "Comprendre l'amortissement du capital : décision, ressources, actions de jouissance, comptes 1013/1014 (art. 651-656, Application 64)",
    "Appliquer la procédure de la perte de la moitié du capital en SA (art. 664-669) et en SARL (art. 371-373), jusqu'au « coup d'accordéon »",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Réduction par diminution du nominal ou du nombre d'actions ; AGE compétente, délégation de réalisation possible, égalité des actionnaires sauf consentement exprès des défavorisés (art. 627-628 ; nullité, art. 638-1).",
    "Projet communiqué au CAC 45 jours avant l'AGE ; rapport du CAC sur les causes et conditions, à peine de nullité (art. 629-630).",
    "Motivée par des pertes : pas d'opposition des créanciers (art. 632) ; non motivée : opposition des créanciers antérieurs dans les 30 jours de la publication, effet suspensif, interruption jusqu'à remboursement ou garanties (art. 633-637).",
    "Écritures : imputation des pertes — 1013 à 1291 (App. 62) ; remboursement — 1013 à 4619 puis 4619 à 521 (App. 63).",
    "Amortissement = remboursement du nominal à titre d'avance sur la liquidation future ; AGO si statuts, sinon AGE ; sans réduction du capital (art. 651-654).",
    "Ressources de l'amortissement : bénéfices ou réserves non statutaires — jamais la réserve légale ; butoir des capitaux propres ; nullité des opérations contraires (art. 655, 655-1).",
    "Actions amorties : tous droits conservés sauf premier dividende et remboursement du nominal ; intégralement amorties = actions de jouissance (art. 653, 656). Écritures : 1013 → 1014, réserves → 4619 → 521 (App. 64).",
    "Capitaux propres < moitié du capital : consultation sous 4 mois sur la dissolution ; à défaut de dissolution, reconstitution (2e exercice suivant en SA ; 2 ans en SARL) ou réduction du capital ; dissolution judiciaire possible, sauf régularisation (art. 664-669, 371-373).",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (AUSCGIE)", precision: "art. 627-638-1 (réduction du capital, rapport du CAC, opposition des créanciers), 651-656 (amortissement du capital, actions de jouissance), 664-669 (SA : capitaux propres inférieurs à la moitié du capital), 371-373 (SARL : même procédure)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Guide d'application", precision: "Applications 62 (réduction par imputation des pertes), 63 (réduction par remboursement) et 64 (amortissement du capital)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Plan de comptes", precision: "comptes 1013, 1014, 1181, 1188, 1291, 4619" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE (Acte uniforme révisé du 30 janvier 2014) · SYSCOHADA révisé — Guide d'application et plan de comptes (AUDCIF)",
}

export default chapitre
