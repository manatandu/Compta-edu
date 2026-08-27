// Chapitre 10 du module UE1, Droit du travail : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
import type { Chapitre } from '@/lib/chapitre-types'

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '10.1',
    titre: 'Notion et fondement légal du décompte final',
    navLabel: '10.1 Notion et fondement légal',
    blocs: [
      { type: 'paragraphe', texte: "Le Code du travail ne définit à aucun endroit le terme « décompte final » : c'est un usage professionnel, consacré par la pratique comptable et sociale, qui en est venu à désigner le solde payé au travailleur à la cessation de son contrat, quelle qu'en soit la cause. Son fondement légal se trouve à l'article 100 : toute somme restant due au travailleur ou à ses ayants droit lors de la cessation définitive des services doit lui être payée au plus tard dans les deux jours ouvrables suivant cette cessation — un délai particulièrement bref, qui impose à l'employeur d'anticiper le calcul avant même la rupture effective." },
      { type: 'filet', titre: "Un délai de paiement distinct du calcul lui-même", texte: "Le respect du délai de deux jours ouvrables de l'article 100 est une obligation autonome : un décompte final exact mais payé en retard expose l'employeur à un risque contentieux propre, indépendant de la justesse des montants calculés. Ce chapitre applique la méthode opérationnelle enseignée en pratique professionnelle comptable (CPCC), qui s'appuie sur les articles déjà étudiés dans ce module — notamment les articles 64, 66, 100, 140 à 145 et 258 — sans s'y substituer : en cas de doute, l'article du Code prime toujours sur une pratique de calcul." },
      { type: 'paragraphe', texte: "Le décompte final se calcule aussi bien pour un contrat à durée déterminée que pour un contrat à durée indéterminée, mais ses composantes varient sensiblement selon la nature du contrat et la cause de la rupture — ce que les sections suivantes détaillent avant d'aborder le calcul du préavis, du congé, de la gratification, puis la comptabilisation SYSCOHADA de l'ensemble." },
    ],
  },
  {
    numero: '10.2',
    titre: 'Le décompte final en contrat à durée déterminée',
    navLabel: '10.2 Décompte final en CDD',
    blocs: [
      { type: 'paragraphe', texte: "Le CDD s'éteint de plein droit à l'arrivée du terme, sans préavis ni notification, sauf clause d'essai encore en cours. Le décompte final se limite alors, en principe, aux éléments déjà acquis : arriérés de salaire, primes et avantages non payés, indemnité de congé annuel non pris, et tout autre droit acquis au jour de l'expiration — une convention collective ou le contrat lui-même pouvant en outre prévoir une enveloppe de fin de contrat, comme une indemnité forfaitaire par année de service." },
      { type: 'carte', titre: 'La rupture anticipée du CDD, trois hypothèses', tableau: { entetes: ['Hypothèse', 'Conséquence sur le décompte'], lignes: [['Rupture anticipée et illégale par l\'employeur (hors cas limitatifs)', '**Dommages-intérêts égaux aux rémunérations dues jusqu\'au terme du contrat**'], ['Faute lourde du travailleur', '**Aucun décompte au-delà des arriérés déjà acquis**'], ['Démission du travailleur en CDD', '**Décompte limité aux arriérés, jours prestés et congé non payé**']] }, texte: 'La loi n\'admet la rupture anticipée d\'un CDD que dans des cas limitatifs : accord des parties, faute lourde de l\'une d\'elles, force majeure, ou effets d\'une clause d\'essai encore active — un principe déjà rencontré au chapitre 4 à propos de la résiliation du contrat.' },
    ],
  },
  {
    numero: '10.3',
    titre: 'Le calcul du préavis',
    navLabel: '10.3 Le calcul du préavis',
    blocs: [
      { type: 'paragraphe', texte: "Le préavis, déjà étudié au chapitre 4 dans son principe (article 64), est le délai qui court entre la notification de la rupture et la cessation effective du travail. L'employeur qui licencie choisit entre le faire exécuter ou le payer sous forme d'indemnité compensatrice ; le travailleur qui démissionne choisit symétriquement entre le prester ou verser l'indemnité correspondante à l'employeur. Il n'est dû ni pendant l'essai (sauf résiliation après les trois premiers jours), ni en cas de faute lourde, ni en cas de force majeure." },
      { type: 'carte', titre: 'Barème légal par défaut, à défaut de convention collective plus favorable', tableau: { entetes: ['Catégorie', 'Formule (préavis employeur)'], lignes: [['Travailleurs classés (catégories 1 à 5)', '**14 jours + (7 jours × ancienneté en années)**'], ['Agents de maîtrise (catégorie 6)', '**1 mois (22 ou 26 jours) + (9 jours × ancienneté)**'], ['Cadres (catégorie 7)', '**3 mois (66 ou 78 jours) + (16 jours × ancienneté)**']] }, texte: "Le préavis de démission, à l'initiative du travailleur, est égal à la moitié du préavis que l'employeur aurait dû donner, sans jamais pouvoir l'excéder (article 64). Exception notable, déjà rencontrée au chapitre 8 : le licenciement d'un délégué syndical titulaire ou suppléant impose un préavis doublé, qui ne peut être inférieur à trois mois (article 258)." },
      { type: 'filet', titre: 'Toujours vérifier la convention collective', texte: "Une convention collective peut fixer un barème plus long que le minimum légal — par exemple, un protocole sectoriel du commerce observé en pratique retient 18 jours + 8 jours par année d'ancienneté pour les catégories 1 à 5, contre 14 + 7 dans le barème légal par défaut. Le barème légal ne s'applique qu'à défaut de disposition conventionnelle ou contractuelle plus favorable au travailleur." },
      { type: 'paragraphe', texte: "Pendant le préavis, les obligations réciproques du contrat restent dues, et le travailleur bénéficie d'un jour de liberté par semaine, payé à plein salaire, pour rechercher un nouvel emploi. S'il trouve un nouvel emploi, il peut partir avant la fin du préavis moyennant un délai réduit fixé de commun accord (sept jours maximum à dater du nouvel engagement), mais perd alors la rémunération du reliquat de préavis ; il peut aussi cesser le travail à la moitié du préavis, l'employeur restant dans ce cas redevable de la rémunération du temps restant. Si l'employeur dispense le travailleur de prester le préavis, il doit lui verser l'intégralité des salaires et avantages que le travailleur aurait perçus, plus l'indemnité compensatrice ; si c'est le travailleur qui demande la dispense, il perd le droit à l'indemnité." },
    ],
  },
  {
    numero: '10.4',
    titre: 'Le congé annuel dans le décompte final',
    navLabel: '10.4 Congé annuel dans le décompte',
    blocs: [
      { type: 'paragraphe', texte: "Le congé annuel, déjà étudié au chapitre 6 dans son principe (article 141), intervient dans le décompte final sous trois formes distinctes qu'il ne faut jamais confondre : le congé déjà acquis mais non pris et non payé, le congé au prorata de l'année en cours (congé « compensatoire »), et le congé calculé sur la période même du préavis." },
      { type: 'carte', titre: 'Les trois composantes du congé dans le décompte', tableau: { entetes: ['Composante', 'Méthode de calcul'], lignes: [['Congé non pris des années antérieures', '**18 jours × nombre d\'années non soldées** (base : 1,5 jour/mois entier, travailleur de plus de 18 ans, mois de 26 jours)'], ['Congé prorata de l\'année en cours', '**(jours prestés dans l\'année × 18) / 312**'], ['Congé sur préavis', '**(jours de préavis × 18) / 312**']] }, texte: 'Le diviseur 312 correspond à la base théorique de jours ouvrables par an (26 jours × 12 mois) : il sert de dénominateur commun à tous les calculs de prorata du décompte final, qu\'il s\'agisse du congé ou, comme on le verra, de la gratification.' },
      { type: 'paragraphe', texte: "Une fois le nombre de jours de congé déterminé pour chaque composante, l'indemnité correspondante s'obtient en multipliant ce nombre de jours par le taux journalier de chaque élément de rémunération concerné : salaire de base journalier, mais aussi, le cas échéant, indemnité de logement journalière, de transport, ou toute prime versée de façon récurrente — le même schéma de calcul s'appliquant identiquement à chaque avantage journalier plutôt qu'un calcul global unique." },
    ],
  },
  {
    numero: '10.5',
    titre: 'La gratification (treizième mois) dans le décompte final',
    navLabel: '10.5 La gratification',
    blocs: [
      { type: 'paragraphe', texte: "Lorsque l'employeur verse effectivement une gratification à ses travailleurs — pratique répandue mais non imposée par le Code du travail lui-même —, celle-ci doit être intégrée au décompte final selon la même logique de prorata que le congé, en trois composantes distinctes." },
      { type: 'carte', titre: 'Les trois composantes de la gratification', tableau: { entetes: ['Composante', 'Méthode de calcul'], lignes: [['Gratification non payée des années antérieures', '**1 mois de rémunération (22 ou 26 jours) par année entière non payée**'], ['Gratification de l\'année en cours (fin de contrat en cours d\'année)', '**Dernier salaire brut × jours prestés / 312**'], ['Gratification sur préavis', '**Dernier salaire brut × jours de préavis / 312**']] } },
      { type: 'paragraphe', texte: "Cette même logique de prorata par 312 s'étend, plus largement, à tout autre avantage dû sur la période de préavis qui ne se calcule pas naturellement au jour le jour — l'article 66 du Code du travail, qui impose de tenir compte de la moyenne des avantages antérieurs pour les éléments de rémunération non strictement journaliers, venant compléter ce calcul lorsque certains avantages varient d'un mois à l'autre (commissions, primes sur bénéfice)." },
    ],
  },
  {
    numero: '10.6',
    titre: 'Les retenues et la comptabilisation SYSCOHADA du décompte final',
    navLabel: '10.6 Retenues et comptabilisation',
    blocs: [
      { type: 'carte', titre: 'Les retenues opérées sur le décompte final', tableau: { entetes: ['Retenue', 'Taux/base'], lignes: [['CNSS, part travailleur', '**5 % de la base imposable**, à soustraire du brut'], ['IPR (impôt sur la rémunération)', 'Barème progressif de l\'IRPP — voir le module fiscalité ; un taux forfaitaire simplifié est parfois retenu en exercice pédagogique, jamais comme barème réel'], ['Cotisation syndicale', '**2 % de la base imposable**, si le travailleur est syndiqué'], ['Avances, acomptes, prêts', 'Selon les montants effectivement dus par le travailleur à l\'employeur']] }, texte: "Ordre de calcul type : total brut → base CNSS (brut, sous réserve des franchises éventuelles) → CNSS 5 % → base IPR (base CNSS diminuée de la retenue CNSS) → IPR selon le barème applicable → cotisation syndicale 2 % si le travailleur est syndiqué → total des retenues → net à payer = total brut − total des retenues." },
      { type: 'filet', titre: 'Ne jamais confondre le taux du travailleur et celui de l\'employeur', texte: "La retenue CNSS de 5 % ne représente que la part du travailleur, prélevée sur son brut. La part patronale, comptabilisée en charge à l'employeur (compte 6641) et non retenue sur le net du travailleur, correspond à l'addition des trois branches étudiées au chapitre 7 : 6,5 % (prestations aux familles) + 1,5 % (risques professionnels) + 5 % (part employeur des pensions) = 13 % au total, chiffre qui recoupe exactement les taux du décret n°18/041 déjà vus au chapitre 7, présentés cette fois sous leur forme agrégée plutôt que branche par branche." },
      { type: 'carte', titre: 'Comptabilisation SYSCOHADA — 1. Constatation de la charge', tableau: { entetes: ['Compte', 'Libellé', 'Sens'], lignes: [['6611', 'Appointements, salaires et commissions', 'Débit'], ['6612', 'Primes et gratifications', 'Débit'], ['6613', 'Congés payés', 'Débit'], ['6614', 'Indemnités de préavis, de licenciement — personnel national', 'Débit'], ['663', 'Indemnités forfaitaires versées au personnel', 'Débit'], ['422', 'Personnel, rémunérations dues', 'Crédit'], ['—', '(suivant état de paie / état de décompte)', '—']] } },
      { type: 'carte', titre: 'Comptabilisation SYSCOHADA — 2. Retenues, 3. Règlement, 4. Charges patronales', tableau: { entetes: ['Étape', 'Écriture'], lignes: [['Retenues sur rémunération', 'D/ 422 · C/ 272 (prêts au personnel), C/ 4313 (CNSS 5 %), C/ 425 (syndicat 2 %), C/ 421 (avances/acomptes), C/ 4472 (IPR)'], ['Règlement du décompte final', 'D/ 422 · C/ 5xx Trésorerie'], ['Charges sociales patronales', 'D/ 6641 · C/ 4331 (INPP, 1 à 3 %), C/ 4332 (ONEM, 0,2 %), C/ 4313 (CNSS 13 %, part patronale)'], ['Règlement des retenues et charges à l\'État et au syndicat', 'D/ 421, 4331, 4332, 4313, 4472 · C/ 5x Trésorerie']] } },
      { type: 'paragraphe', texte: "Un cas particulier mérite attention en fin d'exercice : une indemnité de licenciement (compte 6614) déterminée et payée dans le même exercice se comptabilise directement en charge (D/ 6614, C/ 422). Si le licenciement est seulement annoncé en fin d'exercice, sans montant encore connu avec précision, une provision est constituée : à court terme (dénouement attendu à moins d'un an), D/ 659 Charges provisionnées pour risques d'exploitation, C/ 4991 Provision pour risque à court terme ; à plus d'un an, D/ 69 Dotations aux provisions pour risques et charges, C/ 19 Provisions pour risques et charges. Si le licenciement est prononcé et l'indemnité déterminée mais le paiement reporté à l'exercice suivant, la charge est constatée en N (D/ 6614, C/ 422 si le montant total est connu, ou C/ 4286 Personnel, charges à payer, si seule une partie l'est)." },
    ],
  },
]

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1', question: "Dans quel délai le décompte final doit-il être payé au travailleur après la cessation définitive des services, selon l'article 100 ?",
    options: [
      { id: 'a', texte: "Le jour même de la cessation" },
      { id: 'b', texte: "Dans les deux jours ouvrables suivant la cessation" },
      { id: 'c', texte: "Dans les huit jours ouvrables suivant la cessation" },
      { id: 'd', texte: "Dans le mois suivant la cessation" },
      { id: 'e', texte: "Aucun délai n'est fixé par le Code" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 100',
    explication: "L'article 100 impose le paiement de toute somme restant due au travailleur (ou à ses ayants droit) lors de la cessation définitive des services au plus tard dans les deux jours ouvrables suivant cette cessation — un délai bref qui suppose un calcul anticipé.",
  },
  {
    id: 'q2', question: "Le terme « décompte final » est-il défini par le Code du travail lui-même ?",
    options: [
      { id: 'a', texte: "Oui, à l'article 100" },
      { id: 'b', texte: "Non, c'est un usage professionnel qui désigne le solde payé en fin de contrat, sur le fondement de l'article 100" },
      { id: 'c', texte: "Oui, mais uniquement pour le CDD" },
      { id: 'd', texte: "Oui, à l'article 79 relatif au certificat de fin de service" },
      { id: 'e', texte: "Non, ce terme n'a aucun fondement légal, même indirect" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 100 (par déduction)',
    explication: "Le Code du travail ne définit à aucun endroit le terme « décompte final » ; c'est un usage professionnel consacré par la pratique, dont le fondement légal se déduit de l'article 100 sur le paiement du solde dû à la cessation des services.",
  },
  {
    id: 'q3', question: "Un CDD arrivant normalement à échéance de son terme ouvre-t-il droit, en principe, à une indemnité de préavis ?",
    options: [
      { id: 'a', texte: "Oui, systématiquement, comme pour un CDI" },
      { id: 'b', texte: "Non : le CDD s'éteint de plein droit à l'arrivée du terme, sans préavis ni notification" },
      { id: 'c', texte: "Oui, mais seulement si le CDD dépasse un an" },
      { id: 'd', texte: "Non, sauf si le travailleur a plus de cinquante ans" },
      { id: 'e', texte: "Oui, à hauteur de la moitié du préavis d'un CDI" },
    ],
    reponseCorrecte: 'b', articleRef: 'Méthode CDD (fondée sur art. 39-41)',
    explication: "Le CDD s'éteint de plein droit à l'arrivée du terme convenu, sans préavis ni notification requise, sauf si une clause d'essai est encore en cours ; le décompte se limite alors aux éléments déjà acquis (arriérés, congé non pris, éventuelle indemnité de fin de contrat prévue par le contrat ou une convention collective).",
  },
  {
    id: 'q4', question: "Quelle est la formule légale par défaut du préavis pour un travailleur classé (catégories 1 à 5) ayant cinq ans d'ancienneté ?",
    options: [
      { id: 'a', texte: "14 jours, sans majoration d'ancienneté" },
      { id: 'b', texte: "14 jours + (7 jours × 5 années) = 49 jours" },
      { id: 'c', texte: "1 mois + (9 jours × 5 années) = 71 jours" },
      { id: 'd', texte: "3 mois + (16 jours × 5 années) = 146 jours" },
      { id: 'e', texte: "18 jours + (8 jours × 5 années) = 58 jours" },
    ],
    reponseCorrecte: 'b', articleRef: 'Barème légal, art. 64',
    explication: "Le barème légal par défaut pour les travailleurs classés (catégories 1 à 5) est de 14 jours + 7 jours par année d'ancienneté, soit 14 + (7 × 5) = 49 jours ; les formules de 1 mois + 9 jours et de 3 mois + 16 jours concernent respectivement les agents de maîtrise et les cadres, et 18 + 8 jours correspond à un barème conventionnel sectoriel, non au barème légal par défaut.",
  },
  {
    id: 'q5', question: "Le préavis de démission d'un travailleur (hors délégué syndical) peut-il être supérieur au préavis que l'employeur aurait dû lui donner en cas de licenciement ?",
    options: [
      { id: 'a', texte: "Oui, il peut être égal ou supérieur" },
      { id: 'b', texte: "Non, il est égal à la moitié du préavis de licenciement et ne peut jamais l'excéder" },
      { id: 'c', texte: "Oui, il est systématiquement le double" },
      { id: 'd', texte: "Non, il est toujours fixé à un mois, quelle que soit la catégorie" },
      { id: 'e', texte: "Non, aucun préavis n'est dû par le travailleur démissionnaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 64',
    explication: "L'article 64 fixe le préavis de démission à la moitié du préavis que l'employeur aurait dû observer en cas de licenciement, sans jamais pouvoir l'excéder — à l'exception, déjà rencontrée au chapitre 8, du délégué syndical, pour lequel le préavis de licenciement est au contraire doublé (article 258).",
  },
  {
    id: 'q6', question: "Un employeur peut-il dispenser un travailleur licencié de prester son préavis sans lui verser aucune compensation ?",
    options: [
      { id: 'a', texte: "Oui, la dispense éteint toute obligation de l'employeur" },
      { id: 'b', texte: "Non : s'il dispense le travailleur, l'employeur doit lui payer tous les salaires et avantages qu'il aurait perçus, plus l'indemnité compensatrice" },
      { id: 'c', texte: "Oui, sauf si le travailleur retrouve un emploi dans le mois" },
      { id: 'd', texte: "Non, mais seule la moitié du préavis reste due dans ce cas" },
      { id: 'e', texte: "Oui, à condition d'un accord écrit du travailleur" },
    ],
    reponseCorrecte: 'b', articleRef: 'Méthode préavis (fondée sur art. 64-66)',
    explication: "Lorsque l'employeur dispense le travailleur de prester son préavis, il reste tenu de lui payer l'intégralité des salaires et avantages que celui-ci aurait perçus pendant cette période, ainsi que l'indemnité compensatrice correspondante : la dispense d'exécution n'éteint jamais l'obligation de paiement.",
  },
  {
    id: 'q7', question: "À combien de jours de congé annuel un travailleur de plus de dix-huit ans, sans majoration d'ancienneté, a-t-il droit pour une année entière de service, selon la base retenue par la méthode du décompte final ?",
    options: [
      { id: 'a', texte: "12 jours" },
      { id: 'b', texte: "18 jours" },
      { id: 'c', texte: "22 jours" },
      { id: 'd', texte: "26 jours" },
      { id: 'e', texte: "30 jours" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 141 (méthode : 1,5 jour/mois, base 26 jours)',
    explication: "Sur la base de 1,5 jour ouvrable par mois entier de service et d'un mois compté à 26 jours ouvrables, un travailleur de plus de dix-huit ans acquiert 18 jours de congé pour une année entière, avant toute majoration d'ancienneté (2 jours supplémentaires par tranche de cinq ans).",
  },
  {
    id: 'q8', question: "Quel diviseur sert de base commune aux calculs de prorata du congé sur préavis et de la gratification sur préavis dans la méthode du décompte final ?",
    options: [
      { id: 'a', texte: "252" },
      { id: 'b', texte: "260" },
      { id: 'c', texte: "300" },
      { id: 'd', texte: "312" },
      { id: 'e', texte: "365" },
    ],
    reponseCorrecte: 'd', articleRef: 'Méthode décompte final',
    explication: "Le diviseur 312, qui correspond à la base théorique de 26 jours ouvrables par mois multipliée par 12 mois, sert de dénominateur commun aux calculs de prorata du décompte final : congé sur préavis, congé prorata de l'année en cours, gratification en cours d'année et gratification sur préavis.",
  },
  {
    id: 'q9', question: "Comment se calcule la gratification sur la période de préavis, selon la méthode enseignée ?",
    options: [
      { id: 'a', texte: "Dernier salaire brut × jours de préavis / 312" },
      { id: 'b', texte: "Un mois de salaire forfaitaire, quelle que soit la durée du préavis" },
      { id: 'c', texte: "Dernier salaire brut × ancienneté en années" },
      { id: 'd', texte: "La moyenne des trois derniers mois de salaire, sans prorata" },
      { id: 'e', texte: "Elle n'est jamais due sur la période de préavis" },
    ],
    reponseCorrecte: 'a', articleRef: 'Méthode décompte final',
    explication: "La gratification sur préavis se calcule en multipliant le dernier salaire brut par le nombre de jours de préavis, rapporté à la base de 312 jours (dernier salaire brut × jours de préavis / 312), suivant la même logique de prorata que le congé sur préavis.",
  },
  {
    id: 'q10', question: "Le versement d'une gratification (treizième mois) est-il imposé par le Code du travail à tout employeur ?",
    options: [
      { id: 'a', texte: "Oui, à tous les employeurs sans exception" },
      { id: 'b', texte: "Non : elle n'intervient dans le décompte final que si l'employeur la verse effectivement à ses travailleurs" },
      { id: 'c', texte: "Oui, mais uniquement aux cadres" },
      { id: 'd', texte: "Non, elle est réservée aux seuls travailleurs syndiqués" },
      { id: 'e', texte: "Oui, à hauteur d'un demi-mois de salaire minimum" },
    ],
    reponseCorrecte: 'b', articleRef: 'Méthode décompte final',
    explication: "La gratification n'est pas imposée en tant que telle par le Code du travail ; elle n'entre dans le calcul du décompte final que lorsque l'entité la verse effectivement à ses travailleurs, selon une pratique ou un engagement propre à l'employeur.",
  },
  {
    id: 'q11', question: "Quel est le taux de la retenue CNSS opérée sur le brut du travailleur dans le décompte final, part travailleur ?",
    options: [
      { id: 'a', texte: "1,5 %" },
      { id: 'b', texte: "5 %" },
      { id: 'c', texte: "6,5 %" },
      { id: 'd', texte: "10 %" },
      { id: 'e', texte: "13 %" },
    ],
    reponseCorrecte: 'b', articleRef: 'Décret n°18/041 (chapitre 7)',
    explication: "La retenue CNSS sur le brut du travailleur est de 5 %, qui correspond exactement à la part travailleur de la seule branche des pensions déjà étudiée au chapitre 7 (décret n°18/041) : les deux autres branches (prestations aux familles et risques professionnels) restent à charge exclusive de l'employeur et ne sont jamais retenues sur le brut du travailleur.",
  },
  {
    id: 'q12', question: "Le taux de 13 % parfois cité pour la CNSS dans la comptabilisation du décompte final correspond-il à une quatrième branche distincte de celles étudiées au chapitre 7 ?",
    options: [
      { id: 'a', texte: "Oui, une branche supplémentaire propre au décompte final" },
      { id: 'b', texte: "Non : il s'agit de l'addition des trois branches à charge de l'employeur (6,5 % + 1,5 % + 5 % de la part patronale des pensions)" },
      { id: 'c', texte: "Oui, il remplace les taux du décret n°18/041 pour les décomptes finaux uniquement" },
      { id: 'd', texte: "Non, c'est une erreur de calcul à corriger systématiquement en 18 %" },
      { id: 'e', texte: "Oui, il s'applique uniquement aux cadres" },
    ],
    reponseCorrecte: 'b', articleRef: 'Décret n°18/041 (chapitre 7) — lecture agrégée',
    explication: "Le taux de 13 % n'est pas une branche supplémentaire : il additionne simplement, côté employeur, les taux des trois branches déjà vues au chapitre 7 — 6,5 % (prestations aux familles) + 1,5 % (risques professionnels) + 5 % (part patronale des pensions) — présentés ici sous forme agrégée pour la charge sociale patronale, plutôt que détaillés branche par branche.",
  },
  {
    id: 'q13', question: "Le taux d'IPR de 10 % parfois utilisé dans un exercice de décompte final correspond-il au barème réel et actuel de l'impôt sur le revenu des personnes physiques ?",
    options: [
      { id: 'a', texte: "Oui, c'est le taux unique applicable à tous les salaires" },
      { id: 'b', texte: "Non : l'IRPP suit un barème progressif par tranches, un taux forfaitaire n'étant qu'une simplification pédagogique pour l'exercice de calcul" },
      { id: 'c', texte: "Oui, mais uniquement pour les décomptes finaux, par exception au barème général" },
      { id: 'd', texte: "Non, le taux réel est de 20 % pour tous les salaires" },
      { id: 'e', texte: "Oui, à condition que le salaire dépasse le SMIG" },
    ],
    reponseCorrecte: 'b', articleRef: 'Renvoi au module fiscalité (barème IRPP)',
    explication: "Le barème réel de l'IRPP applicable aux rémunérations est progressif par tranches, et non un taux forfaitaire unique : un taux de 10 % utilisé dans un exercice de décompte final n'est qu'une simplification pédagogique pour isoler la méthode de calcul, jamais le barème effectivement applicable, qui doit être vérifié dans le module fiscalité de la plateforme.",
  },
  {
    id: 'q14', question: "Dans quel compte SYSCOHADA la part patronale des charges sociales (INPP, ONEM, CNSS 13 %) est-elle comptabilisée en charge ?",
    options: [
      { id: 'a', texte: "422 Personnel, rémunérations dues" },
      { id: 'b', texte: "6611 Appointements, salaires et commissions" },
      { id: 'c', texte: "6641 Charges sociales" },
      { id: 'd', texte: "4472 Impôts sur les salaires" },
      { id: 'e', texte: "19 Provisions pour risques et charges" },
    ],
    reponseCorrecte: 'c', articleRef: 'Comptabilisation SYSCOHADA du décompte final',
    explication: "Les charges sociales patronales (INPP 1 à 3 %, ONEM 0,2 %, CNSS 13 % part patronale) se comptabilisent au débit du compte 6641 Charges sociales, par le crédit des comptes de tiers correspondants (4331, 4332, 4313).",
  },
  {
    id: 'q15', question: "Un licenciement est prononcé et l'indemnité entièrement déterminée en fin d'exercice N, mais son paiement n'interviendra qu'en N+1. Comment la charge est-elle comptabilisée en N ?",
    options: [
      { id: 'a', texte: "Aucune charge n'est comptabilisée en N, seulement en N+1 lors du paiement" },
      { id: 'b', texte: "D/ 6614 Indemnités de licenciement · C/ 422 Personnel, rémunérations dues, dès N puisque le montant total est connu" },
      { id: 'c', texte: "D/ 659 Charges provisionnées, réservé aux seuls montants non encore déterminés" },
      { id: 'd', texte: "D/ 19 Provisions pour risques et charges, sans passer par le compte 6614" },
      { id: 'e', texte: "La charge est répartie pour moitié entre N et N+1" },
    ],
    reponseCorrecte: 'b', articleRef: 'Comptabilisation SYSCOHADA, art. 66',
    explication: "Lorsque le licenciement est prononcé et l'indemnité entièrement déterminée en N, même si le paiement effectif n'intervient qu'en N+1, la charge est comptabilisée dès N par le débit du compte 6614 Indemnités de licenciement et le crédit du compte 422 : seule l'indétermination du montant, non le simple décalage du paiement, justifie le recours à une provision (comptes 659 ou 69).",
  },
  {
    id: 'q16', question: "Quelles composantes distinguent un licenciement avec préavis d'un licenciement sans préavis (faute lourde) dans le montant du décompte final, à salaire égal ?",
    options: [
      { id: 'a', texte: "Aucune : le montant est strictement identique dans les deux cas" },
      { id: 'b', texte: "L'indemnité de préavis et le congé sur préavis, absents en cas de faute lourde, ce qui rend le décompte nettement inférieur" },
      { id: 'c', texte: "Seule la gratification proportionnelle change entre les deux hypothèses" },
      { id: 'd', texte: "Le licenciement sans préavis donne droit à une indemnité doublée en compensation" },
      { id: 'e', texte: "La différence ne porte que sur le taux de CNSS applicable" },
    ],
    reponseCorrecte: 'b', articleRef: 'Méthode décompte final, art. 64 et 72',
    explication: "En cas de faute lourde du travailleur, aucun préavis n'est dû (article 72), de sorte que ni l'indemnité de préavis ni le congé calculé sur cette période n'entrent dans le décompte : seules les prestations du mois en cours et la gratification proportionnelle aux jours effectivement prestés restent dues, ce qui explique l'écart substantiel avec un licenciement avec préavis complet.",
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "La secrétaire de Goma libérée huit jours avant le terme de son CDD",
    contexte: "Mme Furaha, secrétaire engagée sous CDD de deux ans par un cabinet d'expertise-comptable de Goma, voit son contrat expirer le 28 février. Son employeur la libère le 20 février, soit huit jours avant le terme, sans qu'aucune faute ne lui soit reprochée et sans qu'elle-même ait sollicité ce départ anticipé. Le contrat de Mme Furaha stipule une indemnité de fin de contrat conventionnelle égale à « un mois de salaire brut par année de service ». Son salaire mensuel brut est de 26 000 FC (base 26 jours, soit 1 000 FC par jour), sans avantage en nature.",
    questions: [
      { num: 1, enonce: "Le CDD arrivant normalement à échéance, une indemnité de préavis est-elle due à Mme Furaha, au-delà de l'indemnité de fin de contrat prévue au contrat ?", correction: "Non. Le CDD s'éteint de plein droit à l'arrivée du terme, sans préavis ni notification requise. La libération anticipée de huit jours, non fautive et non demandée par la salariée, appelle uniquement le paiement des huit jours restants du mois de février au titre des prestations, sans indemnité de préavis distincte, qui n'a pas sa place dans le régime du CDD arrivant à échéance normale." },
      { num: 2, enonce: "Comment se calcule la part « prestations du mois de rupture » du décompte de Mme Furaha ?", correction: "Sur la base d'un salaire journalier de 1 000 FC (26 000 / 26) et de huit jours restant à courir jusqu'au terme initialement prévu, la part « prestations » du décompte s'élève à 1 000 × 8 = 8 000 FC, à laquelle s'ajouteraient, le cas échéant, les avantages journaliers (logement, transport) au prorata des mêmes huit jours si le contrat en prévoyait." },
      { num: 3, enonce: "Comment se calcule l'indemnité de fin de contrat conventionnelle, pour un CDD de deux ans exactement accompli ?", correction: "L'indemnité de fin de contrat, stipulée au contrat comme « un mois de salaire brut par année de service », se calcule en multipliant le salaire mensuel brut par le nombre d'années de service : 26 000 × 2 = 52 000 FC. Le total brut du décompte de Mme Furaha s'élève ainsi à 8 000 (prestations) + 52 000 (indemnité de fin de contrat) = 60 000 FC, avant toute retenue." },
      { num: 4, enonce: "Quelles retenues doivent être appliquées à ce total brut avant détermination du net à payer ?", correction: "La retenue CNSS (part travailleur, 5 % de la base) s'applique en premier : 60 000 × 5 % = 3 000 FC, ramenant la base à 57 000 FC. L'IPR, calculé selon le barème progressif applicable (un taux forfaitaire simplifié n'étant qu'un exercice pédagogique, jamais le barème réel), vient ensuite réduire cette base pour obtenir le net à payer, à verser à Mme Furaha dans les deux jours ouvrables suivant sa libération, conformément à l'article 100." },
    ],
  },
  {
    id: 'cp2',
    titre: "Trois issues pour le comptable cadre de Matadi : licenciement avec préavis, sans préavis, ou démission",
    contexte: "M. Bofasa, comptable classé cadre échelon 2, travaille depuis quatre ans pour une entreprise portuaire de Matadi. Son salaire mensuel brut de base est de 780 000 FC (soit 30 000 FC par jour sur la base de 26 jours), sans gratification ni avantage en nature dans cet exemple. Trois scénarios distincts sont envisagés pour la fin de sa relation de travail, à comparer terme à terme.",
    questions: [
      { num: 1, enonce: "Scénario 1 — licenciement pour motif économique, avec préavis complet. Quel est le nombre de jours de préavis dû, pour un cadre ayant quatre ans d'ancienneté ?", correction: "Le barème légal des cadres (catégorie 7) est de trois mois (66 ou 78 jours selon la convention retenue) + 16 jours par année d'ancienneté. En retenant la base de 78 jours pour trois mois (26 jours × 3), le préavis s'élève à 78 + (16 × 4) = 78 + 64 = 142 jours. L'indemnité de préavis correspondante est de 30 000 × 142 = 4 260 000 FC, à laquelle s'ajoutent le congé sur préavis (142 × 18 / 312 ≈ 8,2 jours, soit environ 30 000 × 8,2 ≈ 246 000 FC) et, si une gratification était versée, sa quote-part sur la même période." },
      { num: 2, enonce: "Scénario 2 — licenciement pour faute lourde, sans préavis. Quelles composantes du décompte disparaissent par rapport au scénario 1 ?", correction: "L'article 72, déjà étudié au chapitre 4, prive le travailleur en faute lourde de tout préavis. Disparaissent donc, par rapport au scénario 1, l'indemnité de préavis elle-même (4 260 000 FC) et le congé calculé sur cette période de préavis (environ 246 000 FC) : seules restent dues les prestations du mois en cours et, le cas échéant, la gratification strictement proportionnelle aux jours effectivement prestés, ce qui réduit très sensiblement le montant total du décompte par rapport au scénario 1." },
      { num: 3, enonce: "Scénario 3 — démission de M. Bofasa, hors toute faute de l'employeur. Quel est alors le nombre de jours de préavis dû par lui ?", correction: "L'article 64 fixe le préavis de démission à la moitié du préavis de licenciement, sans pouvoir l'excéder : soit 142 / 2 = 71 jours. Le calcul du congé sur préavis suit la même proportion (71 × 18 / 312 ≈ 4,1 jours). Ce montant se situe, comme attendu, entre celui du licenciement sans préavis (le plus faible) et celui du licenciement avec préavis complet (le plus élevé), puisque le nombre de jours de préavis en constitue le facteur déterminant dans les trois scénarios." },
      { num: 4, enonce: "Dans les trois scénarios, la méthode générale de calcul (prestations → préavis → congé → gratification → total brut → retenues → net) change-t-elle, ou seul un paramètre varie-t-il ?", correction: "La méthode reste rigoureusement identique dans les trois hypothèses : seul le nombre de jours de préavis retenu varie selon la qualification de la rupture (complet, nul, ou réduit de moitié), ce nombre de jours déterminant en cascade celui du congé sur préavis et, s'il y a lieu, de la gratification sur préavis. Comprendre cette mécanique en cascade, plutôt que mémoriser trois calculs séparés, est la clé de la maîtrise du décompte final." },
    ],
  },
  {
    id: 'cp3',
    titre: "La comptabilisation du décompte final chez un employeur de Kinshasa",
    contexte: "Une PME de distribution de Kinshasa licencie un de ses magasiniers pour motif économique. Le décompte final, entièrement déterminé avant la fin de l'exercice comptable, s'élève à 1 200 000 FC de brut (prestations, préavis, congé et gratification confondus), duquel sont retenus 60 000 FC de CNSS part travailleur (5 %) et un montant d'IPR calculé selon le barème applicable. La comptabilité de l'entreprise doit passer les écritures correspondantes avant le règlement effectif, prévu dans les deux jours ouvrables.",
    questions: [
      { num: 1, enonce: "Quelle écriture constate la charge brute du décompte final, avant toute retenue ?", correction: "La charge brute se répartit selon la nature de chaque élément : D/ 6611 Appointements, salaires et commissions (part salaire), D/ 6612 Primes et gratifications (part gratification), D/ 6613 Congés payés (part congé), D/ 6614 Indemnités de préavis, de licenciement (part préavis), par le crédit de C/ 422 Personnel, rémunérations dues, pour le total de 1 200 000 FC, suivant l'état de paie ou l'état de décompte établi." },
      { num: 2, enonce: "Comment la retenue CNSS de 60 000 FC est-elle comptabilisée ?", correction: "Elle vient en diminution de la dette envers le personnel et en augmentation de la dette envers l'organisme social : D/ 422 Personnel, rémunérations dues, par le crédit de C/ 4313 Caisse de retraite obligatoire — CNSS, pour 60 000 FC, réduisant d'autant le solde du compte 422 avant le règlement au magasinier." },
      { num: 3, enonce: "Une fois toutes les retenues opérées, comment le règlement effectif du net à payer au magasinier est-il comptabilisé ?", correction: "Le règlement du solde net se traduit par le débit du compte 422 Personnel, rémunérations dues (désormais ramené au montant net après toutes les retenues), par le crédit d'un compte de trésorerie (5xx), pour le montant effectivement décaissé au magasinier — cette écriture devant intervenir dans les deux jours ouvrables suivant la cessation des services, conformément à l'article 100." },
      { num: 4, enonce: "L'entreprise doit-elle, en plus des écritures déjà passées, constater une charge sociale patronale distincte de la retenue CNSS de 60 000 FC ?", correction: "Oui. La retenue de 60 000 FC ne représente que la part travailleur (5 %), prélevée sur son brut. L'entreprise doit en outre comptabiliser sa propre charge sociale patronale, égale à 13 % du même brut au titre de la CNSS (D/ 6641 Charges sociales, C/ 4313 CNSS part patronale), à laquelle s'ajoutent l'INPP et l'ONEM, ces charges patronales n'étant jamais déduites du montant versé au magasinier mais constituant un coût supplémentaire propre à l'employeur." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue1',
  numero: 10,
  id: 'ue1-chapitre-10',
  titre: 'Pratique professionnelle : le décompte final',
  sousTitre: 'Méthode opérationnelle (CPCC) · Préavis, congé, gratification, retenues, écritures SYSCOHADA',
  infoBulle: 'Calcul et comptabilisation SYSCOHADA du décompte final (solde de tout compte) : préavis, congé annuel, gratification, retenues sociales et fiscales.',
  loiRef: 'Art. 100 (fondement légal) · Méthode CPCC fondée sur les art. 64, 66, 140-146, 258',
  moduleLabel: 'UE 1 · Droit du travail',
  retourRoute: '/ue1-droit-travail',
  coursId: 'ue1-droit-travail',
  objectifs: [
    "Connaître le fondement légal et le délai de paiement du décompte final (article 100)",
    "Distinguer les composantes du décompte final selon qu'il s'agit d'un CDD ou d'un CDI, et selon la cause de la rupture",
    "Maîtriser le calcul du préavis (barème par catégorie, formule d'ancienneté) et de ses effets sur le congé et la gratification",
    "Maîtriser le calcul du congé annuel et de la gratification dans le décompte final, y compris leurs quotes-parts sur la période de préavis",
    "Connaître les retenues sociales et fiscales applicables et l'ordre de leur calcul",
    "Maîtriser la comptabilisation SYSCOHADA complète du décompte final, de la charge à son règlement",
  ],
  sections: SECTIONS,
  aRetenir: [
    'Le décompte final doit être payé dans les deux jours ouvrables suivant la cessation définitive des services (article 100) ; un calcul juste mais payé en retard expose l\'employeur à un risque contentieux distinct.',
    'Le préavis suit un barème par catégorie (14 j + 7 j/an pour les catégories 1 à 5, 1 mois + 9 j/an pour la maîtrise, 3 mois + 16 j/an pour les cadres), toujours à comparer à une éventuelle convention collective plus favorable ; le préavis de démission est la moitié de celui du licenciement (sauf délégué syndical : le double, minimum trois mois).',
    'Le congé et la gratification se calculent en trois composantes chacun : arriérés non payés, prorata de l\'année en cours, et quote-part sur la période de préavis — cette dernière se calculant toujours au prorata de 312 (26 jours × 12 mois).',
    'Les retenues s\'opèrent dans l\'ordre : CNSS travailleur (5 %, seule la branche pensions), puis IPR selon le barème progressif réel (un taux forfaitaire n\'étant qu\'une simplification d\'exercice), puis cotisation syndicale (2 %) si le travailleur est syndiqué.',
    'La comptabilisation SYSCOHADA distingue la charge brute (comptes 661x et 663), les retenues et la charge patronale (compte 6641, taux agrégé de 13 % de CNSS employeur), et le règlement (compte 422 contre trésorerie) — avec un traitement spécifique en fin d\'exercice selon que l\'indemnité de licenciement est déterminée, seulement annoncée, ou son paiement simplement différé.',
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Séminaire CPCC (Conseil Permanent de la Comptabilité au Congo), « Calcul et comptabilisation du décompte final »",
      precision: 'animateur MBONGOMPASI KABOBO Joseph — méthode opérationnelle, à distinguer du texte légal lui-même (art. 100 du Code du travail)',
    },
    {
      genre: 'ouvrage',
      auteur: 'Loko Mantuono G.',
      titre: 'Droit social, droit du travail et de la sécurité sociale en RDC',
      editeur: "L'Harmattan",
      lieu: 'Paris',
      annee: '2022',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail (art. 100, 64, 66, 140-146, 258) · Séminaire CPCC sur le décompte final · Décret n°18/041 du 24 novembre 2018 (taux CNSS)',
}

export default chapitre
