// Chapitre 3 du module UE1, Droit du travail : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
import type { Chapitre } from '@/lib/chapitre-types'

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '3.1',
    titre: 'Dispositions générales : liberté contractuelle et ordre public',
    navLabel: '3.1 Dispositions générales',
    blocs: [
      { type: 'paragraphe', texte: 'Le Titre IV s\'ouvre sur un principe que le chapitre 1 a déjà annoncé : les contrats de travail sont passés librement, sous réserve des dispositions du Code. L\'article 36 laisse aux parties le soin de fixer la date d\'entrée en vigueur, la durée, la nature et l\'objet des prestations, le lieu d\'exécution, la rémunération et les avantages complémentaires, dans le cadre des dispositions légales et sous réserve des conventions collectives, règlements d\'entreprise et usages locaux. Le contrat peut toujours mentionner des conditions plus favorables au travailleur, prolongement direct du principe de faveur étudié au chapitre 1.' },
      { type: 'paragraphe', texte: 'Cette liberté contractuelle rencontre cependant une limite immédiate et impérative à l\'article 37 : les contrats de travail ne peuvent déroger aux dispositions d\'ordre public de la législation et de la réglementation en vigueur, et toute clause accordant au travailleur des avantages inférieurs à ceux du Code est nulle de plein droit. Cette nullité automatique, sans intervention judiciaire préalable, illustre le caractère d\'ordre public social déjà rencontré à propos de la finalité protectrice du droit du travail.' },
      { type: 'filet', titre: 'L\'aptitude médicale, condition d\'exécution', texte: 'L\'article 38 subordonne l\'exécution du contrat à la constatation de l\'aptitude au travail par certificat médical. Une personne médicalement inapte au travail auquel elle est destinée ne peut être ni engagée ni maintenue en service : cette règle, souvent négligée en pratique, engage la responsabilité de l\'employeur qui ne l\'observe pas.' },
    ],
  },
  {
    numero: '3.2',
    titre: 'Durée du contrat et clause d\'essai',
    navLabel: '3.2 Durée et clause d\'essai',
    blocs: [
      { type: 'paragraphe', texte: 'L\'article 39 pose une distinction binaire : tout contrat de travail est à durée déterminée ou à durée indéterminée. Le contrat à durée déterminée, défini à l\'article 40, couvre trois hypothèses seulement : un temps déterminé, un ouvrage déterminé, ou le remplacement d\'un travailleur temporairement indisponible. L\'article 41 encadre étroitement ce type de contrat : deux ans au plus, réduits à un an pour le travailleur marié séparé de sa famille ou veuf, séparé de corps ou divorcé séparé de ses enfants ; deux contrats au maximum avec le même employeur, un seul renouvellement, sauf exceptions par arrêté ministériel pour les travaux saisonniers ou ouvrages bien définis.' },
      { type: 'paragraphe', texte: 'La sanction de ces limites est automatique : tout contrat conclu en violation de l\'article 41, ou toute continuation de service hors des cas prévus, constitue de plein droit l\'exécution d\'un contrat à durée indéterminée. L\'article 42 y ajoute une règle distincte, fondée non sur le nombre de contrats mais sur la nature de l\'emploi : lorsque le travailleur occupe un emploi permanent, le contrat doit être à durée indéterminée dès l\'origine, sous la même sanction de requalification automatique. Pimant relève, à propos de cette requalification, qu\'elle est fréquemment mal anticipée par les employeurs congolais, qui perçoivent le contrat à durée déterminée comme un outil de flexibilité sans mesurer les limites strictes que le Code lui impose.' },
      { type: 'carte', titre: 'Article 43, synthèse des plafonds de la clause d\'essai', tableau: { entetes: ['Catégorie', 'Durée maximale'], lignes: [['Manœuvre sans spécialité', '**Un mois**'], ['Autres travailleurs', '**Six mois**']] }, note: 'Une clause d\'essai excédant ces plafonds n\'est pas nulle : elle est réduite de plein droit à la durée maximale applicable. La prolongation des services au-delà de cette durée entraîne automatiquement la confirmation du contrat.' },
    ],
  },
  {
    numero: '3.3',
    titre: 'Forme et preuve du contrat de travail',
    navLabel: '3.3 Forme et preuve',
    blocs: [
      { type: 'paragraphe', texte: 'Le contrat de travail doit en principe être constaté par écrit, comportant les énonciations prévues par le Code, sauf pour l\'engagement au jour le jour. L\'article 44 attache à l\'absence d\'écrit une présomption simple en faveur de la durée indéterminée, jusqu\'à preuve du contraire, une protection comparable à celle déjà rencontrée pour le contrat d\'apprentissage non visé au chapitre 2. L\'article 45 précise que même un contrat écrit, s\'il ne mentionne pas expressément qu\'il est à durée déterminée, pour ouvrage déterminé ou pour remplacement, avec dans ce dernier cas les motifs du remplacement, est réputé à durée indéterminée.' },
      { type: 'carte', titre: 'Article 46, Loi n°015/2002', note: '« L\'employeur est tenu de remettre au travailleur, deux jours ouvrables au moins avant la signature du contrat, un exemplaire du projet de contrat et de mettre à sa disposition tous les documents essentiels auxquels il se réfère. Faute pour l\'employeur d\'avoir rempli cette obligation, le travailleur peut résilier le contrat dans les trente jours suivant sa conclusion sans préavis ni indemnité. »' },
      { type: 'paragraphe', texte: 'Comme pour le contrat d\'apprentissage, le contrat de travail écrit doit être soumis au visa de l\'Office National de l\'Emploi. L\'article 47 attache à ce défaut de visa des conséquences plus radicales encore que celles de l\'article 46 : le travailleur peut résilier à tout moment, sans préavis, avec possibilité de dommages-intérêts, et un contrat que l\'Office refuse de viser prend fin de plein droit. Enfin, l\'article 49 assouplit ce formalisme du côté de la preuve : en l\'absence d\'écrit, le travailleur peut établir par toutes voies de droit l\'existence et la teneur du contrat, y compris ses modifications ultérieures, même lorsque la forme écrite était en principe requise.' },
    ],
  },
  {
    numero: '3.4',
    titre: 'Les obligations du travailleur',
    navLabel: '3.4 Obligations du travailleur',
    blocs: [
      { type: 'paragraphe', texte: 'Les articles 50 à 52 dessinent le socle des obligations du travailleur : exécuter personnellement son travail dans les conditions convenues, agir conformément aux ordres reçus, respecter les règlements de l\'établissement, s\'abstenir de tout ce qui pourrait nuire à sa sécurité ou à celle d\'autrui, respecter les convenances et bonnes mœurs, traiter avec équité les travailleurs placés sous ses ordres, restituer en bon état ce qui lui a été confié, et garder les secrets de fabrication ou d\'affaires, y compris après l\'expiration du contrat.' },
      { type: 'paragraphe', texte: 'C\'est à cette dernière obligation de discrétion que se rattache la clause de non-concurrence, régie par l\'article 53, l\'une des dispositions les plus doctrinalement discutées du Titre IV. Le principe posé est celui de la nullité : est nulle de plein droit toute clause interdisant au travailleur, après la fin du contrat, d\'exploiter une entreprise personnelle, de s\'associer ou de s\'engager chez un autre employeur. Muanda souligne que cette nullité de principe traduit un arbitrage du législateur en faveur de la liberté du travail, garantie constitutionnelle, contre une pratique contractuelle que les employeurs tendent à généraliser par leur seule volonté.' },
      { type: 'carte', titre: 'Article 53, conditions cumulatives de l\'exception', liste: ['La rupture résulte d\'une faute lourde du travailleur, **ou** le travailleur a lui-même mis fin au contrat sans faute lourde de l\'employeur', 'Le travailleur a, de la clientèle ou des secrets d\'affaires, une connaissance telle qu\'il puisse nuire gravement à l\'employeur', 'L\'interdiction se rapporte aux activités que le travailleur exerçait chez l\'employeur', 'La durée de l\'interdiction ne dépasse pas un an à compter de la fin du contrat'], note: 'Un licenciement à l\'initiative de l\'employeur, non fondé sur une faute lourde du travailleur, notamment un licenciement économique, laisse la clause frappée de la nullité de principe : elle ne bascule dans aucune des deux hypothèses d\'exception.' },
      { type: 'paragraphe', texte: 'L\'article 54 clôt cette section par l\'échelle des sanctions disciplinaires que le travailleur encourt en cas de manquement : blâme, réprimande, mise à pied dans les limites de l\'article 57 point 5, licenciement avec préavis, licenciement sans préavis dans les cas des articles 72 et 74, étudiés au chapitre 4. La sanction doit être proportionnée à la gravité, à la répétition de la faute ou à l\'intention de nuire qui l\'a inspirée.' },
      { type: 'controle', question: { id: 'checkpoint-1', question: "Un travailleur est licencié pour réorganisation économique de l'entreprise, sans qu'aucune faute ne lui soit reprochée. La clause de non-concurrence de son contrat produit-elle ses effets ?", options: [{ id: 'a', texte: "Oui, tout licenciement suffit à l'activer" }, { id: 'b', texte: "Non, ce cas ne correspond à aucune des deux hypothèses de l'exception de l'article 53" }, { id: 'c', texte: "Oui, mais seulement si le travailleur a plus de trois ans d'ancienneté" }], reponseCorrecte: 'b', articleRef: 'Art. 53', explication: "Le licenciement économique, sans faute du travailleur, ne relève ni de la résiliation pour faute lourde du travailleur, ni de la rupture par le travailleur lui-même : la clause reste nulle de plein droit dans ce cas." } },
    ],
  },
  {
    numero: '3.5',
    titre: 'Les obligations de l\'employeur',
    navLabel: '3.5 Obligations de l\'employeur',
    blocs: [
      { type: 'paragraphe', texte: 'L\'article 55 impose symétriquement à l\'employeur de fournir au travailleur l\'emploi convenu, dans les conditions, au temps et au lieu convenus, de diriger le travailleur et de veiller à ce que le travail s\'accomplisse dans des conditions convenables du point de vue de la sécurité, de la santé et de la dignité. L\'employeur répond de l\'exécution du contrat passé par toute personne agissant en son nom, une règle de représentation qui prolonge la logique de délégation déjà rencontrée à propos de la mise à disposition de personnel au chapitre 1.' },
      { type: 'paragraphe', texte: 'Une obligation plus concrète, souvent source de contentieux en pratique, figure à l\'article 56 : l\'employeur supporte la charge du transport des travailleurs entre leur résidence et leur lieu de travail, à partir d\'une distance fixée par arrêté ministériel. Cette obligation, distincte de la rémunération proprement dite étudiée au chapitre 5, illustre que les obligations de l\'employeur ne se limitent pas au seul versement du salaire.' },
    ],
  },
  {
    numero: '3.6',
    titre: 'La suspension du contrat de travail',
    navLabel: '3.6 La suspension du contrat',
    blocs: [
      { type: 'paragraphe', texte: 'L\'article 57 énumère huit causes suspensives du contrat de travail : l\'incapacité résultant de maladie, d\'accident, de grossesse ou d\'accouchement ; l\'appel ou le rappel sous le drapeau ; les réquisitions militaires ou d\'intérêt public ; l\'exercice de mandats publics ou d\'obligations civiques ; la mise à pied disciplinaire, dans la limite de deux fois quinze jours par an ; la grève ou le lock-out régulier ; l\'incarcération du travailleur ; et la force majeure, constatée par l\'Inspecteur du Travail, définie comme un événement imprévisible, inévitable, non imputable aux parties et rendant absolument impossible l\'exécution des obligations contractuelles.' },
      { type: 'paragraphe', texte: 'Pendant la suspension, l\'article 59 délie les parties de leurs obligations réciproques, à l\'exception de certaines dispositions expressément maintenues, notamment celles relatives au logement, au transport et aux allocations familiales. La règle protectrice essentielle figure cependant à l\'article 60 : il ne peut, en principe, être mis fin à un contrat pendant qu\'il est suspendu.' },
      { type: 'filet', titre: 'Les quatre exceptions strictement délimitées de l\'article 60', texte: 'Maladie ou accident, hors accident du travail : résiliation possible après six mois ininterrompus, avec indemnité équivalant au préavis. Mandats publics : après douze mois, avec les indemnités du contrat ou de la convention collective. Force majeure : après deux mois, sans indemnité. Incarcération : après trois mois, sans indemnité, ou immédiatement en cas de condamnation à plus de deux mois de servitude pénale principale.' },
      { type: 'paragraphe', texte: 'Ces quatre exceptions, aux durées et conséquences volontairement différenciées, appellent une lecture attentive : la maladie, seule cause ouvrant droit à indemnité de résiliation, se distingue nettement de la force majeure ou de l\'incarcération, qui n\'en ouvrent aucune, une différence de traitement qui reflète le degré d\'imputabilité de la cause à l\'une ou l\'autre partie.' },
    ],
  },
]

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1', question: "Une clause contractuelle accorde au travailleur un avantage inférieur à celui prescrit par le Code. Quelle est sa sanction ?",
    options: [
      { id: 'a', texte: "Elle est valable si le travailleur l'a signée en connaissance de cause" },
      { id: 'b', texte: "Elle est nulle de plein droit" },
      { id: 'c', texte: "Elle est annulable, à la demande du travailleur uniquement" },
      { id: 'd', texte: "Elle est valable pendant un an, puis caduque" },
      { id: 'e', texte: "Elle est réductible par le juge à un montant équitable" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 37',
    explication: "L'article 37 prévoit une nullité de plein droit, automatique, qui ne dépend ni du consentement du travailleur, ni d'une action en annulation, ni d'une réduction judiciaire : la clause est réputée n'avoir jamais existé.",
  },
  {
    id: 'q2', question: "L'exécution du contrat de travail est-elle subordonnée à la constatation de l'aptitude médicale du travailleur ?",
    options: [
      { id: 'a', texte: "Non, l'aptitude médicale n'est vérifiée qu'en cas d'accident du travail" },
      { id: 'b', texte: "Oui, par certificat médical, avec un régime provisoire possible en l'absence de médecin" },
      { id: 'c', texte: "Oui, mais uniquement pour les travailleurs de plus de quarante ans" },
      { id: 'd', texte: "Non, cette exigence a été supprimée par la loi de 2016" },
      { id: 'e', texte: "Oui, mais seulement pour les emplois à durée indéterminée" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 38',
    explication: "L'article 38 subordonne l'exécution du contrat à la constatation de l'aptitude par certificat médical d'un médecin du travail ou, à défaut, tout autre médecin ; en l'absence de médecin, un certificat provisoire d'infirmier suffit, sous réserve d'un examen médical dans les trois mois. Aucune limite d'âge ni de type de contrat n'est posée.",
  },
  {
    id: 'q3', question: "Un contrat conclu pour le remplacement d'un travailleur temporairement indisponible est un contrat :",
    options: [
      { id: 'a', texte: "À durée indéterminée par nature" },
      { id: 'b', texte: "À durée déterminée" },
      { id: 'c', texte: "Nul, faute d'objet déterminé" },
      { id: 'd', texte: "Assimilé à un contrat d'apprentissage" },
      { id: 'e', texte: "Valable seulement si le travailleur remplacé est en congé de maternité" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 40',
    explication: "L'article 40 range expressément le remplacement d'un travailleur temporairement indisponible parmi les cas de contrat à durée déterminée, aux côtés du temps déterminé et de l'ouvrage déterminé, sans restriction au seul congé de maternité.",
  },
  {
    id: 'q4', question: "Quelle est la durée maximale d'un contrat à durée déterminée pour un travailleur ordinaire ?",
    options: [
      { id: 'a', texte: 'Un an' },
      { id: 'b', texte: 'Deux ans' },
      { id: 'c', texte: 'Trois ans' },
      { id: 'd', texte: "Quatre ans, comme pour le contrat d'apprentissage" },
      { id: 'e', texte: "Aucune durée maximale, seul le renouvellement est encadré" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 41',
    explication: "L'article 41 fixe la durée maximale à deux ans, réduite à un an pour le travailleur marié et séparé de sa famille, ou veuf, séparé de corps ou divorcé et séparé des enfants dont il a la garde. Le plafond de quatre ans (option d) est propre au contrat d'apprentissage, non au contrat de travail à durée déterminée.",
  },
  {
    id: 'q5', question: "Combien de contrats à durée déterminée un travailleur peut-il conclure avec le même employeur, hors cas particuliers d'arrêté ministériel ?",
    options: [
      { id: 'a', texte: "Un seul, non renouvelable" },
      { id: 'b', texte: "Deux au maximum, avec au plus un renouvellement" },
      { id: 'c', texte: "Trois, sans limite de renouvellement" },
      { id: 'd', texte: "Un nombre illimité, tant que chacun respecte la durée maximale de deux ans" },
      { id: 'e', texte: "Deux, mais renouvelables indéfiniment si l'emploi reste temporaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 41, al. 2',
    explication: "L'article 41 plafonne à deux le nombre de contrats à durée déterminée conclus avec le même employeur, et à une seule fois le renouvellement d'un même contrat, sauf exceptions déterminées par arrêté (travaux saisonniers, ouvrages bien définis).",
  },
  {
    id: 'q6', question: "Un employeur engage un travailleur pour occuper un emploi permanent dans l'entreprise, sous contrat à durée déterminée. Quelle est la conséquence ?",
    options: [
      { id: 'a', texte: "Le contrat reste valable tel quel, la durée déterminée primant la nature de l'emploi" },
      { id: 'b', texte: "Le contrat est réputé conclu pour une durée indéterminée" },
      { id: 'c', texte: "Le contrat est nul, sans effet rétroactif possible" },
      { id: 'd', texte: "Le travailleur peut demander la résiliation immédiate sans préavis, mais le contrat reste à durée déterminée" },
      { id: 'e', texte: "Seul l'Inspecteur du Travail peut requalifier le contrat, sur demande expresse du travailleur" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 42',
    explication: "L'article 42 impose que l'emploi permanent soit couvert par un contrat à durée indéterminée : tout contrat à durée déterminée conclu en violation de cette règle est réputé conclu pour une durée indéterminée, de plein droit, sans qu'une demande du travailleur ou une décision de l'Inspecteur du Travail soit nécessaire.",
  },
  {
    id: 'q7', question: "Quelle est la durée maximale de la clause d'essai pour un travailleur manœuvre sans spécialité ?",
    options: [
      { id: 'a', texte: '15 jours' },
      { id: 'b', texte: 'Un mois' },
      { id: 'c', texte: 'Trois mois' },
      { id: 'd', texte: 'Six mois' },
      { id: 'e', texte: "Aucune durée maximale n'est fixée pour cette catégorie" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 43',
    explication: "L'article 43 plafonne la clause d'essai à un mois pour le manœuvre sans spécialité, et à six mois pour les autres travailleurs. Une clause prévoyant une durée plus longue est réduite de plein droit à ce plafond, sans qu'il soit besoin d'une action en justice.",
  },
  {
    id: 'q8', question: "Un contrat d'essai de sept mois est signé pour un cadre. Quelle est sa portée juridique réelle ?",
    options: [
      { id: 'a', texte: "Il est intégralement nul, faute de respecter le plafond légal" },
      { id: 'b', texte: "Il produit ses effets pour sept mois, la liberté contractuelle primant" },
      { id: 'c', texte: "Il est réduit de plein droit à six mois" },
      { id: 'd', texte: "Il est réduit à un mois, plafond applicable au manœuvre" },
      { id: 'e', texte: "Il devient un contrat à durée déterminée de sept mois" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 43, al. 3',
    explication: "L'article 43 ne prononce pas la nullité totale d'une clause d'essai trop longue : il la réduit de plein droit au plafond applicable, ici six mois pour un cadre qui n'est pas manœuvre sans spécialité, sans transformer la nature du contrat.",
  },
  {
    id: 'q9', question: "À défaut d'écrit, comment le contrat de travail est-il présumé avoir été conclu ?",
    options: [
      { id: 'a', texte: "Pour une durée déterminée d'un an" },
      { id: 'b', texte: "Pour une durée indéterminée, jusqu'à preuve du contraire" },
      { id: 'c', texte: "Le contrat est présumé inexistant" },
      { id: 'd', texte: "Pour la durée usuelle de la profession concernée" },
      { id: 'e', texte: "Cette présomption ne s'applique pas en droit congolais" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 44, al. 2',
    explication: "L'article 44 pose une présomption simple, réfragable, en faveur du contrat à durée indéterminée en l'absence d'écrit, protégeant ainsi le travailleur contre l'imprécision ou l'absence de formalisation, plutôt que de présumer l'inexistence du contrat.",
  },
  {
    id: 'q10', question: "Combien de jours ouvrables avant la signature l'employeur doit-il remettre au travailleur un exemplaire du projet de contrat ?",
    options: [
      { id: 'a', texte: "Aucun délai n'est fixé, la remise le jour même suffit" },
      { id: 'b', texte: "Un jour ouvrable au moins" },
      { id: 'c', texte: "Deux jours ouvrables au moins" },
      { id: 'd', texte: "Cinq jours ouvrables au moins" },
      { id: 'e', texte: "Deux jours ouvrables, mais uniquement pour les contrats à durée indéterminée" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 46',
    explication: "L'article 46 impose un délai de deux jours ouvrables au moins avant la signature, sans distinction selon la nature du contrat, et cette obligation s'accompagne de la mise à disposition des documents essentiels auxquels le projet se réfère.",
  },
  {
    id: 'q11', question: "Quelle sanction frappe l'employeur qui ne remet pas le projet de contrat dans le délai de l'article 46 ?",
    options: [
      { id: 'a', texte: "Aucune, il s'agit d'une simple recommandation de bonne pratique" },
      { id: 'b', texte: "Une amende administrative fixe" },
      { id: 'c', texte: "Le travailleur peut résilier le contrat dans les trente jours suivant sa conclusion, sans préavis ni indemnité" },
      { id: 'd', texte: "Le contrat est nul de plein droit dès l'origine" },
      { id: 'e', texte: "Le travailleur doit d'abord saisir l'Inspecteur du Travail avant de pouvoir résilier" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 46',
    explication: "L'article 46 sanctionne directement ce manquement par une faculté de résiliation ouverte au travailleur, dans les trente jours suivant la conclusion, sans préavis ni indemnité, sans préalable de saisine administrative ni nullité automatique du contrat lui-même.",
  },
  {
    id: 'q12', question: "Que se passe-t-il si l'Office National de l'Emploi refuse de viser un contrat de travail écrit ?",
    options: [
      { id: 'a', texte: "Le contrat reste valable, le visa n'étant qu'une formalité administrative sans effet" },
      { id: 'b', texte: "Le contrat de travail prend fin de plein droit" },
      { id: 'c', texte: "Le contrat devient un contrat d'apprentissage par défaut" },
      { id: 'd', texte: "Seul le travailleur peut décider de poursuivre ou non la relation" },
      { id: 'e', texte: "Le refus doit être confirmé par le Tribunal du travail pour produire effet" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 47, al. 3',
    explication: "L'article 47 est net : le contrat que l'Office National de l'Emploi a refusé de viser prend fin de plein droit, sans qu'il soit besoin d'une confirmation judiciaire ni d'un choix du travailleur de poursuivre la relation.",
  },
  {
    id: 'q13', question: "En l'absence d'écrit, le travailleur peut-il prouver l'existence du contrat de travail ?",
    options: [
      { id: 'a', texte: "Non, l'écrit est une condition de validité, non de simple preuve" },
      { id: 'b', texte: "Oui, par toutes voies de droit, même si la forme écrite était requise" },
      { id: 'c', texte: "Oui, mais uniquement par témoignage de deux personnes lettrées" },
      { id: 'd', texte: "Non, sauf s'il dispose d'un bulletin de paie" },
      { id: 'e', texte: "Oui, mais seulement devant l'Inspecteur du Travail, non devant le Tribunal du travail" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 49',
    explication: "L'article 49 autorise la preuve par toutes voies de droit, y compris lorsque la forme écrite était en principe requise, sans se limiter à un mode de preuve particulier ni à une juridiction déterminée.",
  },
  {
    id: 'q14', question: "Le travailleur doit-il, selon l'article 51, respecter les convenances et bonnes mœurs uniquement envers l'employeur ?",
    options: [
      { id: 'a', texte: "Oui, l'obligation ne vise que la relation avec l'employeur" },
      { id: 'b', texte: "Non, l'obligation vise aussi les collègues et s'étend à un traitement équitable des travailleurs placés sous ses ordres" },
      { id: 'c', texte: "Non, cette obligation ne concerne que les cadres dirigeants" },
      { id: 'd', texte: "Oui, sauf disposition contraire du règlement intérieur" },
      { id: 'e', texte: "Cette obligation ne s'applique que pendant les heures de travail effectif" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 51',
    explication: "L'article 51 ne limite pas cette obligation à la seule relation avec l'employeur : il impose au travailleur de traiter avec équité les travailleurs placés sous ses ordres, une exigence qui s'étend donc aux rapports entre collègues, sans restriction aux seuls cadres ni aux seules heures de travail effectif.",
  },
  {
    id: 'q15', question: "Une clause de non-concurrence insérée dans un contrat de travail est en principe :",
    options: [
      { id: 'a', texte: "Valable sans condition, dès lors qu'elle est écrite" },
      { id: 'b', texte: "Nulle de plein droit, sauf dans des conditions strictement définies" },
      { id: 'c', texte: "Valable uniquement pour les cadres dirigeants" },
      { id: 'd', texte: "Interdite dans tous les cas, sans exception possible" },
      { id: 'e', texte: "Valable si elle est limitée à six mois, quelle que soit la cause de la rupture" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 53',
    explication: "L'article 53 pose le principe de la nullité de plein droit de la clause interdisant au travailleur d'exploiter une entreprise personnelle ou de s'engager chez un autre employeur, avant d'organiser une exception strictement conditionnée, non une validité de principe ni une réserve aux seuls cadres dirigeants.",
  },
  {
    id: 'q16', question: "Un travailleur démissionne sans qu'aucune faute lourde ne soit imputable à l'employeur. La clause de non-concurrence de son contrat peut-elle produire ses effets ?",
    options: [
      { id: 'a', texte: "Non, la clause ne s'applique qu'en cas de licenciement du travailleur" },
      { id: 'b', texte: "Oui, ce cas de figure est précisément l'un des deux visés par l'exception de l'article 53" },
      { id: 'c', texte: "Non, une démission volontaire prive systématiquement la clause d'effet" },
      { id: 'd', texte: "Oui, mais uniquement si le contrat était à durée déterminée" },
      { id: 'e', texte: "Cela dépend exclusivement du montant de la clause pénale prévue" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 53, al. 2',
    explication: "L'article 53 vise deux hypothèses alternatives : la résiliation à la suite d'une faute lourde du travailleur, ou le fait que le travailleur ait lui-même mis fin au contrat sans qu'il y ait faute lourde de l'employeur. Une démission ordinaire, non provoquée par une faute lourde de l'employeur, correspond exactement à la seconde hypothèse, sous réserve des trois autres conditions cumulatives (connaissance sensible de la clientèle ou des secrets, activités identiques, durée maximale d'un an).",
  },
  {
    id: 'q17', question: "Un employeur licencie un travailleur pour nécessité de fonctionnement de l'entreprise, sans aucune faute reprochée à celui-ci. La clause de non-concurrence peut-elle lui être opposée ?",
    options: [
      { id: 'a', texte: "Oui, tout licenciement suffit à déclencher l'exception de l'article 53" },
      { id: 'b', texte: "Non : ce licenciement ne correspond à aucune des deux hypothèses prévues par l'exception, qui reste donc inapplicable" },
      { id: 'c', texte: "Oui, mais seulement si le travailleur a plus de cinq ans d'ancienneté" },
      { id: 'd', texte: "Cela dépend du préavis effectivement respecté par l'employeur" },
      { id: 'e', texte: "Oui, car les nécessités de fonctionnement équivalent à une faute lourde du travailleur" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 53, al. 2',
    explication: "Ni la résiliation pour faute lourde du travailleur, ni la rupture par le travailleur lui-même sans faute lourde de l'employeur ne sont ici réunies : le licenciement pour nécessité de fonctionnement est une rupture à l'initiative de l'employeur, étrangère à toute faute du travailleur. La clause de non-concurrence, dans ce cas, demeure frappée de la nullité de principe posée par le premier alinéa de l'article 53, et ne bascule pas dans l'exception.",
  },
  {
    id: 'q18', question: "Parmi les sanctions disciplinaires énumérées à l'article 54, laquelle est erronée ?",
    options: [
      { id: 'a', texte: 'Le blâme' },
      { id: 'b', texte: 'La réprimande' },
      { id: 'c', texte: 'La mise à pied, dans les limites fixées par le Code' },
      { id: 'd', texte: 'La retenue automatique de 10 % du salaire mensuel' },
      { id: 'e', texte: 'Le licenciement avec ou sans préavis, selon les cas' },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 54',
    explication: "L'article 54 énumère limitativement le blâme, la réprimande, la mise à pied dans les limites de l'article 57 point 5, le licenciement avec préavis et le licenciement sans préavis dans les cas des articles 72 et 74. Une retenue automatique et chiffrée du salaire à titre de sanction n'y figure pas.",
  },
  {
    id: 'q19', question: "Qui supporte la charge du transport des travailleurs entre leur résidence et leur lieu de travail ?",
    options: [
      { id: 'a', texte: "Le travailleur, sauf clause contraire" },
      { id: 'b', texte: "L'employeur, à partir d'une distance fixée par arrêté ministériel" },
      { id: 'c', texte: "L'INPP, dans le cadre de sa mission de formation" },
      { id: 'd', texte: "L'État, via une subvention de transport" },
      { id: 'e', texte: "Le travailleur et l'employeur, à parts égales, dans tous les cas" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 56',
    explication: "L'article 56 met cette charge à la charge de l'employeur, mais seulement à partir d'une distance déterminée par arrêté ministériel : ce n'est ni une obligation systématique quelle que soit la distance, ni une charge partagée par principe, ni une mission de l'INPP ou de l'État.",
  },
  {
    id: 'q20', question: "La grossesse et l'accouchement d'une travailleuse figurent-ils parmi les causes de suspension du contrat de travail énumérées à l'article 57 ?",
    options: [
      { id: 'a', texte: "Non, ils relèvent exclusivement du régime spécifique de protection de la maternité" },
      { id: 'b', texte: "Oui, au même titre que l'incapacité résultant d'une maladie ou d'un accident" },
      { id: 'c', texte: "Oui, mais seulement pour les contrats à durée indéterminée" },
      { id: 'd', texte: "Non, la grossesse est une cause de résiliation, non de suspension" },
      { id: 'e', texte: "Oui, mais uniquement à partir du sixième mois de grossesse" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 57, point 1',
    explication: "L'article 57, point 1, range explicitement l'incapacité de travail résultant de la grossesse, de l'accouchement et de ses suites parmi les causes de suspension, aux côtés de la maladie et de l'accident, sans distinction selon le type de contrat ni seuil de mois de grossesse, et sans en faire une cause de résiliation.",
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "Les trois contrats à durée déterminée de Mme Bakena",
    contexte: "Une entreprise de distribution de Kinshasa engage Mme Bakena comme caissière, poste qui existe en permanence dans l'organigramme de l'entreprise depuis sa création. Elle signe un premier contrat à durée déterminée d'un an, renouvelé une fois pour un an supplémentaire, puis, à l'expiration de ce renouvellement, l'entreprise lui fait signer un troisième contrat à durée déterminée de six mois, présenté comme un « nouveau contrat » distinct des deux précédents. Aucun arrêté ministériel particulier ne vise le secteur de la distribution ni le poste de caissière.",
    questions: [
      { num: 1, enonce: "Le premier renouvellement, portant la relation à deux contrats à durée déterminée consécutifs, est-il conforme à l'article 41 ?", correction: "Oui, sur ce seul point : l'article 41 autorise jusqu'à deux contrats à durée déterminée avec le même employeur, et un seul renouvellement d'un même contrat. Le premier renouvellement, à lui seul, respecte donc la limite légale, sous réserve des autres conditions examinées ci-après." },
      { num: 2, enonce: "Le troisième contrat, présenté comme un contrat distinct, est-il conforme à l'article 41 ?", correction: "Non. L'article 41 plafonne à deux le nombre de contrats à durée déterminée conclus avec le même employeur, hors exceptions par arrêté ministériel inexistantes ici. La présentation du troisième contrat comme « nouveau » et distinct des deux précédents ne change rien à la réalité : il s'agit d'un troisième contrat à durée déterminée avec le même employeur, ce que le texte interdit." },
      { num: 3, enonce: "Indépendamment du nombre de contrats, le fait que le poste de caissière soit permanent dans l'organigramme change-t-il l'analyse ?", correction: "Oui, et c'est même le vice le plus profond de la situation. L'article 42 impose qu'un emploi permanent soit couvert par un contrat à durée indéterminée dès l'origine : tout contrat à durée déterminée conclu pour un tel emploi est réputé conclu pour une durée indéterminée. Le premier contrat de Mme Bakena, portant sur un poste permanent, aurait donc dû être un contrat à durée indéterminée depuis le départ, ce qui rend la question du nombre de renouvellements presque secondaire." },
      { num: 4, enonce: "Quelle est, en définitive, la qualification à retenir pour la relation de travail de Mme Bakena depuis l'origine ?", correction: "Un contrat à durée indéterminée, et ce depuis la conclusion du tout premier contrat. Deux fondements convergent vers cette solution : la violation de l'article 42, applicable dès le premier contrat en raison du caractère permanent du poste, et la violation de l'article 41, caractérisée par le troisième contrat. L'entreprise ne peut se prévaloir de la durée déterminée apparente pour mettre fin à la relation sans respecter le régime de la rupture d'un contrat à durée indéterminée, étudié au chapitre 4." },
    ],
  },
  {
    id: 'cp2',
    titre: "Le projet de contrat remis le jour de la signature",
    contexte: "Un cabinet d'expertise comptable de Lubumbashi recrute M. Ilunga comme assistant. Le jour convenu pour la signature, le directeur administratif lui présente directement le contrat à signer, sans lui avoir remis de projet au préalable. M. Ilunga signe, pressé de commencer, sans lire attentivement certaines clauses relatives aux horaires. Le cabinet ne soumet par ailleurs jamais ce contrat écrit au visa de l'Office National de l'Emploi, jugeant la démarche superflue pour un poste de courte durée. Vingt jours après la signature, M. Ilunga découvre les clauses d'horaires qu'il juge trop contraignantes et souhaite partir.",
    questions: [
      { num: 1, enonce: "Le cabinet a-t-il respecté l'obligation de l'article 46 relative à la remise du projet de contrat ?", correction: "Non. L'article 46 impose la remise d'un exemplaire du projet de contrat deux jours ouvrables au moins avant la signature, ainsi que la mise à disposition des documents essentiels auxquels il se réfère. La remise du contrat le jour même de la signature, sans projet préalable, méconnaît directement cette obligation." },
      { num: 2, enonce: "Vingt jours après la signature, M. Ilunga peut-il encore se prévaloir de ce manquement pour résilier le contrat sans préavis ni indemnité ?", correction: "Oui. L'article 46 ouvre au travailleur une faculté de résiliation dans les trente jours suivant la conclusion du contrat, sans préavis ni indemnité, en cas de manquement à cette obligation de remise préalable. Le délai de vingt jours écoulé reste dans cette fenêtre de trente jours, M. Ilunga peut donc encore s'en prévaloir." },
      { num: 3, enonce: "L'absence de visa du contrat par l'Office National de l'Emploi offre-t-elle à M. Ilunga une voie de sortie supplémentaire, distincte de celle de l'article 46 ?", correction: "Oui, et cette voie est même plus favorable sur un point : l'article 47 permet au travailleur de résilier le contrat à tout moment, sans préavis, en cas de défaut de visa par l'employeur, sans être enfermé dans le délai de trente jours de l'article 46, et il peut en outre réclamer des dommages-intérêts s'il y a lieu, ce que l'article 46 ne prévoit pas expressément." },
      { num: 4, enonce: "Le cabinet peut-il utilement objecter que la brièveté du poste rendait le visa superflu ?", correction: "Non. L'article 47 impose la soumission au visa de tout contrat écrit, sans distinction selon la durée du poste ou son importance perçue par l'employeur. L'appréciation de l'opportunité de la démarche n'appartient pas à l'employeur : l'obligation est générale, et sa méconnaissance ouvre au travailleur les droits déjà identifiés, indépendamment de la brièveté invoquée." },
    ],
  },
  {
    id: 'cp3',
    titre: "La clause de non-concurrence à l'épreuve de deux départs",
    contexte: "Une société pharmaceutique de Kinshasa emploie deux visiteurs médicaux, M. Otshudi et Mme Kanyinda, dont les contrats comportent une clause de non-concurrence identique : interdiction de travailler pour un concurrent pendant un an après la fin du contrat, dans le même secteur d'activité, assortie d'une pénalité de 5 000 000 FC en cas de violation. M. Otshudi est licencié pour faute lourde, après avoir détourné des échantillons destinés aux médecins prescripteurs. Mme Kanyinda, de son côté, démissionne six mois plus tard pour un désaccord sur ses objectifs commerciaux, sans qu'aucun manquement ne soit imputable à l'employeur. Les deux souhaitent rejoindre rapidement un laboratoire concurrent.",
    questions: [
      { num: 1, enonce: "La clause de non-concurrence peut-elle être opposée à M. Otshudi, licencié pour faute lourde ?", correction: "Oui, sous réserve des trois conditions cumulatives de l'article 53 : que M. Otshudi ait, de la clientèle ou des secrets de l'employeur, une connaissance telle qu'il puisse lui nuire gravement, que l'interdiction se rapporte aux activités qu'il exerçait, et que sa durée n'excède pas un an. La résiliation pour faute lourde du travailleur est précisément l'une des deux hypothèses d'exception prévues par le texte." },
      { num: 2, enonce: "La clause peut-elle être opposée à Mme Kanyinda, qui a démissionné pour un simple désaccord sur ses objectifs ?", correction: "Oui, également, et pour la même raison de texte : le fait que le travailleur ait lui-même mis fin au contrat, sans qu'il y ait faute lourde de l'employeur, constitue la seconde hypothèse d'exception de l'article 53. Un désaccord sur les objectifs commerciaux, à défaut d'être imputable à une faute lourde de l'employeur, laisse la clause produire ses effets, dans les mêmes conditions cumulatives que pour M. Otshudi." },
      { num: 3, enonce: "La pénalité de 5 000 000 FC prévue par la clause s'impose-t-elle telle quelle au juge en cas de violation par l'un des deux anciens salariés ?", correction: "Non. L'article 53, dernier alinéa, autorise certes une peine conventionnelle à la charge du travailleur qui viole l'interdiction, mais réserve au tribunal compétent, à la demande du travailleur, le pouvoir de ramener à un montant équitable une amende conventionnelle jugée excessive. Le montant contractuel n'est donc qu'un plafond de référence, non une somme automatiquement due sans contrôle judiciaire." },
      { num: 4, enonce: "Si la société avait plutôt licencié M. Otshudi pour une réorganisation économique, sans lui reprocher aucune faute, la clause aurait-elle pu lui être opposée dans les mêmes conditions ?", correction: "Non, et ce point mérite d'être clairement distingué du cas réellement soumis. Un licenciement pour réorganisation économique, sans faute du travailleur, ne correspond à aucune des deux hypothèses de l'article 53 : ni résiliation pour faute lourde du travailleur, ni rupture par le travailleur lui-même. La clause resterait alors frappée par la nullité de principe posée au premier alinéa, hypothèse à ne pas confondre avec celle, effectivement examinée ici, du licenciement pour faute lourde." },
    ],
  },
  {
    id: 'cp4',
    titre: "L'essai prolongé du manœuvre sans certificat médical",
    contexte: "Un chantier de construction de Matadi engage M. Mbuyi comme manœuvre, sans lui faire passer de visite médicale préalable ni lui délivrer de certificat provisoire d'aptitude. Le contrat comporte une clause d'essai de trois mois, présentée par l'employeur comme nécessaire « pour bien juger le sérieux d'un manœuvre ». Au bout de sept semaines, M. Mbuyi se blesse légèrement sur le chantier ; c'est à cette occasion seulement qu'un examen médical révèle une inaptitude préexistante à certains travaux de manutention lourde, non détectée faute d'examen initial.",
    questions: [
      { num: 1, enonce: "L'absence de certificat médical, initial ou provisoire, avant l'engagement de M. Mbuyi était-elle conforme à l'article 38 ?", correction: "Non. L'article 38 subordonne l'exécution du contrat à la constatation de l'aptitude par certificat médical, éventuellement provisoire en l'absence de médecin, mais délivré par un infirmier sous réserve d'un examen médical complet dans les trois mois. Aucun certificat, même provisoire, n'a ici été délivré avant l'engagement, ce qui méconnaît cette exigence préalable." },
      { num: 2, enonce: "La clause d'essai de trois mois, justifiée par le souci de « bien juger le sérieux d'un manœuvre », est-elle conforme à l'article 43 ?", correction: "Non. L'article 43 plafonne impérativement la clause d'essai à un mois pour le travailleur manœuvre sans spécialité, quelle que soit la justification avancée par l'employeur sur l'utilité d'une période plus longue. Une clause de trois mois est réduite de plein droit à un mois, la volonté de l'employeur ne pouvant déroger à ce plafond légal." },
      { num: 3, enonce: "Sept semaines s'étant écoulées au moment de l'accident, quelle est la situation contractuelle réelle de M. Mbuyi à cette date ?", correction: "La clause d'essai, réduite de plein droit à un mois, était déjà arrivée à échéance depuis plusieurs semaines lorsque l'accident survient. L'article 43 précise que la prolongation des services au-delà de la durée maximale entraîne automatiquement la confirmation du contrat de travail : M. Mbuyi n'est donc plus, depuis plusieurs semaines, un travailleur à l'essai, mais un travailleur confirmé, ce qui change le régime applicable à toute rupture éventuelle du contrat." },
      { num: 4, enonce: "L'inaptitude préexistante, découverte tardivement faute d'examen initial, peut-elle être reprochée à M. Mbuyi pour justifier une rupture sans indemnité ?", correction: "Non, la responsabilité de cette situation pèse d'abord sur l'employeur. C'est à l'employeur qu'il incombait, en application de l'article 38, de faire constater l'aptitude avant l'engagement ; une personne médicalement inapte au travail auquel elle est destinée ne peut être ni engagée ni maintenue en service, ce qui suppose que cette vérification ait été faite en amont. L'employeur ne peut se prévaloir de sa propre carence pour reprocher a posteriori au travailleur une inaptitude qu'il n'a jamais cherché à vérifier au moment requis." },
    ],
  },
  {
    id: 'cp5',
    titre: "La résiliation précipitée d'un contrat suspendu pour maladie",
    contexte: "Une société minière du Katanga emploie M. Kasongo depuis six ans. Victime d'une maladie sans lien avec son activité professionnelle, il est en incapacité de travail continue depuis quatre mois. Impatiente de pourvoir son poste, la direction lui notifie la résiliation de son contrat, sans versement d'indemnité, en invoquant la durée déjà « longue » de son absence. M. Kasongo conteste cette résiliation, estimant qu'elle est intervenue trop tôt et sans indemnisation appropriée.",
    questions: [
      { num: 1, enonce: "L'employeur pouvait-il, à quatre mois d'incapacité continue, notifier une résiliation fondée sur l'article 60 point a ?", correction: "Non. L'article 60, point a, ne permet à l'employeur de notifier la résiliation qu'après six mois ininterrompus d'incapacité d'exécuter le contrat, hors accident du travail ou maladie professionnelle. Quatre mois d'incapacité continue ne suffisent pas à ouvrir cette faculté, quelle que soit l'appréciation subjective de l'employeur sur la durée déjà écoulée." },
      { num: 2, enonce: "Le contrat de M. Kasongo pouvait-il, en tout état de cause, être rompu librement pendant cette période de suspension ?", correction: "Non, par principe. L'article 60 pose une règle générale d'interdiction : il ne peut être mis fin à un contrat pendant qu'il est suspendu, sous les seules réserves énumérées limitativement par le même article, dont celle du point a pour la maladie, qui suppose précisément l'écoulement du délai de six mois. En dehors de ces réserves strictes, la suspension protège le contrat contre toute rupture." },
      { num: 3, enonce: "Si les six mois avaient été effectivement écoulés, l'employeur aurait-il pu résilier sans verser aucune indemnité, comme il l'a fait ici ?", correction: "Non. Même dans l'hypothèse où le délai de six mois serait atteint, l'article 60, point a, impose à l'employeur, en cas de résiliation pour ce motif, le paiement d'une indemnité de résiliation correspondant au préavis dû en cas de contrat à durée indéterminée. L'absence de tout versement, invoquée dans les faits, constituerait donc une irrégularité indépendante et supplémentaire, même si le seuil des six mois avait été respecté." },
      { num: 4, enonce: "Quelle double irrégularité la résiliation notifiée à M. Kasongo cumule-t-elle ainsi ?", correction: "D'une part, une irrégularité tenant au moment de la résiliation, notifiée avant l'expiration des six mois d'incapacité continue exigés par l'article 60, point a. D'autre part, une irrégularité tenant à ses modalités, l'absence de versement de l'indemnité de résiliation pourtant due par ce même texte. Ces deux vices, cumulatifs et non alternatifs, fragilisent d'autant la position de l'employeur si M. Kasongo portait le litige devant le Tribunal du travail." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue1',
  numero: 3,
  id: 'ue1-chapitre-3',
  titre: 'Le contrat de travail : formation, exécution, suspension',
  sousTitre: 'Titre IV du Code du travail (chapitres I à V) · Loi n°015/2002, art. 36 à 60',
  infoBulle: 'Formation, durée, forme, obligations réciproques et suspension du contrat de travail.',
  loiRef: 'Titre IV (1/2), art. 36 à 60',
  moduleLabel: 'UE 1 · Droit du travail',
  retourRoute: '/ue1-droit-travail',
  coursId: 'ue1-droit-travail',
  objectifs: [
    'Distinguer le contrat à durée déterminée du contrat à durée indéterminée et connaître leurs limites',
    'Maîtriser le régime de la clause d\'essai et ses plafonds',
    'Connaître les exigences de forme et de preuve du contrat de travail',
    'Identifier les obligations réciproques du travailleur et de l\'employeur, dont la clause de non-concurrence',
    'Maîtriser les causes et les effets de la suspension du contrat de travail',
  ],
  sections: SECTIONS,
  aRetenir: [
    'Le contrat à durée déterminée est strictement encadré : deux ans au plus (un an dans certains cas), deux contrats au maximum avec le même employeur, un seul renouvellement ; toute violation ou tout emploi permanent entraîne la requalification automatique en contrat à durée indéterminée.',
    'La clause d\'essai est plafonnée à un mois pour le manœuvre sans spécialité et à six mois pour les autres travailleurs ; au-delà, elle est réduite de plein droit, jamais nulle en totalité.',
    'À défaut d\'écrit, le contrat est présumé à durée indéterminée ; à défaut de visa de l\'Office National de l\'Emploi, le travailleur peut résilier à tout moment sans préavis.',
    'La clause de non-concurrence est nulle de plein droit, sauf rupture pour faute lourde du travailleur ou rupture par le travailleur sans faute lourde de l\'employeur, et sous trois autres conditions cumulatives, notamment une durée maximale d\'un an.',
    'Il ne peut, en principe, être mis fin à un contrat pendant sa suspension, sauf les quatre exceptions strictement délimitées de l\'article 60, aux conditions et effets différenciés.',
  ],
  references: [
    {
        genre: "article",
        auteur: "Pimant C.",
        titre: "Du contrat à durée déterminée et sa requalification en contrat à durée indéterminée en droit du travail congolais",
        support: "Village Justice",
        precision: "note professionnelle en ligne"
    },
    {
        genre: "article",
        auteur: "Muanda D. J.",
        titre: "La clause de non-concurrence dans l'espace OHADA : cas de la RDC",
        support: "Legavox",
        precision: "note professionnelle en ligne"
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
  sources: 'Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail, art. 36 à 60 · Loi n°16/010 du 15 juillet 2016',
}

export default chapitre
