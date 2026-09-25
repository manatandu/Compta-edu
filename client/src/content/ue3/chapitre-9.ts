// Chapitre 9 du module UE3, Comptabilité des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Le chapitre suit un fil rouge :
// la liquidation de LUKENIE FRIGO SA, bâtie sur les chiffres de
// l'Application 122 du Guide, de l'assemblée qui décide la dissolution
// jusqu'à la radiation. Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014 : art. 60, 66, 200-241 (dissolution,
//   liquidation amiable et judiciaire, répartitions), 266 (publicité de la
//   nomination), 384 (SARL), 664-668 et 735-737 (SA), 902-904 (infractions
//   du liquidateur), skill auscgie-acte-uniforme. Anomalies signalées :
//   intitulé « Clauses de la dissolution » et renvoi au « registre du
//   crédit mobilier » (art. 202), survie de la personnalité morale « jusqu'à
//   la clôture » (art. 201) ou « jusqu'à la publication de la clôture »
//   (art. 205).
// - AUDCIF, Titre VIII, chapitre 40 (liquidation : phases, comptes 837, 847,
//   résultat de liquidation, clôture, entité individuelle) ; SYSCOHADA
//   révisé, Application 122 ; plan de comptes (1384, 4619, 837, 847).
//   Anomalie signalée : l'AUDCIF vise un compte 1374 absent du plan, qui
//   retient le 1384 utilisé par le Guide.
// - Loi n° 23/053 du 30 novembre 2023, art. 11, 13, 73, 74 et 82 ;
//   arrêté ministériel n° 028 du 28 septembre 2022 (quitus fiscal) ;
//   réglementation du Numéro Impôt, skill fiscalite-rdc.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch9-q1', question: "Laquelle de ces situations n'est PAS une cause de dissolution prévue par l'article 200 ?",
    options: [
      { id: 'a', texte: "L'arrivée du terme fixé par les statuts" },
      { id: 'b', texte: "Le décès d'un associé de SARL, en l'absence de clause statutaire" },
      { id: 'c', texte: "La décision des associés aux conditions de modification des statuts" },
      { id: 'd', texte: "Un jugement ordonnant la liquidation des biens" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 200 et 384 AUSCGIE',
    explication: "Sauf clause contraire, la SARL n'est pas dissoute par le décès d'un associé, ni par son interdiction, sa faillite ou son incapacité (art. 384). Les trois autres situations figurent à l'art. 200 (1°, 4° et 6°).",
  },
  {
    id: 'ch9-q2', question: "Un associé minoritaire d'une SARL demande la dissolution en invoquant une mésentente qui paralyse la société. Sur quel fondement ?",
    options: [
      { id: 'a', texte: "Aucun : seule la majorité peut dissoudre" },
      { id: 'b', texte: "La dissolution anticipée judiciaire pour justes motifs, notamment la mésentente empêchant le fonctionnement normal" },
      { id: 'c', texte: "La transformation de la société" },
      { id: 'd', texte: "L'expertise de gestion" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 200, 5° AUSCGIE',
    explication: "La mésentente doit empêcher le fonctionnement normal : un simple désaccord ne suffit pas. Le juge apprécie les justes motifs.",
  },
  {
    id: 'ch9-q3', question: "À partir de quand la dissolution est-elle opposable aux tiers ?",
    options: [
      { id: 'a', texte: "Dès la décision de l'assemblée" },
      { id: 'b', texte: "À compter de sa publication par avis dans un journal d'annonces légales de l'État du siège" },
      { id: 'c', texte: "À la radiation" },
      { id: 'd', texte: "À la nomination du liquidateur" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 201-202 AUSCGIE',
    explication: "La publicité comporte l'avis, le dépôt des actes et la modification de l'inscription au RCCM (art. 202). Avant la publication, les tiers peuvent traiter la société comme si elle n'était pas dissoute.",
  },
  {
    id: 'ch9-q4', question: "Pendant la liquidation, la société :",
    options: [
      { id: 'a', texte: "N'existe plus juridiquement" },
      { id: 'b', texte: "Conserve sa personnalité morale pour les besoins de la liquidation et doit porter la mention « société en liquidation » et le nom du liquidateur sur ses documents" },
      { id: 'c', texte: "Devient une société de fait" },
      { id: 'd', texte: "Est représentée par son ancien conseil d'administration" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 201, 204-205 AUSCGIE',
    explication: "La personnalité subsiste jusqu'à la publication de la clôture (art. 205). L'art. 201 dit « jusqu'à la clôture » : les deux rédactions coexistent, et la publication est la date qui protège les tiers.",
  },
  {
    id: 'ch9-q5', question: "La SARL FILIALE, dont l'associée unique est la SA MÈRE, est dissoute. Que se passe-t-il ?",
    options: [
      { id: 'a', texte: "Une liquidation classique avec nomination d'un liquidateur" },
      { id: 'b', texte: "La transmission universelle du patrimoine à la SA MÈRE sans liquidation, après le délai d'opposition de trente jours des créanciers" },
      { id: 'c', texte: "La vente forcée des actifs" },
      { id: 'd', texte: "Une fusion obligatoire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 201, al. 4 AUSCGIE',
    explication: "La transmission n'est réalisée qu'à l'issue du délai d'opposition, ou après le rejet de l'opposition, le remboursement des créances ou la constitution de garanties.",
  },
  {
    id: 'ch9-q6', question: "Même question, mais l'associé unique est une personne physique :",
    options: [
      { id: 'a', texte: "Transmission universelle sans liquidation" },
      { id: 'b', texte: "Mise en liquidation de plein droit" },
      { id: 'c', texte: "Transformation en entreprise individuelle" },
      { id: 'd', texte: "Dissolution impossible" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 201, al. 5 AUSCGIE',
    explication: "La transmission universelle est réservée à l'associé unique personne morale. Pour une personne physique, la procédure de liquidation protège les créanciers sociaux, dont le gage ne peut pas se fondre dans le patrimoine personnel de l'associé.",
  },
  {
    id: 'ch9-q7', question: "Dans une SA, qui nomme le liquidateur en cas de liquidation décidée par les associés ?",
    options: [
      { id: 'a', texte: "Le conseil d'administration" },
      { id: 'b', texte: "L'assemblée, aux conditions de quorum et de majorité des assemblées générales extraordinaires" },
      { id: 'c', texte: "Le commissaire aux comptes" },
      { id: 'd', texte: "Le greffier" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 206 AUSCGIE',
    explication: "SNC : unanimité ; SCS : unanimité des commandités et majorité en capital des commanditaires ; SARL : majorité en capital ; sociétés par actions : conditions de l'AGE. À défaut, le liquidateur est désigné en justice (art. 208).",
  },
  {
    id: 'ch9-q8', question: "Dans quel délai l'acte de nomination du liquidateur doit-il être publié ?",
    options: [
      { id: 'a', texte: "Quinze jours" },
      { id: 'b', texte: "Un mois à compter de la nomination" },
      { id: 'c', texte: "Trois mois" },
      { id: 'd', texte: "Aucun délai" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 212, 266 et 902 AUSCGIE',
    explication: "Publication dans un journal d'annonces légales avec les mentions de l'art. 266. La nomination n'est opposable aux tiers qu'après cette publication. Le liquidateur qui, sciemment, ne publie pas dans ce délai encourt une sanction pénale (art. 902).",
  },
  {
    id: 'ch9-q9', question: "Le liquidateur peut-il être une société ?",
    options: [
      { id: 'a', texte: "Non, seulement une personne physique" },
      { id: 'b', texte: "Oui : il peut être associé ou tiers, personne physique ou morale" },
      { id: 'c', texte: "Seulement une banque" },
      { id: 'd', texte: "Seulement le commissaire aux comptes" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 207 AUSCGIE',
    explication: "Rien n'impose de choisir un associé. Un cabinet spécialisé peut être nommé, et sa rémunération est fixée par la décision de nomination (art. 210).",
  },
  {
    id: 'ch9-q10', question: "Le liquidateur veut vendre un camion de la société à son propre cousin germain. Qu'en est-il ?",
    options: [
      { id: 'a', texte: "C'est interdit, comme toute cession à la famille" },
      { id: 'b', texte: "L'art. 214 ne vise que le liquidateur, ses employés et leurs conjoints, ascendants ou descendants : le cousin n'y figure pas, mais l'opération reste soumise au devoir de loyauté et à la responsabilité du liquidateur" },
      { id: 'c', texte: "C'est obligatoire" },
      { id: 'd', texte: "Il faut l'accord du greffe" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 214, 221 et 904 AUSCGIE',
    explication: "L'interdiction est limitativement énumérée. Un prix de faveur engagerait toutefois la responsabilité civile du liquidateur (art. 221) et, en cas de mauvaise foi, pourrait relever de l'usage des biens contraire à l'intérêt de la société (art. 904).",
  },
  {
    id: 'ch9-q11', question: "L'ancien directeur général veut racheter l'entrepôt de la société en liquidation. Quelle règle s'applique ?",
    options: [
      { id: 'a', texte: "Interdiction absolue" },
      { id: 'b', texte: "Consentement unanime des associés ou, à défaut, autorisation de la juridiction compétente, le liquidateur et le commissaire aux comptes entendus" },
      { id: 'c', texte: "Liberté totale" },
      { id: 'd', texte: "Accord du seul liquidateur" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 213 et 215-1 AUSCGIE',
    explication: "L'opération réalisée sans ces garanties est nulle (art. 215-1) et, en cas de mauvaise foi, pénalement sanctionnée (art. 904, 2°).",
  },
  {
    id: 'ch9-q12', question: "Le liquidateur peut-il poursuivre l'exploitation pour écouler un stock ?",
    options: [
      { id: 'a', texte: "Oui, librement" },
      { id: 'b', texte: "Dans la liquidation régie par les art. 223 et suivants, il ne peut continuer les affaires en cours ou en engager de nouvelles que sur autorisation de justice" },
      { id: 'c', texte: "Non, jamais" },
      { id: 'd', texte: "Oui, avec l'accord des salariés" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 230-231 AUSCGIE',
    explication: "Il est investi des pouvoirs les plus étendus pour réaliser l'actif, même à l'amiable, mais la continuation de l'activité exige une autorisation judiciaire. Les restrictions statutaires à ses pouvoirs ne sont pas opposables aux tiers (art. 230).",
  },
  {
    id: 'ch9-q13', question: "Qui peut demander au juge d'organiser la liquidation selon les art. 224 à 241 dans une SA ?",
    options: [
      { id: 'a', texte: "Seul le ministère public" },
      { id: 'b', texte: "Des associés représentant au moins le dixième du capital, des créanciers sociaux ou le représentant de la masse des obligataires, justifiant d'un intérêt légitime" },
      { id: 'c', texte: "Tout salarié" },
      { id: 'd', texte: "Le liquidateur amiable seulement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 223 AUSCGIE',
    explication: "Dans la SNC, c'est la majorité des associés. Dans ces hypothèses, les clauses statutaires contraires sont réputées non écrites.",
  },
  {
    id: 'ch9-q14', question: "Liquidation ordonnée en justice : dans quel délai le liquidateur doit-il présenter aux associés un rapport sur la situation active et passive ?",
    options: [
      { id: 'a', texte: "Un mois" },
      { id: 'b', texte: "Six mois de sa nomination, prorogeable à douze mois par décision de justice" },
      { id: 'c', texte: "Trois ans" },
      { id: 'd', texte: "Aucun délai" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 228 et 903 AUSCGIE',
    explication: "Le rapport porte aussi sur la poursuite des opérations et le délai nécessaire pour les terminer. Le défaut de rapport est pénalement sanctionné (art. 903, 1°).",
  },
  {
    id: 'ch9-q15', question: "Pendant la liquidation, que doit faire le liquidateur à chaque clôture d'exercice (art. 232) ?",
    options: [
      { id: 'a', texte: "Rien, la comptabilité est suspendue" },
      { id: 'b', texte: "Établir dans les trois mois les états financiers annuels au vu d'un inventaire, et un rapport écrit sur les opérations de l'exercice" },
      { id: 'c', texte: "Déposer le bilan" },
      { id: 'd', texte: "Réévaluer tous les actifs" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 232-233 AUSCGIE',
    explication: "L'assemblée statue sur ces comptes au moins une fois par an, dans les six mois de la clôture, sauf dispense judiciaire (art. 233). La dissolution ne met pas fin aux fonctions du commissaire aux comptes (art. 225).",
  },
  {
    id: 'ch9-q16', question: "Sauf clause contraire, comment se partagent les capitaux propres restant après remboursement du nominal ?",
    options: [
      { id: 'a', texte: "Par parts égales entre associés" },
      { id: 'b', texte: "Dans les mêmes proportions que la participation au capital" },
      { id: 'c', texte: "Au prorata de l'ancienneté" },
      { id: 'd', texte: "Au profit des seuls dirigeants" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 237 AUSCGIE',
    explication: "Le nominal est d'abord remboursé, puis le boni (réserves et résultat de liquidation) est partagé au prorata du capital, sauf clause contraire (par exemple au profit d'actions de préférence).",
  },
  {
    id: 'ch9-q17', question: "Dans quel délai les sommes affectées à une répartition doivent-elles être déposées sur un compte bancaire au nom de la société en liquidation ?",
    options: [
      { id: 'a', texte: "Quinze jours à compter de la décision de répartition" },
      { id: 'b', texte: "Un an" },
      { id: 'c', texte: "Trois mois" },
      { id: 'd', texte: "Le jour même" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 239-240 AUSCGIE',
    explication: "Les sommes non versées aux créanciers ou aux associés sont déposées, un an après la clôture, sur un compte séquestre au Trésor public (art. 240).",
  },
  {
    id: 'ch9-q18', question: "Quelle est la première phase comptable de la liquidation selon l'AUDCIF ?",
    options: [
      { id: 'a', texte: "Le partage" },
      { id: 'b', texte: "L'inventaire du patrimoine, le solde des amortissements et provisions existants et l'établissement du bilan avant liquidation" },
      { id: 'c', texte: "Le paiement des associés" },
      { id: 'd', texte: "La radiation" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 40, § 2.1',
    explication: "Quatre phases : début (inventaire, bilan avant liquidation), opérations (cessions, recouvrements, paiements, frais), bilan de liquidation (boni, mali ou insuffisance d'actif), clôture (droits des associés, partage, règlement).",
  },
  {
    id: 'ch9-q19', question: "Quel compte le plan de comptes SYSCOHADA prévoit-il pour le résultat de liquidation ?",
    options: [
      { id: 'a', texte: "1374" },
      { id: 'b', texte: "1384" },
      { id: 'c', texte: "131" },
      { id: 'd', texte: "4619" },
    ],
    reponseCorrecte: 'b', articleRef: 'Plan de comptes ; AUDCIF, ch. 40 ; Application 122',
    explication: "Le plan de comptes et les écritures du Guide utilisent le 1384 (sous le 138, résultat HAO). Le chapitre 40 de l'AUDCIF écrit « 1374 », compte inexistant au plan (le 137 est le résultat des activités ordinaires).",
  },
  {
    id: 'ch9-q20', question: "Un bâtiment de VNC 13 500 000 (brut 40 000 000) est cédé 25 000 000 pendant la liquidation. Par la méthode directe, quel est l'effet sur le 1384 ?",
    options: [
      { id: 'a', texte: "Crédit de 25 000 000 seulement" },
      { id: 'b', texte: "Crédit de 25 000 000 (prix) et débit de 13 500 000 (VNC), soit + 11 500 000" },
      { id: 'c', texte: "Débit de 40 000 000" },
      { id: 'd', texte: "Aucun" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide SYSCOHADA, Application 122',
    explication: "Le prix est crédité au 1384 par le débit de la banque. La sortie du bien débite le 1384 de la VNC et les amortissements (26 500 000), par le crédit du bâtiment en brut (40 000 000).",
  },
  {
    id: 'ch9-q21', question: "Que change la seconde méthode (comptes 837 et 847) par rapport à la méthode directe ?",
    options: [
      { id: 'a', texte: "Le résultat de liquidation" },
      { id: 'b', texte: "Rien au résultat : elle conserve le détail des charges et des produits de liquidation, regroupés ensuite au 1384" },
      { id: 'c', texte: "Elle supprime le partage" },
      { id: 'd', texte: "Elle impose de réévaluer les actifs" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 40, § 2.2.1 ; Application 122',
    explication: "Le 837 reçoit les pertes et les frais, le 847 les profits et l'annulation des provisions. La méthode directe est une simplification admise.",
  },
  {
    id: 'ch9-q22', question: "Application 122 : produits de liquidation 37 150 000, charges 30 050 000. Quel est le résultat ?",
    options: [
      { id: 'a', texte: "Mali de 7 100 000" },
      { id: 'b', texte: "Boni de 7 100 000" },
      { id: 'c', texte: "Boni de 37 150 000" },
      { id: 'd', texte: "Insuffisance d'actif" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide SYSCOHADA, Application 122',
    explication: "Le 1384 est créditeur de 7 100 000 et la banque débitrice de 41 100 000, soit le capital (20 000 000) + les réserves (14 000 000) + le boni.",
  },
  {
    id: 'ch9-q23', question: "Quel compte reçoit les droits des associés au moment du partage ?",
    options: [
      { id: 'a', texte: "4618" },
      { id: 'b', texte: "4619 Apporteurs, capital à rembourser" },
      { id: 'c', texte: "465" },
      { id: 'd', texte: "1384" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 40, § 2.2.2 ; Application 122',
    explication: "Capitaux propres débités pour solde, 1384 débité (boni) ou crédité (mali), 4619 crédité, puis soldé par la banque : tous les comptes de la société sont alors soldés.",
  },
  {
    id: 'ch9-q24', question: "Remettez dans l'ordre : (1) radiation au RCCM ; (2) assemblée de clôture ; (3) dépôt des comptes définitifs au RCCM ; (4) publication de la clôture.",
    options: [
      { id: 'a', texte: "1, 2, 3, 4" },
      { id: 'b', texte: "2, 3, 4, 1" },
      { id: 'c', texte: "3, 2, 1, 4" },
      { id: 'd', texte: "4, 1, 2, 3" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 217-220 AUSCGIE',
    explication: "L'assemblée statue sur les comptes, le quitus et la clôture (art. 217). Les comptes définitifs sont déposés avec la décision (art. 219). La clôture est publiée, et le liquidateur demande la radiation dans le mois de cette publication (art. 220).",
  },
  {
    id: 'ch9-q25', question: "Dans quel délai la clôture de la liquidation doit-elle intervenir ?",
    options: [
      { id: 'a', texte: "Un an" },
      { id: 'b', texte: "Trois ans à compter de la dissolution, faute de quoi le ministère public ou tout intéressé peut saisir le juge" },
      { id: 'c', texte: "Cinq ans" },
      { id: 'd', texte: "Aucun délai" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 216 AUSCGIE',
    explication: "Le juge fait procéder à la liquidation ou à son achèvement. Dans la liquidation judiciaire, le mandat du liquidateur ne peut excéder trois ans, renouvelables par décision de justice (art. 227).",
  },
  {
    id: 'ch9-q26', question: "L'assemblée de clôture refuse d'approuver les comptes du liquidateur. Quelle issue ?",
    options: [
      { id: 'a', texte: "La liquidation reste ouverte indéfiniment" },
      { id: 'b', texte: "La juridiction compétente statue sur les comptes et, le cas échéant, sur la clôture, en lieu et place de l'assemblée" },
      { id: 'c', texte: "Le liquidateur est automatiquement condamné" },
      { id: 'd', texte: "La société reprend son activité" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 218 AUSCGIE',
    explication: "Le liquidateur dépose alors ses comptes au RCCM, où tout intéressé peut les consulter.",
  },
  {
    id: 'ch9-q27', question: "Un créancier découvre en N+4 une faute du liquidateur commise en N+1 et dissimulée jusqu'en N+3. Son action est-elle prescrite ?",
    options: [
      { id: 'a', texte: "Oui, trois ans après la faute" },
      { id: 'b', texte: "Non : le délai de trois ans court de la révélation du fait dissimulé (N+3)" },
      { id: 'c', texte: "Oui, un an après la clôture" },
      { id: 'd', texte: "Non, l'action est imprescriptible" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 221 AUSCGIE',
    explication: "Trois ans à compter du fait dommageable ou, s'il a été dissimulé, de sa révélation ; dix ans si le fait est qualifié crime.",
  },
  {
    id: 'ch9-q28', question: "Contre les associés non liquidateurs, dans quel délai les actions se prescrivent-elles ?",
    options: [
      { id: 'a', texte: "Trois ans à compter de la clôture" },
      { id: 'b', texte: "Cinq ans à compter de la publication de la dissolution au RCCM" },
      { id: 'c', texte: "Dix ans" },
      { id: 'd', texte: "Un an" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 222 AUSCGIE',
    explication: "Le délai vaut aussi pour leurs conjoints survivants, héritiers ou ayants cause.",
  },
  {
    id: 'ch9-q29', question: "En RDC, comment l'IS s'applique-t-il en cas de dissolution suivie de liquidation ?",
    options: [
      { id: 'a', texte: "La société est exonérée dès la dissolution" },
      { id: 'b', texte: "Cotisation spéciale immédiate sur les résultats de la période d'activité, puis seconde cotisation d'après le dernier bilan de liquidation" },
      { id: 'c', texte: "Seuls les associés sont imposés" },
      { id: 'd', texte: "L'IS est payé par le liquidateur sur ses honoraires" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 11 et 13',
    explication: "Les bénéfices de liquidation font partie du bénéfice imposable (art. 11). Le boni de liquidation (plus-values de réalisation) est donc imposable à l'IS au niveau de la société.",
  },
  {
    id: 'ch9-q30', question: "Le liquidateur de LUKENIE FRIGO vend le bâtiment industriel de la société. Quelle formalité fiscale congolaise doit-il anticiper ?",
    options: [
      { id: 'a', texte: "Aucune" },
      { id: 'b', texte: "La présentation d'un quitus fiscal, exigé pour les mutations d'immeubles" },
      { id: 'c', texte: "Une autorisation de la BCC" },
      { id: 'd', texte: "Un visa de l'ANAPI" },
    ],
    reponseCorrecte: 'b', articleRef: 'Arrêté ministériel n° 028/2022, art. 3',
    explication: "Le quitus fiscal atteste que la société est en règle de paiement à l'égard de la DGI. Les mutations de véhicules et d'immeubles figurent parmi les opérations qui l'exigent : une liquidation qui traîne ses arriérés fiscaux bloque la vente de ses biens immobiliers.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '9.1',
    titre: "Les causes de dissolution",
    navLabel: "Causes",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Kinshasa, 25 janvier N. Dans la salle de réunion de **LUKENIE FRIGO SA**, l'assemblée générale extraordinaire vote la dissolution anticipée de la société. Pendant quinze ans, elle a loué des chambres froides aux importateurs de poisson du port de Kinshasa. Mais ses équipements sont usés, deux grands clients ont construit leurs propres entrepôts, et les actionnaires préfèrent récupérer leur mise plutôt que de réinvestir. Ce chapitre suit LUKENIE FRIGO jusqu'à sa radiation, en s'appuyant sur les chiffres de l'Application 122 du Guide, et montre à chaque étape ce que le droit exige et ce que le comptable enregistre.",
      },
      { type: 'intertitre', texte: "9.1.1 Les causes de l'article 200" },
      {
        type: 'carte',
        titre: "Tableau 9.1 — Les sept causes de l'article 200",
        tableau: {
          entetes: ["Cause", "Qui la déclenche ?", "Exemple"],
          lignes: [
            ["1° Expiration du terme", "Le temps, sauf prorogation", "Société constituée pour 99 ans, non prorogée"],
            ["2° Réalisation ou extinction de l'objet", "Les faits", "Société créée pour construire un pont, une fois l'ouvrage livré"],
            ["3° Annulation du contrat de société", "Le juge", "Nullité pour vice de constitution"],
            ["4° Décision des associés", "L'assemblée, aux conditions de modification des statuts", "LUKENIE FRIGO : dissolution anticipée votée en AGE (art. 737 pour la SA)"],
            ["5° Dissolution judiciaire pour justes motifs", "Un associé, devant le juge", "Mésentente paralysant la société, inexécution de ses obligations par un associé"],
            ["6° Jugement de liquidation des biens", "Le juge des procédures collectives", "Société en cessation des paiements sans redressement possible"],
            ["7° Cause statutaire", "Les statuts", "Clause de dissolution en cas de perte d'une licence"],
          ],
        },
      },
      { type: 'intertitre', texte: "9.1.2 Les dissolutions-sanctions" },
      {
        type: 'paragraphe',
        texte: "À ces causes générales s'ajoutent des dissolutions qui **sanctionnent** une situation irrégulière, rencontrées dans les chapitres précédents. La SA dont les capitaux propres deviennent inférieurs à la moitié du capital doit se prononcer sur sa dissolution anticipée (art. 664-668 ; art. 736 pour le renvoi). Une société dont le capital tombe sous le minimum légal sans régularisation encourt la dissolution (art. 66). Dans les formes qui n'admettent pas l'unipersonnalité, tout intéressé peut demander la dissolution si la réunion de tous les titres en une seule main n'est pas régularisée dans l'année (art. 60). Inversement, certains événements **ne dissolvent pas** la société : la SARL survit à l'interdiction, à la faillite ou à l'incapacité d'un associé et, sauf clause contraire, à son décès (art. 384).",
      },
      { type: 'intertitre', texte: "9.1.3 La portée de la dissolution" },
      {
        type: 'paragraphe',
        texte: "La dissolution ne fait pas disparaître la société. La dissolution est l'acte qui met fin au **pacte social** : les associés cessent de poursuivre ensemble l'objet qu'ils s'étaient donné. La société, elle, ne s'éteint qu'au terme d'une période parfois longue, la **liquidation**, pendant laquelle ses biens sont vendus, ses créances encaissées et ses dettes payées. Il faut garder cette distinction en tête : la dissolution ouvre une phase, la clôture de la liquidation la ferme. Entre les deux, la société continue d'exister, de tenir une comptabilité et de répondre de ses dettes. Pour LUKENIE FRIGO, cette période va durer neuf mois ; pour d'autres, elle dure plusieurs années, dans la limite de trois ans fixée par l'article 216.",
      },
      {
        type: 'filet',
        titre: "Les justes motifs de dissolution judiciaire",
        texte: "La dissolution judiciaire de l'art. 200, 5° est l'arme de l'associé minoritaire enfermé dans une société qui ne fonctionne plus. Le juge ne la prononce que si la mésentente ou l'inexécution empêche **le fonctionnement normal** de la société. Un conflit sur la politique de dividendes, tant que les organes continuent de fonctionner et que les comptes sont approuvés, ne suffit pas. En pratique, l'associé cherche d'abord une sortie par la cession de ses titres, dont le prix sera fixé, à défaut d'accord, par l'expert de l'article 59 (chapitre 7).",
      },
      {
        type: 'filet',
        titre: "Le retour sur la dissolution avant la clôture",
        texte: "Tant que la liquidation n'est pas close, les associés d'une société dissoute par leur propre décision peuvent en principe décider de poursuivre l'activité, en revenant sur la dissolution aux conditions de modification des statuts. Mais il faut alors défaire ce qui a été fait : publier la décision, réinscrire la société sans la mention « en liquidation », reprendre la comptabilité d'exploitation. Si des actifs essentiels ont déjà été vendus, le retour en arrière n'a guère de sens. L'Acte uniforme ne consacre pas de procédure expresse pour cette hypothèse : elle se construit à partir des règles générales, et sa faisabilité doit être vérifiée au cas par cas.",
      },
    ],
  },
  {
    numero: '9.2',
    titre: "Les effets de la dissolution et la survie de la personnalité morale",
    navLabel: "Effets",
    blocs: [
      { type: 'intertitre', texte: "9.2.1 La publicité de la dissolution" },
      {
        type: 'paragraphe',
        texte: "Le 5 février N, un avis paraît dans un journal d'annonces légales de Kinshasa : « LUKENIE FRIGO SA, société en liquidation ». Le procès-verbal de l'AGE est déposé et l'inscription au RCCM est modifiée. Ces trois formalités constituent la publicité de la dissolution (art. 202). Elles ne sont pas de pure forme : la dissolution n'a d'effet à l'égard des tiers qu'à compter de la **publication** de l'avis (art. 201). Un fournisseur qui livre le 1er février, avant la publication, peut ignorer la dissolution.",
      },
      {
        type: 'carte',
        titre: "Tableau 9.2 — Ce que la dissolution change et ne change pas",
        tableau: {
          entetes: ["Ce qui change le jour de la dissolution", "Ce qui ne change pas"],
          lignes: [
            ["La société est **en liquidation** de plein droit (art. 201, 204)", "Elle garde sa **personnalité morale** pour les besoins de la liquidation (art. 201, 205)"],
            ["Son objet se réduit à la réalisation de l'actif et au paiement du passif", "Elle reste titulaire de ses biens, de ses créances et de ses dettes"],
            ["Tous ses documents portent « société en liquidation » et le nom du liquidateur (art. 204)", "Elle peut agir et être poursuivie en justice"],
            ["Le liquidateur remplace les dirigeants pour les actes de la liquidation", "Le commissaire aux comptes reste en fonction (art. 225)"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "La publicité a aussi une fonction comptable. Elle fixe le point de départ de plusieurs délais : trente jours d'opposition dans l'unipersonnelle (art. 201), cinq ans de prescription des actions contre les associés (art. 222). Et elle marque, pour le comptable, la fin de la comptabilité d'exploitation et le début de la comptabilité de liquidation. L'exercice en cours est arrêté à la date de dissolution, avec un bilan qui servira de bilan avant liquidation. Pour LUKENIE FRIGO, l'arrêté au 25 janvier N a exigé un inventaire complet en quelques jours : comptage des stocks, confirmation des soldes clients, évaluation des créances douteuses. Ce travail conditionne toute la suite, puisque c'est par rapport à ces valeurs que se mesurera le résultat de liquidation.",
      },
      { type: 'intertitre', texte: "9.2.2 La survie de la personnalité morale" },
      {
        type: 'paragraphe',
        texte: "La société dissoute est maintenue en vie parce que ses chambres froides doivent être vendues, ses créances encaissées et ses fournisseurs payés. Sans personnalité morale, les biens n'auraient plus de propriétaire, et chaque créancier devrait poursuivre individuellement les associés. La survie est donc **fonctionnelle** : elle dure autant que la liquidation. L'Acte uniforme en fixe le terme avec deux formules. L'article 201 parle de la survie « jusqu'à la clôture », l'article 205 « jusqu'à la publication de la clôture » [texte officiel]. La seconde, plus précise, est celle qui protège les tiers : tant que la clôture n'est pas publiée, la société peut encore être assignée.",
      },
      {
        type: 'filet',
        titre: "[texte officiel] Deux coquilles du Livre 7",
        texte: "Le chapitre qui énumère les causes de dissolution est intitulé « Clauses de la dissolution », et l'article 202 prévoit le dépôt des actes au « registre du crédit mobilier ». Il faut lire respectivement « causes » et « registre du commerce et du crédit mobilier ». Le sens ne fait pas de doute, mais le texte est cité tel qu'il est imprimé.",
      },
      {
        type: 'paragraphe',
        texte: "La mention « société en liquidation » change la vie quotidienne de l'entreprise. Les factures, les lettres et les bons de commande doivent la porter, avec le nom du liquidateur (art. 204). Les banques bloquent souvent les lignes de crédit et ne laissent fonctionner que les comptes de dépôt. Les clients s'interrogent sur le service après-vente, et les fournisseurs exigent le paiement comptant. Le liquidateur doit gérer cette défiance, car elle pèse sur la valeur de réalisation des actifs. Un stock vendu par une société « en liquidation » se négocie rarement à son prix normal. C'est l'une des raisons pour lesquelles les valeurs de réalisation diffèrent des valeurs comptables, et pour lesquelles l'Application 122 affiche des moins-values sur le matériel et les stocks.",
      },
    ],
  },
  {
    numero: '9.3',
    titre: "La dissolution sans liquidation de la société unipersonnelle",
    navLabel: "Associé unique",
    blocs: [
      { type: 'intertitre', texte: "9.3.1 La transmission universelle du patrimoine" },
      {
        type: 'paragraphe',
        texte: "LUKENIE FRIGO détenait une filiale, **LUKENIE LOGISTIQUE SARLU**, qui assurait le transport frigorifique de ses clients. Avant de dissoudre la mère, le conseil a fait dissoudre la filiale par décision de son associée unique, LUKENIE FRIGO elle-même. Ici, pas de liquidateur ni de vente des camions : l'article 201 prévoit que la dissolution d'une société dont tous les titres sont détenus par un seul associé entraîne la **transmission universelle** de son patrimoine à cet associé, **sans liquidation**. Les camions, les créances et les dettes de la filiale passent directement dans le patrimoine de la mère, qui les réalisera dans le cadre de sa propre liquidation.",
      },
      {
        type: 'carte',
        titre: "Encadré 9.1 — Le mécanisme de l'article 201, alinéas 4 et 5",
        liste: [
          "**Publication** de la dissolution, point de départ du délai d'opposition.",
          "**Trente jours** pendant lesquels les créanciers de la filiale peuvent faire opposition devant la juridiction compétente.",
          "Le juge **rejette** l'opposition, ou ordonne le **remboursement** des créances ou la constitution de **garanties** si la société en offre et qu'elles sont jugées suffisantes.",
          "La transmission n'est réalisée, et la société ne disparaît, qu'**à l'issue du délai** d'opposition ou après règlement de l'opposition.",
          "**Exception** : si l'associé unique est une **personne physique**, la dissolution entraîne de plein droit la mise en liquidation.",
        ],
        note: "L'exception protège les créanciers sociaux : leur gage ne doit pas se confondre avec le patrimoine personnel d'un individu, qui a ses propres créanciers. Face à une société mère, ils trouvent en revanche un débiteur de même nature, soumis aux mêmes règles comptables et de publicité.",
      },
      {
        type: 'filet',
        titre: "Dissolution de l'unipersonnelle et fermeture administrative",
        texte: "La dissolution de l'unipersonnelle ne se réduit pas à une simple « fermeture » administrative. La transmission universelle fait passer à la mère **toutes** les dettes de la filiale, y compris celles qu'elle ignore : litiges en cours, redressements fiscaux à venir, garanties données. Avant de dissoudre une filiale par ce mécanisme, la mère doit donc faire un inventaire complet de son passif, exactement comme dans une fusion. Le délai d'opposition de trente jours ne concerne que les créanciers qui se manifestent : ceux qui ne disent rien conservent leurs droits contre la mère.",
      },
      { type: 'intertitre', texte: "9.3.2 La comparaison avec la fusion simplifiée" },
      {
        type: 'paragraphe',
        texte: "Ce mécanisme ressemble à la fusion simplifiée du chapitre 8 : dans les deux cas, une société disparaît et son patrimoine passe à celle qui la détient entièrement. La différence tient à la procédure. La dissolution-confusion se contente d'une décision de l'associé unique, d'une publicité et d'un délai d'opposition de trente jours. La fusion suppose un projet, une publicité un mois avant l'assemblée et une déclaration de conformité (art. 193-198). Comptablement, la mère reprend les actifs et les dettes de la filiale et annule ses titres de participation. L'écart entre l'actif net repris et le coût des titres traduit l'enrichissement ou l'appauvrissement de la filiale depuis son acquisition, et il est traité dans les comptes de la mère.",
      },
    ],
  },
  {
    numero: '9.4',
    titre: "La nomination et le statut du liquidateur",
    navLabel: "Le liquidateur",
    blocs: [
      { type: 'intertitre', texte: "9.4.1 La nomination" },
      {
        type: 'paragraphe',
        texte: "L'AGE du 25 janvier a aussi nommé le liquidateur : le cabinet **MWANGAZA CONSEIL**, une société d'experts-comptables. Rien n'obligeait à choisir un associé ; le liquidateur peut être un tiers, et même une personne morale (art. 207). Dans une SA, il est nommé aux conditions de quorum et de majorité de l'AGE (art. 206). Sa rémunération est fixée par la décision qui le nomme (art. 210). S'ils sont plusieurs, les liquidateurs peuvent agir séparément, sauf disposition contraire, mais présentent un rapport commun (art. 209).",
      },
      {
        type: 'carte',
        titre: "Tableau 9.3 — La nomination du liquidateur (art. 206)",
        tableau: {
          entetes: ["Forme sociale", "Décision"],
          lignes: [
            ["SNC", "Unanimité des associés"],
            ["SCS", "Unanimité des commandités et majorité en capital des commanditaires"],
            ["SARL", "Majorité en capital des associés"],
            ["SA et SAS", "Conditions de quorum et de majorité de l'AGE"],
            ["À défaut de nomination", "Décision de justice à la demande de tout intéressé (art. 208)"],
          ],
        },
        note: "Les délibérations prises en violation de l'art. 206 sont nulles (art. 215-1). Le liquidateur peut être révoqué et remplacé dans les mêmes formes, et tout associé peut demander sa révocation en justice pour motifs légitimes (art. 211).",
      },
      { type: 'intertitre', texte: "9.4.2 La publicité et le choix du liquidateur" },
      {
        type: 'paragraphe',
        texte: "Le cabinet doit d'abord publier sa nomination. L'acte de nomination doit paraître dans un journal d'annonces légales **dans le mois** qui suit la nomination, avec les mentions de l'article 266. Celles-ci comprennent la dénomination suivie de la mention « société en liquidation », le capital, le siège, la cause de la liquidation, l'identité du liquidateur et les limites éventuelles de ses pouvoirs, et l'adresse où envoyer la correspondance. Nomination et révocation ne sont opposables aux tiers qu'à compter de cette publication (art. 212). Une fois la publication faite, ni la société ni les tiers ne peuvent se prévaloir d'une irrégularité de la nomination pour échapper à leurs engagements.",
      },
      {
        type: 'paragraphe',
        texte: "Le choix d'un liquidateur **extérieur** comme MWANGAZA CONSEIL a des conséquences. Un associé ou un ancien dirigeant connaît l'entreprise, ses clients et ses actifs, et il coûte moins cher. Mais il peut être en conflit d'intérêts : tenté de racheter lui-même les actifs, de favoriser certains créanciers ou de ménager un associé plutôt qu'un autre. Un professionnel indépendant apporte la neutralité et la technique : inventaire, négociation des ventes, comptabilité de liquidation, formalités. Sa rémunération (art. 210) est une charge de liquidation, qui réduit le boni. Pour une société comme LUKENIE FRIGO, dont les actionnaires ne s'entendaient plus sur l'avenir, la neutralité valait bien les 3 000 000 de frais de liquidation.",
      },
      { type: 'intertitre', texte: "9.4.3 La responsabilité pénale et les premières diligences" },
      {
        type: 'filet',
        titre: "Les infractions du liquidateur (art. 902)",
        texte: "Encourt une sanction pénale le liquidateur qui, **sciemment**, n'a pas publié sa nomination et déposé au RCCM les décisions de dissolution dans le mois, n'a pas convoqué les associés en fin de liquidation pour statuer sur le compte définitif, le quitus et la clôture, ou n'a pas déposé ses comptes définitifs ni demandé leur approbation en justice. L'Acte uniforme fixe les éléments de l'infraction ; la peine relève du droit pénal national.",
      },
      {
        type: 'filet',
        titre: "Les premières diligences du liquidateur",
        texte: "Un liquidateur professionnel commence par un **inventaire contradictoire** avec les anciens dirigeants, ouvre si nécessaire un compte bancaire dédié, informe les salariés, les banques et l'administration fiscale, et établit la liste des créanciers à partir de la comptabilité et des contrats. Il fixe ensuite un plan de réalisation : quels actifs vendre en premier, à quel prix plancher, par quel canal (gré à gré, enchères, appel d'offres). Ce plan est présenté aux associés, qui peuvent l'encadrer dans l'acte de nomination ; ces limites, si elles ne sont pas opposables aux tiers (art. 230), engagent le liquidateur envers la société.",
      },
    ],
  },
  {
    numero: '9.5',
    titre: "La réalisation de l'actif et les cessions réglementées",
    navLabel: "Pouvoirs et interdits",
    blocs: [
      { type: 'intertitre', texte: "9.5.1 Les cessions réglementées" },
      {
        type: 'paragraphe',
        texte: "Mars N. L'ancien directeur général de LUKENIE FRIGO, qui connaît parfaitement les chambres froides, propose de racheter le bâtiment. Son fils, de son côté, s'intéresse aux groupes électrogènes, et un cousin du gérant de MWANGAZA CONSEIL voudrait les camionnettes. Le cabinet doit trier ces offres selon trois régimes que l'Acte uniforme distingue avec soin.",
      },
      {
        type: 'carte',
        titre: "Tableau 9.4 — Les trois régimes de cession pendant la liquidation",
        tableau: {
          entetes: ["Acquéreur", "Régime", "Sanction"],
          lignes: [
            ["Le **liquidateur**, ses **employés**, ou leurs **conjoints, ascendants ou descendants**", "**Interdiction** (art. 214)", "Nullité (art. 215-1)"],
            ["Un ancien **associé en nom, commandité, gérant, administrateur, administrateur général, directeur général ou autre dirigeant**, ou le **commissaire aux comptes**", "**Consentement unanime** des associés, ou à défaut **autorisation de justice**, le liquidateur et le commissaire aux comptes entendus (art. 213)", "Nullité (art. 215-1) ; sanction pénale en cas de mauvaise foi (art. 904, 2°)"],
            ["**Cession globale** de l'actif ou **apport** à une autre société, notamment par fusion", "Majorités de l'art. 215 : unanimité en SNC, majorité de modification des statuts en SARL, conditions de l'AGE en société par actions", "Nullité (art. 215-1)"],
            ["**Tout autre acquéreur**", "Liberté du liquidateur, dans l'intérêt de la liquidation", "Responsabilité civile en cas de faute (art. 221)"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "L'**ancien directeur général** peut acheter le bâtiment, mais seulement avec l'accord unanime des actionnaires ou l'autorisation du juge : sa connaissance de l'entreprise pourrait lui permettre d'acheter à bas prix. Le **fils** de l'ancien directeur général n'est visé par aucun texte : l'art. 214 ne vise que la famille du liquidateur et de ses employés, et l'art. 213 ne vise que les anciens dirigeants eux-mêmes. Le **cousin** du gérant du cabinet liquidateur n'est pas non plus dans la liste de l'art. 214, limitée aux conjoints, ascendants et descendants. Une vente à prix de faveur engagerait toutefois la responsabilité du liquidateur et, en cas de mauvaise foi, tomberait sous l'art. 904, 1° (usage des biens contraire à l'intérêt de la société pour favoriser une autre personne).",
      },
      {
        type: 'filet',
        titre: "Le contrôle des acquéreurs d'actifs",
        texte: "Dans un dossier de liquidation, l'auditeur dresse la liste des acquéreurs de chaque actif significatif et la rapproche de la liste des anciens dirigeants, du liquidateur, de ses employés et de leurs proches. Il vérifie que les cessions de l'art. 213 ont reçu le consentement unanime ou l'autorisation du juge, que les prix sont cohérents avec des estimations indépendantes, et que les cessions globales ont été votées aux majorités de l'art. 215. Une vente irrégulière est nulle (art. 215-1) : l'actif revient à la société, le prix doit être restitué, et le résultat de liquidation doit être corrigé.",
      },
      { type: 'intertitre', texte: "9.5.2 Les pouvoirs du liquidateur et la cession globale" },
      {
        type: 'filet',
        titre: "Les pouvoirs du liquidateur dans le régime des articles 223 et suivants",
        texte: "Dans la liquidation régie par les art. 223 et suivants, le liquidateur représente la société et dispose des pouvoirs les plus étendus pour **réaliser l'actif**, même à l'amiable. Les restrictions statutaires ne sont pas opposables aux tiers (art. 230). Il paie les créanciers et répartit le solde entre les associés, mais il ne peut **continuer les affaires** en cours ou en engager de nouvelles que s'il y est autorisé par le juge (art. 231). LUKENIE FRIGO peut donc honorer les contrats de location en cours jusqu'à leur terme si le juge l'y autorise, mais pas signer de nouveaux baux de chambres froides.",
      },
      {
        type: 'paragraphe',
        texte: "La cession globale de l'actif, prévue par l'article 215, est une autre voie de sortie. Au lieu de vendre les chambres froides, les camions et les créances un par un, le liquidateur peut céder l'ensemble à un repreneur, ou l'apporter à une autre société, notamment par une fusion (chapitre 8). Cette solution préserve souvent mieux la valeur, car un ensemble en état de marche vaut plus que la somme de ses pièces détachées. Elle suppose toutefois une décision des associés aux majorités renforcées de l'article 215 : l'unanimité dans une SNC, la majorité de modification des statuts dans une SARL, les conditions de l'AGE dans une société par actions. Comptablement, le prix global doit être ventilé entre les éléments cédés, pour mesurer le résultat de liquidation sur chacun.",
      },
    ],
  },
  {
    numero: '9.6',
    titre: "Quand le juge organise la liquidation (art. 223-241)",
    navLabel: "Régime légal",
    blocs: [
      { type: 'intertitre', texte: "9.6.1 Le régime légal de liquidation" },
      {
        type: 'paragraphe',
        texte: "Les actionnaires de LUKENIE FRIGO auraient pu se diviser sur le choix du liquidateur. Pour ces situations, l'Acte uniforme prévoit un **régime légal** de liquidation, plus encadré, défini aux articles 224 à 241. Il s'applique dans deux cas (art. 223). Le premier est une liquidation amiable pour laquelle les statuts ou une convention entre associés n'ont rien prévu, ou qui renvoie expressément à ces articles. Le second est une décision de justice rendue à la demande de la majorité des associés d'une SNC, d'associés représentant au moins le **dixième du capital** dans les autres formes, de créanciers sociaux ou du représentant de la masse des obligataires. Dans ce second cas, les clauses statutaires contraires sont réputées non écrites.",
      },
      {
        type: 'carte',
        titre: "Tableau 9.5 — Le calendrier d'un liquidateur désigné par le juge",
        tableau: {
          entetes: ["Échéance", "Obligation", "Article"],
          lignes: [
            ["Jour de la décision", "Fin des pouvoirs du conseil d'administration ou des dirigeants", "224"],
            ["6 mois (12 sur autorisation)", "Rapport aux associés sur l'actif, le passif, la poursuite des opérations et le délai nécessaire ; demande des autorisations utiles", "228"],
            ["3 mois après chaque clôture", "États financiers annuels au vu de l'inventaire et rapport écrit sur les opérations de l'exercice", "232"],
            ["6 mois après chaque clôture", "Assemblée annuelle sur les comptes, sauf dispense judiciaire ; à défaut, dépôt du rapport au RCCM", "233"],
            ["15 jours après une décision de répartition", "Dépôt des fonds sur un compte bancaire au nom de la société en liquidation", "239"],
            ["1 an après la clôture", "Dépôt des sommes non réclamées sur un compte séquestre au Trésor public", "240"],
            ["3 ans au plus", "Durée du mandat, renouvelable en justice sur demande motivée", "227"],
          ],
        },
        note: "La plupart de ces obligations sont assorties de sanctions pénales lorsque le liquidateur les méconnaît sciemment (art. 903).",
      },
      {
        type: 'paragraphe',
        texte: "Ce régime légal est détaillé parce que le liquidateur désigné par le juge intervient dans un contexte de conflit : associés divisés, créanciers inquiets, obligataires sans interlocuteur. Les échéances imposées (rapport dans les six mois, comptes annuels, assemblée annuelle) garantissent que la liquidation avance et que chacun est informé. Le mandat limité à trois ans, renouvelable seulement sur demande motivée (art. 227), empêche qu'une liquidation s'éternise. Le juge garde la main : il peut prolonger les délais, autoriser la poursuite de l'activité, dispenser de l'assemblée annuelle ou trancher une répartition contestée. Ce régime s'applique aussi à une liquidation amiable lorsque les statuts n'ont rien prévu (art. 223, 1°), ce qui est fréquent dans les petites sociétés.",
      },
      { type: 'intertitre', texte: "9.6.2 Les comptes pendant la liquidation" },
      {
        type: 'paragraphe',
        texte: "Pour le comptable, l'obligation la plus lourde est celle de l'article 232. La liquidation ne suspend pas la comptabilité. Tant qu'elle dure, chaque exercice se clôture par un inventaire et des états financiers de synthèse, établis dans les trois mois. Une liquidation qui s'étend sur deux ou trois ans produit donc deux ou trois jeux de comptes annuels avant les comptes définitifs. Les associés conservent leur droit de communication des documents sociaux (art. 234), et l'assemblée annuelle statue aux majorités de l'art. 235 : unanimité en SNC, majorité en capital en SARL, conditions de l'AGE en société par actions, les associés liquidateurs prenant part au vote.",
      },
      { type: 'intertitre', texte: "9.6.3 La répartition" },
      {
        type: 'carte',
        titre: "Encadré 9.2 — Les quatre règles de la répartition",
        liste: [
          "**Opportunité** : sous réserve des droits des créanciers, le liquidateur décide s'il y a lieu de distribuer les fonds disponibles **en cours** de liquidation ; après mise en demeure infructueuse, tout intéressé peut saisir le juge (art. 241).",
          "**Clé de partage** : sauf clause contraire, les capitaux propres restant après remboursement du nominal se partagent **au prorata de la participation au capital** (art. 237).",
          "**Publicité** : toute décision de répartition est publiée dans le journal qui a publié la nomination du liquidateur, et notifiée aux titulaires de titres nominatifs (art. 238).",
          "**Consignation** : fonds déposés en banque dans les quinze jours ; sommes non réclamées versées au Trésor un an après la clôture (art. 239-240).",
        ],
      },
      {
        type: 'paragraphe',
        texte: "La clé de partage de l'article 237 s'applique « sauf clause contraire des statuts ». Une société qui a émis des **actions de préférence** peut ainsi avoir prévu que certaines actions reçoivent un boni majoré ou soient remboursées en priorité. Des actions **amorties** (chapitre 5) ont déjà reçu le remboursement de leur nominal : leurs porteurs, titulaires d'actions de jouissance, ne peuvent pas le percevoir une seconde fois lors de la liquidation. Le liquidateur doit donc lire attentivement les statuts et l'historique du capital avant de calculer ce qui revient à chacun. Pour LUKENIE FRIGO, aucune de ces particularités n'existe : les 2 000 actions ordinaires reçoivent chacune la même somme.",
      },
      {
        type: 'paragraphe',
        texte: "La répartition en cours de liquidation exige de la prudence. Les associés attendent leur argent, et une trésorerie qui dort sur un compte bancaire ne leur rapporte rien. Mais tant que toutes les dettes ne sont pas connues, notamment l'impôt de liquidation et les litiges, chaque franc distribué est un franc qui pourrait manquer aux créanciers. L'article 241 laisse la décision au liquidateur, sous réserve des droits des créanciers. La pratique consiste à distribuer par tranches, en conservant une réserve pour les dettes probables. Si le liquidateur tarde sans raison, tout intéressé peut le mettre en demeure puis saisir le juge. Pour LUKENIE FRIGO, le cabinet a choisi de ne rien distribuer avant d'avoir payé les fournisseurs et évalué l'impôt.",
      },
    ],
  },
  {
    numero: '9.7',
    titre: "Le dispositif comptable de la liquidation",
    navLabel: "Principes comptables",
    blocs: [
      { type: 'intertitre', texte: "9.7.1 Les phases comptables" },
      {
        type: 'paragraphe',
        texte: "L'AUDCIF définit la liquidation comme l'ensemble des opérations qui, après la dissolution, ont pour objet la **réalisation des éléments d'actif** et le **paiement des créanciers sociaux**, en vue du **partage** de l'actif net subsistant entre les associés (ch. 40, § 1.1). Il en découle un changement de perspective. Tant que la société vivait, ses comptes reposaient sur la continuité d'exploitation : les actifs valaient par leur utilité future. En liquidation, ils valent ce qu'on en tirera à la vente. C'est pourquoi la comptabilité de liquidation mesure un résultat d'un genre particulier : l'écart entre ce que la réalisation rapporte et ce que les éléments valaient au bilan.",
      },
      {
        type: 'carte',
        titre: "Tableau 9.6 — Les quatre phases comptables de la liquidation",
        tableau: {
          entetes: ["Phase", "Travaux", "Document produit"],
          lignes: [
            ["1. Début de la liquidation", "Inventaire du patrimoine, solde des amortissements et provisions existants", "Bilan avant liquidation"],
            ["2. Opérations de liquidation", "Cession des immobilisations et des stocks, recouvrement des créances, paiement des dettes, règlement des frais", "Écritures en 837/847 ou directement au résultat de liquidation"],
            ["3. Bilan de la liquidation", "Détermination du boni, du mali ou d'une insuffisance d'actif", "Compte définitif de liquidation, présenté sous forme de bilan"],
            ["4. Clôture", "Constatation des droits des associés, partage, règlement", "Tous les comptes soldés"],
          ],
        },
      },
      { type: 'intertitre', texte: "9.7.2 Les comptes de la liquidation" },
      {
        type: 'carte',
        titre: "Tableau 9.7 — Les comptes de la liquidation",
        tableau: {
          entetes: ["Compte", "Contenu"],
          lignes: [
            ["837 Charges liées aux opérations de liquidation", "Pertes sur la réalisation de l'actif et le paiement du passif ; frais de liquidation"],
            ["847 Produits liés aux opérations de liquidation", "Profits sur la réalisation de l'actif et le paiement du passif ; annulation des provisions"],
            ["1384 Résultat de liquidation", "Différence entre 847 et 837, ou, par simplification, compte mouvementé directement"],
            ["4619 Apporteurs, capital à rembourser", "Droits des associés au moment du partage"],
          ],
        },
        note: "[texte officiel] Le chapitre 40 de l'AUDCIF nomme le résultat de liquidation « 1374 », alors que le plan de comptes ne connaît que le **1384 Résultat de liquidation** (sous le 138, résultat HAO ; le 137 est le résultat des activités ordinaires). Le Guide, dans l'Application 122, passe toutes ses écritures au 1384. Ce cours retient le 1384. L'AUDCIF intitule aussi le 4619 « Associés, capital à rembourser », là où le plan de comptes écrit « Apporteurs ».",
      },
      {
        type: 'paragraphe',
        texte: "L'inventaire d'ouverture a une conséquence souvent oubliée : il faut **solder** les amortissements et les provisions existants, c'est-à-dire les faire disparaître au moment de la sortie des actifs auxquels ils se rattachent (AUDCIF, ch. 40, § 2.1). Dans les écritures de l'Application 122, les amortissements du bâtiment (2831) et du matériel (2841) sont débités lors de la cession, et la dépréciation des stocks (391) lors de leur vente. La dépréciation des créances douteuses (4912) est annulée au crédit du résultat de liquidation, pendant que la perte réelle est constatée. Rien ne doit rester au bilan final qui ne corresponde à de la trésorerie ou à des droits des associés.",
      },
      { type: 'intertitre', texte: "9.7.3 Le bilan avant liquidation" },
      {
        type: 'paragraphe',
        texte: "Le **bilan avant liquidation** de LUKENIE FRIGO au 25 janvier N est repris de l'Application 122. À l'actif : bâtiments industriels 40 000 000 amortis de 26 500 000 (net 13 500 000), matériel industriel 20 000 000 amorti de 15 000 000 (net 5 000 000), stocks de marchandises 7 500 000 dépréciés de 3 450 000 (net 4 050 000), créances clients 22 500 000 dépréciées de 3 900 000 (net 18 600 000, dont 11 500 000 de créances douteuses), banque 9 850 000. Total : 51 000 000. Au passif : capital 20 000 000 (2 000 actions de 10 000), réserves 14 000 000, fournisseurs 17 000 000. Les capitaux propres comptables s'élèvent à 34 000 000, soit 17 000 par action. La liquidation dira si la réalisation fait mieux ou moins bien.",
      },
    ],
  },
  {
    numero: '9.8',
    titre: "La réalisation de l'actif et le résultat de liquidation (Application 122)",
    navLabel: "Réalisation",
    blocs: [
      { type: 'intertitre', texte: "9.8.1 La méthode directe" },
      {
        type: 'paragraphe',
        texte: "Entre février et septembre N, MWANGAZA CONSEIL réalise l'actif. Le bâtiment est vendu 25 000 000, le matériel 4 500 000, les stocks 3 750 000. Les créances douteuses (nominal 11 500 000) sont recouvrées pour 8 500 000. Les autres clients (11 000 000) paient par anticipation sous déduction d'un escompte de 1 500 000. Les fournisseurs sont réglés pour 17 000 000, et les frais de liquidation s'élèvent à 3 000 000. Le Guide propose de tout passer directement au 1384.",
      },
      {
        type: 'carte',
        titre: "Exemple 9.1 — Application 122 : écritures selon la méthode directe",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["521", "", "Vente du bâtiment", "25 000 000", ""],
            ["", "1384", "Résultat de liquidation", "", "25 000 000"],
            ["1384 / 2831", "", "Sortie : VNC 13 500 000 ; amortissements 26 500 000", "40 000 000", ""],
            ["", "231", "Bâtiments industriels", "", "40 000 000"],
            ["521", "", "Vente du matériel", "4 500 000", ""],
            ["", "1384", "Résultat de liquidation", "", "4 500 000"],
            ["1384 / 2841", "", "Sortie : VNC 5 000 000 ; amortissements 15 000 000", "20 000 000", ""],
            ["", "2411", "Matériel industriel", "", "20 000 000"],
            ["521", "", "Vente des stocks", "3 750 000", ""],
            ["", "1384", "Résultat de liquidation", "", "3 750 000"],
            ["1384 / 391", "", "Sortie : valeur nette 4 050 000 ; dépréciation 3 450 000", "7 500 000", ""],
            ["", "311", "Stocks de marchandises", "", "7 500 000"],
            ["521", "", "Recouvrement des créances douteuses", "8 500 000", ""],
            ["", "4162", "Créances douteuses", "", "8 500 000"],
            ["4912", "", "Annulation de la dépréciation des créances", "3 900 000", ""],
            ["", "1384", "Résultat de liquidation", "", "3 900 000"],
            ["1384", "", "Perte sur créances douteuses", "3 000 000", ""],
            ["", "4162", "Créances douteuses", "", "3 000 000"],
            ["521 / 1384", "", "Autres clients : encaissement 9 500 000 ; escompte 1 500 000", "11 000 000", ""],
            ["", "411", "Clients", "", "11 000 000"],
            ["401", "", "Paiement des fournisseurs", "17 000 000", ""],
            ["", "521", "Banques", "", "17 000 000"],
            ["1384", "", "Frais de liquidation", "3 000 000", ""],
            ["", "521", "Banques", "", "3 000 000"],
          ],
        },
        note: "Crédits du 1384 : 25 000 000 + 4 500 000 + 3 750 000 + 3 900 000 = 37 150 000. Débits : 13 500 000 + 5 000 000 + 4 050 000 + 3 000 000 + 1 500 000 + 3 000 000 = 30 050 000. **Boni de liquidation : 7 100 000.** Banque : 9 850 000 + 25 000 000 + 4 500 000 + 3 750 000 + 8 500 000 + 9 500 000 − 17 000 000 − 3 000 000 = **41 100 000**.",
      },
      {
        type: 'paragraphe',
        texte: "Une subtilité concerne l'**escompte** accordé aux clients qui paient avant l'échéance. Dans une société en activité, ce serait une charge financière. En liquidation, c'est le prix de l'accélération : le liquidateur préfère encaisser 9 500 000 tout de suite plutôt que 11 000 000 dans plusieurs mois, avec le risque que certains clients ne paient jamais et le coût de maintenir la structure ouverte en attendant. Le Guide porte cet escompte au débit du résultat de liquidation, avec les autres coûts de la réalisation. Le même raisonnement vaut pour les rabais consentis sur les stocks : un acheteur qui sait que le vendeur doit liquider négocie en conséquence. Le résultat de liquidation mesure ainsi, au-delà des plus et moins-values, le coût du temps.",
      },
      {
        type: 'paragraphe',
        texte: "Le boni s'analyse ainsi. Le bâtiment rapporte 11 500 000 de plus que sa valeur nette : les amortissements comptables avaient réduit sa valeur plus vite que le marché. À l'inverse, le matériel (−500 000) et les stocks (−300 000) se vendent un peu sous leur valeur nette. Sur les créances douteuses, la dépréciation de 3 900 000 s'avère presque juste : la perte réelle est de 3 000 000, et la différence de 900 000 améliore le résultat. L'escompte (1 500 000) et les frais (3 000 000) sont le coût de la liquidation elle-même. Au total, les actionnaires récupéreront plus que la valeur comptable de leurs capitaux propres : le boni de 7 100 000 vient essentiellement du bâtiment.",
      },
      { type: 'intertitre', texte: "9.8.2 La méthode par les comptes 837 et 847" },
      {
        type: 'carte',
        titre: "Exemple 9.2 — Application 122 : écritures par les comptes 837 et 847",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["847", "", "Produits liés aux opérations de liquidation : 25 000 000 + 4 500 000 + 3 750 000 + 3 900 000", "37 150 000", ""],
            ["", "837", "Charges liées aux opérations de liquidation : 13 500 000 + 5 000 000 + 4 050 000 + 3 000 000 + 1 500 000 + 3 000 000", "", "30 050 000"],
            ["", "1384", "Résultat de liquidation (boni)", "", "7 100 000"],
          ],
        },
        note: "Chaque contrepartie du 1384 de la méthode directe devient un débit du 837 ou un crédit du 847. L'écriture de regroupement ci-dessus solde ces deux comptes en fin d'opérations.",
      },
      {
        type: 'filet',
        titre: "Prix de cession et valeur comptable ne se compensent pas",
        texte: "Le prix de vente ne se compense pas directement avec la valeur comptable, comme le ferait une écriture unique « débit 521, crédit immobilisation ». Le compte d'immobilisation doit être soldé pour sa valeur **brute**, les amortissements pour leur **cumul**, et le résultat de liquidation doit recevoir séparément le prix et la valeur nette. Sinon, le bilan conserve des résidus d'immobilisations et d'amortissements qui n'ont plus de réalité, et le résultat de liquidation est faux. Le cas TSHIKAPA DIAMANT SERVICES (cas 5) illustre cette erreur.",
      },
      {
        type: 'filet',
        titre: "Le choix entre les deux méthodes",
        texte: "La méthode directe est plus rapide, mais elle ne laisse qu'un solde : pour savoir ce qu'a coûté la liquidation, il faut reprendre toutes les écritures. Le passage par le 837 et le 847 conserve une vue « compte de résultat » de la période de liquidation. C'est utile pour le rapport annuel du liquidateur (art. 232), pour l'assemblée de clôture qui statue sur le quitus (art. 217) et pour défendre sa gestion si sa responsabilité est recherchée (art. 221). Dans une liquidation longue ou contestée, la seconde méthode est la plus prudente.",
      },
      {
        type: 'filet',
        titre: "Un résultat de liquidation négatif",
        texte: "Supposons que le bâtiment ne se soit vendu que 10 000 000. Le 1384 aurait reçu 10 000 000 au crédit et 13 500 000 au débit pour ce seul bien, soit une perte de 3 500 000 au lieu d'un gain de 11 500 000. Le résultat de liquidation serait passé de +7 100 000 à −7 900 000 : un **mali**. La banque finale aurait été de 26 100 000, et chaque actionnaire aurait récupéré 13 050 par action, moins que les capitaux propres comptables de départ (17 000). Les associés supportent le mali dans la limite de leurs apports ; au-delà, c'est une insuffisance d'actif, et les créanciers ne sont pas intégralement payés.",
      },
    ],
  },
  {
    numero: '9.9',
    titre: "La clôture, le partage et la radiation",
    navLabel: "Clôture et partage",
    blocs: [
      { type: 'intertitre', texte: "9.9.1 Le bilan de clôture et le partage" },
      {
        type: 'paragraphe',
        texte: "Octobre N. Il ne reste à LUKENIE FRIGO qu'un compte bancaire créditeur de 41 100 000. Son **bilan de clôture** tient en une ligne à l'actif, la banque, et trois au passif : capital 20 000 000, réserves 14 000 000, résultat de liquidation 7 100 000. Chaque actionnaire va récupérer 41 100 000 / 2 000 = **20 550** par action, soit le nominal (10 000), sa part des réserves (7 000) et sa part du boni (3 550). La clé de partage est celle de l'article 237 : remboursement du nominal, puis partage du surplus au prorata du capital, sauf clause contraire.",
      },
      {
        type: 'carte',
        titre: "Exemple 9.3 — Application 122 : les écritures de partage",
        tableau: {
          entetes: ["Débit", "Crédit", "Libellé", "Montant débit", "Montant crédit"],
          lignes: [
            ["101", "", "Capital social", "20 000 000", ""],
            ["11", "", "Réserves", "14 000 000", ""],
            ["1384", "", "Résultat de liquidation (boni)", "7 100 000", ""],
            ["", "4619", "Apporteurs, capital à rembourser", "", "41 100 000"],
            ["4619", "", "Règlement des actionnaires", "41 100 000", ""],
            ["", "521", "Banques", "", "41 100 000"],
          ],
        },
        note: "Après cette écriture, tous les comptes de la société sont soldés (AUDCIF, ch. 40, § 2.2.2). En cas de **mali**, le 1384 est débiteur : il est crédité pour solde et vient réduire le 4619. Les associés récupèrent alors moins que les capitaux propres comptables. En cas d'**insuffisance d'actif**, la trésorerie ne suffit même pas à payer les créanciers : la liquidation amiable n'est plus possible, et la société relève des procédures collectives, que l'art. 203 exclut du champ de ces règles.",
      },
      {
        type: 'paragraphe',
        texte: "Le bilan de clôture n'est pas un bilan comme les autres. Il ne sert plus à mesurer une performance ni à évaluer une entreprise qui continue : il constate simplement ce qui reste pour les associés. On y trouve la trésorerie à l'actif et, au passif, les capitaux propres d'origine augmentés du boni (ou diminués du mali). S'il reste des dettes, ce n'est pas un bilan de clôture : la liquidation n'est pas finie. S'il reste des actifs non monétaires, le liquidateur doit soit les vendre, soit les attribuer en nature aux associés avec leur accord, en les évaluant pour calculer les droits de chacun. Cette attribution en nature se comptabilise comme un règlement du 4619 par la sortie de l'actif concerné, à sa valeur d'attribution.",
      },
      { type: 'intertitre', texte: "9.9.2 L'assemblée de clôture et la radiation" },
      {
        type: 'paragraphe',
        texte: "Il reste à fermer juridiquement la société. Le cabinet convoque l'**assemblée de clôture**, qui statue sur les comptes définitifs, donne quitus au liquidateur, le décharge de son mandat et constate la clôture (art. 217). Si personne ne convoque, tout associé peut demander au juge un mandataire ad hoc. Si l'assemblée ne peut délibérer ou refuse les comptes, le juge statue à sa place, et le liquidateur dépose ses comptes au RCCM (art. 218). Les comptes définitifs sont ensuite déposés au RCCM avec la décision d'approbation (art. 219). Dans le mois qui suit la **publication de la clôture**, le liquidateur demande la **radiation** (art. 220). Tout cela doit intervenir dans les **trois ans** de la dissolution, sinon le ministère public ou tout intéressé peut saisir le juge (art. 216).",
      },
      {
        type: 'paragraphe',
        texte: "L'assemblée de clôture a une portée juridique propre. En votant le **quitus**, les associés approuvent la gestion du liquidateur ; la **décharge** met fin à son mandat. Le quitus ne supprime pas la responsabilité du liquidateur envers les tiers, qui peuvent agir dans les délais de l'article 221, mais il rend plus difficile une action des associés qui ont approuvé les comptes en connaissance de cause. C'est pourquoi le liquidateur prépare un dossier complet : comptes définitifs, détail des cessions, liste des créanciers payés, justification des frais, rapprochement bancaire. Pour LUKENIE FRIGO, le choix du passage par le 837 et le 847 aurait permis de présenter en une page les charges et les produits de la liquidation.",
      },
      { type: 'intertitre', texte: "9.9.3 Les actions après la radiation" },
      {
        type: 'carte',
        titre: "Tableau 9.8 — Les actions qui subsistent après la radiation",
        tableau: {
          entetes: ["Contre qui ?", "Délai", "Point de départ"],
          lignes: [
            ["Le liquidateur (action sociale ou individuelle)", "3 ans ; 10 ans si le fait est qualifié crime", "Fait dommageable, ou sa révélation s'il a été dissimulé (art. 221)"],
            ["Les associés non liquidateurs, leurs conjoints survivants, héritiers ou ayants cause", "5 ans", "Publication de la dissolution au RCCM (art. 222)"],
          ],
        },
        note: "Un créancier oublié qui se manifeste après la clôture peut donc encore agir, dans ces délais, contre les associés qui ont reçu les fonds du partage ou contre le liquidateur qui l'a omis.",
      },
      {
        type: 'paragraphe',
        texte: "La prescription triennale de l'action contre le liquidateur court du fait dommageable, et non de la clôture. Pour une vente à vil prix conclue en février N et connue de tous, l'action est ouverte jusqu'en février N+3. Si le liquidateur a dissimulé l'opération et qu'elle n'est révélée qu'en mars N+2, le délai court de cette révélation : l'action reste possible jusqu'en mars N+5. La faute qualifiée de crime, par exemple un détournement de fonds, porte le délai à dix ans. Pour un liquidateur, la meilleure protection reste la transparence : décisions motivées, prix justifiés par des estimations, rapports réguliers aux associés et comptes approuvés en assemblée.",
      },
      {
        type: 'paragraphe',
        texte: "Ces délais de prescription expliquent pourquoi les liquidateurs expérimentés procèdent à une **publicité** large et à un recensement minutieux des créanciers. Un créancier oublié qui se manifeste après la clôture n'a plus de société contre laquelle agir, mais il peut se retourner contre les associés qui ont reçu les fonds, dans la limite de ce qu'ils ont perçu, pendant cinq ans à compter de la publication de la dissolution (art. 222). Il peut aussi rechercher la responsabilité du liquidateur, s'il prouve une faute, pendant trois ans (art. 221). Le liquidateur a donc tout intérêt à constituer une réserve pour les litiges connus et à ne clôturer qu'une fois les réclamations prévisibles réglées.",
      },
    ],
  },
  {
    numero: '9.10',
    titre: "Les obligations fiscales de la liquidation",
    navLabel: "Fiscalité",
    blocs: [
      { type: 'intertitre', texte: "9.10.1 L'exigibilité de l'impôt" },
      {
        type: 'paragraphe',
        texte: "Pour la DGI, la dissolution n'efface pas l'impôt : elle en accélère l'exigibilité. En cas de dissolution, la loi n° 23/053 prévoit une **cotisation spéciale immédiate** d'après les résultats de la période d'activité et, en cas de liquidation, une **seconde cotisation** d'après le dernier bilan de liquidation (art. 13). Les **bénéfices de liquidation** font partie du bénéfice imposable (art. 11). Pour LUKENIE FRIGO, cela signifie deux choses. Le résultat de l'exercice N jusqu'au 25 janvier est imposé sans attendre le calendrier normal. Et le boni de 7 100 000, qui provient surtout de la plus-value sur le bâtiment, entre dans la base de la seconde cotisation. Le liquidateur doit donc garder la trésorerie nécessaire avant de partager.",
      },
      {
        type: 'carte',
        titre: "Encadré 9.3 — Les points d'attention fiscaux du liquidateur",
        liste: [
          "**Quitus fiscal** : les mutations d'immeubles et de véhicules exigent la présentation d'un quitus fiscal, attestation de la DGI établissant que la société est en règle de paiement (arrêté ministériel n° 028 du 28 septembre 2022, art. 3). Sans lui, la vente du bâtiment de LUKENIE FRIGO bloque.",
          "**Numéro Impôt** : la clôture de la liquidation après dissolution fait partie des cas de retrait du Numéro Impôt, définitivement désactivé ensuite (décret n° 03/012 et mesures d'exécution).",
          "**Associés** : la répartition qui présente le caractère d'un remboursement d'apports n'est pas un revenu distribué, mais elle n'a ce caractère que si les bénéfices et réserves autres que la réserve légale ont été auparavant répartis (art. 74). Les réserves et le boni versés aux associés relèvent donc en principe des revenus distribués (art. 73). Pour un associé personne physique, la plus-value réalisée à l'occasion de la liquidation d'une société entre en outre dans les plus-values imposables de l'art. 82. Chaque situation doit être vérifiée au regard de ces textes avant tout versement.",
        ],
      },
      {
        type: 'paragraphe',
        texte: "Ces règles invitent à une discipline de calendrier. Un liquidateur prudent commence par solder la situation fiscale (déclarations, cotisation spéciale, retenues), obtient le quitus nécessaire aux ventes immobilières, puis réalise l'actif. Il constitue une réserve pour la seconde cotisation d'IS et ne partage qu'une fois l'impôt et les retenues éventuelles sur les répartitions déterminés. Répartir trop tôt, c'est exposer les associés à des actions en restitution pendant cinq ans (art. 222) et exposer le liquidateur à une mise en cause de sa responsabilité (art. 221).",
      },
      { type: 'intertitre', texte: "9.10.2 Bilan de la liquidation de LUKENIE FRIGO" },
      {
        type: 'paragraphe',
        texte: "Au terme de ce parcours, la liquidation de LUKENIE FRIGO a duré neuf mois, dégagé un boni de 7 100 000 et rendu 20 550 à chaque action de 10 000 de nominal. Le cadre juridique a imposé ses étapes (publicité, nomination, contrôle des cessions, assemblée de clôture, radiation), la comptabilité a mesuré le résultat de la réalisation, et la fiscalité a prélevé sa part à deux moments. La même logique s'applique à une petite SARL comme à une grande SA : seule l'échelle change. Le chapitre 10 étudie les sociétés particulières (société en participation, GIE, transformation) : on y retrouvera des questions voisines, notamment celle de la continuité de la personne morale lors d'un changement de forme.",
      },
      {
        type: 'filet',
        titre: "La liquidation de l'entreprise individuelle",
        texte: "Le chapitre 40 de l'AUDCIF (section 3) traite aussi de la liquidation de l'entité individuelle : vente, apport en société ou liquidation judiciaire. La méthode est simplifiée. Les charges et produits du paiement du passif, les frais et l'écart entre la valeur nette des actifs et leur prix de vente passent directement au résultat de liquidation. Celui-ci est ensuite viré au **compte de l'exploitant (104)**, et les disponibilités sont transférées au patrimoine privé. Il n'y a ni associés à rembourser ni partage : c'est la même personne qui reprend le solde.",
      },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: "SANGHA MENUISERIE SA : liquidation complète",
    contexte: "SANGHA MENUISERIE SA cesse son activité le 31/03/N. Bilan : matériel industriel 30 000 000 / amortissements 21 000 000 → 9 000 000 net ; stocks 12 000 000 / dépréciation 2 000 000 → 10 000 000 ; clients 18 000 000 / dépréciation 4 000 000 → 14 000 000 ; banques 6 000 000. Total 39 000 000. Passif : capital 15 000 000 (3 000 actions de 5 000), réserves 9 000 000, fournisseurs 15 000 000. Réalisations : matériel cédé 12 500 000 ; stocks cédés 7 000 000 ; créances encaissées 15 500 000 (le solde étant irrécouvrable) ; frais de liquidation 2 200 000. Les fournisseurs sont intégralement réglés.",
    questions: [
      {
        num: 1,
        enonce: "Passez les écritures de réalisation de l'actif (méthode directe, compte de résultat de liquidation 1384).",
        correction: "Matériel : débit 521 12 500 000 / crédit 1384 ; puis débit 1384 9 000 000 et débit 2841 Amortissements 21 000 000 / crédit 2411 pour 30 000 000. Stocks : débit 521 7 000 000 / crédit 1384 ; puis débit 1384 10 000 000 et débit 39 Dépréciation 2 000 000 / crédit 31 Stocks 12 000 000. Créances : débit 521 15 500 000 / crédit 411-4162 pour 15 500 000 ; débit 49 Dépréciation 4 000 000 / crédit 1384 pour 4 000 000 ; perte sur le solde irrécouvrable (18 000 000 − 15 500 000 = 2 500 000) : débit 1384 2 500 000 / crédit 411-4162 pour 2 500 000.",
      },
      {
        num: 2,
        enonce: "Passez les écritures de règlement du passif et des frais, puis déterminez le résultat de liquidation.",
        correction: "Fournisseurs : débit 401 15 000 000 / crédit 521. Frais : débit 1384 2 200 000 / crédit 521. Produits portés au 1384 : 12 500 000 + 7 000 000 + 4 000 000 = 23 500 000. Charges : 9 000 000 + 10 000 000 + 2 500 000 + 2 200 000 = 23 700 000. Solde : mali de liquidation de 200 000 (compte 1384 débiteur).",
      },
      {
        num: 3,
        enonce: "Établissez le bilan de clôture avant partage.",
        correction: "Trésorerie : 6 000 000 + 12 500 000 + 7 000 000 + 15 500 000 − 15 000 000 − 2 200 000 = 23 800 000. Bilan : banques 23 800 000 à l'actif ; au passif, capital 15 000 000 + réserves 9 000 000 − mali de liquidation 200 000 = 23 800 000. L'équilibre confirme les écritures.",
      },
      {
        num: 4,
        enonce: "Passez les écritures de partage et calculez le remboursement par action.",
        correction: "Débit 101 Capital 15 000 000 et débit 11 Réserves 9 000 000 / crédit 1384 pour 200 000 (apurement du mali) et crédit 4619 Apporteurs, capital à rembourser 23 800 000 ; puis débit 4619 23 800 000 / crédit 521 pour 23 800 000. Par action : 23 800 000 / 3 000 = 7 933,33 — soit plus que le nominal de 5 000 grâce aux réserves, malgré le mali de liquidation.",
      },
      {
        num: 5,
        enonce: "Quelles formalités juridiques encadrent la fin de cette liquidation ?",
        correction: "Clôture dans les trois ans de la dissolution (art. 216) ; convocation des associés pour statuer sur les comptes définitifs, donner quitus au liquidateur et décharge de son mandat, et constater la clôture (art. 217) — à défaut, désignation judiciaire d'un mandataire ad hoc, ou décision de justice en lieu et place de l'assemblée (art. 218) ; dépôt des comptes définitifs au RCCM avec la décision (art. 219) ; demande de radiation par le liquidateur dans le mois de la publication de la clôture (art. 220). La personnalité morale a subsisté jusqu'à cette publication (art. 205).",
      },
    ],
  },
  {
    id: 'cas2',
    titre: "LOMELA TRADING SARLU : dissolution sans liquidation",
    contexte: "LOMELA TRADING SARLU a pour associée unique la société KATANGA HOLDING SA. L'associée unique décide, le 15/02/N, la dissolution de sa filiale, publiée le 20/02/N. Un fournisseur, créancier depuis N−1 pour 8 000 000, s'inquiète du sort de sa créance.",
    questions: [
      {
        num: 1,
        enonce: "Y aura-t-il liquidation de LOMELA TRADING ?",
        correction: "Non. L'associé unique étant une personne morale, l'article 201, alinéa 4, s'applique : la dissolution entraîne la transmission universelle du patrimoine de la société à cet associé, sans qu'il y ait lieu à liquidation. L'exception de l'alinéa 5 — mise en liquidation de plein droit — ne vise que les sociétés dont l'associé unique est une personne physique.",
      },
      {
        num: 2,
        enonce: "Quels sont les droits du fournisseur créancier ?",
        correction: "Il peut faire opposition à la dissolution devant la juridiction compétente dans le délai de trente jours à compter de la publication (soit jusqu'au 22/03/N). La juridiction rejette l'opposition ou ordonne soit le remboursement des créances, soit la constitution de garanties si la société en offre et si elles sont jugées suffisantes (art. 201, al. 4).",
      },
      {
        num: 3,
        enonce: "Quand la transmission du patrimoine est-elle réalisée ?",
        correction: "À l'issue du délai d'opposition de trente jours ou, en cas d'opposition, lorsque celle-ci a été rejetée, que le remboursement des créances a été effectué ou que les garanties ont été constituées (art. 201, al. 4). C'est à ce moment que la société disparaît — la dissolution n'ayant, en tout état de cause, d'effet à l'égard des tiers qu'à compter de sa publication (al. 1er).",
      },
      {
        num: 4,
        enonce: "En quoi ce mécanisme diffère-t-il, dans ses effets patrimoniaux, d'une fusion-absorption de la filiale par sa mère ?",
        correction: "Les deux produisent une transmission universelle du patrimoine à l'associé unique ou à l'absorbante, sans liquidation. Mais la fusion suppose un projet, une publicité un mois avant, des assemblées dans chaque société, une déclaration de conformité (art. 193-198) et, le plus souvent, une augmentation de capital rémunérant les associés extérieurs — inexistants ici. La dissolution de l'unipersonnelle est plus légère : décision de l'associé unique, publicité, délai d'opposition de trente jours. Comptablement, la mère n'a pas d'apports à rémunérer : elle reprend actifs et passifs et annule les titres de la filiale, l'écart constituant un boni ou un mali.",
      },
    ],
  },
  {
    id: 'cas3',
    titre: "KASONGO TEXTILE SA : irrégularités de la liquidation",
    contexte: "KASONGO TEXTILE SA est dissoute le 10/01/N par décision de l'assemblée. Plusieurs événements : (a) le liquidateur, M. N., ancien directeur général, se porte acquéreur du principal entrepôt de la société ; (b) le liquidateur souhaite céder l'entrepôt secondaire à son fils ; (c) un actionnaire minoritaire estime que le liquidateur mène la liquidation avec négligence et veut le faire remplacer ; (d) au 15/03/N+3, la liquidation n'est toujours pas close.",
    questions: [
      {
        num: 1,
        enonce: "M. N. peut-il acquérir l'entrepôt principal ?",
        correction: "Deux fondements se cumulent contre lui. En tant que liquidateur, l'article 214 lui interdit purement et simplement d'acquérir tout ou partie de l'actif de la société en liquidation. En tant qu'ancien directeur général, l'article 213 aurait de toute façon exigé, sauf consentement unanime des associés, l'autorisation de la juridiction compétente, le liquidateur et le commissaire aux comptes entendus. L'opération réalisée serait nulle (art. 215-1).",
      },
      {
        num: 2,
        enonce: "La cession au fils du liquidateur est-elle possible ?",
        correction: "Non : l'article 214 étend l'interdiction aux employés du liquidateur et à leurs conjoints, ascendants ou descendants. Le fils du liquidateur est un descendant : la cession est interdite, et l'opération serait nulle (art. 215-1).",
      },
      {
        num: 3,
        enonce: "Comment l'actionnaire minoritaire peut-il agir contre le liquidateur ?",
        correction: "Deux voies. Révocation : le liquidateur peut être révoqué selon les formes prévues pour sa nomination — ici les conditions des AGE (art. 206, 4° et 211, al. 1er) — mais tout associé, même minoritaire, peut en demander la révocation en justice si la demande est fondée sur des motifs légitimes (art. 211, al. 2). Responsabilité : le liquidateur répond envers la société et les tiers des conséquences dommageables de ses fautes, l'action se prescrivant par trois ans à compter du fait dommageable ou de sa révélation (art. 221).",
      },
      {
        num: 4,
        enonce: "Que peut-il advenir de la liquidation non close au 15/03/N+3 ?",
        correction: "Le délai de trois ans à compter de la dissolution (10/01/N) est dépassé : le ministère public ou tout intéressé peut saisir la juridiction compétente du ressort du siège afin qu'il soit procédé à la liquidation ou, celle-ci ayant commencé, à son achèvement (art. 216). L'inaction du liquidateur ne fait donc pas obstacle à la clôture : la voie judiciaire prend le relais.",
      },
    ],
  },
  {
    id: 'cas4',
    titre: "MAYUMBE BOIS SA : les deux méthodes comptables",
    contexte: "MAYUMBE BOIS SA est en liquidation. Les opérations de la période sont : cessions d'immobilisations 18 000 000 (VNC 11 000 000, amortissements cumulés 24 000 000 sur une valeur brute de 35 000 000) ; cession des stocks 5 000 000 (valeur nette 6 500 000) ; reprise de dépréciations sur créances 1 200 000 ; frais de liquidation 1 800 000 ; escomptes accordés aux clients pour règlement anticipé 700 000.",
    questions: [
      {
        num: 1,
        enonce: "Enregistrez les opérations par la méthode directe (compte de résultat de liquidation).",
        correction: "Immobilisations : débit 521 18 000 000 / crédit 1384 ; puis débit 1384 11 000 000 et débit des amortissements 24 000 000 / crédit du compte d'immobilisation 35 000 000. Stocks : débit 521 5 000 000 / crédit 1384 ; puis débit 1384 6 500 000 (et débit de la dépréciation existante s'il y en a une) / crédit du compte de stocks pour sa valeur brute. Reprise de dépréciation sur créances : débit 49 1 200 000 / crédit 1384. Escomptes : débit 1384 700 000. Frais : débit 1384 1 800 000 / crédit 521.",
      },
      {
        num: 2,
        enonce: "Déterminez le résultat de liquidation.",
        correction: "Produits portés au résultat de liquidation : 18 000 000 + 5 000 000 + 1 200 000 = 24 200 000. Charges : 11 000 000 (VNC des immobilisations) + 6 500 000 (valeur des stocks) + 700 000 (escomptes) + 1 800 000 (frais) = 20 000 000. Résultat : boni de liquidation de 4 200 000.",
      },
      {
        num: 3,
        enonce: "Présentez l'écriture de regroupement si la seconde méthode avait été retenue.",
        correction: "Les mêmes opérations auraient été portées en 847 (produits liés aux opérations de liquidation) et 837 (charges liées aux opérations de liquidation). Regroupement final : débit 847 24 200 000 / crédit 837 pour 20 000 000 et crédit 1384 Résultat de liquidation 4 200 000. Le résultat est identique ; la seconde méthode conserve la ventilation charges/produits de la période de liquidation.",
      },
      {
        num: 4,
        enonce: "Quel est l'intérêt de faire transiter les opérations par 837 et 847 ?",
        correction: "La traçabilité : le compte de résultat de liquidation ne livre qu'un solde, tandis que les comptes 837 et 847 conservent le détail des charges et des produits engendrés par les opérations de liquidation — utile pour rendre compte aux associés lors de l'assemblée de clôture (art. 217), pour justifier les comptes définitifs déposés au RCCM (art. 219), et pour apprécier la diligence du liquidateur, dont la responsabilité peut être recherchée pendant trois ans (art. 221). Le Guide admet les deux méthodes, la voie directe n'étant qu'une simplification.",
      },
    ],
  },
  {
    id: 'cas5',
    titre: "Dossier à auditer : la liquidation de TSHIKAPA DIAMANT SERVICES SARL",
    contexte: "Vous êtes chargé de revoir le dossier du liquidateur de TSHIKAPA DIAMANT SERVICES SARL (capital 30 000 000 en 3 000 parts de 10 000 : associé A 1 800 parts, associé B 1 200 parts), dissoute par décision des associés le 10/01/N. Vous relevez : (1) les écritures de réalisation sont passées au compte « 1374 Résultat de liquidation » ; (2) la vente d'un véhicule (brut 18 000 000, amortissements 12 000 000, prix 7 000 000) est enregistrée par une seule écriture : débit 521 7 000 000 / crédit 2451 Matériel automobile 7 000 000 ; (3) un second véhicule a été vendu à l'épouse du liquidateur, au prix de l'argus ; (4) au 15/04/N+1, aucun état financier n'a été établi pour l'exercice N, clos le 31/12/N ; (5) le liquidateur a déjà versé 10 000 000 à chacun des deux associés, avant d'avoir liquidé la seconde cotisation d'IS.",
    questions: [
      {
        num: 1,
        enonce: "Point (1) : quelle correction proposez-vous ?",
        correction: "Le plan de comptes ne connaît pas de compte 1374 : le 137 est le résultat des activités ordinaires. Le résultat de liquidation est le 1384, utilisé dans toutes les écritures de l'Application 122. L'erreur vient probablement du chapitre 40 de l'AUDCIF, qui écrit « 1374 » [texte officiel]. Il faut reclasser les soldes au 1384, ou passer par le 837 et le 847 puis regrouper au 1384.",
      },
      {
        num: 2,
        enonce: "Point (2) : l'écriture de cession est-elle correcte ? Rectifiez-la.",
        correction: "Non. Elle laisse au bilan 11 000 000 au compte de matériel (18 000 000 − 7 000 000) et 12 000 000 d'amortissements, et elle ne fait apparaître aucun résultat. Écritures correctes (méthode directe) : débit 521 / crédit 1384, 7 000 000 ; puis débit 1384 6 000 000 (VNC) et débit 2845 Amortissements du matériel de transport 12 000 000 / crédit 2451, 18 000 000. Résultat sur la cession : +1 000 000. Pour corriger l'écriture existante : débit 2451 / crédit 1384, 7 000 000, puis passer l'écriture de sortie ci-dessus.",
      },
      {
        num: 3,
        enonce: "Point (3) : la vente à l'épouse du liquidateur est-elle valable, même au prix du marché ?",
        correction: "Non. L'art. 214 interdit la cession de tout ou partie de l'actif au liquidateur, à ses employés ou à leurs conjoints, ascendants ou descendants, sans exception tenant au prix. L'opération est nulle (art. 215-1). Le prix de l'argus ne régularise rien : l'interdiction est absolue, précisément pour ne pas avoir à discuter du prix. Il faut signaler l'opération aux associés, et sa nullité peut être demandée.",
      },
      {
        num: 4,
        enonce: "Point (4) : le liquidateur est-il en faute ?",
        correction: "Oui. Le liquidateur établit, dans les trois mois de la clôture de chaque exercice, les états financiers au vu de l'inventaire et un rapport écrit sur les opérations de l'exercice (art. 232). L'échéance était le 31/03/N+1. Dans une liquidation judiciaire, le manquement sciemment commis est pénalement sanctionné (art. 903, 2°). Dans tous les cas, il engage la responsabilité civile du liquidateur (art. 221) et prive les associés de l'information à laquelle ils ont droit (art. 234).",
      },
      {
        num: 5,
        enonce: "Point (5) : qu'en pensez-vous, sur le plan du droit des sociétés et sur le plan fiscal ?",
        correction: "Deux problèmes. D'abord, la répartition ne respecte pas l'art. 237 : sauf clause contraire, les capitaux propres se partagent au prorata du capital, soit 60 % pour A et 40 % pour B. Pour 20 000 000 répartis, A aurait dû recevoir 12 000 000 et B 8 000 000. Ensuite, la répartition intervient avant que la seconde cotisation d'IS, établie d'après le dernier bilan de liquidation (loi n° 23/053, art. 13), soit connue. Le liquidateur peut distribuer en cours de liquidation « sous réserve des droits des créanciers » (art. 241), et le fisc en est un. Si la trésorerie restante ne suffit pas à l'impôt, le liquidateur engage sa responsabilité (art. 221), et les associés restent exposés pendant cinq ans (art. 222). Enfin, toute répartition doit être publiée et notifiée aux titulaires de titres nominatifs (art. 238), et les fonds déposés en banque dans les quinze jours (art. 239).",
      },
    ],
  },
  {
    id: 'cas6',
    titre: "Chronologie : les délais de la liquidation de BENI CAFÉ SA",
    contexte: "BENI CAFÉ SA est dissoute par une AGE du 15/03/N, qui nomme liquidateur la société KIVU AUDIT SARL. La dissolution est publiée dans un journal d'annonces légales et au RCCM le 30/03/N. La nomination du liquidateur est publiée le 20/04/N. Une première répartition partielle est décidée le 10/09/N+1. L'assemblée de clôture se réunit le 20/11/N+2, et la clôture est publiée le 05/12/N+2. Un actionnaire n'a jamais réclamé sa quote-part.",
    questions: [
      {
        num: 1,
        enonce: "La publication de la nomination du liquidateur respecte-t-elle le délai légal ? Avec quelle conséquence ?",
        correction: "Non. L'acte de nomination doit être publié dans le délai d'un mois à compter de la nomination (art. 212 et 266), soit au plus tard le 15/04/N. Publiée le 20/04/N, la nomination n'était pas opposable aux tiers avant cette date (art. 212). Si le retard est délibéré, le liquidateur encourt une sanction pénale (art. 902, 1°).",
      },
      {
        num: 2,
        enonce: "Avant quelle date la liquidation doit-elle être close ? Le calendrier est-il respecté ?",
        correction: "Trois ans à compter de la dissolution (art. 216), soit le 15/03/N+3. L'assemblée de clôture du 20/11/N+2 respecte ce délai. Au-delà, le ministère public ou tout intéressé aurait pu saisir le juge pour faire achever la liquidation.",
      },
      {
        num: 3,
        enonce: "Quelles formalités suivent la répartition du 10/09/N+1, et avec quels délais ?",
        correction: "Publication de la décision de répartition dans le journal qui a publié la nomination du liquidateur, et notification individuelle aux titulaires de titres nominatifs (art. 238). Dépôt des sommes sur un compte bancaire au nom de la société en liquidation, domicilié dans l'État du siège, dans les quinze jours, soit au plus tard le 25/09/N+1 (art. 239).",
      },
      {
        num: 4,
        enonce: "Avant quelle date le liquidateur doit-il demander la radiation ?",
        correction: "Dans le mois qui suit la publication de la clôture (art. 220), soit au plus tard le 05/01/N+3, sur justification du dépôt des comptes définitifs au RCCM avec la décision de l'assemblée de clôture (art. 219). La personnalité morale a subsisté jusqu'à la publication de la clôture, le 05/12/N+2 (art. 205).",
      },
      {
        num: 5,
        enonce: "Que deviennent les fonds de l'actionnaire qui ne s'est pas manifesté ? Et jusqu'à quand un créancier oublié peut-il agir contre les associés ?",
        correction: "Les sommes non versées sont déposées sur un compte séquestre au Trésor public à l'expiration d'un an à compter de la clôture (art. 240), soit à partir du 05/12/N+3 si l'on retient la publication de la clôture comme point de départ. Un créancier oublié peut agir contre les associés non liquidateurs pendant cinq ans à compter de la publication de la dissolution au RCCM (art. 222), soit jusqu'au 30/03/N+5. Il peut aussi agir contre le liquidateur pendant trois ans à compter du fait dommageable ou de sa révélation (art. 221).",
      },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 9,
  id: 'ue3-chapitre-9',
  titre: "La dissolution et la liquidation",
  sousTitre: "AUSCGIE révisé, art. 200-241, 384, 736-737 et 902-904 · AUDCIF, Titre VIII, ch. 40 · SYSCOHADA, Application 122 · loi n° 23/053, art. 11, 13, 73-74",
  infoBulle: "Le parcours complet d'une société qui disparaît, suivi à travers la liquidation de LUKENIE FRIGO SA : causes de dissolution, publicité et survie de la personnalité morale, dissolution sans liquidation de l'unipersonnelle, nomination et pouvoirs du liquidateur, cessions interdites ou réglementées, régime légal de liquidation, comptabilisation (837, 847, 1384), boni ou mali, partage (4619), clôture, prescriptions et fiscalité congolaise de la liquidation.",
  loiRef: "Art. 60, 66, 200-241, 266, 384, 664-668, 735-737, 902-904 AUSCGIE · AUDCIF, Titre VIII, ch. 40 · App. 122 · loi n° 23/053, art. 11, 13, 73, 74, 82 · AM n° 028/2022",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Identifier les causes de dissolution, générales et propres à chaque forme, et les dissolutions sanctions (art. 60, 66, 200, 384, 664-668, 736-737)",
    "Mesurer les effets de la dissolution : publicité, mise en liquidation, survie de la personnalité morale, transmission universelle chez l'associé unique personne morale (art. 201-205)",
    "Organiser la mission du liquidateur : nomination, publicité, pouvoirs, cessions interdites ou réglementées, sanctions (art. 206-215-1, 230-231, 902-904)",
    "Appliquer le régime légal de liquidation et ses échéances : rapport, comptes annuels, assemblées, répartitions (art. 223-241)",
    "Comptabiliser la liquidation par la méthode directe ou par les comptes 837 et 847, et interpréter le boni ou le mali (AUDCIF, ch. 40 ; Application 122)",
    "Passer les écritures de partage (4619) et conduire la clôture jusqu'à la radiation, en connaissant les prescriptions (art. 216-222, 237)",
    "Anticiper les obligations fiscales congolaises de la liquidation : cotisations d'IS, quitus fiscal, Numéro Impôt, régime des répartitions",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Sept causes de dissolution (art. 200) ; la SA se dissout aussi par décision de l'AGE (art. 737) ou à la suite de la procédure des capitaux propres inférieurs à la moitié du capital (art. 736) ; la SARL survit au décès d'un associé, sauf clause contraire (art. 384).",
    "La dissolution est opposable aux tiers dès sa publication ; la société pluripersonnelle est en liquidation de plein droit et garde sa personnalité morale jusqu'à la publication de la clôture (art. 201-205).",
    "Associé unique personne morale : transmission universelle sans liquidation, après un délai d'opposition de trente jours ; associé unique personne physique : liquidation de plein droit (art. 201).",
    "Liquidateur associé ou tiers, personne physique ou morale, nommé selon la forme sociale ; nomination publiée dans le mois et opposable dès la publication (art. 206-212).",
    "Cessions interdites au liquidateur, à ses employés et à leurs proches (art. 214) ; cessions aux anciens dirigeants soumises à l'unanimité ou au juge (art. 213) ; nullité et sanctions pénales (art. 215-1, 904).",
    "Régime légal : rapport dans les six mois, comptes annuels dans les trois mois de chaque clôture, fonds répartis déposés en banque dans les quinze jours, sommes non réclamées au Trésor après un an (art. 223-241).",
    "Comptes : 837 (charges), 847 (produits), 1384 (résultat de liquidation ; l'AUDCIF écrit à tort 1374), 4619 (droits des associés). Méthode directe ou passage par 837 et 847 : même résultat.",
    "Partage : nominal d'abord, puis surplus au prorata du capital, sauf clause contraire (art. 237) ; boni ou mali réparti par le 4619 ; insuffisance d'actif relevant des procédures collectives.",
    "Clôture dans les trois ans ; assemblée de clôture, dépôt des comptes, publication, radiation dans le mois ; prescriptions de trois ans contre le liquidateur et de cinq ans contre les associés (art. 216-222).",
    "Fiscalité : cotisation spéciale immédiate puis seconde cotisation sur le dernier bilan de liquidation, bénéfices de liquidation imposables (loi n° 23/053, art. 11 et 13) ; quitus fiscal pour les mutations d'immeubles ; retrait du Numéro Impôt.",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "30 janvier 2014 ; art. 60, 66, 200 à 241, 266, 384, 664 à 668, 735 à 737, 902 à 904" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)", precision: "Titre VIII, chapitre 40 (liquidation), sections 1 à 3" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Guide d'application", precision: "Application 122 (liquidation : méthode directe, passage par 837 et 847, partage)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, plan de comptes", precision: "comptes 101, 11, 1384, 231, 2831, 2411, 2841, 311, 391, 4162, 4912, 4619, 521, 837, 847, 104" },
    { genre: 'texte', intitule: "Loi n° 23/053 du 30 novembre 2023 relative à l'impôt sur les sociétés et à l'impôt sur le revenu des personnes physiques", precision: "art. 11, 13, 73, 74 et 82" },
    { genre: 'texte', intitule: "Arrêté ministériel n° 028 du 28 septembre 2022 fixant les modalités pratiques de délivrance du quitus fiscal", precision: "art. 3 (opérations soumises à présentation du quitus)" },
    { genre: 'texte', intitule: "Décret n° 03/012 du 18 juillet 2003 portant institution d'un Numéro Impôt et mesures d'exécution", precision: "retrait du Numéro Impôt à la clôture de la liquidation" },
    { genre: 'ouvrage', auteur: "Mapapa Mbangala A., Nkoy Mbangala C. et Mensah Freitas C.", titre: "Comptabilité des sociétés OHADA", editeur: "Droit Afrique", lieu: "s.l.", annee: "2026" },
    { genre: 'ouvrage', auteur: "Dobill M.", titre: "Comptabilité OHADA, tome 3 : comptabilité des sociétés", editeur: "Karthala", lieu: "Paris", annee: "2013" },
    { genre: 'ouvrage', auteur: "Nzoimbengene Luyindula B. D.", titre: "Comptabilité des sociétés suivant le système comptable OHADA révisé", editeur: "2e éd., à compte d'auteur", lieu: "s.l.", annee: "2025" },
    { genre: 'ouvrage', auteur: "Pougoué P.-G. (dir.)", titre: "Encyclopédie du droit OHADA", editeur: "Lamy", lieu: "Paris", annee: "2011" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · AUDCIF, Titre VIII, chapitre 40, et SYSCOHADA révisé (Application 122) · loi n° 23/053 du 30 novembre 2023 · arrêté ministériel n° 028/2022 · réglementation du Numéro Impôt.",
}

export default chapitre
