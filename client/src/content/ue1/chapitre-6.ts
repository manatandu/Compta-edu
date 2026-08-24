// Chapitre 6 du module UE1, Droit du travail : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
import type { Chapitre } from '@/lib/chapitre-types'

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '6.1',
    titre: 'La durée du travail et le repos hebdomadaire',
    navLabel: '6.1 Durée du travail et repos hebdomadaire',
    blocs: [
      { type: 'paragraphe', texte: 'Le Titre VI regroupe l\'ensemble des conditions générales de travail, en commençant par sa durée. L\'article 119, modifié en 2016, fixe la durée légale à quarante-cinq heures par semaine et huit heures par jour, dans tous les établissements publics ou privés, même d\'enseignement ou de bienfaisance, quelle que soit la forme du travail exécuté. Cette durée se calcule à partir du moment où le travailleur se tient sur les lieux de travail à la disposition de l\'employeur, et ne comprend pas le temps de trajet, sauf s\'il est inhérent au travail lui-même. Toute heure effectuée au-delà de cette durée légale est une heure supplémentaire, qui donne droit à une majoration de salaire, dans les modalités que des arrêtés ministériels précisent par branche d\'activité et par catégorie professionnelle (article 120).' },
      { type: 'paragraphe', texte: 'Le repos hebdomadaire, organisé au chapitre suivant du même titre, garantit à tout travailleur un minimum de vingt-quatre heures de repos au cours de chaque période de sept jours, accordé autant que possible collectivement et ayant lieu le dimanche, sauf conditions particulières plus favorables prévues par convention collective (article 121). Deux régimes d\'affichage se distinguent à l\'article 122 : lorsque le repos est donné collectivement, l\'employeur affiche à l\'avance les jours et heures de repos collectif ; lorsqu\'il ne l\'est pas, il affiche les noms des travailleurs soumis au régime particulier et l\'indication de ce régime. La liste des jours fériés légaux, quant à elle, est fixée par décret présidentiel, sur proposition du Ministre du Travail, après avis du Conseil National du Travail (article 123).' },
    ],
  },
  {
    numero: '6.2',
    titre: 'Le travail de nuit et la protection des enfants et des personnes avec handicap',
    navLabel: '6.2 Travail de nuit et protection des enfants',
    blocs: [
      { type: 'paragraphe', texte: 'L\'article 124 définit le travail de nuit, pour l\'ensemble des travailleurs, comme celui exécuté entre 19 heures et 5 heures, et impose son paiement avec majoration, sans préjudice des dispositions relatives aux heures supplémentaires : les deux majorations, celle du travail de nuit et celle des heures supplémentaires, se cumulent lorsque les deux conditions sont réunies. Une plage horaire distincte, plus large, protège spécifiquement les enfants et les personnes avec handicap : l\'article 125 leur interdit tout travail nocturne dans les établissements industriels, la « nuit » étant ici définie de 18 heures à 6 heures. Cette différence de plage horaire entre les deux articles, souvent source de confusion, illustre la fonction propre de chacun : l\'article 124 organise une compensation salariale générale, l\'article 125 une interdiction protectrice ciblée.' },
      { type: 'filet', titre: 'Un repos journalier renforcé', texte: 'L\'article 126 impose, entre deux périodes de travail des enfants et des personnes avec handicap, un repos journalier d\'au moins douze heures consécutives. Des dérogations à ces deux protections restent possibles, pour circonstances exceptionnelles, caractère particulier de la profession ou besoins de l\'apprentissage, mais ne s\'appliquent jamais aux entreprises où sont seuls employés les membres d\'une même famille (article 127).' },
      { type: 'paragraphe', texte: 'L\'âge minimal d\'emploi, fixé par l\'article 133, complète ce dispositif protecteur : un enfant ne peut être employé dans une entreprise, même comme apprenti, avant quinze ans, sauf dérogation expresse conjointe de l\'Inspecteur du Travail et de l\'autorité parentale ou tutélaire, cette dérogation ne pouvant jamais être accordée en dessous de cet âge plancher. Les articles 134 à 137 organisent, quant à eux, la non-discrimination par le handicap : celui-ci ne peut constituer un empêchement à l\'exercice d\'un emploi correspondant aux aptitudes de la personne, qui bénéficie du droit à la formation professionnelle dans les mêmes conditions que les autres travailleurs, sous le seul contrôle médical que l\'Inspecteur du Travail peut requérir pour vérifier que le travail confié n\'excède pas les forces du travailleur concerné.' },
    ],
  },
  {
    numero: '6.3',
    titre: 'La protection de la maternité',
    navLabel: '6.3 La protection de la maternité',
    blocs: [
      { type: 'paragraphe', texte: 'La protection de la maternité s\'ouvre dès le stade de l\'embauche : l\'article 128 interdit d\'exiger d\'une candidate qu\'elle se soumette à un test de grossesse ou présente un certificat de grossesse, sauf pour les travaux interdits totalement ou partiellement aux femmes enceintes ou qui allaitent, ou comportant un risque reconnu pour la santé de la mère et de l\'enfant. Pimant souligne, à propos de cette interdiction, qu\'elle traduit un principe plus général : la maternité ne peut, en droit congolais, constituer une source de discrimination en matière d\'emploi, un principe qui irrigue l\'ensemble des dispositions suivantes.' },
      { type: 'paragraphe', texte: 'Lorsque l\'état de grossesse entraîne des risques pour la santé, dûment constatés par le médecin, l\'article 129 ouvre à la travailleuse un droit de suspendre son contrat conformément au régime général de la suspension déjà étudié au chapitre 3, sans que cette interruption puisse jamais être considérée comme une cause de résiliation du contrat ; elle peut même, dans les mêmes conditions, résilier elle-même son contrat sans préavis ni indemnité de rupture. À l\'occasion de l\'accouchement, l\'article 130 accorde un congé de quatorze semaines consécutives, dont huit semaines au maximum après la délivrance et six avant l\'accouchement, rémunéré aux deux tiers avec maintien des avantages en nature, l\'employeur ne pouvant rompre le contrat durant cette période. Ce bénéfice est acquis à toute femme salariée, mariée ou non, que l\'enfant vive ou non (article 130, dernier alinéa), et toute convention contraire à ces deux articles est nulle de plein droit (article 131).' },
      { type: 'carte', titre: 'Une réforme annoncée, mais non encore adoptée', texte: 'Une proposition de loi discutée à l\'Assemblée nationale envisage de porter la rémunération du congé de maternité des deux tiers à l\'intégralité du salaire. Tant que ce texte n\'est pas promulgué, il ne constitue qu\'une actualité législative à suivre, non le droit positif applicable : le taux des deux tiers de l\'article 130 reste, à ce jour, la règle en vigueur, et aucune réponse d\'examen ne saurait présumer son adoption future.' },
      { type: 'paragraphe', texte: 'Enfin, l\'article 132 accorde à la femme qui allaite, dans tous les cas, deux repos d\'une demi-heure par jour, rémunérés comme temps de travail, une protection immédiate et concrète qui referme ce dispositif d\'ensemble, de l\'embauche jusqu\'au retour effectif de la travailleuse à son poste après la naissance de l\'enfant.' },
    ],
  },
  {
    numero: '6.4',
    titre: 'Logement, ration alimentaire et congés annuels',
    navLabel: '6.4 Logement, ration et congés annuels',
    blocs: [
      { type: 'paragraphe', texte: 'En cas de mutation ou d\'engagement en dehors du lieu d\'emploi, l\'article 138 impose à l\'employeur de fournir un logement décent au travailleur et à sa famille, ou, à défaut, une indemnité conséquente ; dans les autres cas, une indemnité de logement reste due, fixée par le contrat, la convention collective ou le règlement d\'entreprise, la travailleuse y ayant droit au même titre. Lorsque le travailleur ne peut, par ses propres moyens, assurer un ravitaillement régulier en denrées de première nécessité, l\'employeur doit également le lui garantir, les modalités précises de ces deux obligations étant renvoyées à un arrêté ministériel (article 139).' },
      { type: 'paragraphe', texte: 'Le droit au congé annuel, que l\'article 140 interdit au travailleur de renoncer à exercer, naît à l\'expiration d\'une année de services comptée de date à date, chez le même employeur ou un employeur substitué. La date en est fixée de commun accord, sans que la prise effective ne puisse dépasser de six mois la date prévue pour son ouverture, et le travailleur ne peut cumuler plus de la moitié de ses congés sur une période de deux ans.' },
      { type: 'carte', titre: 'Le calcul de la durée du congé, article 141', tableau: { entetes: ['Élément', 'Règle'], lignes: [['Base, travailleur de plus de 18 ans', '**1 jour ouvrable par mois entier de service**'], ['Base, travailleur de moins de 18 ans', '**1,5 jour ouvrable par mois entier de service**'], ['Majoration d\'ancienneté', '**+ 1 jour par tranche de 5 années**'], ['Maladie incluse dans le service pris en compte', '**Jusqu\'à 6 mois par an (sans limite si accident du travail/maladie professionnelle)**'], ['Maladie survenant pendant le congé', '**Ne compte pas comme jour de congé**']] } },
      { type: 'paragraphe', texte: 'L\'allocation de congé, égale à la rémunération dont jouissait le travailleur à son départ, intègre la moyenne des commissions, primes et participations aux bénéfices des douze mois précédents, les allocations familiales restant dues pendant toute la durée du congé (article 142) ; le travailleur doit s\'abstenir, durant cette période, d\'exercer une profession lucrative (article 143). En cas de résiliation du contrat, quel qu\'en soit le moment, le congé non pris est obligatoirement remplacé par une indemnité compensatoire, toute convention prévoyant une telle substitution en dehors de ce cas étant nulle et de nul effet (article 144), le paiement devant intervenir au plus tard le dernier jour ouvrable avant le départ en congé, ou dans les deux jours ouvrables suivant la fin du contrat pour l\'indemnité compensatoire (article 145).' },
    ],
  },
  {
    numero: '6.5',
    titre: 'Les congés de circonstance et les voyages de retour',
    navLabel: '6.5 Congés de circonstance et voyages',
    blocs: [
      { type: 'paragraphe', texte: 'L\'article 146 énumère les congés de circonstance auxquels le travailleur a droit : deux jours ouvrables pour son propre mariage, deux jours pour l\'accouchement de son épouse, quatre jours pour le décès du conjoint ou d\'un parent allié au premier degré, un jour pour le mariage d\'un enfant, et deux jours pour le décès d\'un parent ou allié au second degré. Ces jours ne sont pas déductibles du congé minimum légal et ne peuvent être fractionnés, les soins de santé restant dus pendant leur durée ; l\'employeur n\'est cependant tenu à leur paiement que dans la limite de quinze jours ouvrables par an.' },
      { type: 'paragraphe', texte: 'Le régime des voyages distingue le voyage aller, à la charge de l\'employeur dès l\'engagement (sauf, pour la famille, avant la fin de la période d\'essai), du voyage retour, dont le droit naît en règle générale, sans restriction, après chaque période de deux ans de service (articles 147 à 149). Plusieurs hypothèses ouvrent cependant ce droit par anticipation : au travailleur en cours de période d\'essai même en cas de faute lourde qui lui est imputable, au travailleur et à sa famille lorsque le contrat prend fin du fait de l\'employeur ou à l\'expiration d\'un contrat de moins de deux ans, ou à la famille en cas de décès du travailleur avant la fin du contrat.' },
      { type: 'filet', titre: 'Une prise en charge parfois seulement proportionnelle', texte: 'L\'employeur ne supporte les frais de voyage retour que proportionnellement à la durée des prestations accomplies en cas de faute lourde imputable au travailleur, de rupture par le travailleur d\'un contrat à durée indéterminée après douze mois de services depuis son dernier voyage aller sans faute lourde de l\'employeur, ou de résiliation de commun accord après douze mois de services. Le droit s\'éteint enfin par renonciation écrite après la fin du contrat, ou par l\'écoulement de deux ans sans que le travailleur en ait exigé l\'accomplissement (article 151), l\'employeur devant, dans tous les cas où le voyage reste dû, l\'assurer dans les délais les plus brefs, sous peine de devoir une indemnité égale à la rémunération mensuelle jusqu\'au départ effectif (article 152).' },
    ],
  },
  {
    numero: '6.6',
    titre: 'Le règlement d\'entreprise',
    navLabel: '6.6 Le règlement d\'entreprise',
    blocs: [
      { type: 'paragraphe', texte: 'Le Titre VI se referme sur l\'obligation, pour tout établissement public ou privé, même d\'enseignement ou de bienfaisance, d\'établir un règlement d\'entreprise (article 157). Son contenu porte essentiellement sur l\'organisation technique du travail, la discipline, l\'hygiène et la sécurité, ainsi que les modalités de paiement des rémunérations ; toute autre clause, notamment celle prévoyant des amendes à l\'encontre des travailleurs, est nulle de plein droit, une règle qui prolonge directement l\'interdiction générale des amendes déjà rencontrée à l\'article 111 du chapitre 5.' },
      { type: 'paragraphe', texte: 'Avant sa mise en vigueur, l\'employeur doit communiquer le règlement pour avis aux représentants des travailleurs et à l\'Inspecteur du Travail, qui peut exiger le retrait ou la modification de toute disposition contraire à la législation en vigueur. Le contenu précis, les modalités de communication, de dépôt et d\'affichage du règlement sont, pour le surplus, fixés par arrêté ministériel (article 158), ce texte réglementaire d\'application venant compléter, sans jamais l\'étendre au-delà de ce que le Code autorise, le cadre légal du règlement d\'entreprise.' },
    ],
  },
]

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1', question: "Quelle est la durée légale du travail fixée par l'article 119 ?",
    options: [
      { id: 'a', texte: "Quarante heures par semaine et sept heures par jour" },
      { id: 'b', texte: "Quarante-cinq heures par semaine et huit heures par jour" },
      { id: 'c', texte: "Quarante-huit heures par semaine, sans limite journalière" },
      { id: 'd', texte: "Trente-neuf heures par semaine et six heures par jour" },
      { id: 'e', texte: "Cinquante heures par semaine et dix heures par jour" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 119',
    explication: "L'article 119, modifié en 2016, fixe la durée légale à quarante-cinq heures par semaine et huit heures par jour, dans tous les établissements publics ou privés, quelle que soit la forme du travail exécuté.",
  },
  {
    id: 'q2', question: "Le temps nécessaire au travailleur pour se rendre sur son lieu de travail est-il compris dans la durée légale du travail ?",
    options: [
      { id: 'a', texte: "Oui, systématiquement, quelle que soit la distance parcourue" },
      { id: 'b', texte: "Non, sauf si ce temps est inhérent au travail lui-même" },
      { id: 'c', texte: "Oui, mais uniquement au-delà de trente minutes de trajet" },
      { id: 'd', texte: "Non, en aucun cas, même si le trajet fait partie intégrante de la prestation" },
      { id: 'e', texte: "Cette question relève exclusivement du règlement d'entreprise" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 119, al. 3',
    explication: "L'article 119 exclut en principe le temps de trajet domicile-travail du calcul de la durée légale, sauf si ce temps est inhérent au travail lui-même, une exception qui neutralise à la fois l'inclusion systématique et l'exclusion absolue sans nuance.",
  },
  {
    id: 'q3', question: "Les heures effectuées au-delà de la durée légale du travail donnent-elles droit à une majoration de salaire ?",
    options: [
      { id: 'a', texte: "Non, sauf accord exprès de l'employeur" },
      { id: 'b', texte: "Oui, elles sont considérées comme heures supplémentaires et donnent droit à une majoration" },
      { id: 'c', texte: "Oui, mais seulement au-delà de dix heures hebdomadaires de dépassement" },
      { id: 'd', texte: "Non, elles sont simplement récupérées sous forme de repos compensateur" },
      { id: 'e', texte: "Cette majoration ne s'applique qu'aux emplois de cadre de collaboration" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 119, al. 4',
    explication: "L'article 119 qualifie automatiquement d'heures supplémentaires toute heure effectuée au-delà de la durée légale, avec droit à majoration de salaire, sans condition de seuil minimal de dépassement ni de catégorie d'emploi.",
  },
  {
    id: 'q4', question: "Quelle est la durée minimale du repos hebdomadaire dont bénéficie tout travailleur au cours de chaque période de sept jours ?",
    options: [
      { id: 'a', texte: "Douze heures" },
      { id: 'b', texte: "Dix-huit heures" },
      { id: 'c', texte: "Vingt-quatre heures" },
      { id: 'd', texte: "Trente-six heures" },
      { id: 'e', texte: "Quarante-huit heures" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 121',
    explication: "L'article 121 garantit un repos minimal de vingt-quatre heures au cours de chaque période de sept jours, accordé autant que possible collectivement et ayant lieu le dimanche, sauf conditions particulières plus favorables prévues par convention collective.",
  },
  {
    id: 'q5', question: "Lorsque le repos hebdomadaire n'est pas donné collectivement à l'ensemble du personnel, quelle obligation l'article 122 impose-t-il à l'employeur ?",
    options: [
      { id: 'a', texte: "Aucune formalité particulière n'est requise dans ce cas" },
      { id: 'b', texte: "Afficher à l'avance les noms des travailleurs soumis au régime particulier et l'indication de ce régime" },
      { id: 'c', texte: "Obtenir l'autorisation préalable de l'Inspecteur du Travail pour chaque travailleur concerné" },
      { id: 'd', texte: "Verser une prime compensatoire à chaque travailleur concerné" },
      { id: 'e', texte: "Réunir un vote de la délégation syndicale avant toute mise en œuvre" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 122, al. 2',
    explication: "L'article 122 impose, lorsque le repos n'est pas donné collectivement, un affichage préalable des noms des travailleurs soumis au régime particulier et de l'indication de ce régime, une obligation de transparence distincte d'une autorisation administrative individuelle ou d'une prime compensatoire.",
  },
  {
    id: 'q6', question: "Selon l'article 124, entre quelles heures le travail de nuit est-il défini pour l'ensemble des travailleurs ?",
    options: [
      { id: 'a', texte: "Entre 18 heures et 6 heures" },
      { id: 'b', texte: "Entre 20 heures et 4 heures" },
      { id: 'c', texte: "Entre 19 heures et 5 heures" },
      { id: 'd', texte: "Entre 21 heures et 5 heures" },
      { id: 'e', texte: "Entre 22 heures et 6 heures" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 124',
    explication: "L'article 124 définit le travail de nuit, pour l'ensemble des travailleurs, comme celui exécuté entre 19 heures et 5 heures, payé avec majoration sans préjudice des dispositions relatives aux heures supplémentaires. Ce créneau doit être distingué de celui, plus large, retenu à l'article 125 pour les enfants et les personnes avec handicap.",
  },
  {
    id: 'q7', question: "Pour l'interdiction du travail de nuit des enfants et des personnes avec handicap, l'article 125 retient quelle plage horaire pour la notion de « nuit » ?",
    options: [
      { id: 'a', texte: "La même plage que l'article 124, soit 19 heures à 5 heures" },
      { id: 'b', texte: "De 18 heures à 6 heures, une plage plus large que celle de l'article 124" },
      { id: 'c', texte: "De 20 heures à 4 heures, une plage plus étroite" },
      { id: 'd', texte: "Aucune plage horaire spécifique, la notion restant à l'appréciation de l'Inspecteur du Travail" },
      { id: 'e', texte: "De 17 heures à 7 heures" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 125, al. 2',
    explication: "L'article 125 retient, pour la protection spécifique des enfants et des personnes avec handicap, une plage de 18 heures à 6 heures, sensiblement plus large que celle de 19 heures à 5 heures retenue à l'article 124 pour la majoration salariale générale du travail de nuit : les deux notions de « nuit » ne coïncident donc pas.",
  },
  {
    id: 'q8', question: "Quelle est la durée minimale du repos journalier des enfants et des personnes avec handicap entre deux périodes de travail ?",
    options: [
      { id: 'a', texte: "Huit heures consécutives" },
      { id: 'b', texte: "Dix heures consécutives" },
      { id: 'c', texte: "Douze heures consécutives" },
      { id: 'd', texte: "Quatorze heures consécutives" },
      { id: 'e', texte: "Aucune durée minimale n'est fixée par le Code pour cette catégorie" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 126',
    explication: "L'article 126 impose un repos journalier d'au moins douze heures consécutives entre deux périodes de travail pour les enfants et les personnes avec handicap, une protection renforcée par rapport au repos hebdomadaire général de vingt-quatre heures de l'article 121, qui vise une échelle de temps différente.",
  },
  {
    id: 'q9', question: "Est-il permis d'exiger d'une candidate à un emploi qu'elle se soumette à un test de grossesse ?",
    options: [
      { id: 'a', texte: "Oui, systématiquement, avant toute embauche" },
      { id: 'b', texte: "Non, sauf pour les travaux interdits totalement ou partiellement aux femmes enceintes ou comportant un risque reconnu pour la santé" },
      { id: 'c', texte: "Oui, mais uniquement pour les emplois à durée déterminée" },
      { id: 'd', texte: "Non, en aucun cas, même pour les travaux comportant un risque avéré" },
      { id: 'e', texte: "Cette question est laissée à la libre appréciation de chaque employeur" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 128, al. 2',
    explication: "L'article 128 interdit d'exiger d'une candidate qu'elle se soumette à un test de grossesse ou présente un certificat de grossesse, sauf pour les travaux interdits totalement ou partiellement aux femmes enceintes ou qui allaitent, ou comportant un risque reconnu ou significatif pour la santé de la femme et de l'enfant : ce n'est ni une interdiction absolue sans exception, ni une exigence systématique.",
  },
  {
    id: 'q10', question: "Une femme enceinte, dont l'état entraîne des risques pour sa santé dûment constatés par le médecin, suspend son contrat de travail en application de l'article 129. Cette suspension peut-elle être considérée comme une cause de résiliation du contrat ?",
    options: [
      { id: 'a', texte: "Oui, si la suspension dépasse trois mois" },
      { id: 'b', texte: "Non, cette interruption de service ne peut en aucun cas être considérée comme une cause de résiliation" },
      { id: 'c', texte: "Oui, l'employeur pouvant résilier le contrat pour nécessité de fonctionnement" },
      { id: 'd', texte: "Cela dépend de la durée du contrat, déterminée ou indéterminée" },
      { id: 'e', texte: "Oui, sauf si la travailleuse a moins d'un an d'ancienneté" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 129, al. 1',
    explication: "L'article 129 est catégorique : l'interruption de service liée à la suspension pour grossesse à risque ne peut, en aucun cas, être considérée comme une cause de résiliation du contrat, sans exception liée à la durée de la suspension, au type de contrat ou à l'ancienneté de la travailleuse.",
  },
  {
    id: 'q11', question: "Pendant le congé de maternité de quatorze semaines, quelle part de sa rémunération la femme salariée conserve-t-elle, en l'état actuel du Code du travail ?",
    options: [
      { id: 'a', texte: "L'intégralité de sa rémunération habituelle" },
      { id: 'b', texte: "Les deux tiers de sa rémunération, ainsi que le maintien des avantages contractuels en nature" },
      { id: 'c', texte: "La moitié de sa rémunération, sans les avantages en nature" },
      { id: 'd', texte: "Aucune rémunération, seules les allocations familiales étant maintenues" },
      { id: 'e', texte: "Un tiers de sa rémunération, majoré d'une prime de maternité fixe" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 130, al. 2',
    explication: "L'article 130 maintient, pendant le congé de maternité, les deux tiers de la rémunération ainsi que les avantages contractuels en nature. Une proposition de loi visant à porter ce taux à l'intégralité du salaire a été discutée au Parlement, mais reste à ce jour un projet, non le droit positif en vigueur : le taux des deux tiers demeure la règle applicable tant que ce texte n'est pas promulgué.",
  },
  {
    id: 'q12', question: "Le bénéfice des dispositions protectrices de l'article 129 est-il réservé aux femmes mariées ?",
    options: [
      { id: 'a', texte: "Oui, une femme non mariée ne peut s'en prévaloir" },
      { id: 'b', texte: "Non, ce bénéfice est acquis à toute femme salariée, qu'elle soit mariée ou non, que l'enfant vive ou non" },
      { id: 'c', texte: "Oui, sauf disposition contraire de la convention collective" },
      { id: 'd', texte: "Non, mais seulement si l'enfant est né vivant" },
      { id: 'e', texte: "Cette distinction n'est pas abordée par le Code du travail" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 130, al. 4',
    explication: "L'article 130 précise expressément que le bénéfice de l'article 129 est acquis à toute femme salariée, qu'elle soit mariée ou non, que l'enfant vive ou non, écartant ainsi toute condition de statut matrimonial ou de survie de l'enfant.",
  },
  {
    id: 'q13', question: "Quel effet l'article 131 attache-t-il à toute convention contraire aux articles 129 et 130 relatifs à la protection de la grossesse et de la maternité ?",
    options: [
      { id: 'a', texte: "Elle est valable si elle est plus favorable à l'employeur" },
      { id: 'b', texte: "Elle est nulle de plein droit" },
      { id: 'c', texte: "Elle est simplement inopposable à la travailleuse, mais reste valable entre les autres parties" },
      { id: 'd', texte: "Elle est réductible par le Tribunal du travail à des conditions équitables" },
      { id: 'e', texte: "Elle est valable pendant la durée du contrat en cours, puis caduque" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 131',
    explication: "L'article 131 frappe de nullité de plein droit toute convention contraire aux articles 129 et 130, une sanction automatique et absolue, sans réduction judiciaire possible ni limitation dans le temps.",
  },
  {
    id: 'q14', question: "Quelle protection l'article 132 accorde-t-il à la femme qui allaite son enfant ?",
    options: [
      { id: 'a', texte: "Un jour de congé supplémentaire par mois, non rémunéré" },
      { id: 'b', texte: "Deux repos d'une demi-heure par jour, rémunérés comme temps de travail" },
      { id: 'c', texte: "Une réduction de sa durée journalière de travail d'une heure, sans rémunération" },
      { id: 'd', texte: "Un repos d'une heure par jour, non rémunéré" },
      { id: 'e', texte: "Cette protection n'est due que si l'employeur dispose d'une crèche sur site" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 132',
    explication: "L'article 132 accorde à la femme qui allaite deux repos d'une demi-heure par jour, dans tous les cas, ces périodes étant rémunérées comme temps de travail, sans condition liée à l'existence d'une crèche sur le site de l'entreprise.",
  },
  {
    id: 'q15', question: "En dessous de quel âge un enfant ne peut-il, en aucun cas, être employé dans une entreprise, même comme apprenti ?",
    options: [
      { id: 'a', texte: "Douze ans" },
      { id: 'b', texte: "Treize ans" },
      { id: 'c', texte: "Quatorze ans" },
      { id: 'd', texte: "Quinze ans" },
      { id: 'e', texte: "Seize ans" },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 133',
    explication: "L'article 133 fixe l'âge minimal à quinze ans, sauf dérogation expresse conjointe de l'Inspecteur du Travail et de l'autorité parentale ou tutélaire, cette dérogation ne pouvant en aucun cas être accordée en dessous de cet âge de quinze ans, qui constitue donc un plancher absolu.",
  },
  {
    id: 'q16', question: "Quand naît le droit au congé annuel du travailleur, selon l'article 140 ?",
    options: [
      { id: 'a', texte: "Dès la signature du contrat de travail" },
      { id: 'b', texte: "À l'expiration d'une année de services comptée de date à date chez le même employeur ou un employeur substitué" },
      { id: 'c', texte: "Après six mois de services continus" },
      { id: 'd', texte: "Uniquement après confirmation à l'issue de la période d'essai" },
      { id: 'e', texte: "Le droit au congé n'existe qu'à la demande expresse du travailleur, formulée par écrit" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 140, al. 3',
    explication: "L'article 140 fait naître le droit au congé à l'expiration d'une année de services comptée de date à date, accomplie chez le même employeur ou un employeur substitué (notion étudiée au chapitre 4 à propos de la substitution d'employeur), sans lien avec la seule signature du contrat, une durée de six mois ou une simple demande écrite du travailleur.",
  },
  {
    id: 'q17', question: "Comment se calcule la durée du congé annuel d'un travailleur âgé de plus de dix-huit ans, selon l'article 141 ?",
    options: [
      { id: 'a', texte: "Un jour ouvrable par mois entier de service, augmenté d'un jour par tranche de cinq années d'ancienneté" },
      { id: 'b', texte: "Deux jours ouvrables par mois entier de service, sans majoration d'ancienneté" },
      { id: 'c', texte: "Un jour ouvrable et demi par mois entier de service, comme pour le travailleur mineur" },
      { id: 'd', texte: "Une durée fixe de quinze jours ouvrables par an, quelle que soit l'ancienneté" },
      { id: 'e', texte: "Un jour ouvrable par mois, sans possibilité de majoration, l'ancienneté n'étant prise en compte que pour le préavis" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 141',
    explication: "L'article 141 fixe la durée à un jour ouvrable par mois entier de service pour le travailleur de plus de dix-huit ans (un jour et demi pour le travailleur mineur), augmentée d'un jour ouvrable par tranche de cinq années d'ancienneté chez le même employeur ou l'employeur substitué, ce qui exclut un taux fixe indépendant de l'ancienneté.",
  },
  {
    id: 'q18', question: "En dehors du cas de résiliation du contrat, une convention peut-elle valablement prévoir le versement d'une indemnité compensatoire à la place de la prise effective du congé ?",
    options: [
      { id: 'a', texte: "Oui, si le travailleur y consent expressément par écrit" },
      { id: 'b', texte: "Non, une telle convention est nulle et de nul effet en dehors du cas de résiliation" },
      { id: 'c', texte: "Oui, dans la limite de la moitié du congé acquis" },
      { id: 'd', texte: "Oui, si la convention collective applicable le prévoit expressément" },
      { id: 'e', texte: "Cette substitution est libre, le Code ne l'encadrant pas" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 144, al. 2',
    explication: "L'article 144 réserve l'indemnité compensatoire de congé au seul cas de résiliation du contrat ; en dehors de cette hypothèse, toute convention prévoyant l'octroi d'une indemnité compensatoire en lieu et place du congé est nulle et de nul effet, quel que soit le consentement du travailleur ou les stipulations de la convention collective.",
  },
  {
    id: 'q19', question: "Jusqu'à concurrence de combien de jours ouvrables par an l'employeur est-il tenu au paiement des congés de circonstance ?",
    options: [
      { id: 'a', texte: "Cinq jours ouvrables" },
      { id: 'b', texte: "Dix jours ouvrables" },
      { id: 'c', texte: "Quinze jours ouvrables" },
      { id: 'd', texte: "Vingt jours ouvrables" },
      { id: 'e', texte: "Aucune limite n'est fixée par le Code" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 146, dernier al.',
    explication: "L'article 146 plafonne l'obligation de paiement des congés de circonstance à quinze jours ouvrables par an, tout en précisant que ces jours ne sont pas déductibles du congé minimum légal et ne peuvent être fractionnés.",
  },
  {
    id: 'q20', question: "En règle générale, après quelle durée de service le droit au voyage retour du travailleur et de sa famille naît-il, sans restriction, selon l'article 149 ?",
    options: [
      { id: 'a', texte: "Six mois de service" },
      { id: 'b', texte: "Un an de service" },
      { id: 'c', texte: "Deux ans de service, comptés de date à date" },
      { id: 'd', texte: "Trois ans de service" },
      { id: 'e', texte: "Le droit naît dès la signature du contrat, sans condition de durée" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 149, al. 1',
    explication: "L'article 149 fait naître, en règle générale et sans restriction, le droit au voyage retour après chaque période de deux ans de service comptée de date à date, sous réserve des hypothèses particulières d'ouverture anticipée énumérées par le même article (résiliation du fait de l'employeur, contrat de moins de deux ans, décès du travailleur, période d'essai).",
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "Les cinquante-deux heures hebdomadaires non majorées de l'atelier de Kolwezi",
    contexte: "Un atelier de transformation de minerais du Lualaba fait travailler ses ouvriers cinquante-deux heures par semaine, réparties sur six jours, sans jamais leur verser la moindre majoration pour les heures excédant le seuil légal. Deux fois par mois, l'équipe de nuit assure un poste de 20 heures à 2 heures du matin, payé au même taux horaire que le poste de jour, l'employeur estimant qu'une seule catégorie de majoration, celle des heures supplémentaires, suffit à couvrir l'ensemble de la situation. Le repos hebdomadaire, enfin, n'est affiché nulle part dans l'atelier, alors qu'il n'est pas donné collectivement à tout le personnel, chaque ouvrier ayant un jour de repos différent selon un roulement informel.",
    questions: [
      { num: 1, enonce: "Les heures effectuées au-delà de quarante-cinq par semaine doivent-elles être majorées ?", correction: "Oui. L'article 119 fixe la durée légale à quarante-cinq heures par semaine et huit heures par jour ; toute heure effectuée au-delà est qualifiée d'heure supplémentaire et donne droit à une majoration de salaire. Avec cinquante-deux heures hebdomadaires effectuées, sept heures par semaine au minimum échappent illégalement à toute majoration." },
      { num: 2, enonce: "Le paiement du poste de nuit de 20 heures à 2 heures au même taux que le poste de jour est-il conforme au Code ?", correction: "Non. L'article 124 définit le travail de nuit comme celui exécuté entre 19 heures et 5 heures, et impose son paiement avec majoration, expressément « sans préjudice des dispositions relatives au paiement des heures supplémentaires ». Le poste de 20 heures à 2 heures se situe entièrement dans cette plage horaire de nuit : il doit donc recevoir la majoration propre au travail de nuit, laquelle se cumule, le cas échéant, avec celle des heures supplémentaires, et non s'y substituer comme le soutient l'employeur." },
      { num: 3, enonce: "L'absence d'affichage du régime de repos hebdomadaire individualisé constitue-t-elle, en elle-même, une irrégularité distincte des deux précédentes ?", correction: "Oui. L'article 122 impose, lorsque le repos hebdomadaire n'est pas donné collectivement à l'ensemble du personnel, un affichage préalable, aux endroits réservés à cet effet, des noms des travailleurs soumis au régime particulier et de l'indication de ce régime. Un roulement informel sans aucun affichage méconnaît cette obligation de transparence, indépendamment du respect ou non de la durée minimale de vingt-quatre heures de repos elle-même, qui reste à vérifier séparément pour chaque ouvrier." },
      { num: 4, enonce: "L'atelier peut-il utilement objecter que le seuil de quarante-cinq heures serait réductible par accord individuel des ouvriers, qui auraient tacitement accepté cet horaire en continuant à travailler sans protester ?", correction: "Non. La durée légale du travail relève de l'ordre public social déjà rencontré au chapitre 3 à propos de la nullité des clauses dérogatoires : un accord individuel, fût-il tacite, ne peut réduire les garanties minimales du Code, qui ne peut être amélioré qu'au bénéfice du travailleur, jamais à son détriment. L'absence de protestation des ouvriers, dans un rapport de subordination économique, ne vaut ni renonciation valable ni régularisation des irrégularités déjà identifiées." },
    ],
  },
  {
    id: 'cp2',
    titre: "La grossesse à risque de Mme Ilunga et le licenciement pour abandon de poste",
    contexte: "Mme Ilunga, vendeuse dans une entreprise de Kinshasa, obtient un certificat médical attestant que son état de grossesse entraîne des risques pour sa santé. Sur cette base, elle suspend son contrat de travail conformément à l'article 129 et en informe son employeur par écrit, certificat à l'appui. Trois semaines plus tard, sans jamais contester la validité du certificat médical, l'employeur lui notifie une lettre de licenciement invoquant un « abandon de poste prolongé », sans lui reconnaître aucun motif lié à sa conduite ou à l'aptitude professionnelle, et sans lui verser aucune indemnité.",
    questions: [
      { num: 1, enonce: "La suspension du contrat par Mme Ilunga, sur la base du certificat médical, était-elle régulière ?", correction: "Oui. L'article 129 accorde à toute femme enceinte dont l'état entraîne des risques pour sa santé, dûment constaté par le médecin, le droit de suspendre son contrat de travail sur la base du certificat médical, conformément au régime général de la suspension étudié à l'article 57 au chapitre 3. Mme Ilunga disposait donc d'un droit propre à suspendre son contrat, sans avoir à solliciter l'accord préalable de son employeur." },
      { num: 2, enonce: "La qualification retenue par l'employeur, « abandon de poste prolongé », est-elle conforme à la réalité juridique de la situation ?", correction: "Non. Un abandon de poste suppose une absence non justifiée, en violation des obligations contractuelles du travailleur, ce qui est directement contredit ici par l'exercice régulier d'un droit de suspension prévu par l'article 129, exercé sur la base d'un certificat médical dont l'employeur ne conteste pas la validité. Présenter cette suspension légitime comme un abandon de poste relève d'une qualification inexacte, destinée à masquer la véritable cause du licenciement." },
      { num: 3, enonce: "L'article 129 permet-il à l'employeur de considérer cette interruption de service comme une cause de résiliation du contrat ?", correction: "Non, en aucun cas. L'article 129, premier alinéa, est explicite : l'interruption de service liée à cette suspension ne peut être considérée comme une cause de résiliation du contrat. Le licenciement notifié par l'employeur, quelle que soit l'étiquette retenue dans la lettre de notification, se heurte donc frontalement à cette interdiction expresse, indépendamment même de la discussion sur la véracité de la qualification d'abandon de poste." },
      { num: 4, enonce: "Quelle réparation Mme Ilunga peut-elle réclamer, compte tenu du cumul des irrégularités constatées ?", correction: "Le licenciement de Mme Ilunga cumule deux vices distincts déjà rencontrés au chapitre 4 : l'absence de tout motif valable au sens de l'article 62, la grossesse figurant explicitement parmi les motifs que ce texte exclut de la liste des licenciements valables, et la violation directe de l'interdiction de résiliation posée par l'article 129. Ce cumul renforce sa position pour obtenir, selon l'article 63, sa réintégration ou, à défaut, des dommages-intérêts fixés par le Tribunal du travail dans la limite de trente-six mois de sa dernière rémunération, auxquels s'ajoute l'indemnité de préavis non versé, l'employeur n'ayant respecté aucune des deux voies." },
    ],
  },
  {
    id: 'cp3',
    titre: "Le calcul du congé annuel de M. Mbala après sept ans d'ancienneté et deux arrêts maladie",
    contexte: "M. Mbala, âgé de trente-quatre ans, travaille sans interruption depuis sept années entières chez le même employeur à Mbuji-Mayi. Au cours de la septième année de service, il a été en incapacité de travail pour maladie ordinaire pendant deux mois consécutifs, sans lien avec un accident du travail ni une maladie professionnelle. Son employeur, au moment de calculer son congé annuel pour cette septième année, refuse de tenir compte de la période de maladie dans le calcul du service donnant droit au congé, et propose en outre de faire chevaucher une partie des jours de maladie survenus à l'intérieur de la période de congé déjà programmée avec les jours de congé eux-mêmes, pour « ne pas payer deux fois ».",
    questions: [
      { num: 1, enonce: "Quelle est la durée de base du congé annuel de M. Mbala, avant toute majoration liée à son ancienneté, pour une année entière de service ?", correction: "L'article 141 fixe la durée à un jour ouvrable par mois entier de service pour le travailleur de plus de dix-huit ans, soit, pour une année entière, une base de douze jours ouvrables, M. Mbala étant âgé de trente-quatre ans et relevant donc du régime général, non de celui, plus favorable, du travailleur mineur." },
      { num: 2, enonce: "Cette durée de base doit-elle être majorée en raison des sept années d'ancienneté de M. Mbala chez le même employeur ?", correction: "Oui. L'article 141 prévoit une augmentation d'un jour ouvrable par tranche de cinq années d'ancienneté chez le même employeur ou l'employeur substitué. Avec sept années d'ancienneté, M. Mbala a franchi une tranche complète de cinq ans, ce qui porte sa durée de congé à treize jours ouvrables pour l'année considérée, sous réserve que le calcul exact de l'ancienneté par tranches soit vérifié au regard de la convention collective éventuellement applicable, qui peut prévoir un régime plus favorable." },
      { num: 3, enonce: "L'employeur peut-il légitimement refuser de tenir compte des deux mois de maladie ordinaire dans le calcul du service donnant droit au congé de la septième année ?", correction: "Non, dans la limite fixée par le texte. L'article 141, deuxième alinéa, inclut expressément, parmi les services pris en considération pour le calcul de la durée du congé, les périodes de suspension dues à l'incapacité de travail, à concurrence d'un maximum de six mois par année de service considérée séparément. Les deux mois de maladie ordinaire de M. Mbala, très en deçà de ce plafond de six mois, doivent donc être intégralement comptabilisés comme service ouvrant droit au congé, contrairement à ce que soutient l'employeur." },
      { num: 4, enonce: "La proposition de l'employeur de faire chevaucher les jours de maladie avec les jours de congé déjà programmés, pour « ne pas payer deux fois », est-elle conforme à l'article 141 ?", correction: "Non. L'article 141, dernier alinéa, dispose sans ambiguïté que les jours de maladie compris dans la période de congé ne comptent pas comme jours de congé. Si une maladie survient pendant que M. Mbala est effectivement en congé, ces jours de maladie doivent être neutralisés et son congé prolongé d'autant, plutôt que d'être imputés sur son solde de congé comme le propose l'employeur, ce mécanisme de non-imputation étant distinct de la question, déjà tranchée à la question précédente, de la prise en compte des arrêts maladie dans le calcul de la durée du congé lui-même." },
    ],
  },
  {
    id: 'cp4',
    titre: "La démission de M. Kalala après dix mois et le voyage retour de sa famille",
    contexte: "M. Kalala, engagé sous contrat à durée indéterminée par une société d'exploitation forestière de la Tshopo, a été recruté dans une ville éloignée de son lieu d'origine, l'employeur ayant pris en charge le voyage aller de M. Kalala et de sa famille conformément à l'article 148. Dix mois après ce voyage aller, sans qu'aucune faute lourde ne soit imputable à l'employeur, M. Kalala démissionne de son propre chef pour rejoindre une entreprise concurrente offrant de meilleures conditions. Il réclame à son ancien employeur la prise en charge intégrale du voyage retour de sa famille vers leur lieu d'origine.",
    questions: [
      { num: 1, enonce: "Le droit au voyage retour de M. Kalala et de sa famille était-il déjà acquis, sans restriction, au moment de sa démission, dix mois après le voyage aller ?", correction: "Non. L'article 149 fait naître, en règle générale et sans restriction, le droit au voyage retour après chaque période de deux ans de service comptée de date à date. Dix mois de service depuis le voyage aller n'atteignent pas ce seuil, et aucune des hypothèses d'ouverture anticipée du droit énumérées par le même article, résiliation du fait de l'employeur, contrat de moins de deux ans ou décès du travailleur, ne correspond à la situation de M. Kalala, qui démissionne de son propre chef d'un contrat à durée indéterminée." },
      { num: 2, enonce: "L'employeur est-il pour autant totalement dispensé de toute participation aux frais de voyage retour ?", correction: "Non, pas totalement. L'article 149, dans son avant-dernier alinéa, prévoit que l'employeur supporte les frais de voyage retour proportionnellement à la durée des prestations accomplies, notamment lorsque le travailleur met fin au contrat à durée indéterminée après avoir effectué douze mois de services depuis son dernier voyage aller, sans faute lourde de l'employeur. M. Kalala n'ayant accompli que dix mois, il se situe même en-deçà du seuil de douze mois prévu pour cette prise en charge proportionnelle, ce qui affaiblit davantage sa position que s'il avait démissionné après le douzième mois." },
      { num: 3, enonce: "Le fait que la démission de M. Kalala soit motivée par une offre plus avantageuse d'un concurrent, plutôt que par une faute de l'employeur, a-t-il une incidence sur cette analyse ?", correction: "Non, ou plutôt cette circonstance ne fait que confirmer l'analyse déjà retenue : l'article 149 distingue les hypothèses selon qu'il y a ou non faute lourde de l'employeur et selon la durée de service accomplie depuis le dernier voyage aller, non selon le motif économique ou personnel de la démission du travailleur. Une démission motivée par une meilleure offre reste une démission sans faute lourde de l'employeur, ce qui renvoie exactement au régime de prise en charge proportionnelle évoqué à la question précédente, sous réserve du seuil de douze mois non atteint ici." },
      { num: 4, enonce: "M. Kalala pourrait-il invoquer l'article 152 pour réclamer une indemnité complémentaire s'il constate un retard important dans l'organisation de son voyage retour par l'employeur ?", correction: "Oui, sur le principe, indépendamment de la question du montant pris en charge. L'article 152 impose à l'employeur d'assurer le voyage retour dans les délais les plus brefs à dater de la fin des services, et de payer une indemnité égale à la rémunération mensuelle jusqu'au départ effectif, sauf si le retard est imputable à la négligence du travailleur, à son refus de se conformer aux instructions de l'employeur, ou à la force majeure. Un retard purement imputable à l'employeur, indépendamment du niveau de prise en charge proportionnelle du voyage lui-même déjà déterminé, ouvrirait donc droit à cette indemnité de retard spécifique." },
    ],
  },
  {
    id: 'cp5',
    titre: "Le règlement d'entreprise à amendes, jamais soumis à consultation",
    contexte: "Une entreprise de gardiennage de Kinshasa affiche un règlement d'entreprise prévoyant, parmi ses clauses, une amende de 5 000 FC par retard constaté, déductible directement du salaire du mois suivant. Ce règlement, qui traite par ailleurs de manière classique l'organisation technique du travail et les règles d'hygiène et de sécurité, n'a jamais été communiqué pour avis aux représentants des travailleurs de l'entreprise, ni à l'Inspecteur du Travail du ressort, avant sa mise en vigueur. Un travailleur sanctionné à plusieurs reprises par cette amende conteste la retenue correspondante sur son bulletin de paie.",
    questions: [
      { num: 1, enonce: "La clause d'amende de 5 000 FC par retard, prévue dans le règlement d'entreprise, est-elle valable ?", correction: "Non. L'article 157, troisième alinéa, dispose que toutes les clauses du règlement d'entreprise prévoyant des amendes à l'encontre des travailleurs sont nulles de plein droit. Cette nullité rejoint, sur le terrain spécifique du règlement d'entreprise, celle déjà posée de façon générale à l'article 111 du chapitre 5 pour toute stipulation attribuant à l'employeur le droit d'infliger des amendes." },
      { num: 2, enonce: "L'absence de communication du règlement d'entreprise pour avis aux représentants des travailleurs et à l'Inspecteur du Travail constitue-t-elle une irrégularité distincte de la nullité de la clause d'amende elle-même ?", correction: "Oui. L'article 157, dernier alinéa, impose au chef d'entreprise de communiquer le règlement d'entreprise, avant sa mise en vigueur, pour avis aux représentants des travailleurs et à l'Inspecteur du Travail, ce dernier pouvant exiger le retrait ou la modification des dispositions contraires à la législation en vigueur. L'absence totale de cette communication préalable vicie la procédure d'adoption du règlement dans son ensemble, indépendamment de la nullité de fond qui frappe spécifiquement la clause d'amende." },
      { num: 3, enonce: "Le travailleur sanctionné peut-il obtenir la restitution des sommes déjà retenues au titre de cette amende ?", correction: "Oui, en principe. Dès lors que la clause d'amende est nulle de plein droit, les retenues opérées sur cette base sont dépourvues de fondement juridique : elles ne figurent pas parmi les retenues limitativement autorisées par l'article 112, étudié au chapitre 5, qui n'admet ni les amendes ni les réductions de rémunération à titre de dommages-intérêts. Le travailleur peut donc réclamer la restitution intégrale des sommes ainsi prélevées sur ses bulletins de paie successifs." },
      { num: 4, enonce: "Si l'entreprise avait soumis son règlement à l'avis préalable des représentants des travailleurs et de l'Inspecteur du Travail, cette consultation régulière aurait-elle suffi à valider la clause d'amende ?", correction: "Non. La nullité de la clause d'amende posée par l'article 157 est une nullité de fond, absolue, qui frappe la clause elle-même quel que soit le respect de la procédure de consultation préalable. La consultation régulière des représentants des travailleurs et de l'Inspecteur du Travail est une exigence procédurale distincte, qui aurait pu, le cas échéant, conduire l'Inspecteur du Travail à exiger précisément le retrait de cette clause avant même sa mise en vigueur, mais son respect n'aurait en aucun cas pu purger la nullité de fond de la clause elle-même une fois celle-ci maintenue dans le texte." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue1',
  numero: 6,
  id: 'ue1-chapitre-6',
  titre: 'Durée du travail, repos et congés',
  sousTitre: 'Titre VI du Code du travail · Loi n°015/2002, art. 119 à 158',
  infoBulle: 'Durée du travail, repos hebdomadaire, travail de nuit, protection de la maternité et des enfants, logement, congés annuels et de circonstance, voyages, règlement d\'entreprise.',
  loiRef: 'Titre VI, art. 119 à 158',
  moduleLabel: 'UE 1 · Droit du travail',
  retourRoute: '/ue1-droit-travail',
  coursId: 'ue1-droit-travail',
  objectifs: [
    'Maîtriser la durée légale du travail, les heures supplémentaires et le repos hebdomadaire',
    'Connaître le régime du travail de nuit et la protection renforcée des enfants et des personnes avec handicap',
    'Maîtriser la protection de la grossesse et de la maternité, de l\'embauche au congé de maternité',
    'Connaître les règles de calcul et de paiement du congé annuel et des congés de circonstance',
    'Connaître le régime des voyages et transports, et le contenu obligatoire du règlement d\'entreprise',
  ],
  sections: SECTIONS,
  aRetenir: [
    'La durée légale du travail est de quarante-cinq heures par semaine et huit heures par jour ; au-delà, les heures sont supplémentaires et majorées, sans préjudice de la majoration distincte du travail de nuit (19h-5h).',
    'Les enfants et les personnes avec handicap bénéficient d\'une protection renforcée : interdiction de travail nocturne de 18h à 6h, repos journalier de douze heures, âge minimal d\'emploi de quinze ans, plancher absolu.',
    'La grossesse ne peut être une source de discrimination ; la suspension pour grossesse à risque et le congé de maternité de quatorze semaines, rémunéré aux deux tiers, ne peuvent jamais être des causes de résiliation du contrat.',
    'Le congé annuel, d\'un jour ouvrable par mois majoré d\'un jour par tranche de cinq ans d\'ancienneté, ne peut être remplacé par une indemnité compensatoire qu\'en cas de résiliation du contrat.',
    'Le droit au voyage retour naît en principe après deux ans de service, avec des hypothèses d\'ouverture anticipée ou de prise en charge proportionnelle ; le règlement d\'entreprise ne peut jamais valablement prévoir d\'amendes.',
  ],
  references: [
    {
        genre: "article",
        auteur: "Pimant C.",
        titre: "La femme enceinte au regard du droit du travail congolais",
        support: "Village Justice",
        precision: "note professionnelle en ligne"
    },
    {
        genre: "texte",
        intitule: "Proposition de loi modifiant et complétant la loi n°015/2002 portant Code du travail (rémunération du congé de maternité)",
        precision: "Assemblée nationale, actualité législative non adoptée à ce jour"
    },
    {
        genre: "ouvrage",
        auteur: "Loko Mantuono G.",
        titre: "Droit social, droit du travail et de la sécurité sociale en RDC",
        editeur: "L'Harmattan",
        lieu: "Paris",
        annee: "2022"
    }
],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail, art. 119 à 158',
}

export default chapitre
