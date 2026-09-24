// Chapitre 10 du module UE3, Comptabilité des sociétés : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
//
// Réécriture approfondie (septembre 2026). Le chapitre s'organise autour de
// quatre montages observés à Lubumbashi (un chantier commun, un groupement
// de pharmacies, trois artisans associés de fait, une SARL qui devient SA),
// et se clôt sur une grille de choix. Sources lues pendant la rédaction :
// - AUSCGIE révisé du 30 janvier 2014 : art. 181-188 et 187-1
//   (transformation), 374-375 (SARL), 690-693-1 (SA), 853-6 (SAS), 854-863
//   (société en participation), 864-868 (société créée de fait et société
//   de fait), 869-885 (GIE), skill auscgie-acte-uniforme.
// - AUDCIF, Titre VIII, chapitre 26 (GIE) et chapitre 33 (opérations faites
//   en commun) ; SYSCOHADA révisé, Applications 96-97 (GIE) et 106-107
//   (société en participation) ; plan de comptes. Divergences signalées :
//   comptes 181, 2771 et 463 de l'AUDCIF contre 182, 2773 et 4631 du plan et
//   du Guide ; compte 277 du Guide contre 2774 du plan ; comptes « 06 » et
//   « 07 » de l'Application 107, hors plan ; transparence fiscale du GIE
//   selon l'AUDCIF contre l'art. 6 de la loi congolaise.
// - Loi n° 23/053 du 30 novembre 2023, art. 3, 4 et 6, skill fiscalite-rdc.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'ch10-q1', question: "Laquelle de ces structures n'a PAS la personnalité morale ?",
    options: [
      { id: 'a', texte: "Le GIE immatriculé" },
      { id: 'b', texte: "La société en participation" },
      { id: 'c', texte: "La SNC immatriculée" },
      { id: 'd', texte: "La SARL transformée en SA" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 854 et 872 AUSCGIE',
    explication: "Les associés d'une société en participation conviennent qu'elle n'est pas immatriculée : elle n'a ni personnalité morale ni publicité. Le GIE acquiert la personnalité à son immatriculation, et la société transformée garde la sienne (art. 181).",
  },
  {
    id: 'ch10-q2', question: "Quel point commun unit la société en participation, la société créée de fait et le GIE ?",
    options: [
      { id: 'a', texte: "Ils ont tous la personnalité morale" },
      { id: 'b', texte: "Leurs membres peuvent être tenus des dettes au-delà de leurs apports" },
      { id: 'c', texte: "Ils ont tous un capital minimum" },
      { id: 'd', texte: "Ils émettent librement des titres négociables" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 861, 868 et 873 AUSCGIE',
    explication: "Obligation indéfinie et solidaire des associés d'une SEP qui agissent ensemble auprès des tiers (art. 861), régime de la SNC pour la société créée de fait (art. 868), membres du GIE tenus sur leur patrimoine propre et solidairement (art. 873).",
  },
  {
    id: 'ch10-q3', question: "Comment prouve-t-on l'existence d'une société en participation ?",
    options: [
      { id: 'a', texte: "Par un acte notarié uniquement" },
      { id: 'b', texte: "Par l'extrait RCCM" },
      { id: 'c', texte: "Par tous moyens" },
      { id: 'd', texte: "Par une publication au journal officiel" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 854 AUSCGIE',
    explication: "N'étant ni immatriculée ni publiée, la SEP se prouve par tous moyens : contrat, correspondances, comptes, témoignages. Un écrit reste vivement recommandé pour organiser les rapports entre associés.",
  },
  {
    id: 'ch10-q4', question: "Le contrat de SEP est muet sur les rapports entre associés. Quelles règles s'appliquent ?",
    options: [
      { id: 'a', texte: "Celles de la SARL" },
      { id: 'b', texte: "Celles de la société en nom collectif" },
      { id: 'c', texte: "Celles du GIE" },
      { id: 'd', texte: "Aucune" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 855-856 AUSCGIE',
    explication: "Les associés règlent librement l'objet, la durée, le fonctionnement et la fin de la SEP, dans le respect des règles impératives communes aux sociétés, hors celles relatives à la personnalité morale. À défaut d'organisation différente, le régime de la SNC s'applique.",
  },
  {
    id: 'ch10-q5', question: "À qui appartient un groupe électrogène qu'un associé met à disposition de la SEP ?",
    options: [
      { id: 'a', texte: "À la SEP" },
      { id: 'b', texte: "À l'associé qui l'a mis à disposition, sauf convention d'indivision" },
      { id: 'c', texte: "Au gérant" },
      { id: 'd', texte: "À tous les associés en indivision, de plein droit" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 857-859 AUSCGIE',
    explication: "Les biens sont mis à la disposition du gérant, mais chaque associé reste propriétaire de ce qu'il apporte. Les associés peuvent convenir d'une indivision ; sont en outre réputés indivis les biens acquis par emploi ou remploi de deniers indivis.",
  },
  {
    id: 'ch10-q6', question: "Le gérant d'une SEP commande seul, en son nom, des matériaux. Le fournisseur impayé peut-il poursuivre l'autre associé ?",
    options: [
      { id: 'a', texte: "Oui, toujours, solidairement" },
      { id: 'b', texte: "Non en principe : chaque associé contracte en son nom et est seul engagé" },
      { id: 'c', texte: "Oui, pour la moitié" },
      { id: 'd', texte: "Seulement si la SEP est immatriculée" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 861 AUSCGIE',
    explication: "L'autre associé n'est tenu que si les associés ont agi expressément en cette qualité auprès du tiers, ou s'il s'est immiscé en laissant croire qu'il s'engageait et que l'engagement a tourné à son profit.",
  },
  {
    id: 'ch10-q7', question: "Comment met-on fin à une SEP à durée indéterminée ?",
    options: [
      { id: 'a', texte: "Par jugement uniquement" },
      { id: 'b', texte: "Par notification d'un associé à tous les autres, de bonne foi et non faite à contretemps" },
      { id: 'c', texte: "Par radiation au RCCM" },
      { id: 'd', texte: "Elle ne peut pas prendre fin" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 862-863 AUSCGIE',
    explication: "La notification se fait par lettre au porteur contre récépissé ou lettre recommandée avec avis de réception. La SEP est aussi dissoute par les événements qui mettent fin à la SNC, sauf convention de continuation.",
  },
  {
    id: 'ch10-q8', question: "En RDC, une société en participation est-elle soumise à l'IS ?",
    options: [
      { id: 'a', texte: "Oui, de plein droit" },
      { id: 'b', texte: "Seulement sur option, irrévocable, levée en assemblée et notifiée dans les trois mois du début de l'exercice" },
      { id: 'c', texte: "Jamais" },
      { id: 'd', texte: "Seulement si elle a un gérant" },
    ],
    reponseCorrecte: 'b', articleRef: 'Loi n° 23/053, art. 4',
    explication: "L'option est ouverte aux SNC, SCS et sociétés en participation, mais pas aux sociétés de personnes issues de la transformation antérieure de sociétés par actions.",
  },
  {
    id: 'ch10-q9', question: "Dans la comptabilité autonome d'une SEP tenue par le gérant, quel compte relie les écritures de la SEP à celles du gérant ?",
    options: [
      { id: 'a', texte: "4631" },
      { id: 'b', texte: "188 Comptes de liaison des sociétés en participation" },
      { id: 'c', texte: "101" },
      { id: 'd', texte: "752" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 33, § 2.1 ; Application 106',
    explication: "La méthode « de la comptabilité de société » s'apparente aux comptabilités d'établissement : la SEP ne tient que ses comptes de gestion, reliés au gérant par le 188.",
  },
  {
    id: 'ch10-q10', question: "Le gérant achète pour la SEP un matériel de 16 000 (en milliers) ; l'associé B détient 1/4 de la SEP. Quelle écriture constate la part de B chez le gérant ?",
    options: [
      { id: 'a', texte: "Débit 2413 / crédit 4631, 4 000" },
      { id: 'b', texte: "Débit 4631 / crédit 182 Dettes liées à des SP, 4 000" },
      { id: 'c', texte: "Débit 752 / crédit 4631, 4 000" },
      { id: 'd', texte: "Aucune" },
    ],
    reponseCorrecte: 'b', articleRef: 'Guide SYSCOHADA, Application 106',
    explication: "Le gérant, propriétaire apparent, inscrit tout le matériel à son actif et constate au passif la part financée par B. Chez B, la contrepartie est une créance : débit 2773 Créances rattachées à des SP / crédit 4631. L'AUDCIF (ch. 33, § 4.3) utilise les comptes génériques 181 et 2771.",
  },
  {
    id: 'ch10-q11', question: "Application 106 : produits 1 800, charges 1 532, A (gérant) 3/4, B 1/4. Quelle est la quote-part de B ?",
    options: [
      { id: 'a', texte: "268" },
      { id: 'b', texte: "201" },
      { id: 'c', texte: "67" },
      { id: 'd', texte: "450" },
    ],
    reponseCorrecte: 'c', articleRef: 'Guide SYSCOHADA, Application 106',
    explication: "Résultat : 268. Part de A : 201 (752) ; part de B : 67, portée au crédit de son compte 4631 chez A et au crédit du 752 chez B.",
  },
  {
    id: 'ch10-q12', question: "Dans la méthode du partage final, où le gérant inscrit-il la part de bénéfice qui revient aux non-gérants ?",
    options: [
      { id: 'a', texte: "Au crédit du 752" },
      { id: 'b', texte: "Au débit du 652 Quote-part de résultat sur opérations faites en commun, par le crédit du compte courant (463)" },
      { id: 'c', texte: "Au débit du 101" },
      { id: 'd', texte: "Au crédit du 188" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 33, § 6.3',
    explication: "Le gérant a comptabilisé tout le résultat chez lui : il transfère la part des autres par le 652 (bénéfice) ou le 752 (perte). Les non-gérants constatent leur quote-part au 752 (bénéfice) ou au 652 (perte).",
  },
  {
    id: 'ch10-q13', question: "Pourquoi l'AUDCIF recommande-t-il des informations complémentaires dans les Notes annexes des coparticipants d'une SEP ?",
    options: [
      { id: 'a', texte: "Pour publier la SEP" },
      { id: 'b', texte: "Parce que, avec le partage final, le chiffre d'affaires et les soldes intermédiaires ne reflètent pas le volume réel d'activité" },
      { id: 'c', texte: "Pour payer l'IS" },
      { id: 'd', texte: "Parce que la SEP est cotée" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 33, section 7',
    explication: "Chez le gérant, un compte de résultat retraité ; chez les non-gérants, des « produits des activités courantes » plus significatifs que le chiffre d'affaires ; et l'analyse des quotes-parts (6521, 6525, 7521, 7525).",
  },
  {
    id: 'ch10-q14', question: "Trois artisans partagent atelier, clients et bénéfices sans avoir jamais constitué de société. Qu'est-ce ?",
    options: [
      { id: 'a', texte: "Une société en participation" },
      { id: 'b', texte: "Une société créée de fait" },
      { id: 'c', texte: "Un GIE" },
      { id: 'd', texte: "Une indivision sans conséquence" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 864 AUSCGIE',
    explication: "Ils se comportent comme des associés sans avoir constitué l'une des sociétés reconnues. La SEP, elle, suppose une convention expresse de non-immatriculation (art. 854).",
  },
  {
    id: 'ch10-q15', question: "Quel régime s'applique aux associés d'une société créée de fait reconnue par le juge ?",
    options: [
      { id: 'a', texte: "Celui de la SARL" },
      { id: 'b', texte: "Celui de la SNC, avec responsabilité indéfinie et solidaire" },
      { id: 'c', texte: "Celui du GIE" },
      { id: 'd', texte: "Aucun" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 866-868 AUSCGIE',
    explication: "Tout intéressé peut demander la reconnaissance (art. 866), la preuve se fait par tout moyen (art. 867), et les règles de la SNC s'appliquent aux associés (art. 868).",
  },
  {
    id: 'ch10-q16', question: "Des associés ont constitué une SARL mais n'ont jamais régularisé un vice de formation. Comment la qualifier ?",
    options: [
      { id: 'a', texte: "Société créée de fait" },
      { id: 'b', texte: "Société de fait" },
      { id: 'c', texte: "Société en participation" },
      { id: 'd', texte: "SARL régulière" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 865 AUSCGIE',
    explication: "La société de fait est une société reconnue par l'Acte uniforme mais viciée et non régularisée, ou une société d'une forme non reconnue. Fiscalement, les sociétés de fait et créées de fait relèvent de l'IS par leur activité (loi n° 23/053, art. 3).",
  },
  {
    id: 'ch10-q17', question: "Quel est l'objet d'un GIE ?",
    options: [
      { id: 'a', texte: "Réaliser des bénéfices pour lui-même" },
      { id: 'b', texte: "Faciliter ou développer l'activité économique de ses membres, pour une durée déterminée, par une activité auxiliaire" },
      { id: 'c', texte: "Remplacer l'activité de ses membres" },
      { id: 'd', texte: "Gérer un portefeuille de titres" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 869-870 AUSCGIE',
    explication: "L'activité du GIE se rattache à celle de ses membres et reste auxiliaire. Il peut être constitué sans capital et ne donne pas lieu par lui-même à réalisation et partage de bénéfices.",
  },
  {
    id: 'ch10-q18', question: "Un fournisseur du GIE impayé veut assigner directement une pharmacie membre. Que doit-il faire d'abord ?",
    options: [
      { id: 'a', texte: "Rien, il peut agir directement" },
      { id: 'b', texte: "Mettre vainement en demeure le groupement, par exploit d'huissier ou tout moyen établissant la réception" },
      { id: 'c', texte: "Obtenir la liquidation du GIE" },
      { id: 'd', texte: "Obtenir l'accord de l'assemblée du GIE" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 873-874 AUSCGIE',
    explication: "Après cette mise en demeure infructueuse, les membres sont tenus sur leur patrimoine propre et solidairement, sauf convention contraire avec le tiers.",
  },
  {
    id: 'ch10-q19', question: "Dans le silence du contrat de GIE, comment l'assemblée prend-elle ses décisions ?",
    options: [
      { id: 'a', texte: "À la majorité simple" },
      { id: 'b', texte: "À l'unanimité, chaque membre disposant d'une voix" },
      { id: 'c', texte: "À la majorité des deux tiers du capital" },
      { id: 'd', texte: "Par l'administrateur seul" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 877-878 AUSCGIE',
    explication: "Le contrat peut prévoir des quorums, des majorités et des voix inégales. Un quart des membres en nombre peut exiger la réunion de l'assemblée.",
  },
  {
    id: 'ch10-q20', question: "Un GIE peut-il émettre des obligations ?",
    options: [
      { id: 'a', texte: "Oui, librement" },
      { id: 'b', texte: "Seulement s'il est composé exclusivement de sociétés autorisées à émettre des obligations, avec alors un contrôle de gestion et un commissaire aux comptes nommé pour six exercices" },
      { id: 'c', texte: "Jamais" },
      { id: 'd', texte: "Seulement s'il a un capital" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 875 et 880 AUSCGIE',
    explication: "Il faut des SA remplissant les conditions de l'art. 780 (chapitre 6). Les droits des membres, eux, ne peuvent jamais être représentés par des titres négociables (art. 871).",
  },
  {
    id: 'ch10-q21', question: "Un membre verse des cotisations au GIE en contrepartie des services rendus. Comment les comptabilise-t-il ?",
    options: [
      { id: 'a', texte: "En immobilisation 266" },
      { id: 'b', texte: "En charges d'exploitation, au 621 Sous-traitance générale" },
      { id: 'c', texte: "En capital" },
      { id: 'd', texte: "Au 772" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 26, § 2.2',
    explication: "Chez le GIE de services, ces cotisations sont des produits (706 Services vendus). Les parts du GIE vont au 266 (pour mémoire s'il n'a pas de capital) et les avances durables au 2774.",
  },
  {
    id: 'ch10-q22', question: "Quand un membre comptabilise-t-il sa part du bénéfice d'un GIE ?",
    options: [
      { id: 'a', texte: "À la clôture de l'exercice du GIE" },
      { id: 'b', texte: "Au cours de l'exercice où la distribution est décidée, au crédit du 772" },
      { id: 'c', texte: "À l'encaissement seulement" },
      { id: 'd', texte: "Jamais" },
    ],
    reponseCorrecte: 'b', articleRef: 'AUDCIF, ch. 26, § 2.2 ; Application 96',
    explication: "Application 96 : quote-part de 1 000 000 (1/3 de 3 000 000) : débit 4631 / crédit 772. Pour une perte définitive, complément de cotisation au 621 ; à la clôture précédente, dépréciation par 659 / 4963.",
  },
  {
    id: 'ch10-q23', question: "En RDC, le GIE est-il soumis à l'IS ?",
    options: [
      { id: 'a', texte: "Il est exonéré pour la quote-part de bénéfice distribuée à ses membres personnes physiques" },
      { id: 'b', texte: "Il est totalement transparent dans tous les cas" },
      { id: 'c', texte: "Il est toujours imposé sur tout son bénéfice" },
      { id: 'd', texte: "Il paie l'IS à la place de ses membres" },
    ],
    reponseCorrecte: 'a', articleRef: 'Loi n° 23/053, art. 6',
    explication: "L'AUDCIF (ch. 26) décrit un principe de transparence, mais c'est la loi fiscale nationale qui fixe le régime. En RDC, l'exonération de l'art. 6 vise la quote-part distribuée aux membres personnes physiques ; les autres situations doivent être examinées au regard de la loi.",
  },
  {
    id: 'ch10-q24', question: "La transformation régulière d'une SARL en SA crée-t-elle une nouvelle personne morale ?",
    options: [
      { id: 'a', texte: "Oui" },
      { id: 'b', texte: "Non : c'est une modification des statuts, la personne morale continue" },
      { id: 'c', texte: "Oui, si le capital change" },
      { id: 'd', texte: "Seulement pour les dettes antérieures" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 181 et 374 AUSCGIE',
    explication: "Conséquence comptable : pas de nouveau bilan d'ouverture ni de réévaluation. Les comptes continuent, seule la forme change.",
  },
  {
    id: 'ch10-q25', question: "Quelle majorité pour transformer une SARL en SNC ?",
    options: [
      { id: 'a', texte: "Majorité de modification des statuts" },
      { id: 'b', texte: "Unanimité des associés" },
      { id: 'c', texte: "Majorité simple" },
      { id: 'd', texte: "Décision du gérant" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 181 et 692 AUSCGIE',
    explication: "Passer d'une responsabilité limitée à une responsabilité illimitée exige l'unanimité, à peine de nullité. Le même principe vaut pour la SA transformée en SNC (art. 692). La transformation en SAS exige aussi l'unanimité (art. 853-6).",
  },
  {
    id: 'ch10-q26', question: "Une SARL peut-elle se transformer si ses capitaux propres sont inférieurs à son capital ?",
    options: [
      { id: 'a', texte: "Oui, librement" },
      { id: 'b', texte: "Non : la transformation exige des capitaux propres au moins égaux au capital, certifiés par un commissaire aux comptes, à peine de nullité" },
      { id: 'c', texte: "Oui, avec l'accord du greffe" },
      { id: 'd', texte: "Oui, si l'associé majoritaire l'accepte" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 374-375 AUSCGIE',
    explication: "À défaut de commissaire aux comptes, le gérant en choisit un selon les art. 694 et suivants. La règle parallèle pour la SA exige deux ans d'existence, deux bilans approuvés et un actif net au moins égal au capital (art. 690-691).",
  },
  {
    id: 'ch10-q27', question: "Une SARL sans commissaire aux comptes se transforme en SA. Quelle formalité particulière s'impose ?",
    options: [
      { id: 'a', texte: "Aucune" },
      { id: 'b', texte: "La désignation, sauf accord unanime des associés, de commissaires à la transformation par le juge, pour apprécier la valeur des biens et les avantages particuliers" },
      { id: 'c', texte: "Une fusion" },
      { id: 'd', texte: "Une liquidation préalable" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 187-1 AUSCGIE',
    explication: "Leur rapport peut tenir lieu de celui de l'art. 375. Les associés ne peuvent réduire l'évaluation qu'à l'unanimité ; à défaut d'approbation expresse au procès-verbal, la transformation est nulle.",
  },
  {
    id: 'ch10-q28', question: "Une SNC se transforme en SARL. Ses créanciers antérieurs perdent-ils la garantie des associés ?",
    options: [
      { id: 'a', texte: "Oui, dès la transformation" },
      { id: 'b', texte: "Non : ils conservent leurs droits contre la société et les associés" },
      { id: 'c', texte: "Oui, après trente jours" },
      { id: 'd', texte: "Seulement s'ils font opposition" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 186 AUSCGIE',
    explication: "La transformation ne peut pas priver les créanciers antérieurs d'une garantie sur laquelle ils ont compté. La règle est identique pour le GIE transformé en SARL (art. 882).",
  },
  {
    id: 'ch10-q29', question: "La transformation d'une SARL en SA décidée le 30 juin peut-elle prendre effet au 1er janvier ?",
    options: [
      { id: 'a', texte: "Oui, comme une fusion" },
      { id: 'b', texte: "Non : elle prend effet au jour de la décision et ne peut avoir d'effet rétroactif" },
      { id: 'c', texte: "Oui, avec l'accord du commissaire aux comptes" },
      { id: 'd', texte: "Oui, sur décision du juge" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 182-183 AUSCGIE',
    explication: "L'effet se produit au jour de la décision, et la transformation est opposable aux tiers après la publicité de l'art. 265. Sauf décision contraire, les comptes ne sont pas arrêtés en cours d'exercice : les états financiers de l'exercice entier sont établis et approuvés selon les règles de la nouvelle forme.",
  },
  {
    id: 'ch10-q30', question: "Deux entreprises veulent exécuter ensemble un seul chantier de dix-huit mois, sans créer de structure visible. Quel véhicule est le plus adapté ?",
    options: [
      { id: 'a', texte: "Une SA" },
      { id: 'b', texte: "Une société en participation" },
      { id: 'c', texte: "Une fusion" },
      { id: 'd', texte: "Une transformation" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 854-863 AUSCGIE',
    explication: "Pas d'immatriculation, liberté d'organisation, chacun garde ses biens et contracte en son nom, dissolution à la fin du chantier. Un GIE conviendrait si l'on voulait une structure dotée de la personnalité morale pour une activité auxiliaire durable.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '10.1',
    titre: "Quatre montages à Lubumbashi",
    navLabel: "Panorama",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Un même mois, à Lubumbashi, le cabinet d'expertise comptable où vous faites votre stage reçoit quatre dossiers. Deux entreprises de BTP, **KATANGA ROUTES** et **LUALABA TP**, vont réhabiliter ensemble un tronçon de route, sans créer de nouvelle société. Six pharmacies de la ville veulent mutualiser leurs achats de médicaments au sein d'un **groupement**. Trois menuisiers de Kenya partagent depuis des années un atelier, une enseigne et leurs bénéfices, sans avoir rien signé, et un fournisseur impayé cherche à les poursuivre tous. Enfin, **KIPUSHI AGRO SARL** veut devenir une société anonyme pour accueillir un investisseur. Aucun de ces dossiers ne relève des chapitres précédents. Tous relèvent pourtant de l'AUSCGIE, qui connaît, à côté des sociétés « classiques », des structures aux règles propres.",
      },
      {
        type: 'tableau',
        tableau: {
          entetes: ["", "Société en participation", "Société créée de fait / de fait", "GIE", "Société transformée"],
          lignes: [
            ["Origine", "Choix de ne pas immatriculer", "Comportement ou vice non régularisé", "Contrat écrit, immatriculé", "Décision de changer de forme"],
            ["Personnalité morale", "Non (art. 854)", "Non tant qu'elle n'est pas régularisée", "Oui, dès l'immatriculation (art. 872)", "Conservée (art. 181)"],
            ["Responsabilité", "Chacun seul engagé, sauf action commune ou immixtion (art. 861)", "Règles de la SNC (art. 868)", "Patrimoine propre et solidarité (art. 873)", "Celle de la nouvelle forme ; créanciers antérieurs protégés (art. 186)"],
            ["IS en RDC", "Sur option (art. 4)", "Par l'activité (art. 3)", "Exonération partielle (art. 6)", "Selon la nouvelle forme"],
            ["Comptabilité", "Comptes de liaison (188, 4631)", "Celle d'une SNC", "Comptabilité propre ; membres : 266, 2774, 621, 772", "Continuité des comptes"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Pourquoi « particulières » ?",
        texte: "Toutes les sociétés étudiées jusqu'ici avaient trois traits communs : une immatriculation au RCCM, une personnalité morale distincte de celle des associés, et un patrimoine propre, gage des créanciers. Les structures de ce chapitre s'écartent de ce modèle, chacune à sa manière. La SEP renonce volontairement à la personnalité morale. La société créée de fait n'a jamais cherché à l'obtenir. Le GIE l'obtient, mais pour une mission limitée et sans protéger ses membres. La société transformée la garde en changeant de forme. Pour chacune, il faut donc répondre de nouveau à des questions qui allaient de soi : qui possède les biens, qui répond des dettes, et qui tient les comptes.",
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'paragraphe',
        texte: "Ces structures répondent à des besoins différents : coopérer sans fusionner, mutualiser sans perdre son indépendance, s'associer sans formalité, ou changer de cadre sans disparaître. Elles partagent pourtant un trait : la **responsabilité** de leurs membres dépasse souvent leurs apports. C'est le prix de leur souplesse. Le comptable doit donc toujours se poser deux questions. Qui est juridiquement engagé envers les tiers ? Et comment traduire dans les comptes de chacun une activité menée en commun ? Les sections suivantes reprennent les quatre dossiers un à un, et la dernière propose une grille pour choisir le bon véhicule.",
      },
      { type: 'controle', question: QCM[1] },
    ],
  },
  {
    numero: '10.2',
    titre: "La société en participation : s'associer sans exister",
    navLabel: "SEP : nature",
    blocs: [
      {
        type: 'paragraphe',
        texte: "KATANGA ROUTES et LUALABA TP ne veulent ni fusionner ni créer une filiale commune pour un chantier de dix-huit mois. Leur avocat leur propose une **société en participation** (SEP). Il s'agit d'une société dans laquelle les associés **conviennent qu'elle n'est pas immatriculée** au RCCM : elle n'a pas la personnalité morale et n'est pas soumise à publicité (art. 854). C'est un véritable contrat de société, avec des apports, un partage des bénéfices et des pertes, et la volonté de travailler ensemble, mais sans personne morale distincte. Son existence peut être prouvée par **tous moyens**, ce qui n'empêche pas les deux entreprises de signer un contrat détaillé.",
      },
      {
        type: 'carte',
        titre: "Ce que les associés décident librement (art. 855-856)",
        liste: [
          "L'**objet** : ici, la réhabilitation du tronçon routier.",
          "La **durée** : celle du chantier, ou une durée indéterminée.",
          "Le **fonctionnement** : désignation d'un gérant, répartition des tâches, reddition des comptes.",
          "Les **droits des associés** : partage des résultats, par exemple 60 % pour KATANGA ROUTES et 40 % pour LUALABA TP.",
          "La **fin** de la société.",
          "Limite : ne pas déroger aux règles impératives communes à toutes les sociétés, sauf celles qui supposent la personnalité morale. À défaut d'organisation différente, les rapports entre associés suivent les règles de la **SNC** (art. 856).",
        ],
      },
      { type: 'controle', question: QCM[2] },
      {
        type: 'paragraphe',
        texte: "Dans le BTP, les mines ou les grands marchés publics, la SEP est un outil courant, souvent appelé « groupement momentané » ou « consortium ». Il répond à un besoin simple : réunir, le temps d'un projet, des compétences ou des moyens qu'aucune entreprise ne possède seule. KATANGA ROUTES apporte ses niveleuses et son expérience des routes en latérite ; LUALABA TP apporte ses équipes de terrassement et sa centrale à béton. Créer une société commune coûterait des formalités, des frais et du temps, puis une liquidation à la fin du chantier. La SEP évite tout cela. Son contrat doit toutefois être précis : désignation du gérant, clé de répartition, règles de facturation entre associés, sort des biens acquis en commun, et durée.",
      },
      { type: 'controle', question: QCM[3] },
      {
        type: 'paragraphe',
        texte: "Sans personnalité morale, la SEP n'a pas de patrimoine. Les biens nécessaires au chantier (engins, groupes électrogènes, bureaux de chantier) sont **mis à la disposition du gérant**, mais chaque associé **reste propriétaire** de ce qu'il met à disposition (art. 857). Les associés peuvent convenir d'une **indivision** sur certains biens, ou décider que l'un d'eux sera, à l'égard des tiers, propriétaire des biens qu'il acquiert pour la SEP (art. 858). Sont réputés indivis les biens acquis avec des deniers indivis, et ceux que les associés ont convenu de mettre en indivision (art. 859). Sauf clause contraire, aucun associé ne peut demander le partage des biens indivis avant la dissolution (art. 860). Pour le comptable, la conséquence est nette : chaque engin reste au bilan de l'entreprise qui en est propriétaire, même s'il travaille sur le chantier commun.",
      },
      { type: 'controle', question: QCM[4] },
    ],
  },
  {
    numero: '10.3',
    titre: "La SEP face aux tiers et au fisc",
    navLabel: "SEP : tiers et fisc",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Le fournisseur de bitume ne connaît que KATANGA ROUTES, qui a passé commande en son nom. Si la facture reste impayée, peut-il se retourner contre LUALABA TP ? En principe, non. **Chaque associé contracte en son nom personnel et est seul engagé** à l'égard des tiers (art. 861). C'est la logique de la SEP occulte : le tiers a traité avec une entreprise et ne peut pas se prévaloir d'une société qu'il ignorait. La règle s'inverse dans deux cas, et le comptable doit savoir les repérer, car ils changent la nature des engagements hors bilan de chaque associé.",
      },
      {
        type: 'carte',
        titre: "Quand un associé répond des dettes de l'autre (art. 861)",
        tableau: {
          entetes: ["Situation", "Conséquence"],
          lignes: [
            ["Les associés agissent **expressément en leur qualité d'associés** auprès du tiers (lettre à en-tête commun, négociation conjointe)", "Chacun de ceux qui ont agi est tenu des engagements des autres, **indéfiniment et solidairement**"],
            ["Un associé, par son **immixtion**, a laissé croire au tiers qu'il s'engageait, et l'engagement a **tourné à son profit**", "Il est tenu, lui aussi, **indéfiniment et solidairement**"],
            ["Un associé traite seul, en son nom, sans se présenter comme associé", "Il est **seul engagé**"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "La propriété des biens a aussi des conséquences en cas de difficulté. Si LUALABA TP tombe en redressement judiciaire au milieu du chantier, ses créanciers peuvent saisir les engins qu'elle a mis à la disposition de la SEP, puisqu'ils restent sa propriété. KATANGA ROUTES risque alors de voir le chantier s'arrêter. Pour s'en prémunir, les associés peuvent convenir d'une indivision sur les biens essentiels (art. 858), ou prévoir dans le contrat les conditions de remplacement du matériel retiré. Le comptable de chaque associé doit connaître ces clauses : un bien mis en indivision ne figure plus pour sa totalité au bilan de celui qui l'a apporté, mais pour sa quote-part.",
      },
      { type: 'controle', question: QCM[5] },
      {
        type: 'paragraphe',
        texte: "La fin de la SEP est tout aussi souple. Elle est dissoute par les événements qui mettent fin à une SNC, sauf si les associés ont convenu de continuer malgré eux (art. 862). Si elle est à durée indéterminée, un associé peut y mettre fin à tout moment par **notification** à tous les autres, par lettre au porteur contre récépissé ou lettre recommandée avec avis de réception, à condition d'être de **bonne foi** et de ne pas agir **à contretemps** (art. 863). Quitter la SEP au milieu du chantier, en laissant l'autre sans moyens, serait une rupture à contretemps. Le contrat de KATANGA ROUTES et de LUALABA TP prévoit donc une durée égale à celle du chantier, prolongée jusqu'à la réception définitive des travaux.",
      },
      {
        type: 'paragraphe',
        texte: "Dans les marchés publics, le maître d'ouvrage exige souvent de connaître tous les membres du groupement et leur engagement solidaire. La SEP cesse alors d'être occulte : les associés soumissionnent ensemble et signent conjointement le marché. Ils agissent donc « expressément en leur qualité d'associé » au sens de l'article 861, et chacun répond de l'exécution de l'ensemble du marché. Le comptable de chaque associé doit en tirer les conséquences : l'engagement solidaire envers le maître d'ouvrage est un **engagement hors bilan**, à mentionner dans les Notes annexes, et il peut justifier une provision si l'autre associé est en difficulté. Le choix entre SEP occulte et SEP déclarée n'est donc jamais neutre.",
      },
      { type: 'controle', question: QCM[6] },
      {
        type: 'filet',
        titre: "Et le fisc congolais ?",
        texte: "La loi n° 23/053 range la société en participation parmi les sociétés qui ne sont soumises à l'IS que **sur option** (art. 4), comme la SNC et la SCS. L'option est **irrévocable**. Elle se lève en assemblée générale, par un procès-verbal notifié dans les trois mois du début de l'exercice fiscal, et elle est fermée aux sociétés de personnes issues de la transformation antérieure d'une société par actions. Sans option, les résultats de la SEP sont imposés chez ses associés, à travers leurs propres déclarations. C'est pourquoi la répartition du résultat entre coparticipants (section 10.5) doit être rigoureuse : elle détermine la base imposable de chacun.",
      },
      { type: 'controle', question: QCM[7] },
    ],
  },
  {
    numero: '10.4',
    titre: "Tenir les comptes d'une société qui n'a pas de bilan (Application 106)",
    navLabel: "SEP : comptabilité",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Comment tenir la comptabilité d'une société sans patrimoine ? L'AUDCIF (Titre VIII, chapitre 33) part d'un principe double. Pour les **tiers**, seule compte l'apparence juridique : les biens et les dettes figurent au bilan de l'associé qui en est propriétaire ou débiteur, en général le gérant. Pour les **coparticipants**, l'apparence s'efface derrière le contrat : toutes les opérations entre eux passent par le compte **463 Associés, opérations faites en commun** (4631 au plan de comptes), dans chacune de leurs comptabilités. Avec un seul gérant, deux organisations sont possibles : une **comptabilité autonome** de la SEP, rattachée à celle du gérant par le compte **188 Comptes de liaison des sociétés en participation**, ou une comptabilité **intégrée** dans celle du gérant.",
      },
      {
        type: 'carte',
        titre: "Application 106 : SEP entre A (gérant, 3/4) et B (1/4), en milliers de francs",
        tableau: {
          entetes: ["Opération", "Comptabilité autonome de la SEP (tenue par A)", "Comptabilité propre de A", "Comptabilité de B"],
          lignes: [
            ["B vire 3 000", "188 / 4631", "521 / 188", "4631 / 521"],
            ["Matériel 16 000 acheté par A", "Néant", "2413 / 4812 (16 000) ; 4631 / 182 (part de B : 4 000)", "2773 / 4631 (4 000)"],
            ["Achat de marchandises 1 200", "601 / 188", "188 / 401", "—"],
            ["Vente par A 800", "188 / 701", "521 / 188", "—"],
            ["Frais avancés par A 112", "628 et 616 / 188", "188 / 781", "—"],
            ["Vente par B 1 000", "4631 / 701", "—", "521 / 4631"],
            ["Résultat 268", "Soldes des comptes de gestion virés au 188", "188 / 752 (201) et 4631 (67)", "4631 / 752 (67)"],
          ],
        },
        note: "Résultat de la SEP : produits 1 800 − charges 1 532 = 268, soit 201 pour A et 67 pour B. [texte officiel] L'AUDCIF (ch. 33, § 4.3) enregistre la part du non-gérant dans les biens acquis aux comptes génériques 181 (chez le gérant) et 2771 (chez le non-gérant), par le 463. Le plan de comptes prévoit des comptes dédiés, **182 Dettes liées à des sociétés en participation** et **2773 Créances rattachées à des sociétés en participation**, que le Guide utilise. Ce cours suit le plan et le Guide.",
      },
      { type: 'controle', question: QCM[8] },
      {
        type: 'paragraphe',
        texte: "Quelle organisation choisir ? La comptabilité autonome reliée par le 188 donne une image complète de la SEP, avec son propre compte de résultat, ce qui facilite la reddition de comptes et le contrôle par les autres associés. Elle convient aux SEP importantes et durables, comme un chantier de dix-huit mois. La comptabilité intégrée, avec des comptes dédiés ou une analytique, est plus légère pour des opérations ponctuelles. La pluralité de gérants, où chacun enregistre ce qu'il traite puis cumule, est la plus difficile à contrôler, et l'AUDCIF en souligne les inconvénients pour les activités complexes ou durables (ch. 33, § 2.2). Dans tous les cas, les associés doivent pouvoir vérifier les comptes : la reddition de comptes est une obligation entre membres, que le régime de la SNC renforce.",
      },
      { type: 'controle', question: QCM[9] },
      {
        type: 'paragraphe',
        texte: "Le matériel illustre bien la double lecture. Juridiquement, A l'a acheté en son nom : il est propriétaire, et le matériel figure à son actif (2413). Mais B en a financé un quart à travers la SEP : A lui doit donc 4 000, inscrits au 182, et B détient une créance de même montant au 2773. Chaque année, l'amortissement du matériel constaté dans la SEP réduit à la fois la dette de A et la créance de B, à hauteur de la quote-part de B (AUDCIF, ch. 33, § 4.3). Si le matériel est réévalué, l'écart est partagé : A pour sa part, B par l'augmentation de sa créance. Les biens simplement **mis à disposition** par un associé restent à son bilan, et leur usure est facturée à la SEP comme une location, pour le montant de l'amortissement ou selon le contrat (§ 4.1).",
      },
      { type: 'controle', question: QCM[10] },
    ],
  },
  {
    numero: '10.5',
    titre: "Partager le résultat et informer les lecteurs",
    navLabel: "SEP : partage",
    blocs: [
      {
        type: 'paragraphe',
        texte: "L'Application 107 reprend les mêmes opérations dans une comptabilité **intégrée** : A n'ouvre pas de comptabilité distincte pour la SEP, mais des comptes dédiés dans la sienne, que le Guide nomme « 06 Exploitation en SP, charges » et « 07 Exploitation en SP, produits ». En fin de période, il solde ces comptes : débit 07 pour 1 800, crédit 06 pour 1 532, crédit 4631 pour la part de B (67) et crédit 752 pour sa propre part (201). [texte officiel] Les comptes « 06 » et « 07 » n'existent pas au plan de comptes : ce sont des comptes de regroupement internes, que l'on peut remplacer par des subdivisions des classes 6 et 7 ou par la comptabilité analytique, comme l'autorise l'AUDCIF (ch. 33, § 2.1).",
      },
      {
        type: 'carte',
        titre: "Trois niveaux de répartition (AUDCIF, ch. 33, section 6)",
        tableau: {
          entetes: ["Niveau", "Ce qui est partagé", "Écritures"],
          lignes: [
            ["Production", "Les biens produits, chaque associé vendant sa part pour son compte", "Gérant : 4631 / 781 (au coût) ; autres : 638 / 4631 ; les stocks restants sont au bilan de chacun"],
            ["Exploitation", "Charges et produits, chacun enregistrant ce qu'il traite avec les tiers", "Résultat obtenu par différence, sous réserve de régularisations"],
            ["Résultat (partage final)", "Le seul résultat, tout étant enregistré chez le gérant", "Gérant : 652 / 4631 pour le bénéfice transféré aux autres (752 pour une perte) ; autres : 4631 / 752 pour un bénéfice (652 pour une perte)"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Erreur fréquente",
        texte: "Inscrire au bilan du gérant un compte « Capital de la SEP » ou « Apports des associés à la SEP ». La SEP n'ayant ni personnalité ni patrimoine, elle n'a pas de capital. Les fonds versés par un associé au gérant sont une dette du gérant envers cet associé (4631), et les biens achetés pour la SEP appartiennent à celui qui les a achetés, avec une dette envers les autres pour leur part de financement (182). Rien ne doit apparaître dans les capitaux propres. Le résultat de la SEP, lui, rejoint les résultats de chacun par le 752 ou le 652.",
      },
      { type: 'controle', question: QCM[11] },
      {
        type: 'paragraphe',
        texte: "Le partage final a un inconvénient pour le lecteur des comptes. Chez le gérant, le chiffre d'affaires comprend toutes les ventes de la SEP, y compris la part qui revient aux autres. Chez les non-gérants, il n'apparaît rien d'autre qu'une quote-part de résultat. Ni l'un ni l'autre ne reflète l'activité réelle. L'AUDCIF demande donc des informations dans les **Notes annexes** (ch. 33, section 7). Le gérant peut fournir un compte de résultat retraité jusqu'au résultat d'exploitation. Les non-gérants peuvent présenter des « produits des activités courantes » plus représentatifs que leur chiffre d'affaires. Tous indiquent la part de leurs créances et dettes liée à la SEP. Le compte de résultat est complété par un poste « Quote-part de résultat partagé » en charges et en produits, à la fin du niveau exploitation, avec l'analyse des comptes 6521, 6525, 7521 et 7525.",
      },
      { type: 'controle', question: QCM[12] },
    ],
  },
  {
    numero: '10.6',
    titre: "Associés sans le savoir : la société créée de fait et la société de fait",
    navLabel: "Sociétés de fait",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les trois menuisiers de Kenya n'ont jamais signé de statuts. Pourtant, depuis six ans, ils louent ensemble un atelier, achètent le bois sur un compte commun, se présentent sous l'enseigne « Menuiserie des Trois Frères » et se partagent les bénéfices chaque trimestre. Un fournisseur de bois, impayé de 4 500 000, a traité avec l'un d'eux et découvre que les deux autres encaissaient aussi les recettes. Le droit OHADA a une réponse : il y a **société créée de fait** lorsque deux ou plusieurs personnes se comportent comme des associés sans avoir constitué entre elles l'une des sociétés reconnues par l'Acte uniforme (art. 864).",
      },
      {
        type: 'carte',
        titre: "Deux notions voisines (art. 864-865)",
        tableau: {
          entetes: ["", "Société créée de fait", "Société de fait"],
          lignes: [
            ["Situation", "Les intéressés se comportent comme des associés sans avoir constitué de société", "Ils ont constitué une société, mais elle comporte un vice de formation non régularisé, ou elle n'est pas d'une forme reconnue par l'Acte uniforme"],
            ["Exemple", "Les trois menuisiers de Kenya", "Une SARL dont les fonds n'ont jamais été déposés ni la déclaration notariée établie"],
            ["Preuve", "Par tout moyen (art. 867)", "Par tout moyen (art. 867)"],
            ["Reconnaissance", "Par le juge, à la demande de tout intéressé qui identifie les associés (art. 866)", "Par le juge"],
            ["Effet", "Règles de la **SNC** applicables aux associés (art. 868)", "Règles de la **SNC** applicables aux associés (art. 868)"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Dans l'Application 106, la SEP n'a duré qu'un mois, mais les principes valent pour un chantier de dix-huit mois. Chaque fin d'exercice des associés impose un arrêté intermédiaire de la SEP pour répartir le résultat de la période, ou au moins pour estimer la part de chacun. Les marchés à long terme posent en outre la question de la méthode de reconnaissance du chiffre d'affaires : à l'avancement ou à l'achèvement. Elle doit être la même pour tous les associés, faute de quoi le résultat partagé ne correspondrait à rien. Le contrat de SEP gagne à fixer ces règles comptables communes, comme un groupe fixe ses règles pour la consolidation.",
      },
      { type: 'controle', question: QCM[13] },
      {
        type: 'paragraphe',
        texte: "Pour le fournisseur, la reconnaissance judiciaire change tout. Il réunit les preuves : factures communes, enseigne, relevés du compte partagé, témoignages de clients. Il demande au juge de constater l'existence d'une société créée de fait entre les trois menuisiers, qu'il doit identifier (art. 866). Une fois cette existence reconnue, les règles de la SNC s'appliquent : chacun des trois répond **indéfiniment et solidairement** des dettes sociales (art. 868). Le fournisseur pourra réclamer les 4 500 000 à n'importe lequel d'entre eux. L'absence de formalités, qui semblait une facilité, se retourne contre eux : ils supportent la responsabilité la plus lourde que connaisse le droit des sociétés.",
      },
      {
        type: 'paragraphe',
        texte: "La société créée de fait n'est pas qu'une question d'artisans. Deux entreprises qui coopèrent de manière de plus en plus étroite (clients communs, compte bancaire partagé, partage des marges) sans formaliser leur relation courent le même risque. Un créancier de l'une peut chercher à atteindre l'autre en prouvant qu'elles se comportent comme des associées. Pour l'auditeur, les indices d'une société créée de fait se trouvent dans les comptes : partages de résultats, facturations croisées sans prix de marché, comptes courants importants entre entités non liées par une participation. Leur découverte doit conduire à qualifier la relation et, le cas échéant, à mentionner le risque dans les Notes annexes.",
      },
      { type: 'controle', question: QCM[14] },
      {
        type: 'filet',
        titre: "Faux amis : SEP et société créée de fait",
        texte: "Dans les deux cas, il n'y a pas d'immatriculation. Mais la SEP résulte d'un **choix** : les associés conviennent de ne pas immatriculer et organisent leurs rapports par contrat (art. 854-855). Chacun n'est alors engagé que par ses propres actes, sauf action commune ou immixtion (art. 861). La société créée de fait résulte d'un **comportement**, sans convention sur la forme : le juge lui applique d'office le régime de la SNC (art. 868). Fiscalement, les sociétés de fait et créées de fait relèvent de l'IS par leur activité (loi n° 23/053, art. 3), alors que la SEP n'y est soumise que sur option (art. 4). Pour les trois menuisiers, régulariser en constituant une SARL limiterait leur responsabilité pour l'avenir, sans effacer leurs dettes passées.",
      },
      { type: 'controle', question: QCM[15] },
    ],
  },
  {
    numero: '10.7',
    titre: "Le GIE : mettre en commun sans fusionner",
    navLabel: "GIE : régime",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Les six pharmacies de Lubumbashi ne veulent pas fusionner : chacune garde sa clientèle, son pharmacien titulaire et son enseigne. Elles veulent seulement acheter ensemble pour obtenir de meilleurs prix, partager un entrepôt et une camionnette de livraison. Le **groupement d'intérêt économique** est fait pour cela. Son but exclusif est de mettre en œuvre, pour une durée déterminée, tous les moyens propres à faciliter ou à développer l'activité économique de ses membres, à améliorer ou accroître ses résultats. Son activité doit se **rattacher** à celle des membres et rester **auxiliaire** (art. 869). Il peut être constitué **sans capital**, et il ne donne pas lieu par lui-même à réalisation et partage de bénéfices (art. 870).",
      },
      {
        type: 'carte',
        titre: "Le GIE en dix règles",
        liste: [
          "**Membres** : deux ou plus, personnes physiques ou morales, y compris des professions libérales réglementées comme les pharmaciens (art. 871).",
          "**Pas de titres négociables** représentant les droits des membres (art. 871).",
          "**Personnalité morale** et pleine capacité dès l'**immatriculation** au RCCM (art. 872).",
          "**Dettes** : chaque membre en répond sur son patrimoine propre, **solidairement**, sauf convention contraire avec le tiers ; un nouveau membre peut être exonéré des dettes antérieures si le contrat le permet et si la décision est publiée (art. 873).",
          "**Poursuites** contre un membre seulement après **mise en demeure vaine** du groupement (art. 874).",
          "**Contrat écrit et publié** : dénomination, identification des membres, durée, objet, siège ; contribution aux dettes libre, à défaut par parts égales ; mention « G.I.E. » sur tous les documents (art. 876).",
          "**Assemblée** : toute décision, à l'unanimité dans le silence du contrat, une voix par membre sauf clause ; réunion obligatoire à la demande d'un quart des membres (art. 877-878).",
          "**Administration** libre, par une ou plusieurs personnes ; limites de pouvoirs inopposables aux tiers (art. 879).",
          "**Obligations** seulement si le GIE ne réunit que des sociétés autorisées à en émettre, avec alors contrôle de gestion et commissaire aux comptes nommé pour six exercices (art. 875, 880).",
          "**Dissolution** : terme, objet, décision, juste motif, décès ou dissolution d'un membre sauf clause contraire (art. 883-884) ; liquidation et partage de l'excédent selon le contrat, à défaut par parts égales (art. 885).",
        ],
      },
      { type: 'controle', question: QCM[16] },
      {
        type: 'paragraphe',
        texte: "Le GIE se distingue d'une coopérative ou d'une centrale d'achat constituée en société par son **caractère auxiliaire**. Il n'a pas le droit de mener sa propre activité principale : il prolonge celle de ses membres. Le GIE des pharmacies achète et stocke des médicaments pour les revendre aux officines membres, et il ne peut pas ouvrir sa propre pharmacie concurrente. S'il sortait de ce rôle, il perdrait sa raison d'être juridique, et ses membres s'exposeraient à une requalification. C'est aussi pourquoi il ne peut pas émettre de titres négociables (art. 871) : ses membres ne sont pas des investisseurs, mais des entreprises qui mutualisent des moyens. Le contrat doit enfin fixer une **durée déterminée** (art. 869), renouvelable par prorogation (art. 877).",
      },
      { type: 'controle', question: QCM[17] },
      {
        type: 'paragraphe',
        texte: "La solidarité est le point qui inquiète le plus les pharmaciens. Si le GIE ne paie pas son grossiste, celui-ci peut, après une mise en demeure restée sans effet, réclamer la totalité de la dette à n'importe quelle pharmacie membre, qui se retournera ensuite contre les autres selon la contribution fixée au contrat. Deux parades existent. La première est **contractuelle** : le GIE peut négocier avec ses principaux fournisseurs une clause écartant la solidarité, que l'article 873 autorise « par convention contraire avec le tiers cocontractant ». La seconde est **organisationnelle** : un contrôle rigoureux de la trésorerie du GIE et des cotisations à jour évitent d'en arriver là. Le comptable du GIE doit, à chaque clôture, rapprocher les dettes du groupement de la capacité de paiement de ses membres.",
      },
      { type: 'controle', question: QCM[18] },
      {
        type: 'paragraphe',
        texte: "L'administration du GIE est souple. Le contrat, ou à défaut l'assemblée, nomme un ou plusieurs administrateurs et fixe leurs pouvoirs. Une personne morale peut être administrateur, à condition de désigner un représentant permanent, qui engage sa responsabilité comme s'il administrait en son nom propre (art. 879). À l'égard des tiers, tout administrateur engage le GIE pour les actes entrant dans son objet, et les limites de ses pouvoirs leur sont inopposables. Le contrôle de la gestion et des comptes est organisé par le contrat (art. 880). Pour un GIE de six pharmacies, un commissaire aux comptes n'est obligatoire que si le groupement émet des obligations, mais le contrat peut en prévoir un, et c'est souvent prudent compte tenu de la solidarité des membres.",
      },
      { type: 'controle', question: QCM[19] },
    ],
  },
  {
    numero: '10.8',
    titre: "La comptabilité du GIE et de ses membres (Applications 96-97)",
    navLabel: "GIE : comptes",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Doté de la personnalité morale, le GIE tient sa propre comptabilité, arrête ses comptes et les soumet à son assemblée, après le contrôle éventuel du commissaire aux comptes (AUDCIF, ch. 26, § 2.1). Son compte de résultat reflète sa fonction : n'ayant pas vocation à réaliser des bénéfices pour lui-même, il facture ses services à ses membres. Dans un **GIE de services**, les cotisations des membres sont des produits (**706 Services vendus**), régularisées en fin d'exercice lorsqu'elles sont versées sous forme d'abonnements. Dans un **GIE d'achats**, comme celui des pharmacies, le groupement achète en son nom pour revendre aux membres, ou agit comme mandataire ou commissionnaire, selon le contrat.",
      },
      {
        type: 'carte',
        titre: "Chez le membre : quatre types d'opérations",
        tableau: {
          entetes: ["Opération", "Compte chez le membre", "Exemple (Guide)"],
          lignes: [
            ["Parts du GIE", "266 Parts dans des GIE (pour mémoire s'il n'y a pas de capital)", "Application 97 : 40 000 000"],
            ["Avances durables", "2774 Avances à des GIE", "Application 97 : 10 000 000 (le Guide écrit 277)"],
            ["Cotisations pour services rendus", "621 Sous-traitance générale / 4631", "Charge d'exploitation, régularisée par le 476 si abonnement"],
            ["Bénéfice distribué", "4631 / 772 Revenus de participations", "Application 96 : 1/3 de 3 000 000 = 1 000 000"],
            ["Perte définitive", "621 / 4631 (complément de cotisation) ; à la clôture précédente, 659 / 4963", "Application 96 : 25 % de 8 000 000 = 2 000 000"],
          ],
        },
        note: "[texte officiel] L'Application 97 passe les avances au compte 277, qui est au plan de comptes le compte de regroupement « Créances rattachées à des participations et avances à des GIE » : le sous-compte dédié est le **2774 Avances à des GIE**. Chez le GIE, l'Application 97 crédite le 101 Capital social pour les parts et le 168 Autres emprunts et dettes pour les avances.",
      },
      {
        type: 'paragraphe',
        texte: "Le contrat de GIE doit être rédigé avec soin sur trois points. La **contribution aux dettes** entre membres, que l'article 876 laisse libre, à défaut par parts égales : un membre qui réalise 40 % des achats peut accepter de supporter 40 % des dettes. L'**entrée et la sortie** des membres : conditions d'admission, exonération éventuelle des dettes antérieures (art. 873), retrait possible après exécution de ses obligations (art. 876). Les **règles de décision** : l'unanimité, règle par défaut (art. 877), devient paralysante à six membres, et le contrat prévoit souvent des majorités pour les décisions courantes. Le comptable du GIE vérifie que les appels de cotisations et les répartitions de résultat respectent ces clés.",
      },
      { type: 'controle', question: QCM[20] },
      {
        type: 'paragraphe',
        texte: "Le résultat d'un GIE n'est appréhendé par ses membres que lorsqu'une **décision de distribution** est intervenue (AUDCIF, ch. 26, § 2.2). Un bénéfice est alors constaté, dans l'exercice de la distribution, au crédit du 772. Une perte est apurée soit par un complément de cotisation si elle est définitive, soit par des apports ou avances complémentaires si elle ne l'est pas. Dans l'Application 96, le membre C constate dès la clôture de son exercice N la perte probable du GIE déficitaire, par une charge pour dépréciation (659 / 4963) de 2 000 000, avant même l'arrêté des comptes du groupement. C'est la prudence : un membre solidaire ne peut pas ignorer une perte qu'il devra combler. Chaque membre déprécie aussi sa participation lorsque sa valeur comptable dépasse sa quote-part des capitaux propres du GIE, en imputant la dépréciation successivement sur le 266, le 2774 puis le compte courant, et en provisionnant le surplus.",
      },
      {
        type: 'paragraphe',
        texte: "La frontière entre cotisation et participation au résultat est importante pour le membre. Les cotisations régulières rémunèrent un service : elles sont des charges d'exploitation (621), déductibles dans les conditions générales. La participation au résultat, elle, n'apparaît que lorsque le GIE décide de distribuer un bénéfice ou d'apurer une perte. Un GIE bien géré ajuste ses cotisations pour couvrir exactement ses coûts : son résultat est alors proche de zéro, conformément à sa vocation de ne pas réaliser de bénéfices pour lui-même (art. 870). Si des bénéfices apparaissent de façon régulière, c'est le signe que les cotisations sont trop élevées, ou que le GIE réalise des opérations avec des tiers qui dépassent son rôle auxiliaire.",
      },
      { type: 'controle', question: QCM[21] },
      {
        type: 'filet',
        titre: "Transparence fiscale : ce que dit le SYSCOHADA, ce que dit la loi congolaise",
        texte: "L'AUDCIF (ch. 26) et le Guide présentent le GIE comme fiscalement transparent : chaque membre serait imposé sur sa part des bénéfices. Mais le SYSCOHADA n'est pas un texte fiscal : c'est la loi de chaque État qui fixe l'imposition. En RDC, la loi n° 23/053 exonère le GIE de l'IS **pour la quote-part de bénéfice distribuée à ses membres personnes physiques** (art. 6). Pour les autres situations, notamment une quote-part revenant à des membres sociétés ou un bénéfice non distribué, le régime doit être déterminé au regard de la loi, et non déduit du principe comptable de transparence.",
      },
      { type: 'controle', question: QCM[22] },
    ],
  },
  {
    numero: '10.9',
    titre: "Changer de forme sans changer d'identité : la transformation",
    navLabel: "Transformation",
    blocs: [
      {
        type: 'paragraphe',
        texte: "KIPUSHI AGRO SARL a trouvé un investisseur prêt à entrer à son capital, à condition qu'elle devienne une SA, avec un conseil d'administration et des actions librement négociables. Faut-il dissoudre la SARL et créer une SA ? Non. La **transformation** est l'opération par laquelle une société change de forme juridique par décision des associés. Régulière, elle **n'entraîne pas la création d'une personne morale nouvelle** : ce n'est qu'une modification des statuts, soumise aux mêmes conditions de forme et de délai (art. 181). La société garde son numéro RCCM, ses contrats, ses dettes, ses créances et son historique comptable.",
      },
      {
        type: 'carte',
        titre: "Les conditions selon la forme de départ ou d'arrivée",
        tableau: {
          entetes: ["Transformation", "Condition particulière", "Article"],
          lignes: [
            ["Toute société vers une forme à responsabilité illimitée (SNC)", "**Unanimité** des associés, à peine de nullité", "181, 692"],
            ["SARL vers une autre forme", "Capitaux propres **au moins égaux au capital**, certifiés par un commissaire aux comptes (choisi par le gérant s'il n'y en a pas)", "374-375"],
            ["SA vers une autre forme", "**Deux ans** d'existence, **deux bilans** approuvés, rapport du commissaire aux comptes attestant un actif net au moins égal au capital, approbation des obligataires le cas échéant", "690-691, 693-1"],
            ["SA vers SARL", "Conditions de modification des statuts de la SARL", "693"],
            ["Toute société vers SAS", "**Unanimité** des associés", "853-6"],
            ["Société sans commissaire aux comptes vers société par actions", "**Commissaires à la transformation** désignés par le juge, sauf accord unanime", "187-1"],
            ["Société vers GIE, ou GIE vers SNC ou SARL", "Possible sans dissolution ni personne nouvelle, si l'objet correspond ; créanciers du GIE protégés", "882"],
          ],
        },
      },
      { type: 'controle', question: QCM[23] },
      {
        type: 'paragraphe',
        texte: "La transformation de l'article 882 mérite une attention particulière. Une société dont l'objet correspond à celui d'un GIE, par exemple une SARL créée par plusieurs entreprises pour gérer un entrepôt commun, peut devenir GIE sans dissolution ni création d'une personne morale nouvelle. Inversement, un GIE peut devenir SNC ou SARL. Ce passage est fréquent lorsque le GIE se met à mener une activité propre, au-delà de son rôle auxiliaire : la forme sociale doit alors suivre la réalité économique. Dans ce cas, comme pour une SNC devenue SARL, les créanciers antérieurs conservent leurs droits contre le GIE et ses membres (art. 882).",
      },
      { type: 'controle', question: QCM[24] },
      {
        type: 'paragraphe',
        texte: "Pour KIPUSHI AGRO, deux vérifications s'imposent avant l'assemblée. D'abord, ses **capitaux propres** doivent être au moins égaux à son capital, et un commissaire aux comptes doit le certifier (art. 374-375). Une SARL qui a accumulé des pertes devra d'abord reconstituer ses capitaux propres (chapitre 5). Ensuite, n'ayant pas de commissaire aux comptes, elle doit faire désigner des **commissaires à la transformation**, sauf accord unanime de ses associés (art. 187-1). Ils apprécient sous leur responsabilité la valeur des biens de l'actif et les avantages particuliers, et leur rapport peut tenir lieu de celui de l'article 375. Les associés statuent sur cette évaluation et ne peuvent la réduire qu'à l'unanimité. Sans approbation expresse au procès-verbal, la transformation est nulle.",
      },
      {
        type: 'paragraphe',
        texte: "La transformation est souvent l'étape qui accompagne la croissance. Une SARL familiale devient SA pour accueillir des investisseurs, se doter d'un conseil d'administration et préparer, un jour, une cotation à la future Bourse de Kinshasa (chapitre 6). À l'inverse, une SA dont l'actionnariat s'est réduit peut devenir SARL ou SAS pour alléger ses coûts de fonctionnement, notamment le commissariat aux comptes, obligatoire dans toute SA. Les conditions financières (capitaux propres au moins égaux au capital pour la SARL, actif net au moins égal au capital pour la SA) visent à empêcher qu'une société en difficulté se serve de la transformation pour échapper à ses obligations ou tromper ses nouveaux partenaires sur sa solidité.",
      },
      { type: 'controle', question: QCM[25] },
      { type: 'controle', question: QCM[26] },
      {
        type: 'carte',
        titre: "Les effets de la transformation",
        tableau: {
          entetes: ["Question", "Réponse", "Article"],
          lignes: [
            ["Date d'effet", "Jour de la décision ; opposable aux tiers après la publicité de l'art. 265 ; **aucune rétroactivité** (contrairement à la fusion)", "182"],
            ["Comptes de l'exercice", "Pas d'arrêté en cours d'exercice, sauf décision des associés ; comptes de l'exercice entier arrêtés, approuvés et bénéfices répartis selon la **nouvelle** forme", "183"],
            ["Dirigeants", "Fin des pouvoirs des anciens organes ; indemnité seulement si la transformation visait à leur nuire ; rapport de gestion établi par les anciens et les nouveaux organes, chacun pour sa période", "184-185"],
            ["Contrats et sûretés", "Subsistent sous la nouvelle forme, sauf clause contraire de l'acte constitutif de la sûreté", "186"],
            ["Créanciers d'une société à responsabilité illimitée devenue limitée", "Conservent leurs droits contre la société **et les associés**", "186"],
            ["Commissaire aux comptes", "Maintenu si la nouvelle forme en exige un ; sinon, mission terminée sauf décision contraire, avec compte rendu de la période écoulée", "187"],
            ["Forme non reconnue", "Perte de la personnalité juridique si la société exerce une activité commerciale", "188"],
          ],
        },
      },
      {
        type: 'filet',
        titre: "Question d'étudiant : pourquoi pas de rétroactivité ?",
        texte: "La fusion peut rétroagir (art. 192), la transformation non (art. 182). La différence tient à la nature des opérations. Dans une fusion, deux patrimoines se rejoignent, et il est commode de fixer une date comptable commune, par exemple le début de l'exercice. Dans une transformation, rien ne change dans le patrimoine : seule la forme change. Faire rétroagir une forme sociale reviendrait à dire que des décisions passées ont été prises par des organes qui n'existaient pas encore. En revanche, l'article 183 permet de rattacher l'exercice entier à la nouvelle forme pour l'approbation des comptes et la répartition du bénéfice, ce qui répond au besoin pratique sans fiction juridique.",
      },
      { type: 'controle', question: QCM[27] },
    ],
  },
  {
    numero: '10.10',
    titre: "Transformer, et choisir le bon véhicule",
    navLabel: "Grille de choix",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Comptablement, la transformation est presque invisible, et c'est voulu. La personne morale continue : il n'y a ni bilan de clôture, ni bilan d'ouverture, ni réévaluation des actifs. Les comptes de l'exercice en cours se poursuivent sans interruption, sauf si les associés décident un arrêté intermédiaire (art. 183). Seuls changent les **intitulés** : le capital de KIPUSHI AGRO, jusque-là divisé en parts sociales, est désormais divisé en actions ; le compte 101 reste le même, avec un nouveau détail dans les Notes annexes. Les états financiers de l'exercice sont établis et approuvés selon les règles de la SA, et c'est la nouvelle assemblée qui répartira le bénéfice. Les frais de la transformation (commissaires, publicité, greffe) sont des charges de l'exercice.",
      },
      {
        type: 'paragraphe',
        texte: "La continuité comptable n'empêche pas certains ajustements. Les statuts de la SA prévoient une dotation à la réserve légale selon ses propres règles, et le capital, divisé en actions, doit respecter le minimum légal de la SA (chapitre 2). Si le capital de la SARL est inférieur à ce minimum, la transformation doit s'accompagner d'une augmentation de capital (chapitre 4). Les comptes courants d'associés, les dividendes à payer et les dettes envers les dirigeants restent inscrits à l'identique. Enfin, le changement de forme se répercute dans les Notes annexes : description de l'opération, date d'effet, nouvelle composition du capital et identité des nouveaux organes.",
      },
      { type: 'controle', question: QCM[28] },
      {
        type: 'filet',
        titre: "Deux pièges fiscaux et juridiques",
        texte: "Premier piège : une SA qui se transforme en SNC pour échapper à l'IS se heurte à la loi congolaise, qui ferme l'option pour le régime de l'IS aux sociétés de personnes issues de la transformation antérieure de sociétés par actions (loi n° 23/053, art. 4). Il faudrait d'ailleurs l'unanimité pour une telle transformation (art. 692). Second piège : la transformation ne peut pas servir à effacer des dettes. Une SNC qui devient SARL laisse ses créanciers antérieurs libres de poursuivre les associés sur leurs biens personnels (art. 186), et un GIE transformé en SARL fait de même (art. 882).",
      },
      {
        type: 'carte',
        titre: "Grille de choix : quel véhicule pour quel projet ?",
        tableau: {
          entetes: ["Projet", "Véhicule adapté", "Pourquoi"],
          lignes: [
            ["Exécuter ensemble un chantier ponctuel, sans structure visible", "Société en participation", "Pas d'immatriculation, liberté contractuelle, chacun garde ses biens et n'est engagé que par ses actes"],
            ["Mutualiser durablement des achats, une logistique ou un service", "GIE", "Personnalité morale, activité auxiliaire, sans capital, mais solidarité des membres"],
            ["Exercer ensemble une activité principale et durable", "Société commerciale (SARL, SA, SAS)", "Patrimoine propre, responsabilité limitée aux apports"],
            ["Changer de cadre pour accueillir un investisseur ou alléger les contraintes", "Transformation", "Continuité de la personne morale, des contrats et des comptes"],
            ["Travailler ensemble « sans papiers »", "À éviter", "Risque de société créée de fait et de responsabilité indéfinie et solidaire"],
          ],
        },
      },
      {
        type: 'paragraphe',
        texte: "Retour aux quatre dossiers du cabinet. KATANGA ROUTES et LUALABA TP signent un contrat de SEP à durée égale au chantier, avec KATANGA ROUTES pour gérant et une comptabilité autonome reliée par le compte 188. Les six pharmacies constituent un GIE d'achats, immatriculé, et négocient avec leur grossiste une clause écartant la solidarité. Les trois menuisiers, conseillés, règlent le fournisseur et constituent une SARL pour l'avenir. KIPUSHI AGRO fait certifier ses capitaux propres, obtient le rapport des commissaires à la transformation et devient une SA le jour de son assemblée, sans perdre un seul de ses contrats. Chacune de ces solutions découle des mêmes questions : qui est engagé envers les tiers, et comment traduire fidèlement dans les comptes une activité menée à plusieurs.",
      },
      {
        type: 'filet',
        titre: "Le regard de l'auditeur",
        texte: "Sur une SEP : contrat, clé de répartition, rapprochement des comptes de liaison (188, 4631, 182, 2773) chez tous les coparticipants, engagements solidaires éventuels. Sur un GIE : contrat publié, cotisations appelées et payées, dépréciation des participations et comptes courants selon la quote-part des capitaux propres, perte prévisible anticipée. Sur une transformation : conditions de capitaux propres certifiées, rapport des commissaires à la transformation, majorités, date d'effet, publicité, continuité des comptes et maintien ou fin du mandat du commissaire aux comptes. Sur une coopération informelle : indices d'une société créée de fait et risque de solidarité.",
      },
      { type: 'controle', question: QCM[29] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas1',
    titre: "Chantier LUKAYA : société en participation entre deux entreprises",
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
    id: 'cas2',
    titre: "GIE PHARMA-DISTRIB : coopération entre officines",
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
    id: 'cas3',
    titre: "KIMPESE AGRO : transformation d'une SARL en société anonyme",
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
    id: 'cas4',
    titre: "Requalifications : de la coopération informelle à la société de fait",
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
  {
    id: 'cas5',
    titre: "Pharmacie DU CENTRE et son GIE : une année d'écritures",
    contexte: "La Pharmacie DU CENTRE SARL est membre, pour 1/6, du GIE LUBUM-PHARMA, constitué le 01/02/N par six officines. Opérations de la pharmacie : 01/02/N, versement de 5 000 000 pour ses parts et d'une avance de démarrage de 2 000 000, remboursable dans cinq ans ; chaque mois à partir de février, cotisation de 300 000 pour les services logistiques du GIE ; au 31/12/N, le GIE laisse prévoir une perte de 3 600 000 pour son premier exercice ; en N+1, l'assemblée du GIE constate cette perte comme définitive et appelle un complément de cotisation proportionnel ; en N+2, le GIE réalise un bénéfice de 4 800 000, dont l'assemblée décide la distribution le 30/04/N+3.",
    questions: [
      {
        num: 1,
        enonce: "Passez l'écriture du 01/02/N chez la pharmacie.",
        correction: "Débit 266 Parts dans des GIE 5 000 000 et débit 2774 Avances à des GIE 2 000 000 / crédit 521 Banques 7 000 000. L'avance, non réalisable à court terme, va au 2774 (le Guide écrit 277 dans l'Application 97). Chez le GIE : débit 521 / crédit 101 pour les parts et crédit 168 Autres emprunts et dettes pour l'avance.",
      },
      {
        num: 2,
        enonce: "Comment comptabiliser les cotisations mensuelles ? Quel montant pour N ?",
        correction: "Ce sont des charges d'exploitation, rémunérant des services rendus : débit 621 Sous-traitance générale / crédit 4631 (compte courant avec le GIE), puis règlement par 4631 / 521. Pour N (février à décembre) : 11 × 300 000 = 3 300 000. Chez le GIE, ces cotisations sont des produits au 706 Services vendus.",
      },
      {
        num: 3,
        enonce: "Que faire au 31/12/N face à la perte prévisible du GIE ?",
        correction: "La quote-part de la pharmacie est de 3 600 000 / 6 = 600 000. Le GIE n'a pas encore arrêté ses comptes, mais la pharmacie, tenue sur son patrimoine propre et solidairement (art. 873), ne peut ignorer une perte qu'elle devra combler : débit 659 Charges pour dépréciations / crédit 4963, 600 000 (schéma de l'Application 96). Elle vérifie aussi que la valeur de ses parts (266) n'excède pas sa quote-part des capitaux propres du GIE (AUDCIF, ch. 26, § 2.2).",
      },
      {
        num: 4,
        enonce: "Passez les écritures de N+1 lorsque la perte est constatée comme définitive.",
        correction: "Complément de cotisation : débit 621 / crédit 4631, 600 000, puis règlement 4631 / 521. Reprise de la dépréciation constatée en N, devenue sans objet puisque la charge est désormais comptabilisée : débit 4963 / crédit 759 Reprises de charges pour dépréciations et provisions pour risques à court terme d'exploitation, 600 000. L'effet net sur N+1 est nul : la charge avait été anticipée en N.",
      },
      {
        num: 5,
        enonce: "Quand et comment la pharmacie comptabilise-t-elle sa part du bénéfice de N+2 ? Quel régime fiscal ?",
        correction: "Seulement dans l'exercice où la distribution est décidée, soit en N+3 : débit 4631 / crédit 772 Revenus de participations, 800 000 (4 800 000 / 6). En RDC, l'exonération d'IS du GIE vise la quote-part distribuée à ses membres personnes physiques (loi n° 23/053, art. 6). La pharmacie étant une SARL, la quote-part qui lui revient n'entre pas dans ce cas : le régime applicable doit être vérifié au regard de la loi, et la pharmacie intègre en tout état de cause ce produit dans son propre résultat imposable.",
      },
    ],
  },
  {
    id: 'cas6',
    titre: "Vrai ou faux : les certitudes du stagiaire",
    contexte: "À la fin de son stage, un stagiaire du cabinet résume ce qu'il a retenu des dossiers de sociétés particulières. Pour chaque affirmation, dites si elle est vraie ou fausse et justifiez par le texte.",
    questions: [
      {
        num: 1,
        enonce: "« Une SEP ne peut pas être prouvée sans écrit, puisqu'elle n'est pas immatriculée. »",
        correction: "Faux. L'existence de la société en participation peut être prouvée par tous moyens (art. 854). Un écrit reste recommandé pour organiser les rapports entre associés, mais il n'est pas une condition d'existence.",
      },
      {
        num: 2,
        enonce: "« Quand une SNC devient SARL, les associés ne répondent plus que dans la limite de leurs apports, y compris pour les dettes anciennes. »",
        correction: "Faux. Les créanciers dont la créance est antérieure à la transformation d'une société à responsabilité illimitée en société à responsabilité limitée conservent leurs droits contre la société et contre les associés (art. 186). La limitation ne vaut que pour les dettes postérieures.",
      },
      {
        num: 3,
        enonce: "« Une SARL qui devient SA au 30 juin doit établir un bilan de clôture au 29 juin et un bilan d'ouverture de la SA. »",
        correction: "Faux. La transformation n'entraîne pas la création d'une personne morale nouvelle (art. 181) ni, sauf décision des associés, un arrêté des comptes en cours d'exercice (art. 183). Les états financiers de l'exercice entier sont établis selon les règles de la SA. La transformation ne peut pas non plus rétroagir (art. 182).",
      },
      {
        num: 4,
        enonce: "« Un GIE peut être constitué sans capital et sans que ses membres soient des commerçants. »",
        correction: "Vrai. Le GIE peut être constitué sans capital (art. 869), par deux ou plusieurs personnes physiques ou morales, y compris des membres de professions libérales réglementées (art. 871). Son activité doit toutefois se rattacher à celle de ses membres et rester auxiliaire.",
      },
      {
        num: 5,
        enonce: "« Une SA créée il y a dix-huit mois peut se transformer en SARL dès que ses actionnaires le décident. »",
        correction: "Faux. Une SA ne peut se transformer que si elle existe depuis deux ans au moins et a fait approuver le bilan de ses deux premiers exercices, sur rapport du commissaire aux comptes attestant que l'actif net est au moins égal au capital (art. 690-691). La délibération contraire est nulle (art. 693-1). La décision suit ensuite les conditions de modification des statuts de la SARL (art. 693).",
      },
      {
        num: 6,
        enonce: "« Les trois menuisiers qui n'ont rien signé ne risquent rien, puisqu'aucune société n'existe. »",
        correction: "Faux. Deux ou plusieurs personnes qui se comportent comme des associés sans avoir constitué de société reconnue forment une société créée de fait (art. 864). Tout intéressé peut en faire reconnaître l'existence (art. 866), prouvée par tout moyen (art. 867), et les règles de la SNC s'appliquent alors : responsabilité indéfinie et solidaire (art. 868). Fiscalement, les sociétés créées de fait relèvent de l'IS par leur activité (loi n° 23/053, art. 3).",
      },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue3',
  numero: 10,
  id: 'ue3-chapitre-10',
  titre: "Sociétés particulières : participation, sociétés de fait, GIE, transformation",
  sousTitre: "AUSCGIE révisé, art. 181-188, 374-375, 690-693-1, 853-6 et 854-885 · AUDCIF, Titre VIII, ch. 26 et 33 · SYSCOHADA, Applications 96-97 et 106-107 · loi n° 23/053, art. 3, 4 et 6",
  infoBulle: "Quatre montages observés à Lubumbashi pour étudier les structures à part de l'AUSCGIE : la société en participation (sans personnalité morale, comptes de liaison 188, 182, 2773, 4631, partage du résultat), la société créée de fait et la société de fait (régime de la SNC), le GIE (activité auxiliaire, solidarité, comptes 266, 2774, 621, 772) et la transformation (continuité de la personne morale, conditions selon les formes, commissaires à la transformation), avec une grille de choix et la fiscalité congolaise.",
  loiRef: "Art. 181-188, 374-375, 690-693-1, 853-6, 854-885 AUSCGIE · AUDCIF, Titre VIII, ch. 26 et 33 · App. 96-97, 106-107 · loi n° 23/053, art. 3, 4, 6",
  moduleLabel: 'UE 3 · Comptabilité des sociétés',
  retourRoute: '/ue3-compta-societes',
  coursId: 'ue3-compta-societes',
  objectifs: [
    "Distinguer société en participation, société créée de fait, société de fait, GIE et société transformée, par leur personnalité, leur responsabilité et leur fiscalité",
    "Appliquer le régime de la société en participation : liberté contractuelle, propriété des biens, engagement envers les tiers, dissolution (art. 854-863)",
    "Comptabiliser une SEP en comptabilité autonome ou intégrée et répartir son résultat (AUDCIF, ch. 33 ; Applications 106-107)",
    "Reconnaître une société créée de fait ou une société de fait et en tirer les conséquences (art. 864-868)",
    "Maîtriser le régime du GIE et sa comptabilité, chez le groupement et chez ses membres (art. 869-885 ; AUDCIF, ch. 26 ; Applications 96-97)",
    "Conduire une transformation : conditions selon les formes, commissaires, effets sur les comptes, les dirigeants et les créanciers (art. 181-188, 374-375, 690-693-1, 853-6, 882)",
    "Choisir le véhicule adapté à un projet commun et mesurer ses conséquences fiscales en RDC (loi n° 23/053, art. 3, 4 et 6)",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Société en participation : non immatriculée par choix, sans personnalité morale ni publicité, prouvée par tous moyens ; organisation libre, à défaut régime de la SNC entre associés (art. 854-856).",
    "Chaque associé reste propriétaire de ce qu'il met à disposition, sauf indivision (art. 857-860) ; chacun n'est engagé envers les tiers que par ses actes, sauf action commune ou immixtion, auquel cas l'obligation est indéfinie et solidaire (art. 861).",
    "Comptabilité de la SEP : comptes de liaison 188 (comptabilité autonome) ou comptes dédiés chez le gérant ; opérations entre coparticipants au 4631 ; part des non-gérants dans les biens au 182 (gérant) et au 2773 (non-gérant) ; résultat réparti par 752 et 652.",
    "Société créée de fait (comportement d'associés sans société) et société de fait (société viciée ou de forme non reconnue) : preuve par tout moyen, reconnaissance judiciaire, régime de la SNC (art. 864-868).",
    "GIE : activité auxiliaire à celle des membres, sans capital possible, personnalité dès l'immatriculation, membres tenus sur leur patrimoine et solidairement après mise en demeure du groupement, unanimité dans le silence du contrat (art. 869-885).",
    "Chez le membre d'un GIE : parts au 266, avances durables au 2774, cotisations au 621, bénéfice distribué au 772, perte prévisible dépréciée par 659 / 4963 (AUDCIF, ch. 26 ; Applications 96-97).",
    "Transformation : pas de personne morale nouvelle, modification des statuts, effet au jour de la décision sans rétroactivité, pas d'arrêté des comptes sauf décision, comptes de l'exercice selon la nouvelle forme (art. 181-183).",
    "Unanimité pour passer à une responsabilité illimitée ou à la SAS ; SARL : capitaux propres au moins égaux au capital certifiés ; SA : deux ans et deux bilans ; commissaires à la transformation pour une société sans commissaire aux comptes devenant société par actions (art. 181, 187-1, 374-375, 690-693-1, 853-6).",
    "Contrats et sûretés subsistent ; les créanciers d'une société à responsabilité illimitée devenue limitée gardent leurs droits contre les associés (art. 186, 882).",
    "Fiscalité RDC : SEP à l'IS sur option irrévocable (art. 4) ; sociétés de fait et créées de fait à l'IS par leur activité (art. 3) ; GIE exonéré pour la quote-part distribuée aux membres personnes physiques (art. 6).",
  ],
  references: [
    { genre: 'texte', intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)", precision: "30 janvier 2014 ; art. 181 à 188 et 187-1, 374-375, 690 à 693-1, 853-6, 854 à 885" },
    { genre: 'texte', intitule: "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)", precision: "Titre VIII, chapitres 26 (groupement d'intérêt économique) et 33 (opérations faites en commun)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, Guide d'application", precision: "Applications 96-97 (GIE) et 106-107 (société en participation, comptabilité autonome et intégrée)" },
    { genre: 'texte', intitule: "SYSCOHADA révisé, plan de comptes", precision: "comptes 101, 168, 182, 188, 266, 2773, 2774, 4631, 4963, 621, 652, 659, 706, 752, 772, 781" },
    { genre: 'texte', intitule: "Loi n° 23/053 du 30 novembre 2023 relative à l'impôt sur les sociétés et à l'impôt sur le revenu des personnes physiques", precision: "art. 3 (champ par l'activité), 4 (option) et 6 (exonération du GIE)" },
    { genre: 'ouvrage', auteur: "Mapapa Mbangala A., Nkoy Mbangala C. et Mensah Freitas C.", titre: "Comptabilité des sociétés OHADA", editeur: "Droit Afrique", lieu: "s.l.", annee: "2026" },
    { genre: 'ouvrage', auteur: "Dobill M.", titre: "Comptabilité OHADA, tome 3 : comptabilité des sociétés", editeur: "Karthala", lieu: "Paris", annee: "2013" },
    { genre: 'ouvrage', auteur: "Nzoimbengene Luyindula B. D.", titre: "Comptabilité des sociétés suivant le système comptable OHADA révisé", editeur: "2e éd., à compte d'auteur", lieu: "s.l.", annee: "2025" },
    { genre: 'ouvrage', auteur: "Pougoué P.-G. (dir.)", titre: "Encyclopédie du droit OHADA", editeur: "Lamy", lieu: "Paris", annee: "2011" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : AUSCGIE révisé du 30 janvier 2014 · AUDCIF, Titre VIII, chapitres 26 et 33, et SYSCOHADA révisé (Applications 96, 97, 106, 107) · loi n° 23/053 du 30 novembre 2023.",
}

export default chapitre
