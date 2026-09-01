import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 3 — CHAPITRE 3 : L'AFFECTATION DU RÉSULTAT ET LES DIVIDENDES
// AUSCGIE art. 137-146 (approbation des comptes, réserves, bénéfice
// distribuable, dividendes), art. 346 (SARL) et 546 (SA) pour la réserve
// légale. Comptabilisation : Application 65 du Guide SYSCOHADA (comptes
// 1301/1309, 111, 112, 1181, 121/129, 465).
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1',
    question: "Dans quel délai l'assemblée générale statuant sur les états financiers de synthèse doit-elle obligatoirement se tenir ?",
    options: [
      { id: 'a', texte: "Dans les trois mois de la clôture de l'exercice" },
      { id: 'b', texte: "Dans les six mois de la clôture de l'exercice" },
      { id: 'c', texte: "Dans les neuf mois de la clôture" },
      { id: 'd', texte: "Dans l'année civile suivante, sans autre précision" },
      { id: 'e', texte: "Aucun délai n'est fixé" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 140, alinéa 2 : les états financiers de synthèse et le rapport de gestion sont présentés à l'assemblée générale statuant sur les états financiers, « qui doit obligatoirement se tenir dans les six (6) mois de la clôture de l'exercice ». Dans les SA, SAS et, le cas échéant, les SARL, ces documents sont adressés aux commissaires aux comptes quarante-cinq jours au moins avant l'assemblée (al. 1er).",
    articleRef: "AUSCGIE, art. 140",
  },
  {
    id: 'q2',
    question: "Qui décide de l'affectation du résultat ?",
    options: [
      { id: 'a', texte: "Le conseil d'administration seul" },
      { id: 'b', texte: "L'assemblée générale, dans le respect des dispositions légales et statutaires ; elle constitue les dotations nécessaires à la réserve légale et aux réserves statutaires" },
      { id: 'c', texte: "Le commissaire aux comptes" },
      { id: 'd', texte: "Le gérant, par décision unilatérale" },
      { id: 'e', texte: "L'administration fiscale" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 142 : « L'assemblée générale décide de l'affectation du résultat dans le respect des dispositions légales et statutaires. Elle constitue les dotations nécessaires à la réserve légale et aux réserves statutaires. » Pour la SA, l'article 546, 2°, range expressément l'affectation du résultat dans la compétence de l'assemblée générale ordinaire.",
    articleRef: "AUSCGIE, art. 142 et 546",
  },
  {
    id: 'q3',
    question: "Comment l'article 143 définit-il le bénéfice distribuable ?",
    options: [
      { id: 'a', texte: "Le résultat de l'exercice, sans autre ajustement" },
      { id: 'b', texte: "Le résultat de l'exercice, augmenté du report bénéficiaire et diminué des pertes antérieures, des dividendes partiels régulièrement distribués et des sommes portées en réserve en application de la loi ou des statuts" },
      { id: 'c', texte: "Le chiffre d'affaires diminué des charges décaissées" },
      { id: 'd', texte: "La trésorerie disponible à la clôture" },
      { id: 'e', texte: "Le résultat majoré des réserves facultatives existantes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 143, alinéa 1er, donne la formule : bénéfice distribuable = résultat de l'exercice + report bénéficiaire − pertes antérieures − dividendes partiels régulièrement distribués − sommes portées en réserve en application de la loi ou des statuts. C'est sur cette masse que l'assemblée détermine ensuite réserves facultatives, dividendes et report à nouveau (art. 144).",
    articleRef: "AUSCGIE, art. 143",
  },
  {
    id: 'q4',
    question: "L'assemblée peut-elle distribuer des réserves ?",
    options: [
      { id: 'a', texte: "Jamais : les réserves sont définitivement bloquées" },
      { id: 'b', texte: "Oui, à condition qu'il ne s'agisse pas de réserves indisponibles au regard de la loi ou des statuts, et en indiquant expressément les postes de réserve prélevés" },
      { id: 'c', texte: "Oui, y compris la réserve légale" },
      { id: 'd', texte: "Oui, sur simple décision du gérant" },
      { id: 'e', texte: "Uniquement en cas de liquidation" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 143, alinéas 2 et 3 : l'assemblée peut décider la distribution de tout ou partie des réserves à condition qu'il ne s'agisse pas de réserves considérées comme indisponibles par la loi ou les statuts — toute délibération contraire est nulle — et elle doit indiquer expressément les postes de réserve sur lesquels les prélèvements sont effectués. La réserve légale, indisponible par nature, ne peut être distribuée.",
    articleRef: "AUSCGIE, art. 143",
  },
  {
    id: 'q5',
    question: "Quelle limite l'article 143, dernier alinéa, pose-t-il à toute distribution ?",
    options: [
      { id: 'a', texte: "La distribution ne peut excéder la moitié du résultat" },
      { id: 'b', texte: "Sauf réduction de capital, aucune distribution ne peut être faite lorsque les capitaux propres sont, ou deviendraient de ce fait, inférieurs au montant du capital augmenté des réserves indisponibles — à peine de nullité" },
      { id: 'c', texte: "La distribution est plafonnée au montant de la trésorerie" },
      { id: 'd', texte: "Aucune distribution n'est possible avant cinq exercices" },
      { id: 'e', texte: "La distribution doit être autorisée par la juridiction compétente" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 143, dernier alinéa : sauf en cas de réduction de capital, aucune distribution ne peut être faite aux associés lorsque les capitaux propres sont ou deviendraient, à la suite de cette distribution, inférieurs au montant du capital augmenté des réserves que la loi ou les statuts ne permettent pas de distribuer. Toute délibération prise en violation est nulle. C'est le « butoir » des capitaux propres.",
    articleRef: "AUSCGIE, art. 143",
  },
  {
    id: 'q6',
    question: "Quelle est la dotation obligatoire à la réserve légale dans la SA et la SARL ?",
    options: [
      { id: 'a', texte: "Un vingtième du bénéfice, sans plafond" },
      { id: 'b', texte: "Un dixième au moins du bénéfice de l'exercice, diminué le cas échéant des pertes antérieures, jusqu'à ce que la réserve atteigne le cinquième du capital social" },
      { id: 'c', texte: "La moitié du bénéfice, jusqu'au montant du capital" },
      { id: 'd', texte: "Un montant librement fixé par les statuts" },
      { id: 'e', texte: "Un dixième du chiffre d'affaires" },
    ],
    reponseCorrecte: 'b',
    explication: "Les articles 346 (SARL) et 546, 2° (SA) posent la même règle : sur le bénéfice de l'exercice diminué, le cas échéant, des pertes antérieures, une dotation égale à un dixième au moins est affectée à la réserve légale ; cette dotation cesse d'être obligatoire lorsque la réserve atteint le cinquième du montant du capital social. Toute délibération contraire est nulle.",
    articleRef: "AUSCGIE, art. 346 et 546",
  },
  {
    id: 'q7',
    question: "Qu'est-ce qu'un dividende fictif selon l'article 144 ?",
    options: [
      { id: 'a', texte: "Un dividende payé en actions plutôt qu'en numéraire" },
      { id: 'b', texte: "Tout dividende distribué en violation des règles de l'article 144 — c'est-à-dire sans approbation des états financiers ni constatation de sommes distribuables" },
      { id: 'c', texte: "Un dividende inférieur au premier dividende statutaire" },
      { id: 'd', texte: "Un dividende versé avec plus de neuf mois de retard" },
      { id: 'e', texte: "Un acompte sur dividende" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 144 exige, avant toute distribution, l'approbation des états financiers de synthèse et la constatation de l'existence de sommes distribuables, l'assemblée déterminant alors les dotations facultatives, la part de bénéfices à distribuer et le report à nouveau. Il conclut : « Tout dividende distribué en violation des règles énoncées au présent article est un dividende fictif » — distribution prélevée en réalité sur le capital ou des réserves indisponibles, en l'absence de bénéfice réellement distribuable.",
    articleRef: "AUSCGIE, art. 144",
  },
  {
    id: 'q8',
    question: "Comment le premier dividende de l'article 145 est-il calculé ?",
    options: [
      { id: 'a', texte: "Comme un pourcentage du chiffre d'affaires" },
      { id: 'b', texte: "Comme un intérêt sur le montant libéré des actions, si les statuts le prévoient et si les bénéfices distribuables constatés le permettent" },
      { id: 'c', texte: "Comme un montant identique pour chaque associé, quel que soit son apport" },
      { id: 'd', texte: "Comme un intérêt sur la valeur boursière des actions" },
      { id: 'e', texte: "Il est fixé librement chaque année par le conseil d'administration" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 145 : les statuts peuvent prévoir l'attribution d'un premier dividende, versé dans la mesure où l'assemblée constate l'existence de bénéfices distribuables suffisants pour en permettre le paiement ; « il est calculé comme un intérêt sur le montant libéré des actions ». Une action libérée de moitié ne perçoit donc le premier dividende que sur sa fraction libérée. Ce que la pratique appelle « superdividende » est le surplus éventuellement réparti au-delà, à parts égales entre tous les titres.",
    articleRef: "AUSCGIE, art. 145",
  },
  {
    id: 'q9',
    question: "Dans quel délai la mise en paiement des dividendes doit-elle intervenir ?",
    options: [
      { id: 'a', texte: "Trois mois après l'assemblée" },
      { id: 'b', texte: "Neuf mois au maximum après la clôture de l'exercice, sauf prolongation accordée par la juridiction compétente" },
      { id: 'c', texte: "Six mois après l'assemblée" },
      { id: 'd', texte: "Douze mois après la clôture, sans exception" },
      { id: 'e', texte: "Aucun délai n'est imposé" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 146 : les modalités de mise en paiement sont fixées par la collectivité des associés ou, à défaut, par le conseil d'administration, l'administrateur général ou les gérants ; dans tous les cas, la mise en paiement doit avoir lieu dans un délai maximum de neuf mois après la clôture de l'exercice, la juridiction compétente pouvant accorder une prolongation.",
    articleRef: "AUSCGIE, art. 146",
  },
  {
    id: 'q10',
    question: "Un dividende ne correspondant pas à des bénéfices réellement acquis a été versé aux associés d'une SARL. Que prévoit l'article 346 ?",
    options: [
      { id: 'a', texte: "Rien : le versement est définitivement acquis" },
      { id: 'b', texte: "La répétition peut être exigée des associés qui les ont reçus ; l'action se prescrit par trois ans à compter de la mise en distribution" },
      { id: 'c', texte: "La société est automatiquement dissoute" },
      { id: 'd', texte: "Seul le gérant rembourse" },
      { id: 'e', texte: "L'action se prescrit par dix ans" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 346, alinéas 3 et 4 : la répétition des dividendes ne correspondant pas à des bénéfices réellement acquis peut être exigée des associés qui les ont reçus ; l'action en répétition se prescrit par trois ans à compter de la date de mise en distribution du dividende. C'est la sanction civile du dividende fictif, qui s'ajoute aux responsabilités encourues par les dirigeants.",
    articleRef: "AUSCGIE, art. 346",
  },
  {
    id: 'q11',
    question: "Dans le SYSCOHADA, le résultat bénéficiaire en instance d'affectation est logé au compte :",
    options: [
      { id: 'a', texte: "121 — Report à nouveau créditeur" },
      { id: 'b', texte: "1301 — Résultat en instance d'affectation : bénéfice" },
      { id: 'c', texte: "111 — Réserve légale" },
      { id: 'd', texte: "465 — Associés, dividendes à payer" },
      { id: 'e', texte: "1013 — Capital souscrit, appelé, versé" },
    ],
    reponseCorrecte: 'b',
    explication: "Le compte 13 — Résultat net de l'exercice se subdivise en 1301 — Résultat en instance d'affectation : bénéfice et 1309 — Résultat en instance d'affectation : perte. Lors de l'affectation décidée par l'assemblée (Application 65), le 1301 est débité par le crédit des réserves (111, 112, 1181), des dividendes à payer (465) et du report à nouveau (121).",
    articleRef: "Plan de comptes SYSCOHADA — comptes 1301/1309 ; Application 65",
  },
  {
    id: 'q12',
    question: "Dans l'Application 65 du Guide, l'affectation d'un bénéfice de 150 000 000 (réserve légale 15 000 000, statutaire 20 000 000, facultatives 25 000 000, dividendes 89 000 000, report 1 000 000) se comptabilise :",
    options: [
      { id: 'a', texte: "Débit 465 / crédit 1301 pour 150 000 000" },
      { id: 'b', texte: "Débit 1301 pour 150 000 000 / crédit 111 (15 000 000), 112 (20 000 000), 1181 (25 000 000), 465 (89 000 000) et 121 (1 000 000)" },
      { id: 'c', texte: "Débit 121 / crédit 465 pour 89 000 000" },
      { id: 'd', texte: "Débit 1301 / crédit 521 pour 150 000 000" },
      { id: 'e', texte: "Aucune écriture : l'affectation est extra-comptable" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Application 65 déroule exactement cette écriture : le compte 1301 est soldé par le crédit de 111 Réserve légale, 112 Réserve statutaire, 1181 Réserves facultatives, 465 Associés — Dividendes à payer et 121 Report à nouveau créditeur. Le paiement ultérieur des dividendes s'enregistre : débit 465 / crédit 521 Banques.",
    articleRef: "SYSCOHADA — Guide d'application, Application 65",
  },
  {
    id: 'q13',
    question: "Comment une perte de l'exercice est-elle affectée ?",
    options: [
      { id: 'a', texte: "Elle est obligatoirement imputée sur le capital" },
      { id: 'b', texte: "Le compte 1309 est soldé par le débit du report à nouveau débiteur (129/1291), sauf imputation décidée sur des réserves existantes" },
      { id: 'c', texte: "Elle est répartie entre les associés, qui la versent immédiatement" },
      { id: 'd', texte: "Elle reste indéfiniment au compte 1309" },
      { id: 'e', texte: "Elle est virée en charges de l'exercice suivant" },
    ],
    reponseCorrecte: 'b',
    explication: "La perte en instance d'affectation (1309) est, sur décision de l'assemblée, portée au report à nouveau débiteur — le plan prévoit 129 Report à nouveau débiteur et sa subdivision 1291 Perte nette à reporter — ou imputée sur des réserves existantes. Le report débiteur viendra en diminution du bénéfice distribuable des exercices suivants (art. 143 : « diminué des pertes antérieures ») ; son apurement par réduction de capital (débit 1013 / crédit 1291) relève du chapitre 5.",
    articleRef: "Plan de comptes SYSCOHADA — comptes 129, 1291, 1309 ; AUSCGIE, art. 143",
  },
  {
    id: 'q14',
    question: "Une SA au capital de 100 000 000 a une réserve légale de 19 000 000. Le bénéfice de l'exercice est de 30 000 000 (pas de pertes antérieures). Quelle dotation minimale à la réserve légale ?",
    options: [
      { id: 'a', texte: "3 000 000, un dixième du bénéfice" },
      { id: 'b', texte: "1 000 000 : la dotation d'un dixième (3 000 000) est plafonnée par le cinquième du capital (20 000 000), déjà presque atteint" },
      { id: 'c', texte: "Aucune : la réserve dépasse déjà 10 % du capital" },
      { id: 'd', texte: "6 000 000, un cinquième du bénéfice" },
      { id: 'e', texte: "19 000 000" },
    ],
    reponseCorrecte: 'b',
    explication: "La dotation obligatoire est d'un dixième au moins du bénéfice (3 000 000), mais elle cesse d'être obligatoire lorsque la réserve atteint le cinquième du capital, soit 20 000 000 (art. 546, 2°). Il ne manque que 1 000 000 pour atteindre ce plafond : la dotation minimale est donc de 1 000 000. L'assemblée peut doter davantage, mais l'excédent relèvera des réserves facultatives.",
    articleRef: "AUSCGIE, art. 546",
  },
  {
    id: 'q15',
    question: "Le rapport de gestion établi par les dirigeants doit notamment exposer :",
    options: [
      { id: 'a', texte: "Uniquement le montant du dividende proposé" },
      { id: 'b', texte: "La situation de la société durant l'exercice écoulé, son évolution prévisible, les événements importants survenus entre la clôture et la date d'établissement, les perspectives de continuation de l'activité, l'évolution de la trésorerie et le plan de financement" },
      { id: 'c', texte: "La liste nominative de tous les associés" },
      { id: 'd', texte: "Les seules conventions réglementées" },
      { id: 'e', texte: "Le détail des rémunérations de chaque salarié" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 138 énumère le contenu du rapport de gestion. L'article 139 impose en outre de faire figurer dans l'état annexé un état des cautionnements, avals et garanties donnés et un état des sûretés réelles consenties ; et l'article 141 exige de signaler dans le rapport de gestion toute modification de présentation des états financiers ou des méthodes d'évaluation, d'amortissement ou de provisions.",
    articleRef: "AUSCGIE, art. 138, 139 et 141",
  },
  {
    id: 'q16',
    question: "Une action de nominal 10 000, libérée des trois quarts, a droit — selon les statuts — à un premier dividende de 6 %. Quel montant perçoit-elle à ce titre ?",
    options: [
      { id: 'a', texte: "600, soit 6 % du nominal" },
      { id: 'b', texte: "450, soit 6 % du montant libéré (7 500)" },
      { id: 'c', texte: "150, soit 6 % du non-libéré" },
      { id: 'd', texte: "Rien : une action non intégralement libérée n'a droit à aucun dividende" },
      { id: 'e', texte: "750, soit 10 % du montant libéré" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 145 précise que le premier dividende « est calculé comme un intérêt sur le montant libéré des actions » : 7 500 × 6 % = 450. Cette assiette incite à la libération rapide du capital. Attention à ne pas confondre avec la suspension du droit au dividende, qui ne frappe que l'actionnaire défaillant un mois après mise en demeure (art. 775, chapitre 2).",
    articleRef: "AUSCGIE, art. 145",
  },
  {
    id: 'q17',
    question: "Le paiement effectif des dividendes votés s'enregistre :",
    options: [
      { id: 'a', texte: "Débit 1301 / crédit 521" },
      { id: 'b', texte: "Débit 465 — Associés, dividendes à payer / crédit 521 — Banques" },
      { id: 'c', texte: "Débit 121 / crédit 465" },
      { id: 'd', texte: "Débit 111 / crédit 521" },
      { id: 'e', texte: "Débit 465 / crédit 1301" },
    ],
    reponseCorrecte: 'b',
    explication: "L'affectation crée une dette envers les associés au crédit de 465 ; la mise en paiement l'éteint : débit 465 / crédit 521 Banques (Application 65 : dividendes de 89 000 000 versés le 30/06/N). Entre l'assemblée et le paiement — au plus tard neuf mois après la clôture (art. 146) — la dette figure au passif.",
    articleRef: "SYSCOHADA — Application 65 ; AUSCGIE, art. 146",
  },
  {
    id: 'q18',
    question: "Les documents soumis à l'assemblée doivent être adressés aux commissaires aux comptes :",
    options: [
      { id: 'a', texte: "Le jour de l'assemblée" },
      { id: 'b', texte: "Quarante-cinq jours au moins avant la date de l'assemblée générale ordinaire" },
      { id: 'c', texte: "Quinze jours avant l'assemblée" },
      { id: 'd', texte: "Dans les trois mois de la clôture" },
      { id: 'e', texte: "Ils ne sont jamais communiqués au commissaire aux comptes" },
    ],
    reponseCorrecte: 'b',
    explication: "L'article 140, alinéa 1er : dans les sociétés anonymes, les sociétés par actions simplifiées et, le cas échéant, dans les SARL, les états financiers de synthèse annuels et le rapport de gestion sont adressés aux commissaires aux comptes quarante-cinq jours au moins avant la date de l'assemblée générale ordinaire.",
    articleRef: "AUSCGIE, art. 140",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '3.1',
    titre: "L'arrêté et l'approbation des comptes annuels",
    navLabel: "Approbation des comptes",
    blocs: [
      {
        type: 'paragraphe',
        texte: "À la clôture de chaque exercice, le gérant, le conseil d'administration ou l'administrateur général, selon le cas, **établit et arrête les états financiers de synthèse** conformément à l'Acte uniforme comptable (art. 137) et rédige un **rapport de gestion** exposant la situation de la société durant l'exercice écoulé, son évolution prévisible, les événements importants survenus entre la clôture et la date d'établissement — en particulier les perspectives de continuation de l'activité, l'évolution de la trésorerie et le plan de financement (art. 138). L'état annexé comprend un état des cautionnements, avals et garanties donnés et un état des sûretés réelles consenties (art. 139), et toute modification de présentation ou de méthode d'évaluation, d'amortissement ou de provisions doit être signalée dans le rapport de gestion et, le cas échéant, dans celui du commissaire aux comptes (art. 141).",
      },
      {
        type: 'carte',
        titre: "Le calendrier de l'approbation (art. 140)",
        tableau: {
          entetes: ["Étape", "Délai"],
          lignes: [
            ["Transmission des états financiers et du rapport de gestion aux commissaires aux comptes (SA, SAS et, le cas échéant, SARL)", "45 jours au moins avant l'assemblée générale ordinaire"],
            ["Assemblée générale statuant sur les états financiers de synthèse", "Obligatoirement dans les 6 mois de la clôture de l'exercice"],
            ["Mise en paiement des dividendes votés", "9 mois au maximum après la clôture, sauf prolongation judiciaire (art. 146)"],
          ],
        },
      },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[17] },
    ],
  },
  {
    numero: '3.2',
    titre: "Réserves et bénéfice distribuable (art. 142-143)",
    navLabel: "Bénéfice distribuable",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'**assemblée générale** décide de l'affectation du résultat dans le respect des dispositions légales et statutaires, et constitue les dotations nécessaires à la réserve légale et aux réserves statutaires (art. 142). L'article 143 définit ensuite la masse partageable : le **bénéfice distribuable** est le résultat de l'exercice, *augmenté* du report bénéficiaire et *diminué* des pertes antérieures, des dividendes partiels régulièrement distribués ainsi que des sommes portées en réserve en application de la loi ou des statuts.",
      },
      {
        type: 'carte',
        titre: "La hiérarchie des réserves",
        tableau: {
          entetes: ["Réserve", "Source", "Compte", "Régime"],
          lignes: [
            ["Réserve légale", "Art. 346 (SARL) et 546, 2° (SA)", "111", "Dotation obligatoire d'un dixième au moins du bénéfice (diminué des pertes antérieures), jusqu'au cinquième du capital ; indisponible"],
            ["Réserves statutaires ou contractuelles", "Statuts", "112", "Dotation imposée par les statuts avant toute distribution"],
            ["Réserves réglementées", "Textes particuliers", "113", "Régime fixé par le texte qui les institue"],
            ["Réserves facultatives", "Décision de l'assemblée (art. 144)", "1181", "Librement constituées et, en principe, librement distribuables"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Distribuer des réserves : possible, sous deux verrous (art. 143, al. 2-4)",
        texte: "L'assemblée peut décider la distribution de tout ou partie des réserves, à la double condition qu'il ne s'agisse pas de réserves **indisponibles** au regard de la loi ou des statuts — toute délibération contraire est **nulle** — et qu'elle indique **expressément les postes de réserve** sur lesquels les prélèvements sont effectués. S'y ajoute le butoir général : sauf réduction de capital, aucune distribution ne peut être faite lorsque les capitaux propres sont, ou deviendraient de ce fait, inférieurs au montant du capital augmenté des réserves que la loi ou les statuts ne permettent pas de distribuer — à peine, là encore, de nullité.",
      },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '3.3',
    titre: "La réserve légale et la sanction du dividende fictif",
    navLabel: "Réserve légale",
    blocs: [
      {
        type: 'paragraphe',
        texte: "SARL et SA obéissent à la même discipline, énoncée par l'article 346 pour la première et l'article 546, 2°, pour la seconde : il est obligatoirement constitué, sur le bénéfice de l'exercice diminué le cas échéant des pertes antérieures, une dotation égale à **un dixième au moins**, affectée à la **réserve légale** ; cette dotation cesse d'être obligatoire lorsque la réserve atteint **le cinquième du montant du capital social**. Toute délibération prise en violation de cette règle est **nulle**. Le calcul appelle deux réflexes : l'assiette est le bénéfice *net des pertes antérieures*, et la dotation de l'exercice est plafonnée par la distance restant à parcourir jusqu'au cinquième du capital.",
      },
      { type: 'controle', question: QCM[5] },
      { type: 'controle', question: QCM[13] },
      {
        type: 'carte',
        titre: "Le dividende fictif et sa répétition",
        liste: [
          "**Définition** : l'article 144 subordonne toute distribution à l'approbation des états financiers et à la constatation de sommes distribuables ; « tout dividende distribué en violation des règles énoncées au présent article est un dividende fictif ».",
          "**Répétition** : la répétition des dividendes ne correspondant pas à des bénéfices réellement acquis peut être exigée des associés qui les ont reçus (art. 346, al. 3, pour la SARL).",
          "**Prescription** : l'action en répétition se prescrit par **trois ans** à compter de la date de mise en distribution du dividende (art. 346, al. 4).",
        ],
        note: "La distribution d'un dividende fictif expose en outre les dirigeants aux sanctions prévues par les dispositions pénales de l'Acte uniforme, dont les peines relèvent du droit national de chaque État partie.",
      },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[9] },
    ],
  },
  {
    numero: '3.4',
    titre: "Le dividende : premier dividende, superdividende, mise en paiement",
    navLabel: "Dividendes",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Après approbation des états financiers et constatation de l'existence de sommes distribuables, l'assemblée détermine : les dotations à des **réserves facultatives**, la **part de bénéfices à distribuer** aux actions ou parts sociales, et le montant du **report à nouveau** éventuel ; la part de bénéfice revenant à chaque titre est appelée **dividende** (art. 144). Les statuts peuvent prévoir un **premier dividende** — la pratique parle aussi d'intérêt statutaire — versé si l'assemblée constate des bénéfices distribuables suffisants : il est « calculé comme un intérêt sur **le montant libéré** des actions » (art. 145). Le surplus que l'assemblée décide de répartir au-delà du premier dividende, également entre tous les titres, est appelé **superdividende** par la pratique — le texte ne connaît, lui, que le dividende.",
      },
      {
        type: 'carte',
        titre: "Décomposer un dividende",
        tableau: {
          entetes: ["Élément", "Assiette", "Fondement"],
          lignes: [
            ["Premier dividende (intérêt statutaire)", "Taux statutaire × montant **libéré** de chaque action", "Art. 145"],
            ["Superdividende", "Montant uniforme par titre, décidé par l'assemblée au-delà du premier dividende", "Art. 144 (vocabulaire de la pratique)"],
            ["Dividende total", "Premier dividende + superdividende", "—"],
          ],
        },
        note: "Assiette du premier dividende = montant libéré : une action libérée du quart ne le perçoit que sur ce quart. La mise en paiement intervient au plus tard neuf mois après la clôture (art. 146).",
      },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[8] },
    ],
  },
  {
    numero: '3.5',
    titre: "Comptabilisation de l'affectation (Application 65)",
    navLabel: "Écritures",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le résultat net de l'exercice, viré à la clôture au compte 13, attend la décision de l'assemblée dans ses subdivisions : **1301 — Résultat en instance d'affectation : bénéfice** ou **1309 — Résultat en instance d'affectation : perte**. L'Application 65 du Guide comptabilise l'affectation d'un bénéfice de 150 000 000 décidée par l'assemblée générale ordinaire du 10/06/N : réserve légale 15 000 000, réserve statutaire 20 000 000, réserves facultatives 25 000 000, dividendes 89 000 000, report à nouveau 1 000 000.",
      },
      {
        type: 'carte',
        titre: "L'écriture d'affectation du bénéfice (10/06/N)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["1301", "", "Résultat en instance d'affectation : bénéfice", "150 000 000", ""],
            ["", "111", "Réserve légale", "", "15 000 000"],
            ["", "112", "Réserve statutaire", "", "20 000 000"],
            ["", "1181", "Réserves facultatives", "", "25 000 000"],
            ["", "465", "Associés — Dividendes à payer", "", "89 000 000"],
            ["", "121", "Report à nouveau créditeur", "", "1 000 000"],
          ],
        },
      },
      {
        type: 'carte',
        titre: "Le paiement des dividendes (30/06/N)",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["465", "", "Associés — Dividendes à payer", "89 000 000", ""],
            ["", "521", "Banques", "", "89 000 000"],
          ],
        },
        note: "Si un report à nouveau créditeur antérieur est incorporé à la répartition, il est débité (121) aux côtés du 1301 ; une perte est au contraire portée du 1309 au report à nouveau débiteur (129/1291), qui diminuera le bénéfice distribuable des exercices suivants (art. 143).",
      },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
      { type: 'controle', question: QCM[16] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas-1',
    titre: "Cas 1 — KASAI CIMENT SA : tableau de répartition complet",
    contexte: "KASAI CIMENT SA a un capital de 100 000 000 FC (10 000 actions de 10 000 FC, libérées des trois quarts). Réserve légale existante : 16 000 000. Report à nouveau créditeur : 2 000 000. Le bénéfice net de l'exercice N est de 36 000 000 (aucune perte antérieure). Les statuts prévoient : dotation à une réserve statutaire de 5 000 000 ; premier dividende de 6 % l'an sur le montant libéré des actions. L'assemblée du 15/05/N+1 décide en outre un superdividende de 2 000 par action, le solde étant reporté à nouveau. Les dividendes sont payés le 30/06/N+1.",
    questions: [
      {
        num: 1,
        enonce: "Calculez la dotation à la réserve légale.",
        correction: "Dotation minimale : 1/10 × 36 000 000 = 3 600 000 (bénéfice non diminué de pertes antérieures, il n'y en a pas). Plafond : la dotation cesse d'être obligatoire lorsque la réserve atteint 1/5 × 100 000 000 = 20 000 000 ; la réserve passera de 16 000 000 à 19 600 000, sous le plafond : la dotation de 3 600 000 est due en entier (art. 546, 2°).",
      },
      {
        num: 2,
        enonce: "Calculez le bénéfice distribuable au sens de l'article 143.",
        correction: "Bénéfice distribuable = résultat de l'exercice (36 000 000) + report bénéficiaire (2 000 000) − pertes antérieures (0) − sommes portées en réserve en application de la loi ou des statuts (réserve légale 3 600 000 + réserve statutaire 5 000 000) = 29 400 000.",
      },
      {
        num: 3,
        enonce: "Calculez le premier dividende, le superdividende et le dividende total par action.",
        correction: "Premier dividende : 6 % du montant libéré, soit 6 % × 7 500 = 450 par action, donc 4 500 000 au total (art. 145 : intérêt sur le montant libéré). Superdividende : 2 000 par action, soit 20 000 000. Dividende total : 2 450 par action, soit 24 500 000 — inférieur au bénéfice distribuable (29 400 000), la distribution est régulière. Report à nouveau : 29 400 000 − 24 500 000 = 4 900 000.",
      },
      {
        num: 4,
        enonce: "Passez l'écriture d'affectation du 15/05/N+1 et celle du paiement du 30/06/N+1.",
        correction: "Affectation : débit 1301 Résultat en instance d'affectation : bénéfice 36 000 000 et débit 121 Report à nouveau créditeur 2 000 000 / crédit 111 Réserve légale 3 600 000, crédit 112 Réserve statutaire 5 000 000, crédit 465 Associés — Dividendes à payer 24 500 000, crédit 121 Report à nouveau créditeur 4 900 000 (schéma de l'Application 65). Contrôle : débits 38 000 000 = crédits 38 000 000. Paiement : débit 465 24 500 000 / crédit 521 Banques 24 500 000 — dans le délai de neuf mois après la clôture (art. 146).",
      },
      {
        num: 5,
        enonce: "L'assemblée pouvait-elle se tenir le 15/05/N+1 et payer le 30/06/N+1 ?",
        correction: "Oui. L'assemblée statuant sur les états financiers doit se tenir dans les six mois de la clôture (art. 140) : le 15/05/N+1 respecte le délai pour une clôture au 31/12/N. La mise en paiement doit intervenir au plus tard neuf mois après la clôture, soit le 30/09/N+1 (art. 146) : le 30/06/N+1 est régulier. Les états financiers et le rapport de gestion devaient être adressés au commissaire aux comptes au moins quarante-cinq jours avant l'assemblée, soit au plus tard le 31/03/N+1 (art. 140).",
      },
    ],
  },
  {
    id: 'cas-2',
    titre: "Cas 2 — LOMAMI SARL : pertes antérieures et plafond de la réserve légale",
    contexte: "LOMAMI SARL (capital 20 000 000 FC) présente : réserve légale existante 3 700 000 ; report à nouveau débiteur 2 000 000 (perte N−1) ; bénéfice net de l'exercice N : 12 000 000. L'assemblée souhaite distribuer le maximum possible.",
    questions: [
      {
        num: 1,
        enonce: "Calculez la dotation obligatoire à la réserve légale.",
        correction: "L'assiette est le bénéfice de l'exercice diminué des pertes antérieures : 12 000 000 − 2 000 000 = 10 000 000 (art. 346, al. 2). Dotation d'un dixième : 1 000 000. Plafond : 1/5 × 20 000 000 = 4 000 000 ; la réserve existante est de 3 700 000, il ne manque que 300 000. La dotation obligatoire est donc limitée à 300 000.",
      },
      {
        num: 2,
        enonce: "Calculez le bénéfice distribuable maximal.",
        correction: "Bénéfice distribuable = 12 000 000 (résultat) − 2 000 000 (pertes antérieures) − 300 000 (réserve légale) = 9 700 000 (art. 143 : pas de report bénéficiaire, pas de réserve statutaire en l'espèce).",
      },
      {
        num: 3,
        enonce: "Passez l'écriture d'affectation si l'assemblée distribue la totalité du distribuable.",
        correction: "Débit 1301 Résultat en instance d'affectation : bénéfice 12 000 000 / crédit 1291 Perte nette à reporter 2 000 000 (apurement du report débiteur), crédit 111 Réserve légale 300 000, crédit 465 Associés — Dividendes à payer 9 700 000.",
      },
      {
        num: 4,
        enonce: "Un associé propose de distribuer en outre 1 000 000 prélevés sur la réserve légale « puisqu'elle est presque pleine ». Analysez.",
        correction: "Impossible. La réserve légale est une réserve que la loi ne permet pas de distribuer : l'article 143, alinéa 2, n'autorise la distribution que des réserves non indisponibles, et frappe de nullité toute délibération contraire. En outre, le butoir de l'article 143, dernier alinéa, interdit toute distribution qui rendrait les capitaux propres inférieurs au capital augmenté des réserves indisponibles.",
      },
      {
        num: 5,
        enonce: "Deux ans plus tard, il apparaît que le bénéfice N avait été surévalué par une écriture fictive et que le dividende ne correspondait pas à des bénéfices réellement acquis. La société peut-elle récupérer les sommes ?",
        correction: "Oui : la répétition des dividendes ne correspondant pas à des bénéfices réellement acquis peut être exigée des associés qui les ont reçus (art. 346, al. 3). L'action en répétition se prescrit par trois ans à compter de la date de mise en distribution (art. 346, al. 4) : intentée deux ans après, elle est recevable. Le dividende irrégulièrement distribué est par ailleurs un dividende fictif au sens de l'article 144.",
      },
    ],
  },
  {
    id: 'cas-3',
    titre: "Cas 3 — HAUT-LOMAMI SA : distribution de réserves et butoir des capitaux propres",
    contexte: "HAUT-LOMAMI SA présente au 31/12/N, après une perte de l'exercice de 8 000 000 déjà virée en report à nouveau débiteur : capital 50 000 000 ; réserve légale 10 000 000 ; réserves facultatives 15 000 000 ; report à nouveau débiteur 8 000 000. Capitaux propres : 67 000 000. Sans bénéfice à distribuer, l'assemblée envisage de verser aux actionnaires 10 000 000 par prélèvement « sur les réserves ».",
    questions: [
      {
        num: 1,
        enonce: "Une distribution est-elle en principe possible sans bénéfice de l'exercice ?",
        correction: "Oui : l'article 143, alinéa 2, permet à l'assemblée de décider la distribution de tout ou partie des réserves, à condition qu'il ne s'agisse pas de réserves indisponibles (loi ou statuts) et qu'elle indique expressément les postes de réserve prélevés (al. 3). Seules les réserves facultatives (15 000 000) sont ici éligibles — jamais la réserve légale.",
      },
      {
        num: 2,
        enonce: "Vérifiez la distribution projetée de 10 000 000 au regard du butoir de l'article 143, dernier alinéa.",
        correction: "Le butoir : après distribution, les capitaux propres ne peuvent être inférieurs au capital augmenté des réserves indisponibles, soit 50 000 000 + 10 000 000 (réserve légale) = 60 000 000. Capitaux propres après distribution : 67 000 000 − 10 000 000 = 57 000 000 < 60 000 000 : la distribution serait nulle. Le maximum distribuable est 67 000 000 − 60 000 000 = 7 000 000 — économiquement, les réserves facultatives (15 000 000) sont partiellement absorbées par le report à nouveau débiteur (8 000 000).",
      },
      {
        num: 3,
        enonce: "L'assemblée décide finalement de distribuer 7 000 000 prélevés sur les réserves facultatives. Passez l'écriture.",
        correction: "Débit 1181 Réserves facultatives 7 000 000 / crédit 465 Associés — Dividendes à payer 7 000 000, la résolution indiquant expressément le poste prélevé (art. 143, al. 3). Paiement : débit 465 / crédit 521 pour 7 000 000.",
      },
      {
        num: 4,
        enonce: "Que deviendrait une délibération votant malgré tout les 10 000 000 ?",
        correction: "Elle serait nulle : l'article 143, dernier alinéa, frappe de nullité toute délibération de distribution faite alors que les capitaux propres sont ou deviendraient inférieurs au capital augmenté des réserves indisponibles. Les sommes versées ne correspondraient pas à des bénéfices réellement acquis : la répétition pourrait en être exigée des associés dans les trois ans de la mise en distribution.",
      },
    ],
  },
  {
    id: 'cas-4',
    titre: "Cas 4 — SANKURU TEXTILE SA : affectation d'une perte et retour au bénéfice",
    contexte: "SANKURU TEXTILE SA (capital 40 000 000, réserve légale 5 000 000) clôt l'exercice N sur une perte de 6 000 000. L'exercice N+1 dégage un bénéfice de 9 000 000. Aucune réserve statutaire n'est prévue.",
    questions: [
      {
        num: 1,
        enonce: "Passez l'écriture d'affectation de la perte N décidée par l'assemblée de N+1 (report à nouveau).",
        correction: "La perte en instance d'affectation loge au 1309. Affectation au report débiteur : débit 1291 Perte nette à reporter 6 000 000 / crédit 1309 Résultat en instance d'affectation : perte 6 000 000. L'assemblée aurait aussi pu l'imputer sur des réserves disponibles ; la réserve légale, indisponible, n'a pas vocation à l'absorber par simple décision de distribution.",
      },
      {
        num: 2,
        enonce: "Pour l'exercice N+1, calculez la dotation à la réserve légale.",
        correction: "Assiette : bénéfice de l'exercice diminué des pertes antérieures = 9 000 000 − 6 000 000 = 3 000 000 (art. 546, 2°). Dotation d'un dixième : 300 000. Plafond : 1/5 × 40 000 000 = 8 000 000, non atteint (5 000 000 + 300 000 = 5 300 000) : la dotation de 300 000 est due.",
      },
      {
        num: 3,
        enonce: "Calculez le bénéfice distribuable de N+1.",
        correction: "Bénéfice distribuable = 9 000 000 − 6 000 000 (pertes antérieures) − 300 000 (réserve légale) = 2 700 000 (art. 143).",
      },
      {
        num: 4,
        enonce: "L'assemblée distribue 2 500 000 et reporte le solde. Passez l'écriture d'affectation complète de N+1.",
        correction: "Débit 1301 Résultat en instance d'affectation : bénéfice 9 000 000 / crédit 1291 Perte nette à reporter 6 000 000 (apurement du report débiteur), crédit 111 Réserve légale 300 000, crédit 465 Associés — Dividendes à payer 2 500 000, crédit 121 Report à nouveau créditeur 200 000. Le paiement interviendra au plus tard neuf mois après la clôture de N+1 (art. 146).",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 3,
  id: 'ue3-chapitre-3',
  titre: "L'affectation du résultat et la distribution des dividendes",
  sousTitre: "AUSCGIE, art. 137-146, 346 et 546 · SYSCOHADA révisé, Application 65",
  infoBulle: "De l'arrêté des comptes à la mise en paiement des dividendes : approbation dans les six mois, réserve légale d'un dixième jusqu'au cinquième du capital, bénéfice distribuable de l'article 143, premier dividende et superdividende, dividende fictif et répétition — avec les écritures du SYSCOHADA (1301/1309, 111, 112, 1181, 121/129, 465).",
  loiRef: "AUSCGIE (30 janvier 2014) · SYSCOHADA révisé (AUDCIF)",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Situer le calendrier de l'approbation des comptes : 45 jours (CAC), 6 mois (assemblée), 9 mois (paiement)",
    "Calculer le bénéfice distribuable de l'article 143 et appliquer le butoir des capitaux propres",
    "Doter la réserve légale : un dixième du bénéfice net des pertes antérieures, plafonné au cinquième du capital (art. 346, 546)",
    "Décomposer le dividende : premier dividende calculé sur le montant libéré (art. 145), superdividende, dividende fictif et répétition",
    "Comptabiliser l'affectation du résultat — bénéfice et perte — selon l'Application 65 (1301/1309, réserves, 465, report à nouveau)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Assemblée d'approbation dans les six mois de la clôture ; documents au commissaire aux comptes 45 jours avant ; mise en paiement des dividendes dans les neuf mois de la clôture (art. 140, 146).",
    "Bénéfice distribuable = résultat de l'exercice + report bénéficiaire − pertes antérieures − dividendes partiels réguliers − sommes portées en réserve par la loi ou les statuts (art. 143).",
    "Réserve légale : un dixième au moins du bénéfice diminué des pertes antérieures, jusqu'au cinquième du capital — délibération contraire nulle (art. 346 SARL, 546 SA).",
    "Distribution de réserves possible, sauf réserves indisponibles, avec indication expresse des postes prélevés ; butoir : les capitaux propres ne peuvent devenir inférieurs au capital augmenté des réserves indisponibles (art. 143).",
    "Premier dividende : intérêt statutaire calculé sur le montant libéré des actions (art. 145) ; le superdividende est le surplus réparti également entre tous les titres.",
    "Dividende fictif : distribué en violation de l'article 144 ; répétition possible contre les associés, prescrite par trois ans à compter de la mise en distribution (art. 346).",
    "Écriture d'affectation (Application 65) : débit 1301 (et 121 pour un report antérieur incorporé) / crédit 111, 112, 1181, 465, 121 ; paiement : débit 465 / crédit 521.",
    "Perte : 1309 virée au report à nouveau débiteur (129/1291), qui ampute le bénéfice distribuable des exercices suivants.",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (AUSCGIE)", precision: "art. 137-141 (états financiers, rapport de gestion, approbation), 142-143 (réserves, bénéfice distribuable), 144-146 (dividendes, dividende fictif, premier dividende, mise en paiement), 346 (SARL : réserve légale, répétition), 546 (SA : compétence de l'AGO, réserve légale)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Guide d'application", precision: "Application 65 (affectation du résultat et paiement des dividendes)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé — Plan de comptes", precision: "comptes 111, 112, 113, 1181, 121, 129/1291, 1301/1309, 465" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE (Acte uniforme révisé du 30 janvier 2014) · SYSCOHADA révisé — Guide d'application et plan de comptes (AUDCIF)",
}

export default chapitre
