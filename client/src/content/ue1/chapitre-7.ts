// Chapitre 7 du module UE1, Droit du travail : contenu pur.
// La mise en forme appartient au moteur components/chapitre/ChapitreManuscrit.tsx.
import type { Chapitre } from '@/lib/chapitre-types'

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '7.1',
    titre: 'Les objectifs de la santé au travail et le service de santé',
    navLabel: '7.1 Objectifs et service de santé',
    blocs: [
      { type: 'paragraphe', texte: 'Le Titre VII ouvre son premier chapitre par une énumération programmatique : l\'article 159 fixe six objectifs aux conditions de santé et de sécurité au travail, qui commandent la lecture de tout ce qui suit. Il s\'agit de prévenir les accidents du travail, de lutter contre les maladies professionnelles, de créer des conditions de travail salubres, de remédier à la fatigue professionnelle excessive, d\'adapter le travail à l\'homme, et enfin de gérer et de lutter contre les grandes endémies de santé communautaire en milieu de travail — ce dernier objectif, plus large que les cinq premiers, rattachant la santé au travail aux enjeux de santé publique qui dépassent le seul cadre de l\'entreprise.' },
      { type: 'paragraphe', texte: 'Le chapitre II organise la santé au travail proprement dite. L\'article 160 impose à toute entreprise ou établissement, de quelque nature qu\'il soit, l\'obligation de s\'assurer le concours des services de santé au travail. L\'article 161 précise que ces services sont assurés par un médecin du travail et qu\'ils ont un rôle essentiellement préventif : ils assurent la surveillance médicale des travailleurs et la surveillance sanitaire des lieux de travail, ainsi que les secours immédiats et les soins d\'urgence aux victimes d\'accident ou d\'indisposition. Un arrêté du Ministre ayant le Travail et la Prévoyance Sociale dans ses attributions, pris après avis du Conseil National du Travail, en fixe les modalités d\'exécution (article 162).' },
      { type: 'filet', titre: 'Un rôle préventif, non curatif', texte: 'Le service de santé au travail de l\'article 161 se distingue du service médical d\'entreprise du Titre VIII, étudié plus loin dans ce chapitre : le premier surveille et prévient, le second soigne. Les deux obligations pèsent sur l\'employeur mais répondent à des logiques différentes, l\'une préventive et collective, l\'autre curative et individuelle.' },
    ],
  },
  {
    numero: '7.2',
    titre: 'Le service de sécurité et le comité de sécurité, d\'hygiène et d\'embellissement',
    navLabel: '7.2 Sécurité et comité d\'hygiène',
    blocs: [
      { type: 'paragraphe', texte: 'Le chapitre III organise, en miroir du précédent, la sécurité au travail. L\'article 163 impose à tout établissement l\'obligation d\'organiser un service spécial de sécurité, d\'hygiène et d\'embellissement des lieux de travail. Ce service, selon l\'article 164, assure la surveillance technique des travailleurs et la surveillance sanitaire des lieux de travail, ainsi que l\'animation et la formation générale des travailleurs. Il est placé sous la responsabilité d\'un cadre dénommé chef de service de sécurité, d\'hygiène et d\'embellissement des lieux de travail (article 165), et ses modalités d\'exécution sont, comme pour le service de santé, renvoyées à un arrêté ministériel pris après avis du Conseil National du Travail (article 166).' },
      { type: 'paragraphe', texte: 'Le chapitre IV superpose à ce service un organe collégial distinct : le comité de sécurité, d\'hygiène et d\'embellissement des lieux de travail, que toute entreprise ou tout établissement de quelque nature que ce soit occupant des travailleurs a l\'obligation de constituer (article 167). Sa mission, définie à l\'article 168, est double : concevoir, corriger et exécuter la politique de prévention des accidents du travail et des maladies professionnelles, d\'une part ; stimuler et contrôler le bon fonctionnement des services de sécurité et de santé au travail, d\'autre part. Ce comité exerce ainsi une fonction de pilotage et de contrôle sur les deux services organisés aux chapitres II et III, sans s\'y substituer.' },
      { type: 'carte', titre: 'Trois obligations distinctes, un même employeur', tableau: { entetes: ['Obligation', 'Article', 'Nature'], lignes: [['Service de santé au travail', 'Art. 160-162', '**Médical, préventif** — médecin du travail'], ['Service de sécurité, d\'hygiène et d\'embellissement', 'Art. 163-166', '**Technique, préventif** — chef de service dédié'], ['Comité de sécurité, d\'hygiène et d\'embellissement', 'Art. 167-169', '**Collégial, de pilotage** — conçoit et contrôle les deux services précédents']] } },
      { type: 'paragraphe', texte: 'La composition, la compétence et les règles de fonctionnement de ce comité sont fixées par arrêté du Ministre ayant le Travail et la Prévoyance Sociale dans ses attributions, pris après avis du Conseil National du Travail (article 169) — un renvoi réglementaire qui revient de façon constante dans tout le Titre VII, le Code posant le principe et les grandes missions, l\'arrêté en détaillant l\'exécution concrète.' },
    ],
  },
  {
    numero: '7.3',
    titre: 'La lutte contre les nuisances et le pouvoir de mise en demeure de l\'Inspecteur du Travail',
    navLabel: '7.3 Nuisances et mise en demeure',
    blocs: [
      { type: 'paragraphe', texte: 'Le chapitre V impose d\'abord une obligation générale de propreté : toute entreprise ou établissement doit être tenu dans un constant état de propreté et présenter les conditions d\'hygiène et de sécurité nécessaires à la santé du personnel (article 170). Les conditions précises d\'hygiène et de sécurité sur les lieux de travail sont réglées par arrêtés du Ministre ayant le Travail et la Prévoyance Sociale dans ses attributions, ces arrêtés précisant eux-mêmes dans quels cas et selon quelles conditions l\'Inspecteur du Travail du ressort doit recourir à la procédure de mise en demeure et les modalités de recours contre celle-ci (article 171).' },
      { type: 'filet', titre: 'La mise en demeure, article 172', texte: 'Elle doit être faite par l\'Inspecteur du Travail du ressort, soit par écrit rédigé sur place et remis à l\'employeur, soit par lettre recommandée avec avis de réception. Datée et signée, elle précise les infractions ou dangers constatés et fixe un délai de mise en conformité, qui ne peut être inférieur à quatre jours francs sauf en cas d\'extrême urgence.' },
      { type: 'paragraphe', texte: 'L\'article 173 interdit la vente, la location, l\'exposition ou la cession à tout autre titre de machines dont les éléments dangereux sont dépourvus de dispositifs de protection appropriés, un arrêté ministériel devant en fixer les modalités d\'application. L\'article 174 organise ensuite le contrôle technique : visites, réceptions, épreuves, ré-épreuves et vérifications des installations électriques doivent être exécutées par des personnes ou organismes agréés par le Ministre du Travail. Toute infraction aux arrêtés visés à l\'article 171 peut être constatée immédiatement par procès-verbal ; et lorsque les faits relevés constituent un danger grave et imminent pour la sécurité ou la santé des travailleurs, l\'Inspecteur du Travail du ressort peut, à titre exceptionnel, ordonner ou faire ordonner l\'arrêt de la machine ou du travail incriminé — un pouvoir de police immédiat, sans attendre l\'écoulement du délai de mise en demeure.' },
      { type: 'paragraphe', texte: 'L\'article 175 couvre l\'hypothèse résiduelle des conditions de travail dangereuses non visées par les arrêtés de l\'article 171 : l\'employeur y est mis en demeure dans les mêmes formes, mais dispose, avant l\'expiration du délai, d\'une voie de réclamation suspensive auprès du Ministre du Travail, par pli recommandé ou par porteur avec accusé de réception. Le Ministre notifie sa décision par l\'intermédiaire de l\'Inspecteur du Travail dans le mois de la réception de la réclamation ; passé ce délai, son silence vaut acquiescement de la réclamation, une règle protectrice de l\'employeur contre l\'inertie administrative. Enfin, l\'article 176 referme le chapitre par une obligation d\'information : l\'employeur doit aviser l\'institution nationale de sécurité sociale ainsi que l\'Inspection du Travail du ressort, dans les conditions, formes et délais prévus par la législation de sécurité sociale, de tout accident du travail ou maladie professionnelle dûment constaté — un pont direct vers la protection sociale étudiée à la fin de ce chapitre.' },
      { type: 'carte', titre: 'De l\'INSS à la CNSS : une évolution de nom à ne pas confondre avec le droit applicable', texte: 'L\'article 176 du Code du travail, non modifié en 2016 sur ce point, désigne encore l\'« Institut National de Sécurité Sociale » (INSS). Cette institution a depuis été réorganisée : la loi n°16/009 du 15 juillet 2016 relative au régime général de la sécurité sociale et le décret n°18/027 du 14 juillet 2018 ont créé la Caisse Nationale de Sécurité Sociale (CNSS), établissement public qui reprend aujourd\'hui les missions visées par cet article. L\'obligation d\'aviser reste entière ; seul le nom de son destinataire institutionnel a changé.' },
    ],
  },
  {
    numero: '7.4',
    titre: 'Le service médical d\'entreprise : une obligation de soins à charge de l\'employeur',
    navLabel: '7.4 Service médical d\'entreprise',
    blocs: [
      { type: 'paragraphe', texte: 'Le Titre VIII organise, dans un chapitre unique, une obligation distincte des services de santé et de sécurité déjà étudiés : celle d\'assurer directement des soins aux travailleurs. L\'article 177 impose à toute entreprise ou établissement d\'assurer un service médical à ses travailleurs, des arrêtés ministériels devant fixer l\'effectif, la qualification et les fonctions du personnel médical compte tenu des conditions locales et du nombre de travailleurs occupés ; les conditions dans lesquelles l\'employeur peut faire assurer ce service, dans une formation médicale étrangère à l\'entreprise, une formation propre, ou un service commun à plusieurs entreprises ; et les conditions d\'installation et d\'approvisionnement des locaux à usage d\'infirmerie, d\'hôpital ou des boîtes de secours.' },
      { type: 'carte', titre: 'L\'étendue de la prise en charge, article 178', liste: [
        'Les soins médicaux, dentaires, chirurgicaux, les frais pharmaceutiques et d\'hospitalisation',
        'Les frais de déplacement nécessaires, lorsque le travailleur ou sa famille est dans l\'incapacité physique de se déplacer',
        'Les lunettes, appareils d\'orthopédie et de prothèse — la prothèse dentaire exceptée —, suivant prescription médicale et tarifs établis par le Ministre de la Santé Publique',
      ], texte: 'Cette prise en charge est due en cas de maladie, d\'accident, de grossesse ou d\'accouchement, et même en cas de suspension du contrat pour force majeure, jusqu\'à la fin du contrat, au bénéfice du travailleur **et de sa famille**.' },
      { type: 'paragraphe', texte: 'L\'article 178 prolonge cette obligation dans deux hypothèses particulières. Lorsque le contrat ou la loi imposent le rapatriement du travailleur aux frais de l\'employeur, l\'obligation de soins ne s\'éteint pas avant le jour où son état de santé permet son retour, décidé par l\'employeur sur avis du médecin, sous réserve d\'un recours possible devant une commission médicale provinciale en cas de contestation. Lorsque l\'employeur met fin à un contrat à durée indéterminée en dispensant le travailleur de la prestation du préavis, hors faute lourde de ce dernier, il reste tenu de lui fournir les soins de santé jusqu\'à la date à laquelle le contrat aurait normalement pris fin si le préavis avait été respecté — une règle qui prolonge la protection du travailleur licencié au-delà de la cessation effective du travail, mais qui s\'éteint dès que le travailleur est engagé chez un autre employeur ou exerce une activité lucrative substantielle.' },
      { type: 'paragraphe', texte: 'L\'article 179 articule enfin cette obligation avec la sécurité sociale : lorsque la maladie ou l\'accident sont réputés maladie professionnelle ou accident du travail au sens de la réglementation de la sécurité sociale, les obligations de l\'employeur prévues à l\'article 178 se limitent à la période non couverte par les prestations de l\'institution nationale de sécurité sociale — aujourd\'hui la CNSS. L\'employeur et la CNSS se partagent ainsi la charge des soins selon une logique de subsidiarité : l\'employeur couvre ce que la sécurité sociale ne couvre pas encore, ou plus.' },
    ],
  },
  {
    numero: '7.5',
    titre: 'Les limites de la prise en charge médicale et ses bénéficiaires',
    navLabel: '7.5 Limites et bénéficiaires',
    blocs: [
      { type: 'paragraphe', texte: 'L\'article 180 écarte l\'obligation de soins dans trois hypothèses : lorsque la maladie, l\'accident, ou l\'aggravation d\'une maladie ou d\'un accident antérieur résulte d\'un risque spécial au sens de l\'article 107 du Code ; lorsque le bénéficiaire se soustrait sans motif valable à un traitement médical, même préventif, à des règles d\'hygiène préventives, ou à un contrôle médical proposé par l\'employeur ; et en cas de fausse déclaration ou de dissimulation de la part des intéressés. Ces trois exceptions ont en commun de sanctionner un comportement imputable au travailleur ou à sa famille, non un risque professionnel ordinaire, qui reste intégralement à charge de l\'employeur.' },
      { type: 'paragraphe', texte: 'L\'article 181 impose à l\'employeur de prendre toutes les dispositions nécessaires pour assurer les soins prévus au Titre VIII, dans les conditions fixées par les arrêtés de l\'article 177 — une clause de moyens qui double l\'obligation de résultat des articles précédents. L\'article 182 précise qu\'en cas d\'accident ou de maladie susceptible d\'engager la responsabilité d\'un tiers, l\'exercice d\'une action contre ce tiers ne dispense pas l\'employeur d\'exécuter ses propres obligations : les deux actions, celle du travailleur contre le tiers responsable et celle de l\'employeur au titre du Titre VIII, sont indépendantes l\'une de l\'autre.' },
      { type: 'paragraphe', texte: 'Le tarif de remboursement des frais de soins de santé exposés à l\'étranger est fixé par arrêté du Ministre du Travail, après avis du Ministre de la Santé Publique (article 183). Enfin, l\'article 184 délimite le cercle des bénéficiaires familiaux : les membres de la famille du travailleur ne bénéficient des dispositions du Titre VIII que s\'ils sont à sa charge, habitent effectivement avec lui et n\'exercent pas de profession lucrative. Sont réputés habiter effectivement avec le travailleur les enfants fréquentant un établissement scolaire situé en République Démocratique du Congo, ainsi que les membres de la famille dont la séparation résulte de la nature du travail, de la force majeure, du fait de l\'employeur ou de la coutume — une fiction légale qui évite qu\'une séparation matérielle, non voulue par la famille, ne prive celle-ci de la couverture médicale.' },
      { type: 'filet', titre: 'Une articulation à toujours vérifier', texte: 'Les articles 177 à 184 forment un bloc cohérent, mais leur application concrète suppose de vérifier, pour chaque situation, si l\'affection relève d\'un risque professionnel couvert par la CNSS (article 179, prise en charge partagée), d\'une des trois exclusions de l\'article 180 (aucune prise en charge par l\'employeur), ou du régime général (prise en charge intégrale par l\'employeur, dans les limites de l\'article 178).' },
    ],
  },
  {
    numero: '7.6',
    titre: 'La protection sociale : les trois branches de la Caisse Nationale de Sécurité Sociale',
    navLabel: '7.6 Les trois branches de la CNSS',
    blocs: [
      { type: 'paragraphe', texte: 'Au-delà des obligations que le Code du travail met directement à la charge de l\'employeur, le travailleur du secteur privé congolais est couvert par un régime de sécurité sociale distinct, géré par la Caisse Nationale de Sécurité Sociale (CNSS), établissement public créé par le décret n°18/027 du 14 juillet 2018 sur la base de la loi n°16/009 du 15 juillet 2016 relative au régime général de la sécurité sociale. Ce régime, financé par des cotisations assises sur la rémunération du travailleur (loi, article 13, qui renvoie à la définition de la rémunération de l\'article 7, litera h, du Code du travail), organise trois branches distinctes, dont les taux sont fixés par le décret n°18/041 du 24 novembre 2018, en vigueur depuis le 1er janvier 2019.' },
      { type: 'carte', titre: 'Les trois branches et leurs taux (décret n°18/041, art. 2 à 4)', tableau: { entetes: ['Branche', 'Taux', 'Répartition'], lignes: [['Prestations aux familles', '**6,5 %**', '**À charge exclusive de l\'employeur**'], ['Pensions', '**10 %**', '**5 % employeur / 5 % travailleur**'], ['Risques professionnels', '**1,5 %**', '**À charge exclusive de l\'employeur** (taux pouvant être doublé en cas de non-conformité de l\'entreprise, décret art. 5, loi art. 16)']] } },
      { type: 'paragraphe', texte: 'Seule la branche des pensions est ainsi partagée entre l\'employeur et le travailleur, la part de ce dernier ne pouvant jamais dépasser la moitié de la cotisation totale (loi, article 18). Les deux autres branches restent, sans exception, à la charge exclusive de l\'employeur (loi, article 16). L\'assiette de cotisation ne peut jamais être inférieure au salaire minimum interprofessionnel garanti, déjà rencontré au chapitre 5 à propos du salaire (loi, article 13, alinéa 3 ; décret, article 8).' },
      { type: 'paragraphe', texte: 'C\'est la branche des risques professionnels qui prend le relais des articles 176 et 179 du Code du travail étudiés plus haut dans ce chapitre : c\'est elle qui sert les prestations lorsqu\'un accident du travail ou une maladie professionnelle est dûment constaté et avisé à la CNSS, l\'employeur ne restant tenu, selon l\'article 179, que pour la période non couverte par ces prestations. Le lien entre les deux textes est donc direct : le Code du travail impose l\'information de la CNSS et pose une règle de subsidiarité, la loi de 2016 et son décret d\'application de 2018 organisent le financement et la mise en œuvre concrète de la couverture correspondante.' },
      { type: 'filet', titre: 'Des taux qui datent de 2019, à toujours revérifier', texte: 'Le décret n°18/041 fixe des taux transitoires, applicables jusqu\'au 31 décembre 2018 (pensions à 7 %, réparti 3,5 %/3,5 %), et des taux définitifs, applicables depuis le 1er janvier 2019 — ce sont ces derniers qui figurent ci-dessus. Les taux et montants de la sécurité sociale peuvent être révisés par un texte réglementaire ultérieur : toute application chiffrée doit vérifier qu\'aucun décret plus récent n\'a modifié ces taux avant de les appliquer sans réserve.' },
    ],
  },
]

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1', question: "Combien d'objectifs l'article 159 assigne-t-il aux conditions de santé et de sécurité au travail ?",
    options: [
      { id: 'a', texte: "Trois" },
      { id: 'b', texte: "Quatre" },
      { id: 'c', texte: "Cinq" },
      { id: 'd', texte: "Six" },
      { id: 'e', texte: "Huit" },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 159',
    explication: "L'article 159 énumère six objectifs : prévenir les accidents du travail, lutter contre les maladies professionnelles, créer des conditions de travail salubres, remédier à la fatigue professionnelle excessive, adapter le travail à l'homme, et gérer/lutter contre les grandes endémies de santé communautaire en milieu de travail.",
  },
  {
    id: 'q2', question: "Qui assure le service de santé au travail prévu à l'article 161 ?",
    options: [
      { id: 'a', texte: "Un infirmier diplômé d'État" },
      { id: 'b', texte: "Un médecin du travail" },
      { id: 'c', texte: "L'Inspecteur du Travail du ressort" },
      { id: 'd', texte: "Le chef de service de sécurité, d'hygiène et d'embellissement" },
      { id: 'e', texte: "Un délégué du personnel formé aux premiers secours" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 161',
    explication: "L'article 161 confie le service de santé au travail à un médecin du travail, avec un rôle essentiellement préventif : surveillance médicale des travailleurs, surveillance sanitaire des lieux de travail, secours immédiats et soins d'urgence.",
  },
  {
    id: 'q3', question: "Le service spécial de sécurité, d'hygiène et d'embellissement des lieux de travail et le comité du même nom sont-ils une seule et même obligation ?",
    options: [
      { id: 'a', texte: "Oui, ce sont deux appellations d'une seule et même structure" },
      { id: 'b', texte: "Non : le service est technique et opérationnel, le comité conçoit et contrôle la politique de prévention" },
      { id: 'c', texte: "Non, seul le comité est obligatoire, le service reste facultatif" },
      { id: 'd', texte: "Non, seul le service est obligatoire, le comité reste facultatif" },
      { id: 'e', texte: "Oui, la loi utilise les deux termes de façon interchangeable" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 163-168',
    explication: "Le service de l'article 163 assure la surveillance technique et sanitaire au quotidien, sous la responsabilité d'un chef de service dédié (art. 165) ; le comité de l'article 167 conçoit, corrige et exécute la politique de prévention et contrôle le bon fonctionnement des services (art. 168). Les deux obligations sont cumulatives, non alternatives.",
  },
  {
    id: 'q4', question: "Quel est le délai minimal que doit respecter une mise en demeure de l'Inspecteur du Travail, selon l'article 172 ?",
    options: [
      { id: 'a', texte: "Vingt-quatre heures" },
      { id: 'b', texte: "Quatre jours francs, sauf extrême urgence" },
      { id: 'c', texte: "Huit jours ouvrables" },
      { id: 'd', texte: "Quinze jours francs" },
      { id: 'e', texte: "Un mois calendaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 172',
    explication: "L'article 172 fixe un délai minimal de quatre jours francs pour la mise en demeure, sauf en cas d'extrême urgence, la mise en demeure devant en outre être datée, signée, et préciser les infractions ou dangers constatés.",
  },
  {
    id: 'q5', question: "En cas de danger grave et imminent pour la sécurité ou la santé des travailleurs, que peut faire l'Inspecteur du Travail selon l'article 174 ?",
    options: [
      { id: 'a', texte: "Rien, il doit attendre l'expiration du délai de mise en demeure" },
      { id: 'b', texte: "Saisir directement le Tribunal du Travail" },
      { id: 'c', texte: "Ordonner ou faire ordonner l'arrêt de la machine ou du travail incriminé, à titre exceptionnel" },
      { id: 'd', texte: "Prononcer lui-même la fermeture définitive de l'entreprise" },
      { id: 'e', texte: "Seulement dresser un procès-verbal, sans pouvoir d'arrêt immédiat" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 174, al. 4',
    explication: "L'article 174 donne à l'Inspecteur du Travail un pouvoir de police immédiat : en cas de danger grave et imminent, il peut, à titre exceptionnel, ordonner ou faire ordonner l'arrêt de la machine ou du travail incriminé, sans attendre l'écoulement du délai de mise en demeure.",
  },
  {
    id: 'q6', question: "Pour une condition de travail dangereuse non visée par les arrêtés de l'article 171, l'employeur mis en demeure dispose-t-il d'un recours ?",
    options: [
      { id: 'a', texte: "Non, la mise en demeure de l'article 175 est immédiatement exécutoire sans recours possible" },
      { id: 'b', texte: "Oui : une réclamation suspensive auprès du Ministre du Travail, avant l'expiration du délai" },
      { id: 'c', texte: "Oui, mais seulement devant le Tribunal du Travail, après exécution de la mise en demeure" },
      { id: 'd', texte: "Oui, mais uniquement par la voie d'un référé devant le Conseil d'État" },
      { id: 'e', texte: "Non, seul un recours gracieux non suspensif est ouvert" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 175',
    explication: "L'article 175 ouvre à l'employeur, avant l'expiration du délai de mise en demeure, une réclamation suspensive adressée au Ministre du Travail par pli recommandé ou par porteur avec accusé de réception ; le silence du Ministre au-delà d'un mois vaut acquiescement de la réclamation.",
  },
  {
    id: 'q7', question: "Selon l'article 176, qui l'employeur doit-il aviser en cas d'accident du travail ou de maladie professionnelle dûment constaté ?",
    options: [
      { id: 'a', texte: "Uniquement le Tribunal du Travail" },
      { id: 'b', texte: "L'institution nationale de sécurité sociale et l'Inspection du Travail du ressort" },
      { id: 'c', texte: "Uniquement le Ministre de la Santé Publique" },
      { id: 'd', texte: "Le seul comité de sécurité, d'hygiène et d'embellissement de l'entreprise" },
      { id: 'e', texte: "Uniquement les délégués du personnel" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 176',
    explication: "L'article 176 impose à l'employeur d'aviser à la fois l'institution nationale de sécurité sociale (aujourd'hui la CNSS) et l'Inspection du Travail du ressort, dans les conditions, formes et délais prévus par la législation et la réglementation de la sécurité sociale.",
  },
  {
    id: 'q8', question: "L'article 176 désigne encore l'« Institut National de Sécurité Sociale » (INSS). Cette dénomination correspond-elle toujours à l'institution réellement compétente aujourd'hui ?",
    options: [
      { id: 'a', texte: "Oui, l'INSS existe toujours sous ce nom et cette forme" },
      { id: 'b', texte: "Non : la loi n°16/009/2016 et le décret n°18/027/2018 ont créé la CNSS, qui reprend ces missions" },
      { id: 'c', texte: "Non, cette obligation d'information a été purement et simplement supprimée" },
      { id: 'd', texte: "Non, elle a été transférée à l'INPP" },
      { id: 'e', texte: "Oui, mais uniquement pour les entreprises du secteur minier" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 176 ; Loi n°16/009/2016 ; Décret n°18/027/2018',
    explication: "L'obligation d'aviser reste entière, mais son destinataire institutionnel a changé de nom : la Caisse Nationale de Sécurité Sociale (CNSS), établissement public créé par le décret n°18/027 du 14 juillet 2018 sur la base de la loi n°16/009 du 15 juillet 2016, a succédé à l'ancien Institut National de Sécurité Sociale.",
  },
  {
    id: 'q9', question: "Le service médical d'entreprise imposé par l'article 177 se confond-il avec le service de santé au travail de l'article 161 ?",
    options: [
      { id: 'a', texte: "Oui, ce sont deux appellations d'une même obligation" },
      { id: 'b', texte: "Non : l'un est préventif et de surveillance (art. 161), l'autre curatif et de soins (art. 177 à 184)" },
      { id: 'c', texte: "Non, seul le service médical d'entreprise est obligatoire" },
      { id: 'd', texte: "Non, seul le service de santé au travail est obligatoire" },
      { id: 'e', texte: "Oui, les deux relèvent du même Titre du Code" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 161 ; Art. 177-178',
    explication: "Le service de santé au travail du Titre VII est essentiellement préventif (surveillance médicale et sanitaire). Le service médical d'entreprise du Titre VIII est curatif : il assure directement les soins médicaux, dentaires, chirurgicaux, pharmaceutiques et d'hospitalisation prévus à l'article 178. Les deux obligations sont distinctes et cumulatives.",
  },
  {
    id: 'q10', question: "Au bénéfice de qui l'article 178 met-il les soins de santé à la charge de l'employeur ?",
    options: [
      { id: 'a', texte: "Du seul travailleur" },
      { id: 'b', texte: "Du travailleur et de sa famille" },
      { id: 'c', texte: "Du travailleur uniquement s'il a plus de cinq ans d'ancienneté" },
      { id: 'd', texte: "Du travailleur, sa famille en étant exclue sauf clause contractuelle expresse" },
      { id: 'e', texte: "Des seuls travailleurs occupant un poste à risque" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 178',
    explication: "L'article 178 vise expressément « le travailleur et sa famille », jusqu'à la fin du contrat, en cas de maladie, d'accident, de grossesse, d'accouchement, ou même de suspension du contrat pour force majeure.",
  },
  {
    id: 'q11', question: "Un employeur qui dispense un travailleur licencié de la prestation de son préavis, hors faute lourde de ce dernier, reste-t-il tenu à une obligation de soins ?",
    options: [
      { id: 'a', texte: "Non, l'obligation de soins cesse dès la notification du licenciement" },
      { id: 'b', texte: "Oui, jusqu'à la date à laquelle le contrat aurait pris fin si le préavis avait été respecté" },
      { id: 'c', texte: "Oui, mais seulement pendant sept jours après la notification" },
      { id: 'd', texte: "Non, sauf clause contraire expresse du contrat de travail" },
      { id: 'e', texte: "Oui, sans aucune limite de durée" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 178, al. 3',
    explication: "L'article 178 impose à l'employeur de fournir les soins de santé jusqu'à la date à laquelle le contrat aurait normalement pris fin si les délais de préavis avaient été respectés, sauf faute lourde du travailleur — l'employeur étant toutefois dégagé dès que le travailleur trouve un nouvel emploi ou exerce une activité lucrative substantielle.",
  },
  {
    id: 'q12', question: "Lorsqu'une affection est reconnue comme accident du travail ou maladie professionnelle au sens de la sécurité sociale, quelle est l'étendue de l'obligation de soins de l'employeur selon l'article 179 ?",
    options: [
      { id: 'a', texte: "Elle disparaît totalement, la CNSS prenant seule le relais" },
      { id: 'b', texte: "Elle reste intégrale, sans lien avec les prestations de la CNSS" },
      { id: 'c', texte: "Elle se limite à la période non couverte par les prestations de la sécurité sociale" },
      { id: 'd', texte: "Elle est doublée, en réparation du caractère professionnel du risque" },
      { id: 'e', texte: "Elle est transférée à l'Inspection du Travail" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 179',
    explication: "L'article 179 limite les obligations de l'employeur, en cas de maladie professionnelle ou d'accident du travail reconnu, à la période non couverte par les prestations de l'institution nationale de sécurité sociale (la CNSS) : les deux prises en charge s'articulent par subsidiarité, sans se cumuler ni s'exclure totalement.",
  },
  {
    id: 'q13', question: "Parmi les situations suivantes, laquelle dispense l'employeur de son obligation de soins au titre de l'article 180 ?",
    options: [
      { id: 'a', texte: "Une maladie professionnelle ordinaire, sans faute du travailleur" },
      { id: 'b', texte: "Un accident du travail classique sur le lieu de travail" },
      { id: 'c', texte: "Une fausse déclaration ou une dissimulation de la part des intéressés" },
      { id: 'd', texte: "Une grossesse à risque dûment constatée" },
      { id: 'e', texte: "Un accident de trajet entre le domicile et le lieu de travail" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 180',
    explication: "L'article 180 écarte l'obligation de soins dans trois cas seulement : risque spécial au sens de l'article 107, refus sans motif valable d'un traitement ou contrôle médical proposé par l'employeur, et fausse déclaration ou dissimulation de la part des intéressés.",
  },
  {
    id: 'q14', question: "Le fait qu'un tiers puisse être responsable d'un accident dispense-t-il l'employeur de ses obligations au titre du Titre VIII, selon l'article 182 ?",
    options: [
      { id: 'a', texte: "Oui, l'action contre le tiers responsable se substitue à l'obligation de l'employeur" },
      { id: 'b', texte: "Non, l'exercice d'une action contre le tiers ne dispense pas l'employeur de ses obligations" },
      { id: 'c', texte: "Oui, mais uniquement si le tiers est solvable" },
      { id: 'd', texte: "Non, mais l'employeur peut suspendre ses obligations dans l'attente de l'issue du procès" },
      { id: 'e', texte: "La question relève exclusivement du droit commun de la responsabilité civile, hors Code du travail" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 182',
    explication: "L'article 182 est explicite : en cas d'accident ou de maladie pouvant engager la responsabilité d'un tiers, l'exercice d'une action contre ce tiers ne dispense pas l'employeur d'exécuter ses propres obligations au titre du Titre VIII. Les deux actions sont indépendantes.",
  },
  {
    id: 'q15', question: "À quelle condition un enfant du travailleur, scolarisé hors du domicile familial, reste-t-il un bénéficiaire au sens de l'article 184 ?",
    options: [
      { id: 'a', texte: "Il perd automatiquement le bénéfice des soins dès qu'il ne réside plus avec le travailleur" },
      { id: 'b', texte: "Il reste réputé habiter effectivement avec le travailleur s'il fréquente un établissement scolaire situé en RDC" },
      { id: 'c', texte: "Il ne reste bénéficiaire que jusqu'à ses douze ans" },
      { id: 'd', texte: "Il doit obtenir une autorisation expresse de l'Inspecteur du Travail" },
      { id: 'e', texte: "Il perd le bénéfice des soins dès qu'il exerce une activité rémunérée, même compatible avec la scolarité" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 184',
    explication: "L'article 184 répute habiter effectivement avec le travailleur les enfants fréquentant un établissement scolaire situé en République Démocratique du Congo, ainsi que les membres de la famille dont la séparation résulte de la nature du travail, de la force majeure, du fait de l'employeur ou de la coutume — sous la condition générale d'être à charge et de ne pas exercer de profession lucrative.",
  },
  {
    id: 'q16', question: "Selon le décret n°18/041 du 24 novembre 2018, quel est le taux de cotisation applicable à la branche des pensions depuis le 1er janvier 2019, et comment se répartit-il ?",
    options: [
      { id: 'a', texte: "7 %, réparti 3,5 % employeur et 3,5 % travailleur" },
      { id: 'b', texte: "10 %, réparti 5 % employeur et 5 % travailleur" },
      { id: 'c', texte: "10 %, à charge exclusive de l'employeur" },
      { id: 'd', texte: "6,5 %, réparti également entre les deux parties" },
      { id: 'e', texte: "15 %, réparti 10 % employeur et 5 % travailleur" },
    ],
    reponseCorrecte: 'b', articleRef: 'Décret n°18/041, art. 3 et 10',
    explication: "Le taux définitif de la branche pensions, en vigueur depuis le 1er janvier 2019, est de 10 %, réparti à parts égales : 5 % à charge de l'employeur, 5 % à charge du travailleur. Le taux transitoire de 7 % (3,5 %/3,5 %) n'était applicable que jusqu'au 31 décembre 2018 et ne doit plus être cité comme actuel.",
  },
  {
    id: 'q17', question: "Parmi les trois branches gérées par la CNSS, laquelle ou lesquelles restent à la charge exclusive de l'employeur ?",
    options: [
      { id: 'a', texte: "Les pensions uniquement" },
      { id: 'b', texte: "Les prestations aux familles et les risques professionnels" },
      { id: 'c', texte: "Les trois branches, sans exception" },
      { id: 'd', texte: "Aucune, toutes sont réparties employeur/travailleur" },
      { id: 'e', texte: "Les risques professionnels uniquement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Décret n°18/041, art. 2 et 4 ; Loi n°16/009/2016, art. 16',
    explication: "Seule la branche des pensions est répartie entre l'employeur et le travailleur (5 %/5 %). Les prestations aux familles (6,5 %) et les risques professionnels (1,5 %) restent, selon l'article 16 de la loi n°16/009/2016, à la charge exclusive de l'employeur.",
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: "L'atelier de Likasi sans comité de sécurité ni service médical",
    contexte: "Une entreprise de conditionnement de produits agricoles de Likasi emploie quatre-vingts travailleurs répartis sur deux lignes de production. Aucun comité de sécurité, d'hygiène et d'embellissement des lieux de travail n'y a jamais été constitué, l'employeur estimant que cette structure « n'est utile qu'aux grandes entreprises industrielles ». Aucun service médical n'y est organisé non plus : en cas de blessure, les ouvriers sont simplement envoyés à leurs frais vers le centre de santé le plus proche, sans que l'entreprise ne rembourse quoi que ce soit.",
    questions: [
      { num: 1, enonce: "L'absence de comité de sécurité, d'hygiène et d'embellissement des lieux de travail est-elle régulière, compte tenu de la taille de l'entreprise ?", correction: "Non. L'article 167 impose cette obligation à toute entreprise ou tout établissement de quelque nature que ce soit occupant des travailleurs, sans distinction de taille ni de secteur d'activité. Une entreprise de quatre-vingts travailleurs relève pleinement de cette obligation, et rien dans le texte ne réserve cette exigence aux « grandes entreprises industrielles »." },
      { num: 2, enonce: "L'absence de tout service médical d'entreprise, avec renvoi systématique des ouvriers blessés vers un centre de santé extérieur à leurs frais, est-elle conforme à l'article 177 ?", correction: "Non, sur les deux volets. L'article 177 impose à toute entreprise d'assurer un service médical à ses travailleurs, éventuellement dans une formation médicale étrangère à l'entreprise — ce qui est en soi licite —, mais à la condition que les modalités en soient fixées par les arrêtés prévus et que les frais restent à la charge de l'employeur selon l'article 178. Faire supporter les frais de soins par les ouvriers eux-mêmes méconnaît frontalement cette obligation de prise en charge." },
      { num: 3, enonce: "Un ouvrier blessé sur une des lignes de production peut-il réclamer le remboursement des frais déjà avancés pour ses soins ?", correction: "Oui. L'article 178 met à la charge de l'employeur les soins médicaux, chirurgicaux, les frais pharmaceutiques et d'hospitalisation, ainsi que les frais de déplacement nécessaires en cas d'incapacité physique de se déplacer. L'ouvrier ayant avancé ces frais peut en réclamer le remboursement intégral, l'absence d'organisation formelle d'un service médical par l'entreprise ne le privant d'aucun de ces droits." },
      { num: 4, enonce: "L'Inspecteur du Travail dispose-t-il d'un moyen d'action immédiat si les conditions constatées dans l'atelier constituent un danger grave et imminent, indépendamment de la question du remboursement des soins ?", correction: "Oui. L'article 174 lui permet, à titre exceptionnel, d'ordonner ou de faire ordonner l'arrêt de la machine ou du travail incriminé dès lors que les faits relevés constituent un danger grave et imminent pour la sécurité ou la santé des travailleurs, sans devoir attendre l'expiration d'un délai de mise en demeure. Ce pouvoir de police immédiat est distinct de la question, déjà tranchée, du remboursement des frais de soins déjà exposés." },
    ],
  },
  {
    id: 'cp2',
    titre: "La machine sans dispositif de protection et le refus de mise en conformité",
    contexte: "Une menuiserie industrielle de Kananga utilise une scie circulaire dont le carter de protection a été retiré depuis plusieurs mois « pour gagner en rapidité de découpe ». L'Inspecteur du Travail du ressort, alerté par un délégué du personnel, constate les faits et notifie une mise en demeure écrite remise sur place à l'employeur, lui fixant un délai de trois jours francs pour remettre le dispositif de protection en place, sans invoquer aucune urgence particulière dans le texte de la mise en demeure.",
    questions: [
      { num: 1, enonce: "Le retrait du carter de protection de la scie circulaire pose-t-il, en lui-même, une difficulté au regard du Code du travail ?", correction: "Oui. L'article 173 interdit la vente, la location, l'exposition ou la cession à tout autre titre de machines dont les éléments dangereux sont dépourvus de dispositifs de protection appropriés. Bien que cet article vise en premier lieu la commercialisation de telles machines, l'usage d'une machine ainsi rendue dangereuse par le retrait délibéré de son dispositif de protection contrevient à l'obligation générale de sécurité qui innerve l'ensemble du Titre VII, et notamment à l'objectif de prévention des accidents du travail posé par l'article 159." },
      { num: 2, enonce: "Le délai de trois jours francs fixé par la mise en demeure, sans invocation d'une urgence particulière, est-il régulier au regard de l'article 172 ?", correction: "Non. L'article 172 fixe un délai minimal de quatre jours francs pour toute mise en demeure, sauf en cas d'extrême urgence dûment caractérisée dans la mise en demeure elle-même. Un délai de trois jours, non justifié par une urgence particulière expressément mentionnée, est irrégulier et devrait être porté à quatre jours francs au minimum." },
      { num: 3, enonce: "Si l'employeur laisse la scie en service sans dispositif de protection pendant l'écoulement du délai de mise en demeure, l'Inspecteur du Travail est-il pour autant totalement démuni ?", correction: "Non. L'article 174 lui permet, indépendamment du délai de mise en demeure en cours, d'ordonner ou de faire ordonner l'arrêt immédiat de la machine si les faits constatés constituent un danger grave et imminent pour la sécurité des travailleurs, ce qui est manifestement le cas d'une scie circulaire dépourvue de tout dispositif de protection. Ce pouvoir d'arrêt immédiat est indépendant de la procédure de mise en demeure elle-même et peut s'exercer en parallèle ou à sa place." },
      { num: 4, enonce: "L'employeur pourrait-il utilement soutenir que le retrait du carter améliore la productivité et que cette considération économique doit être mise en balance avec l'exigence de sécurité ?", correction: "Non. Les objectifs de l'article 159 — prévenir les accidents du travail, adapter le travail à l'homme — et l'interdiction de l'article 173 relèvent de l'ordre public social, déjà rencontré à plusieurs reprises dans ce module : ils ne se négocient pas au regard d'un gain de productivité, quel qu'en soit le montant. Une telle justification économique est sans emport sur la régularité de la mise en demeure ni sur le pouvoir d'arrêt immédiat de l'Inspecteur du Travail." },
    ],
  },
  {
    id: 'cp3',
    titre: "L'accident du travail de M. Tshisekedi et le partage de la prise en charge",
    contexte: "M. Tshisekedi, ouvrier dans une entreprise de Kolwezi, est victime d'un accident sur son poste de travail, dûment constaté et reconnu comme accident du travail au sens de la réglementation de la sécurité sociale. L'employeur, informé de cette reconnaissance par la CNSS, cesse immédiatement toute prise en charge des soins de M. Tshisekedi, estimant que « désormais, tout relève de la CNSS ». M. Tshisekedi conteste cette interruption, la CNSS ne lui ayant pour l'instant versé qu'une avance partielle, très inférieure au montant total de ses frais de soins.",
    questions: [
      { num: 1, enonce: "L'employeur a-t-il raison de considérer que la reconnaissance de l'accident du travail par la CNSS met fin, sans réserve, à toute obligation de sa part ?", correction: "Non. L'article 179 du Code du travail limite les obligations de l'employeur, en cas d'accident du travail reconnu, à la période non couverte par les prestations de la CNSS — il ne les supprime pas purement et simplement. Tant que les prestations de la CNSS ne couvrent pas l'intégralité de la période ou des frais concernés, l'employeur reste tenu au titre de l'article 178 pour la partie non couverte." },
      { num: 2, enonce: "Le fait que la CNSS n'ait versé qu'une avance partielle a-t-il une incidence sur les obligations subsistant de l'employeur ?", correction: "Oui. Puisque l'article 179 organise une subsidiarité et non une substitution intégrale, la partie des frais non couverte par l'avance partielle de la CNSS demeure, en principe, à la charge de l'employeur au titre de l'article 178, tant que la prise en charge de la sécurité sociale reste incomplète." },
      { num: 3, enonce: "L'employeur avait-il une obligation d'information préalable à l'égard de la CNSS et de l'Inspection du Travail au moment de l'accident ?", correction: "Oui. L'article 176 lui impose d'aviser l'institution nationale de sécurité sociale — aujourd'hui la CNSS — ainsi que l'Inspection du Travail du ressort, dans les conditions, formes et délais prévus par la législation de sécurité sociale, dès que l'accident du travail est dûment constaté. Cette obligation d'information est distincte de l'obligation de soins elle-même, mais en conditionne souvent la mise en œuvre effective par la CNSS." },
      { num: 4, enonce: "M. Tshisekedi pourrait-il se voir opposer une des exclusions de l'article 180 pour justifier l'arrêt de la prise en charge ?", correction: "Seulement si l'une des trois hypothèses de l'article 180 est établie : un risque spécial au sens de l'article 107, un refus sans motif valable d'un traitement ou contrôle médical proposé par l'employeur, ou une fausse déclaration ou dissimulation. Rien dans les faits décrits ne permet de retenir l'une de ces trois exclusions : un accident du travail ordinaire, dûment reconnu comme tel, ne relève d'aucune d'elles, et l'employeur ne peut donc s'en prévaloir pour interrompre sa part de prise en charge." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue1',
  numero: 7,
  id: 'ue1-chapitre-7',
  titre: 'Santé, sécurité et protection sociale',
  sousTitre: 'Titres VII-VIII du Code du travail, Loi n°015/2002 · Décret n°18/041 (CNSS)',
  infoBulle: 'Santé et sécurité au travail, comité d\'hygiène, mise en demeure de l\'Inspecteur du Travail, service médical d\'entreprise, et les trois branches de la CNSS.',
  loiRef: 'Titres VII-VIII, art. 159 à 184 · Décret n°18/041 du 24 novembre 2018',
  moduleLabel: 'UE 1 · Droit du travail',
  retourRoute: '/ue1-droit-travail',
  coursId: 'ue1-droit-travail',
  objectifs: [
    'Connaître les objectifs et l\'organisation du service de santé au travail et du service de sécurité, d\'hygiène et d\'embellissement des lieux de travail',
    'Maîtriser le pouvoir de mise en demeure et le pouvoir d\'arrêt immédiat de l\'Inspecteur du Travail en cas de danger grave et imminent',
    'Connaître l\'étendue et les limites de l\'obligation de soins de l\'employeur au titre du service médical d\'entreprise',
    'Distinguer l\'obligation de soins de l\'employeur de la prise en charge par la CNSS, notamment pour l\'accident du travail et la maladie professionnelle',
    'Connaître les trois branches de la CNSS, leurs taux de cotisation et leur répartition entre employeur et travailleur',
  ],
  sections: SECTIONS,
  aRetenir: [
    'Trois obligations distinctes pèsent sur l\'employeur en matière de santé-sécurité : le service de santé au travail (préventif, médecin du travail), le service de sécurité-hygiène-embellissement (technique) et le comité du même nom (pilotage et contrôle), à ne jamais confondre.',
    'La mise en demeure de l\'Inspecteur du Travail respecte un délai minimal de quatre jours francs (art. 172), mais un pouvoir d\'arrêt immédiat de la machine ou du travail existe en cas de danger grave et imminent (art. 174), indépendamment de ce délai.',
    'Le service médical d\'entreprise (Titre VIII) est curatif et distinct du service de santé au travail (Titre VII, préventif) : il couvre le travailleur et sa famille, sauf les trois exclusions strictes de l\'article 180 (risque spécial, refus de traitement, fausse déclaration).',
    'En cas d\'accident du travail ou de maladie professionnelle reconnu, l\'employeur et la CNSS se partagent la prise en charge par subsidiarité (art. 179) : l\'obligation de l\'employeur ne disparaît pas, elle se limite à ce que la CNSS ne couvre pas.',
    'La CNSS gère trois branches à des taux distincts (décret n°18/041) : prestations aux familles 6,5 % et risques professionnels 1,5 %, à charge exclusive de l\'employeur ; pensions 10 %, réparti à parts égales entre employeur et travailleur.',
  ],
  references: [
    {
      genre: 'texte',
      intitule: 'Loi n°16/009 du 15 juillet 2016 relative au régime général de la sécurité sociale',
      precision: 'texte-cadre de la CNSS, articles 13, 16 et 18 notamment',
    },
    {
      genre: 'texte',
      intitule: 'Décret n°18/041 du 24 novembre 2018 fixant les taux de cotisations dues à la CNSS',
      precision: 'taux définitifs en vigueur depuis le 1er janvier 2019',
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
  sources: 'Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail, art. 159 à 184 · Loi n°16/009 du 15 juillet 2016 · Décret n°18/041 du 24 novembre 2018',
}

export default chapitre
