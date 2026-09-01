// Chapitre 2 du module UE2, Droit des sociétés : contenu pur.
// Migré depuis l'ancienne page dédiée UE2Chapitre2Page.tsx vers le moteur
// commun components/chapitre/ChapitreManuscrit.tsx, avec enrichissement et
// mise en conformité du contenu vérifiées article par article sur le texte
// de l'AUSCGIE révisé (art. 1 à 80, 97 à 115, 256-1 à 269, 309 à 314, 385
// à 400, 853-1 à 853-8). Plusieurs références et chiffres de l'ancienne
// page ont été corrigés à cette occasion : libération SARL de la moitié
// (art. 311-1, et non 1/5), apports en industrie hors capital social
// (art. 50-3), personnalité juridique à l'art. 98, avis de constitution à
// l'art. 261, Bulletin national des RCCM à l'art. 256-2, reprise des actes
// aux art. 106 à 113.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'l1q1', question: "Selon l'Art. 7 AUSCGIE, qui peut être associé d'une société commerciale ?",
    options: [
      { id: 'a', texte: "Uniquement les personnes physiques majeures" },
      { id: 'b', texte: "Toute personne physique ou morale, sauf interdiction, incapacité ou incompatibilité prévue par une disposition légale ou réglementaire" },
      { id: 'c', texte: "Uniquement les ressortissants de l'espace OHADA" },
      { id: 'd', texte: "Uniquement les personnes disposant d'un capital minimum de 5 000 000 FCFA" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7 AUSCGIE',
    explication: "L'Art. 7 AUSCGIE est rédigé en négatif : une personne physique ou morale ne peut être associée que lorsqu'elle fait l'objet d'une interdiction, incapacité ou incompatibilité prévue par une disposition légale ou réglementaire. En dehors de ces cas, toute personne physique ou morale peut être associée.",
  },
  {
    id: 'l1q2', question: "Un mineur non émancipé peut-il être associé dans une SARL ?",
    options: [
      { id: 'a', texte: "Non, jamais" },
      { id: 'b', texte: "Oui, sans restriction" },
      { id: 'c', texte: "Oui, sous conditions légales et représentation" },
      { id: 'd', texte: "Oui, uniquement s'il apporte du numéraire" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 8 AUSCGIE',
    explication: "L'Art. 8 AUSCGIE dispose que les mineurs et les majeurs incapables ne peuvent être associés d'une société dans laquelle ils seraient tenus des dettes sociales au-delà de leurs apports. Dans une SARL, la responsabilité est limitée aux apports (Art. 309) : le mineur peut donc y être associé, représenté selon les règles de droit commun de l'incapacité.",
  },
  {
    id: 'l1q3', question: "Les époux peuvent-ils être associés ensemble dans une SNC ?",
    options: [
      { id: 'a', texte: "Oui, sans restriction" },
      { id: 'b', texte: "Non, l'Art. 9 AUSCGIE l'interdit expressément" },
      { id: 'c', texte: "Oui, si l'un est commanditaire" },
      { id: 'd', texte: "Oui, avec l'accord du tribunal" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 9 AUSCGIE',
    explication: "L'Art. 9 AUSCGIE dispose que des époux ne peuvent être associés d'une société dans laquelle ils seraient tenus des dettes sociales indéfiniment ou solidairement. La SNC, où tous les associés répondent indéfiniment et solidairement (Art. 270), leur est donc fermée en commun - de même que la double qualité de commandités dans une SCS.",
  },
  {
    id: 'l2q1', question: "Combien de mentions obligatoires les statuts doivent-ils contenir selon l'Art. 13 AUSCGIE ?",
    options: [
      { id: 'a', texte: "5" },
      { id: 'b', texte: "8" },
      { id: 'c', texte: "13" },
      { id: 'd', texte: "20" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 13 AUSCGIE',
    explication: "L'Art. 13 AUSCGIE énumère 13 mentions que les statuts doivent contenir, de la forme de la société aux modalités de son fonctionnement. Leur omission expose à la régularisation sous astreinte (Art. 75) et engage la responsabilité solidaire des fondateurs et premiers dirigeants (Art. 78).",
  },
  {
    id: 'l2q2', question: "Quelle est la durée maximale d'une société selon l'Art. 28 AUSCGIE ?",
    options: [
      { id: 'a', texte: "50 ans" },
      { id: 'b', texte: "75 ans" },
      { id: 'c', texte: "99 ans" },
      { id: 'd', texte: "Illimitée" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 28 AUSCGIE',
    explication: "L'Art. 28 AUSCGIE impose que toute société ait une durée mentionnée dans ses statuts, et que cette durée ne puisse excéder 99 ans. Elle court à compter de l'immatriculation au RCCM (Art. 29) et peut être prorogée une ou plusieurs fois (Art. 32).",
  },
  {
    id: 'l2q3', question: "Sous quelle forme les statuts doivent-ils être établis selon l'Art. 10 AUSCGIE ?",
    options: [
      { id: 'a', texte: "Toujours et uniquement par acte notarié, sans exception possible" },
      { id: 'b', texte: "Par acte notarié ou par tout acte offrant des garanties d'authenticité déposé au rang des minutes d'un notaire, sauf dispositions nationales contraires" },
      { id: 'c', texte: "Par simple échange de courriers entre associés" },
      { id: 'd', texte: "Par déclaration verbale enregistrée au greffe" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 10 AUSCGIE',
    explication: "L'Art. 10 AUSCGIE prévoit, sauf dispositions nationales contraires, l'acte notarié ou tout acte offrant des garanties d'authenticité dans l'État du siège, déposé avec reconnaissance d'écritures et de signatures au rang des minutes d'un notaire - et les statuts ne peuvent être modifiés qu'en la même forme. Lorsque le droit national admet l'acte sous seing privé, l'Art. 11 impose autant d'originaux qu'il en faut pour le dépôt au siège et les formalités, plus un original à chaque associé dans les SNC, SCS et SARL.",
  },
  {
    id: 'l3q1', question: "Qu'est-ce qu'un commissaire aux apports (CAA) ?",
    options: [
      { id: 'a', texte: "Un associé chargé des apports en numéraire" },
      { id: 'b', texte: "Un expert indépendant chargé de contrôler l'évaluation des apports en nature" },
      { id: 'c', texte: "Le notaire rédacteur des statuts" },
      { id: 'd', texte: "Le directeur financier de la société" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 49, 312 et 400 AUSCGIE',
    explication: "Les associés évaluent eux-mêmes les apports en nature, mais dans les cas prévus par l'Acte uniforme cette évaluation est contrôlée par un commissaire aux apports (Art. 49). Choisi sur la liste des commissaires aux comptes, il est désigné à l'unanimité par les futurs associés ou, à défaut, par la juridiction compétente (Art. 312 pour la SARL, Art. 400 pour la SA), et établit sous sa responsabilité un rapport annexé aux statuts.",
  },
  {
    id: 'l3q2', question: "Dans une SARL, quelle fraction des apports en numéraire doit être libérée lors de la souscription ?",
    options: [
      { id: 'a', texte: "La totalité" },
      { id: 'b', texte: "La moitié au moins de leur valeur nominale" },
      { id: 'c', texte: "Le quart" },
      { id: 'd', texte: "Le cinquième" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 311-1 AUSCGIE',
    explication: "L'Art. 311-1 AUSCGIE impose que les parts représentant des apports en numéraire soient libérées, lors de la souscription du capital, de la moitié au moins de leur valeur nominale. La libération du surplus intervient en une ou plusieurs fois dans un délai de deux (2) ans à compter de l'immatriculation au RCCM. Les parts représentant des apports en nature, elles, sont intégralement libérées.",
  },
  {
    id: 'l3q3', question: "Un apport en industrie peut-il être réalisé dans une SA ?",
    options: [
      { id: 'a', texte: "Oui, sans restriction" },
      { id: 'b', texte: "Oui, dans les limites de 25%" },
      { id: 'c', texte: "Non, il est expressément interdit dans les SA" },
      { id: 'd', texte: "Oui, uniquement pour les dirigeants" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 50-1 AUSCGIE',
    explication: "L'Art. 50-1 AUSCGIE dispose que les apports en industrie sont interdits dans les sociétés anonymes - règle que l'Art. 389 rappelle : les actions ne peuvent représenter des apports en industrie. Ils restent admis dans les SNC, SCS et SARL, et la SAS peut émettre des actions inaliénables résultant d'apports en industrie (Art. 853-5).",
  },
  {
    id: 'n1', question: "Quels types d'apports l'Art. 40 AUSCGIE admet-il ?",
    options: [
      { id: 'a', texte: "Numéraire et nature uniquement" },
      { id: 'b', texte: "Numéraire, nature et industrie - tout autre apport est interdit" },
      { id: 'c', texte: "Tout apport ayant une valeur économique quelconque" },
      { id: 'd', texte: "Numéraire uniquement, les autres contributions étant des prêts" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 40 AUSCGIE',
    explication: "L'Art. 40 AUSCGIE énumère limitativement trois types d'apports : de l'argent (apport en numéraire), des droits portant sur des biens en nature, mobiliers ou immobiliers, corporels ou incorporels (apport en nature), et des connaissances techniques ou professionnelles ou des services (apport en industrie). Il conclut : « Tout autre apport est interdit. »",
  },
  {
    id: 'l4q1', question: "Qu'est-ce qu'une clause léonine selon l'Art. 54 AUSCGIE ?",
    options: [
      { id: 'a', texte: "Une clause prévoyant un droit de vote double" },
      { id: 'b', texte: "Une clause attribuant à un associé la totalité du profit ou l'exonérant de la totalité des pertes (ou l'inverse)" },
      { id: 'c', texte: "Une clause imposant un commissaire aux comptes" },
      { id: 'd', texte: "Une clause limitant la cession des parts sociales" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 54 al. 2 AUSCGIE',
    explication: "L'Art. 54 al. 2 AUSCGIE répute non écrites les clauses attribuant à un associé la totalité du profit procuré par la société ou l'exonérant de la totalité des pertes, ainsi que celles excluant un associé totalement du profit ou mettant à sa charge la totalité des pertes. La clause est juridiquement inexistante, sans affecter la validité du reste des statuts.",
  },
  {
    id: 'l4q2', question: "Que prévoit l'Art. 50-3 AUSCGIE pour les apports en industrie ?",
    options: [
      { id: 'a', texte: "Ils concourent à la formation du capital social à hauteur de 25% maximum" },
      { id: 'b', texte: "Ils ne concourent pas à la formation du capital social ; les droits de vote et la part totale dans les bénéfices, l'actif net et les pertes attachés à ces titres sont chacun plafonnés à 25%" },
      { id: 'c', texte: "Ils sont librement évalués et incorporés au capital" },
      { id: 'd', texte: "Ils donnent droit à des titres sans droit de vote" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 50-3 AUSCGIE',
    explication: "L'Art. 50-3 AUSCGIE dispose que les apports en industrie ne concourent pas à la formation du capital social, mais donnent lieu à l'attribution de titres sociaux ouvrant droit au vote et au partage des bénéfices et de l'actif net, à charge de contribuer aux pertes. Deux plafonds : les droits de vote attachés à ces titres ne peuvent excéder 25% de l'ensemble des droits de vote, et leur part totale ne peut excéder 25% des bénéfices, de l'actif net et des pertes.",
  },
  {
    id: 'n2', question: "Que se passe-t-il si le capital d'une société est inférieur au minimum légal fixé pour sa forme ?",
    options: [
      { id: 'a', texte: "Rien, le minimum est purement indicatif" },
      { id: 'b', texte: "En formation, la société ne peut être valablement constituée ; en cours de vie, elle doit être dissoute à moins que le capital soit reporté au moins au minimum (Art. 66)" },
      { id: 'c', texte: "Une amende est due au greffe" },
      { id: 'd', texte: "La société est automatiquement transformée en SNC" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 66 AUSCGIE',
    explication: "L'Art. 65 AUSCGIE laisse les associés déterminer librement le montant du capital, sauf minimum fixé par l'Acte uniforme en raison de la forme ou de l'objet. L'Art. 66 en tire les sanctions : une société en formation dont le capital n'atteint pas le minimum ne peut être valablement constituée, et une société dont le capital est réduit sous le minimum doit être dissoute, à moins qu'il soit porté à un montant au moins égal au minimum.",
  },
  {
    id: 'l5q1', question: "Quand la société acquiert-elle la personnalité juridique ?",
    options: [
      { id: 'a', texte: "À la signature des statuts" },
      { id: 'b', texte: "Au dépôt du capital" },
      { id: 'c', texte: "À l'immatriculation au RCCM (Art. 98)" },
      { id: 'd', texte: "À la publication de l'avis de constitution" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 98 AUSCGIE',
    explication: "L'Art. 98 AUSCGIE dispose que toute société jouit de la personnalité juridique à compter de son immatriculation au registre du commerce et du crédit mobilier, à moins que l'Acte uniforme en dispose autrement. L'Art. 97 pose l'obligation d'immatriculation pour toute société, à l'exception de la société en participation.",
  },
  {
    id: 'l5q2', question: "Qu'est-ce que la déclaration de régularité et de conformité (Art. 73 AUSCGIE) ?",
    options: [
      { id: 'a', texte: "Une déclaration fiscale obligatoire" },
      { id: 'b', texte: "Une déclaration déposée au RCCM par les fondateurs et premiers dirigeants, attestant que la constitution a été réalisée en conformité avec l'Acte uniforme" },
      { id: 'c', texte: "Un rapport du commissaire aux comptes" },
      { id: 'd', texte: "Une attestation bancaire du dépôt des fonds" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 73 AUSCGIE',
    explication: "L'Art. 73 AUSCGIE impose aux fondateurs et aux premiers membres des organes de gestion, d'administration et de direction de déposer au RCCM une déclaration indiquant toutes les opérations effectuées en vue de constituer régulièrement la société et attestant la conformité de la constitution. Elle est exigée à peine de rejet de la demande d'immatriculation. Elle n'est pas requise lorsqu'une déclaration notariée de souscription et de versement a été établie et déposée (Art. 74).",
  },
  {
    id: 'l5q3', question: "Qui est tenu des actes accomplis pour le compte de la société en formation lorsqu'ils ne sont pas repris par la société ?",
    options: [
      { id: 'a', texte: "La société, rétroactivement" },
      { id: 'b', texte: "Le greffe du RCCM" },
      { id: 'c', texte: "Les personnes qui les ont souscrits, tenues solidairement et indéfiniment (Art. 110)" },
      { id: 'd', texte: "Les associés, à hauteur de leurs apports" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 110 AUSCGIE',
    explication: "L'Art. 110 AUSCGIE distingue deux issues : les actes et engagements repris par la société régulièrement constituée et immatriculée sont réputés avoir été contractés par elle dès l'origine ; ceux qui n'ont pas été repris sont inopposables à la société, et les personnes qui les ont souscrits sont tenues solidairement et indéfiniment des obligations qu'ils comportent.",
  },
  {
    id: 'n3', question: "Quelles violations entraînent la nullité de la société selon l'Art. 74-1 AUSCGIE ?",
    options: [
      { id: 'a', texte: "Toute omission d'une mention statutaire" },
      { id: 'b', texte: "La violation des articles 7, 8, 9 (qualité d'associé), 20 (objet licite), 37 al. 1er (obligation d'apport) et 40 (types d'apports)" },
      { id: 'c', texte: "Le seul défaut de publication de l'avis de constitution" },
      { id: 'd', texte: "Le retard dans la libération du capital" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 74-1 AUSCGIE',
    explication: "L'Art. 74-1 AUSCGIE, inséré par la révision de 2014, frappe de nullité les sociétés constituées en violation des articles 7, 8 et 9 (interdictions et incapacités d'être associé), 20 (objet licite), 37 alinéa 1er (chaque associé doit faire un apport) et 40 (types d'apports admis). Les simples omissions de mentions ou de formalités relèvent, elles, de la régularisation sous astreinte (Art. 75) et de la responsabilité solidaire des fondateurs (Art. 78).",
  },
  {
    id: 'n4', question: "Les fonds déposés lors de la constitution d'une SARL restent-ils disponibles pour les fondateurs ?",
    options: [
      { id: 'a', texte: "Oui, ils peuvent en disposer librement" },
      { id: 'b', texte: "Non : ils sont indisponibles jusqu'à l'immatriculation au RCCM, puis mis à la disposition des gérants régulièrement nommés (Art. 314)" },
      { id: 'c', texte: "Oui, après accord du notaire" },
      { id: 'd', texte: "Non, ils sont bloqués pendant deux ans dans tous les cas" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 313-314 AUSCGIE',
    explication: "Les fonds provenant de la libération des parts font l'objet d'un dépôt immédiat par le fondateur, contre récépissé, en banque, dans un établissement de crédit ou de microfinance agréé, ou en l'étude d'un notaire (Art. 313). Ils sont indisponibles jusqu'au jour de l'immatriculation, puis mis à la disposition des gérants (Art. 314). Si la société n'est pas immatriculée dans les six (6) mois du premier dépôt, les apporteurs peuvent demander au président de la juridiction compétente l'autorisation de retirer le montant de leurs apports.",
  },
  {
    id: 'l6q1', question: "Dans quel délai l'avis de constitution doit-il être publié dans un journal habilité ?",
    options: [
      { id: 'a', texte: "8 jours après la signature des statuts" },
      { id: 'b', texte: "15 jours suivant l'immatriculation au RCCM (Art. 261)" },
      { id: 'c', texte: "30 jours après le dépôt du capital" },
      { id: 'd', texte: "60 jours après l'assemblée constitutive" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 261 AUSCGIE',
    explication: "L'Art. 261 AUSCGIE dispose que, lorsque les formalités de constitution ont été accomplies, un avis est inséré dans un journal habilité à recevoir les annonces légales de l'État partie du siège social, dans un délai de quinze (15) jours suivant l'immatriculation. Son contenu est fixé par les Art. 257-1 et 262.",
  },
  {
    id: 'l6q2', question: "Quel support centralise les avis des formalités effectuées auprès du RCCM selon l'Art. 256-2 AUSCGIE ?",
    options: [
      { id: 'a', texte: "Le Bulletin national des registres du commerce et du crédit mobilier, lorsqu'il existe" },
      { id: 'b', texte: "Le journal officiel de l'OHADA exclusivement" },
      { id: 'c', texte: "Le site internet de la CCJA" },
      { id: 'd', texte: "Aucun support : la publicité est purement facultative" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 256-2 AUSCGIE',
    explication: "L'Art. 256-2 AUSCGIE prévoit que les formalités effectuées auprès du RCCM font l'objet d'avis insérés dans le Bulletin national des registres du commerce et du crédit mobilier, lorsqu'il existe. Ce Bulletin peut être publié sur support papier ou sous forme électronique, sous la responsabilité de l'autorité qui administre le Fichier National. L'Art. 256-1 permet en outre d'effectuer les formalités par voie électronique.",
  },
  {
    id: 'l6q3', question: "Quelle est la particularité de la SAS en matière de capital ?",
    options: [
      { id: 'a', texte: "Capital minimum de 10 000 000 FCFA" },
      { id: 'b', texte: "Capital minimum de 1 000 000 FCFA" },
      { id: 'c', texte: "Le montant du capital et celui du nominal des actions sont fixés par les statuts (Art. 853-5)" },
      { id: 'd', texte: "Capital minimum de 100 000 000 FCFA" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 853-5 AUSCGIE',
    explication: "L'Art. 853-5 AUSCGIE dispose que le montant du capital social ainsi que celui du nominal des actions de la SAS sont fixés par les statuts : aucun minimum légal. L'Art. 853-3 écarte d'ailleurs expressément l'article 387 alinéa 1er (capital minimum de la SA) du renvoi général aux règles de la SA.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '2.1',
    titre: 'Le contrat de société et la qualité d\'associé (Art. 4-9)',
    navLabel: '2.1 Qualité d\'associé',
    blocs: [
      { type: 'paragraphe', texte: "L'Art. 4 AUSCGIE définit la société commerciale : elle est créée par **deux ou plusieurs personnes** qui conviennent, par un contrat, d'affecter à une activité des biens en numéraire ou en nature, ou de l'industrie, dans le but de **partager le bénéfice ou de profiter de l'économie** qui peut en résulter - les associés s'engageant à contribuer aux pertes. Elle est créée dans l'intérêt commun des associés. L'Art. 5 admet, dans les cas prévus par l'Acte uniforme, la société créée par une seule personne, dénommée **« associé unique »**, par un acte écrit. Enfin, l'Art. 6 rend commerciales *par leur forme*, quel que soit leur objet, les SNC, SCS, SARL, SA et SAS." },
      { type: 'filet', titre: "Ordre public sociétaire et conventions extra-statutaires (Art. 2 et 2-1)", texte: "Les statuts ne peuvent déroger aux dispositions de l'Acte uniforme que lorsque celui-ci l'autorise expressément, et **toute clause statutaire contraire est réputée non écrite** (Art. 2). En revanche, l'Art. 2-1, inséré en 2014, consacre les **conventions extra-statutaires** (pactes d'associés) : sous réserve des dispositions impératives et des clauses statutaires, les associés peuvent organiser librement leurs relations, la composition des organes sociaux, la conduite des affaires, l'accès au capital et la transmission des titres." },
      { type: 'carte', titre: "Qui peut être associé ? (Art. 7-9)", liste: [
        "**Principe (Art. 7)** : une personne physique ou morale ne peut être associée que si elle fait l'objet d'une interdiction, incapacité ou incompatibilité prévue par une disposition légale ou réglementaire. En dehors de ces cas, l'accès est libre - y compris pour les personnes morales, ce qui permet les montages en groupe et en holding.",
        "**Mineurs et majeurs incapables (Art. 8)** : ils ne peuvent être associés d'une société dans laquelle ils seraient tenus des dettes sociales *au-delà de leurs apports*. Sont donc fermées la SNC et la qualité de commandité en SCS ; restent ouvertes la SARL, la SA et la SAS, sous représentation légale.",
        "**Époux (Art. 9)** : des époux ne peuvent être associés d'une société dans laquelle ils seraient tenus des dettes sociales indéfiniment ou solidairement. Ils peuvent en revanche co-associer librement en SARL, SA ou SAS.",
      ] },
      { type: 'carte', titre: "Qui peut entrer dans quelle forme ?", tableau: { entetes: ["Catégorie d'associé", 'SNC', 'SCS (commandité)', 'SARL', 'SA', 'SAS'], lignes: [
        ['Personne physique majeure capable', 'Oui', 'Oui', 'Oui', 'Oui', 'Oui'],
        ['Mineur ou majeur incapable', '**Non** (Art. 8)', '**Non** (Art. 8)', 'Oui*', 'Oui*', 'Oui*'],
        ['Époux ensemble', '**Non** (Art. 9)', '**Non** (Art. 9)', 'Oui', 'Oui', 'Oui'],
        ['Personne morale', 'Oui', 'Oui', 'Oui', 'Oui', 'Oui'],
      ] }, note: "* Sous représentation légale. La violation des Art. 7, 8 ou 9 à la constitution est sanctionnée par la **nullité de la société** (Art. 74-1) ; survenant en cours de vie sociale (mariage entre associés d'une SNC, par exemple), elle appelle une régularisation : cession de parts ou transformation." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
      { type: 'controle', question: QCM[2] },
    ],
  },
  {
    numero: '2.2',
    titre: 'Les statuts : forme, mentions obligatoires et durée (Art. 10-36)',
    navLabel: '2.2 Statuts et mentions',
    blocs: [
      { type: 'paragraphe', texte: "Les statuts constituent soit le **contrat de société**, en cas de pluralité d'associés, soit l'**acte de volonté d'une seule personne**, en cas d'associé unique (Art. 12). Sauf dispositions nationales contraires, ils sont établis **par acte notarié ou par tout acte offrant des garanties d'authenticité** dans l'État du siège, déposé avec reconnaissance d'écritures et de signatures au rang des minutes d'un notaire - et ils ne peuvent être modifiés qu'en la même forme (Art. 10). Lorsqu'ils sont établis par acte sous seing privé, il en est dressé autant d'originaux qu'il est nécessaire pour le dépôt d'un exemplaire au siège social et l'exécution des formalités, avec remise d'un original à chaque associé dans les SNC, SCS et SARL (Art. 11)." },
      { type: 'carte', titre: 'Les 13 mentions obligatoires des statuts (Art. 13)', tableau: { entetes: ['N°', 'Mention (texte de l\'article)', 'Exemple pratique'], lignes: [
        ['1', 'La forme de la société', 'SARL, SA, SNC, SCS, SAS'],
        ['2', 'Sa dénomination suivie, le cas échéant, de son sigle', 'COMPTA PLUS SARL'],
        ['3', "La nature et le domaine de son activité, qui forment son objet social", "Commerce de détail d'articles électroniques"],
        ['4', 'Son siège social', '123 Av. des Nations, Kinshasa'],
        ['5', 'Sa durée', "99 ans à compter de l'immatriculation"],
        ['6', "L'identité des apporteurs en numéraire (montant des apports, nombre et valeur des titres remis)", 'Jean KAMBALE - 5 000 000 FCFA'],
        ['7', "L'identité des apporteurs en nature (nature et évaluation de l'apport, nombre et valeur des titres remis)", 'Véhicule utilitaire évalué 8 000 000 FCFA'],
        ['8', "L'identité des apporteurs en industrie (nature et durée des prestations, nombre et valeur des titres remis)", 'Alice MBEKI - expertise comptable, 3 ans'],
        ['9', "L'identité des bénéficiaires d'avantages particuliers et la nature de ceux-ci", 'Dividende prioritaire au fondateur'],
        ['10', 'Le montant du capital social', '10 000 000 FCFA'],
        ['11', 'Le nombre et la valeur des titres sociaux émis, en distinguant les catégories de titres créées', '1 000 parts de 10 000 FCFA'],
        ['12', 'Les clauses relatives à la répartition du résultat, à la constitution des réserves et à la répartition du boni de liquidation', 'Répartition proportionnelle aux parts'],
        ['13', 'Les modalités de son fonctionnement', 'Gérance, assemblées, exercice social'],
      ] } },
      { type: 'paragraphe', texte: "**Dénomination, objet, siège.** Toute société est désignée par une dénomination sociale mentionnée dans ses statuts (Art. 14), qui peut inclure le nom d'un ou plusieurs associés (Art. 15) mais ne peut reprendre celle d'une société déjà immatriculée (Art. 16) ; elle doit figurer sur tous les actes destinés aux tiers, accompagnée de la forme, du capital, du siège et du numéro RCCM (Art. 17). L'objet social doit être **licite** (Art. 20), et une activité réglementée impose le respect de ses règles particulières (Art. 21). Le siège ne peut être constitué uniquement par une **domiciliation à une boîte postale** : il doit être localisé par une adresse ou une indication géographique suffisamment précise (Art. 25) ; les tiers peuvent se prévaloir du siège statutaire, mais celui-ci ne leur est pas opposable par la société si le siège réel est ailleurs (Art. 26)." },
      { type: 'filet', titre: 'La durée de la société (Art. 28-36)', texte: "Toute société a une durée mentionnée dans ses statuts, qui **ne peut excéder 99 ans** (Art. 28). Elle court à compter de l'immatriculation au RCCM (Art. 29). L'arrivée du terme entraîne **dissolution de plein droit**, à moins que la prorogation ait été décidée (Art. 30). La durée peut être prorogée une ou plusieurs fois, dans les conditions prévues pour la modification des statuts, sans création d'une personne juridique nouvelle (Art. 32-34). **Un an au moins avant l'expiration**, les associés doivent être consultés sur la prorogation (Art. 35) ; à défaut, tout associé peut demander à la juridiction compétente, statuant à bref délai, la désignation d'un mandataire ad hoc chargé de provoquer cette consultation (Art. 36)." },
      { type: 'controle', question: QCM[3] },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
    ],
  },
  {
    numero: '2.3',
    titre: 'Les apports : numéraire, nature, industrie (Art. 37-50-4)',
    navLabel: '2.3 Les apports',
    blocs: [
      { type: 'paragraphe', texte: "**Chaque associé doit faire un apport** à la société, et chacun est débiteur envers elle de tout ce qu'il s'est obligé à lui apporter en numéraire, en nature ou en industrie (Art. 37). En contrepartie, les associés reçoivent des titres émis par la société (Art. 38). L'Art. 40 énumère limitativement les trois types d'apports - argent, droits portant sur des biens en nature (mobiliers ou immobiliers, corporels ou incorporels), connaissances techniques ou professionnelles ou services - et conclut : **« Tout autre apport est interdit. »**" },
      { type: 'carte', titre: "L'apport en numéraire (Art. 41-44)", liste: [
        "**Principe** : sauf disposition contraire de l'Acte uniforme, les apports en numéraire sont **libérés intégralement lors de la constitution** (Art. 41). Ne sont considérés comme libérés que les apports correspondant à des sommes dont la société est devenue propriétaire et qu'elle a intégralement et définitivement encaissées (Art. 42).",
        "**Retard de versement** : les sommes restant dues portent **de plein droit intérêt au taux légal** à compter du jour où le versement devait être effectué, sans préjudice de dommages et intérêts (Art. 43).",
        "**Compensation** : à moins que les statuts ne l'interdisent, un apport en numéraire réalisé lors d'une *augmentation de capital* peut être libéré par compensation avec une créance **certaine, liquide et exigible** sur la société (Art. 44).",
        "**Exceptions légales à la libération intégrale** : SARL - moitié au moins à la souscription, surplus dans les 2 ans de l'immatriculation (Art. 311-1) ; SA - quart au moins à la souscription, surplus dans les 3 ans (Art. 389), applicable à la SAS par renvoi (Art. 853-3).",
      ] },
      { type: 'paragraphe', texte: "**L'apport en nature (Art. 45-50)** est réalisé par le transfert des droits réels ou personnels correspondant aux biens apportés et par leur mise à la disposition effective de la société ; il est **libéré intégralement lors de la constitution** (Art. 45). L'apporteur en propriété est garant envers la société **comme un vendeur envers son acheteur** (Art. 46) ; l'apporteur en jouissance, comme un bailleur envers son preneur (Art. 47). Les associés évaluent eux-mêmes les apports en nature, mais dans les cas prévus par l'Acte uniforme cette évaluation est **contrôlée par un commissaire aux apports** (Art. 49), et les statuts contiennent l'évaluation (Art. 50)." },
      { type: 'filet', titre: 'Le commissaire aux apports (Art. 312 et 400)', texte: "**SARL (Art. 312)** : le contrôle est obligatoire dès lors que la valeur de l'apport en nature considéré, ou celle de l'ensemble des apports en nature, dépasse **cinq millions (5 000 000) de FCFA** - et il l'est toujours pour les avantages particuliers. Le commissaire, choisi sur la liste des commissaires aux comptes, est désigné à l'unanimité des futurs associés ou, à défaut, par la juridiction compétente ; il établit sous sa responsabilité un rapport annexé aux statuts. **Sanction** : à défaut de commissaire, ou si la valeur retenue diffère de la sienne, les associés sont **solidairement responsables pendant cinq (5) ans**, à l'égard des tiers, de la valeur attribuée aux apports. **SA (Art. 400)** : la valeur des apports en nature et les avantages particuliers doivent toujours être contrôlés par un commissaire aux apports." },
      { type: 'carte', titre: "L'apport en industrie (Art. 50-1 à 50-4)", tableau: { entetes: ['Règle', 'Contenu', 'Article'], lignes: [
        ['Réalisation', 'Mise à disposition effective de connaissances techniques ou professionnelles ou de services', 'Art. 50-1'],
        ['Interdiction', '**Interdit dans les sociétés anonymes** ; la SAS peut en revanche émettre des actions inaliénables d\'industrie', 'Art. 50-1, 853-5'],
        ['Capital', "**Ne concourt pas à la formation du capital social**, mais donne lieu à des titres ouvrant droit au vote et au partage des bénéfices et de l'actif net, à charge de contribuer aux pertes", 'Art. 50-3'],
        ['Plafonds', "Droits de vote attachés à ces titres ≤ **25%** de l'ensemble des droits de vote ; part totale ≤ **25%** des bénéfices, de l'actif net et des pertes", 'Art. 50-3'],
        ['Titres', 'Ni cessibles ni transmissibles ; sans valeur nominale', 'Art. 50-4'],
        ['Obligations de l\'apporteur', 'Rendre la contribution promise et rendre compte de tous les gains réalisés par l\'activité objet de l\'apport', 'Art. 50-2'],
      ] } },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
    ],
  },
  {
    numero: '2.4',
    titre: 'Titres sociaux et capital social (Art. 51-72)',
    navLabel: '2.4 Titres et capital',
    blocs: [
      { type: 'paragraphe', texte: "En contrepartie des apports, la société émet des **titres sociaux** représentant les droits des associés : ils sont dénommés **actions** dans les sociétés par actions et **parts sociales** dans les autres sociétés (Art. 51). Ce sont des biens meubles (Art. 52). Les titres de même catégorie doivent avoir la **même valeur nominale** (Art. 56). Les parts sociales sont cessibles ; les actions sont cessibles **ou négociables** (Art. 57) - et seules les sociétés par actions peuvent émettre des titres négociables, l'émission ou la garantie de tels titres par les autres sociétés étant frappée de **nullité** (Art. 58)." },
      { type: 'carte', titre: 'Droits et obligation attachés aux titres (Art. 53)', liste: [
        "**1°** Un droit sur les bénéfices réalisés par la société *lorsque leur distribution a été décidée* ;",
        "**2°** Un droit sur les actifs nets de la société lors de leur répartition, à sa dissolution ou à l'occasion d'une réduction de son capital ;",
        "**3°** Le cas échéant, l'obligation de contribuer aux pertes sociales dans les conditions prévues pour chaque forme de société ;",
        "**4°** Le droit de participer aux votes des décisions collectives des associés, à moins que l'Acte uniforme en dispose autrement pour certaines catégories de titres.",
      ], note: "Sauf clause ou disposition contraire, ces droits et cette obligation sont **proportionnels aux apports** (Art. 54 al. 1). L'expertise de l'Art. 59 fixe la valeur des titres en cas de cession ou rachat prévus par l'Acte uniforme, à défaut d'accord amiable." },
      { type: 'filet', titre: 'La clause léonine (Art. 54 al. 2)', texte: "Sont **réputées non écrites** les clauses attribuant à un associé la totalité du profit procuré par la société ou l'exonérant de la totalité des pertes, ainsi que celles excluant un associé totalement du profit ou mettant à sa charge la totalité des pertes. La sanction est chirurgicale : la clause est juridiquement inexistante, mais la société et le reste des statuts demeurent valables." },
      { type: 'paragraphe', texte: "**Le capital social** représente le montant des apports en capital faits par les associés, augmenté le cas échéant des incorporations de réserves, de bénéfices ou de primes (Art. 62). Son montant est **librement déterminé par les associés**, sauf minimum fixé par l'Acte uniforme en raison de la forme ou de l'objet (Art. 65) : si le capital n'atteint pas ce minimum, la société **ne peut être valablement constituée**, et s'il y est réduit en cours de vie, la société doit être dissoute à moins d'une recapitalisation au moins au minimum (Art. 66). Le capital est fixe - il ne peut être augmenté ou réduit que dans les conditions de la modification des statuts - sauf adoption du régime du **capital variable** (Art. 67 et 269-1 et suivants, réservé aux SA ne faisant pas appel public à l'épargne et aux SAS). Enfin, règle protectrice cardinale : **en aucun cas les engagements d'un associé ne peuvent être augmentés sans son consentement** (Art. 72)." },
      { type: 'paragraphe', texte: "**Réunion de tous les titres en une seule main (Art. 60).** Dans les sociétés dont la forme unipersonnelle n'est pas autorisée, la détention par un seul associé de tous les titres n'entraîne pas la dissolution de plein droit : tout intéressé peut demander la dissolution à la juridiction compétente si la situation n'a pas été régularisée **dans le délai d'un an**, la juridiction pouvant accorder un délai maximal de **six mois** pour régulariser - et ne pouvant prononcer la dissolution si la régularisation a eu lieu au jour où elle statue sur le fond." },
      { type: 'controle', question: QCM[10] },
      { type: 'controle', question: QCM[11] },
      { type: 'controle', question: QCM[12] },
    ],
  },
  {
    numero: '2.5',
    titre: 'Immatriculation, personnalité juridique et société en formation (Art. 73-80, 97-115)',
    navLabel: '2.5 Immatriculation et formation',
    blocs: [
      { type: 'paragraphe', texte: "À l'exception de la société en participation, **toute société doit être immatriculée** au registre du commerce et du crédit mobilier (Art. 97), et c'est de cette immatriculation que naît la personnalité : **« Toute société jouit de la personnalité juridique à compter de son immatriculation au registre du commerce et du crédit mobilier »** (Art. 98). La transformation régulière en une autre forme, la prorogation de la durée ou toute autre modification statutaire n'entraînent pas la création d'une personne juridique nouvelle (Art. 99)." },
      { type: 'filet', titre: 'La déclaration de régularité et de conformité (Art. 73-74-1)', texte: "Les fondateurs et les premiers membres des organes de gestion, d'administration et de direction doivent déposer au RCCM une déclaration indiquant toutes les opérations effectuées en vue de constituer régulièrement la société et attestant que la constitution a été réalisée en conformité avec l'Acte uniforme. Elle est **exigée à peine de rejet de la demande d'immatriculation** (Art. 73). Elle n'est pas requise lorsqu'une **déclaration notariée de souscription et de versement** a été établie et déposée (Art. 74). Et l'Art. 74-1 frappe de **nullité** les sociétés constituées en violation des articles 7, 8, 9, 20, 37 alinéa 1er et 40." },
      { type: 'carte', titre: 'Irrégularités de constitution : le régime (Art. 75-80)', tableau: { entetes: ['Situation', 'Sanction', 'Article'], lignes: [
        ['Mention statutaire manquante ou formalité omise/irrégulière', "Tout intéressé (et le ministère public) peut demander à la juridiction compétente d'ordonner, **sous astreinte**, la régularisation", 'Art. 75'],
        ["Prescription de l'action en régularisation", "Trois (3) ans à compter de l'immatriculation ou de la publication de l'acte modificatif", 'Art. 77'],
        ['Préjudice causé par le défaut d\'une mention ou d\'une formalité', 'Responsabilité **solidaire** des fondateurs et des premiers membres des organes de gestion, de direction ou d\'administration', 'Art. 78'],
        ["Prescription de l'action en responsabilité", 'Trois (3) ans à compter de l\'immatriculation ou de la publication de l\'acte modificatif', 'Art. 80'],
        ['Violation des Art. 7, 8, 9, 20, 37 al. 1er, 40', '**Nullité de la société**', 'Art. 74-1'],
      ] }, note: "L'esprit du texte est net : la régularisation d'abord, la nullité seulement pour les vices les plus graves touchant la qualité d'associé, la licéité de l'objet et l'obligation d'apport." },
      { type: 'paragraphe', texte: "**De la formation à l'immatriculation.** La société est *en formation* lorsqu'elle n'est pas encore constituée (Art. 100) ; elle est *constituée* à compter de la signature de ses statuts ou de leur adoption par l'assemblée générale constitutive - mais avant son immatriculation, son existence **n'est pas opposable aux tiers**, qui peuvent toutefois s'en prévaloir (Art. 101). Les **fondateurs** - toutes les personnes participant activement aux opérations conduisant à la constitution (Art. 102) - doivent être domiciliés sur le territoire d'un État partie, une simple boîte postale ne suffisant pas (Art. 103). Dès la signature des statuts, les **dirigeants sociaux se substituent aux fondateurs** et agissent au nom de la société constituée non encore immatriculée (Art. 104)." },
      { type: 'carte', titre: 'La reprise des actes et engagements (Art. 106-113)', tableau: { entetes: ['Situation', 'Mécanisme de reprise', 'Article'], lignes: [
        ['Actes des fondateurs *avant constitution*', "Décrits dans un « état des actes et engagements accomplis pour le compte de la société en formation », porté à la connaissance des associés avant la signature des statuts", 'Art. 106'],
        ['Société sans assemblée constitutive', "État annexé aux statuts : leur signature emporte reprise **dès l'immatriculation**", 'Art. 107'],
        ['Reprise après constitution', "Approbation par l'assemblée générale ordinaire, complètement informée ; les auteurs des actes **ne prennent pas part au vote**", 'Art. 108'],
        ['Société avec assemblée constitutive', 'Résolution spéciale de l\'assemblée constitutive', 'Art. 109'],
        ['Actes des dirigeants *après constitution, avant immatriculation*', "Mandat déterminé donné dans les statuts ou par acte séparé : l'immatriculation emporte reprise ; au-delà du mandat, reprise par AGO", 'Art. 111-112'],
        ['Effets', "Actes repris : réputés contractés par la société **dès l'origine**. Actes non repris : **inopposables à la société**, leurs souscripteurs tenus **solidairement et indéfiniment**", 'Art. 110'],
      ] } },
      { type: 'paragraphe', texte: "Deux figures voisines ferment ce dispositif : si les associés conviennent que la société ne sera **pas immatriculée**, elle est une *société en participation*, sans personnalité juridique, régie par les Art. 854 et suivants (Art. 114) ; et si le contrat de société n'est pas établi par écrit, rendant l'immatriculation impossible, la société - également dépourvue de personnalité juridique - relève des Art. 864 et suivants sur la *société de fait* (Art. 115). Ces deux formes font l'objet du chapitre 11 de ce module." },
      { type: 'controle', question: QCM[13] },
      { type: 'controle', question: QCM[14] },
      { type: 'controle', question: QCM[15] },
      { type: 'controle', question: QCM[16] },
      { type: 'controle', question: QCM[17] },
    ],
  },
  {
    numero: '2.6',
    titre: 'Publicité légale et panorama comparatif des formes (Art. 256-1 à 269)',
    navLabel: '2.6 Publicité et comparatif',
    blocs: [
      { type: 'paragraphe', texte: "La publicité légale porte l'existence de la société, ses caractéristiques et ses actes importants à la connaissance des tiers. La révision de 2014 l'a modernisée : les formalités peuvent être effectuées **par voie électronique** (Art. 256-1), et celles accomplies auprès du RCCM font l'objet d'avis insérés dans le **Bulletin national des registres du commerce et du crédit mobilier**, lorsqu'il existe, publié sur support papier ou sous forme électronique (Art. 256-2). Sont habilités à recevoir les annonces légales le journal officiel, les journaux habilités par les autorités compétentes, le Bulletin national, ainsi que les quotidiens nationaux d'information générale justifiant d'une vente effective, **paraissant depuis plus de six mois** et diffusés à l'échelle nationale (Art. 257)." },
      { type: 'filet', titre: "L'avis de constitution (Art. 261-262)", texte: "Lorsque les formalités de constitution ont été accomplies, un avis est inséré dans un journal habilité **dans les quinze (15) jours suivant l'immatriculation** (Art. 261). Signé par le notaire ou les fondateurs, il contient les cinq mentions communes à tout avis (dénomination et sigle, forme, capital, siège, numéro RCCM - Art. 257-1) et dix mentions propres : objet sommaire, durée, montant des apports en numéraire et en nature, nombre de titres émis par type d'apport, identité des associés tenus indéfiniment des dettes, identité des premiers dirigeants et commissaires aux comptes, références du dépôt et de l'immatriculation, partie libérée du capital, avantages particuliers stipulés (Art. 262)." },
      { type: 'carte', titre: 'Les formalités de publicité au fil de la vie sociale', tableau: { entetes: ['Événement', 'Formalité', 'Délai', 'Article'], lignes: [
        ['Constitution', "Avis dans un journal habilité de l'État partie du siège", "15 jours suivant l'immatriculation", 'Art. 261'],
        ['Modification des statuts rendant caduque une mention de l\'avis', 'Avis modificatif dans un journal habilité', '-', 'Art. 263'],
        ['Augmentation ou réduction du capital', 'Insertion + dépôt au greffe de la délibération certifiée conforme', '1 mois à compter de l\'assemblée', 'Art. 264'],
        ['Transformation', 'Insertion + dépôt de deux exemplaires du procès-verbal + inscription modificative au RCCM', '-', 'Art. 265'],
        ['Dépôt des états financiers de synthèse', 'Dépôt au RCCM (bilan, compte de résultat, TAFIRE, état annexé), possible par voie électronique', "1 mois suivant l'approbation", 'Art. 269'],
        ['Carence de publicité (hors constitution et modification des statuts)', "Mandataire désigné en justice pour accomplir la formalité, après mise en demeure restée vaine 1 mois", '-', 'Art. 259'],
      ] }, note: "Les formalités sont effectuées à la diligence et sous la responsabilité des représentants légaux (Art. 259). Pour le dépôt des états financiers, tout intéressé peut faire enjoindre le dirigeant sous astreinte, après requête amiable restée vaine trente jours (Art. 269)." },
      { type: 'paragraphe', texte: "**La SAS**, introduite par la révision de 2014, illustre la liberté statutaire maximale : instituée par **un ou plusieurs associés** (SASU pour l'unipersonnelle - Art. 853-1 et 853-2), ses statuts prévoient librement son organisation et son fonctionnement, le montant du capital et le nominal des actions (Art. 853-5). Les règles de la SA lui sont applicables par renvoi, à l'exception notable du capital minimum de l'article 387 alinéa 1er et des articles 414 à 561 sur l'administration (Art. 853-3). Elle **ne peut faire publiquement appel à l'épargne** (Art. 853-4), et sa transformation en SAS comme la fusion-absorption par une SAS exigent l'**unanimité** (Art. 853-6)." },
      { type: 'carte', titre: 'Panorama comparatif : constituer une société OHADA', tableau: { entetes: ['Critère', 'SNC', 'SCS', 'SARL', 'SA', 'SAS'], lignes: [
        ['Nombre d\'associés', '2 minimum', '2 minimum (1 commandité + 1 commanditaire)', '1 ou plusieurs (Art. 309)', '1 ou plusieurs (Art. 385)', '1 ou plusieurs (Art. 853-1)'],
        ['Capital minimum', 'Libre', 'Libre', '1 000 000 FCFA sauf dispositions nationales contraires (Art. 311) - libre en RDC*', '10 000 000 FCFA (Art. 387)', 'Fixé par les statuts (Art. 853-5)'],
        ['Titres émis', 'Parts sociales', 'Parts sociales', 'Parts sociales (nominal ≥ 5 000 FCFA, Art. 311)', 'Actions', 'Actions'],
        ['Libération du numéraire', 'Intégrale (Art. 41)', 'Intégrale (Art. 41)', 'Moitié à la souscription + solde sous 2 ans (Art. 311-1)', 'Quart à la souscription + solde sous 3 ans (Art. 389)', 'Comme la SA, par renvoi (Art. 853-3)'],
        ['Apport en industrie', 'Oui', 'Oui', 'Oui', '**Non** (Art. 50-1)', 'Oui - actions inaliénables (Art. 853-5)'],
        ['Responsabilité', 'Indéfinie et solidaire', 'Commandités : indéfinie et solidaire / Commanditaires : limitée', 'Limitée aux apports (Art. 309)', 'Limitée aux apports (Art. 385)', 'Limitée aux apports (Art. 853-1)'],
      ] }, note: "* En RDC, les arrêtés interministériels n° 002 et n° 243 du 30/12/2014 ont libéralisé le capital de la SARL, sur le fondement de la réserve « sauf dispositions nationales contraires » de l'Art. 311. La SA doit en outre avoir son capital entièrement souscrit avant la signature des statuts (Art. 388), et tant qu'il n'est pas entièrement libéré, elle ne peut ni augmenter son capital en numéraire ni émettre d'obligations (Art. 389)." },
      { type: 'controle', question: QCM[18] },
      { type: 'controle', question: QCM[19] },
      { type: 'controle', question: QCM[20] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'ec1',
    titre: 'La société KONGOMETAL SARL',
    contexte: "Trois personnes souhaitent créer KONGOMETAL SARL à Kinshasa : (A) M. BANZA, 42 ans, commerçant ; (B) Mme LUFUA, 16 ans, lycéenne non émancipée ; (C) HOLDING KASAI SA. Le capital est de 15 000 000 CDF. M. BANZA apporte 5 000 000 CDF en espèces. Mme LUFUA apporte un véhicule Toyota évalué à 6 000 000 CDF. HOLDING KASAI apporte ses compétences en gestion et son réseau commercial. Seuls 3 000 000 CDF en numéraire sont déposés à la banque lors de la constitution.",
    questions: [
      { num: 1, enonce: "Mme LUFUA (mineure) peut-elle être associée ?", correction: "Oui. L'Art. 8 AUSCGIE n'interdit aux mineurs et majeurs incapables que les sociétés dans lesquelles ils seraient tenus des dettes sociales au-delà de leurs apports. Dans une SARL, les associés ne répondent qu'à concurrence de leurs apports (Art. 309) : Mme LUFUA peut donc être associée, sa responsabilité étant limitée à la valeur du véhicule apporté, et elle agira représentée selon les règles applicables à son incapacité." },
      { num: 2, enonce: "L'apport de HOLDING KASAI est-il admissible ?", correction: "Oui, sous conditions strictes. L'apport de compétences et de services est un apport en industrie (Art. 40 3°), admis en SARL (il n'est interdit qu'en SA, Art. 50-1). Mais il ne concourt pas à la formation du capital social de 15 000 000 CDF (Art. 50-3) : il donne lieu à des titres ouvrant droit au vote et au partage des bénéfices, à charge de contribuer aux pertes, avec un double plafond de 25% (droits de vote, et part dans les bénéfices, l'actif net et les pertes). Les statuts doivent décrire l'apport et ses modalités de libération (Art. 50-2), et les titres reçus sont incessibles, intransmissibles et sans valeur nominale (Art. 50-4)." },
      { num: 3, enonce: "Un commissaire aux apports est-il obligatoire pour le véhicule de Mme LUFUA ?", correction: "Oui. L'Art. 312 AUSCGIE impose le contrôle par un commissaire aux apports dès que la valeur de l'apport en nature considéré (ou de l'ensemble des apports en nature) dépasse 5 000 000 FCFA. Le véhicule évalué à 6 000 000 dépasse ce seuil. À défaut de commissaire, ou si les associés retiennent une valeur différente de la sienne, ils sont solidairement responsables pendant cinq ans, à l'égard des tiers, de la valeur attribuée à l'apport." },
      { num: 4, enonce: "La libération du capital est-elle régulière ?", correction: "Oui. L'Art. 311-1 AUSCGIE exige que les parts en numéraire soient libérées, lors de la souscription, de la moitié au moins de leur valeur nominale : sur l'apport en numéraire de 5 000 000 CDF de M. BANZA, le minimum est donc 2 500 000 CDF. Or 3 000 000 CDF ont été déposés, ce qui satisfait la règle ; le surplus devra être libéré dans les deux ans de l'immatriculation. Les fonds, déposés contre récépissé en banque ou chez un notaire (Art. 313), restent indisponibles jusqu'à l'immatriculation (Art. 314). L'apport en nature (le véhicule), lui, doit être intégralement libéré dès la constitution (Art. 311-1)." },
    ],
  },
  {
    id: 'ec2',
    titre: 'La SNC des époux MUTOMBO',
    contexte: "M. MUTOMBO et Mme MUTOMBO (époux) ont créé ensemble la SNC MUTOMBO et Associés en 2020, avec un troisième associé M. NGANGA. En 2024, un créancier découvre que les deux époux sont associés solidairement et illimités dans la SNC et saisit le tribunal en invoquant l'Art. 9 AUSCGIE.",
    questions: [
      { num: 1, enonce: "La situation est-elle régulière ?", correction: "Non. L'Art. 9 AUSCGIE dispose que des époux ne peuvent être associés d'une société dans laquelle ils seraient tenus des dettes sociales indéfiniment ou solidairement - ce qui est précisément le régime de la SNC (Art. 270). Et l'Art. 74-1 sanctionne lourdement cette situation : les sociétés constituées en violation de l'article 9 sont nulles. La SNC MUTOMBO encourt donc la nullité." },
      { num: 2, enonce: "Quelles solutions s'offrent aux époux ?", correction: "Faire disparaître la cause de nullité avant que le juge ne statue : soit l'un des époux cède ses parts à un tiers ou à M. NGANGA (avec le consentement unanime des associés qu'exige l'Art. 274 pour toute cession de parts de SNC), soit la société est transformée en une forme où les époux peuvent légalement co-associer - SARL, SA ou SAS -, puisque leur responsabilité y est limitée aux apports. La transformation régulière ne crée pas de personne juridique nouvelle (Art. 99)." },
    ],
  },
  {
    id: 'ec3',
    titre: 'La clause léonine de la SA KIVU INVEST',
    contexte: "Les statuts de KIVU INVEST SA contiennent la clause suivante : « M. RUSIMBI, associé fondateur, bénéficiera de 40% des bénéfices nets annuels, quelle que soit sa quote-part dans le capital, et ne sera jamais tenu de contribuer aux pertes sociales. » M. RUSIMBI détient 10% du capital. Un associé minoritaire conteste cette clause.",
    questions: [
      { num: 1, enonce: "Cette clause est-elle valide ?", correction: "Non, pour sa composante léonine. L'Art. 54 al. 1 AUSCGIE permet certes de déroger à la proportionnalité des droits aux apports par clause statutaire ; une répartition inégalitaire des bénéfices n'est donc pas interdite en soi. Mais l'Art. 54 al. 2 répute non écrites les clauses exonérant un associé de la totalité des pertes - et la clause stipule précisément que M. RUSIMBI ne sera « jamais tenu de contribuer aux pertes sociales ». Cette exonération totale des pertes est léonine." },
      { num: 2, enonce: "Quelle est la sanction légale et ses conséquences ?", correction: "La clause est « réputée non écrite » (Art. 54 al. 2) : elle est juridiquement inexistante, sans que la validité de la société ni celle du reste des statuts en soient affectées. M. RUSIMBI contribuera aux pertes dans les conditions de droit commun de la SA. La stipulation d'avantages particuliers au profit d'un associé suppose par ailleurs, en SA, le contrôle d'un commissaire aux apports (Art. 400) et leur mention dans les statuts (Art. 13 9°)." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 2,
  id: 'ue2-chapitre-2',
  titre: 'Constitution des sociétés commerciales',
  sousTitre: 'Art. 4 à 115 et 256-1 à 269 AUSCGIE révisé du 30 janvier 2014',
  infoBulle: "La constitution des sociétés commerciales en droit OHADA : qualité d'associé, statuts, apports, titres sociaux, capital, immatriculation et publicité légale.",
  loiRef: 'Art. 4-115, 256-1 à 269 AUSCGIE',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    'Identifier qui peut être associé et les restrictions légales (Art. 7-9 AUSCGIE)',
    'Maîtriser la forme des statuts et leurs 13 mentions obligatoires (Art. 10-13 AUSCGIE)',
    "Distinguer les 3 types d'apports et leurs règles de libération (Art. 37-50-4, 311-1, 389)",
    "Comprendre la naissance de la personnalité juridique par l'immatriculation au RCCM (Art. 97-98)",
    "Appliquer les règles de publicité légale et d'opposabilité aux tiers (Art. 256-1 à 269)",
    'Analyser la clause léonine et le régime de la société en formation (Art. 54 al. 2, 100-113)',
  ],
  sections: SECTIONS,
  aRetenir: [
    "Toute personne physique ou morale peut être associée, sauf interdiction, incapacité ou incompatibilité (Art. 7) ; les mineurs, majeurs incapables et époux sont exclus des seules sociétés où ils seraient tenus des dettes au-delà de leurs apports ou indéfiniment et solidairement (Art. 8-9), la violation de ces règles à la constitution entraînant la nullité de la société (Art. 74-1).",
    "Les statuts - acte notarié ou acte authentifié déposé au rang des minutes d'un notaire, sauf dispositions nationales contraires (Art. 10) - contiennent 13 mentions obligatoires (Art. 13) ; toute société a une durée d'au plus 99 ans courant de l'immatriculation, dont l'expiration sans prorogation emporte dissolution de plein droit (Art. 28-30).",
    "Trois apports seulement sont admis - numéraire, nature, industrie - et « tout autre apport est interdit » (Art. 40) ; l'apport en industrie, prohibé en SA, ne concourt pas au capital et ses titres sont doublement plafonnés à 25% (Art. 50-1, 50-3).",
    "La libération du numéraire est intégrale à la constitution (Art. 41), sauf régimes spéciaux : moitié puis solde sous 2 ans en SARL (Art. 311-1), quart puis solde sous 3 ans en SA (Art. 389) ; le commissaire aux apports est obligatoire en SARL au-delà de 5 000 000 FCFA d'apports en nature et toujours en SA (Art. 312, 400).",
    "Les clauses léonines - totalité du profit à un associé, exonération totale des pertes, exclusion totale du profit, totalité des pertes à charge - sont réputées non écrites (Art. 54 al. 2), et les engagements d'un associé ne peuvent jamais être augmentés sans son consentement (Art. 72).",
    "La société jouit de la personnalité juridique à compter de son immatriculation au RCCM (Art. 98) ; la déclaration de régularité et de conformité est exigée à peine de rejet de l'immatriculation (Art. 73).",
    "Les actes accomplis pour le compte de la société en formation ne l'engagent que s'ils sont repris - état annexé aux statuts, AGO ou mandat (Art. 106-113) ; non repris, ils sont inopposables à la société et leurs souscripteurs en répondent solidairement et indéfiniment (Art. 110).",
    "La publicité légale s'accomplit par l'avis de constitution publié dans les 15 jours de l'immatriculation (Art. 261), les avis au Bulletin national des RCCM (Art. 256-2) et le dépôt des états financiers dans le mois de leur approbation (Art. 269).",
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)",
      precision: 'adopté le 30 janvier 2014 à Ouagadougou, art. 4 à 115, 256-1 à 269, 309 à 314, 385 à 400 et 853-1 à 853-6',
    },
    {
      genre: 'texte',
      intitule: 'Arrêtés interministériels n° 002 et n° 243 du 30 décembre 2014 (RDC)',
      precision: 'libéralisation du capital social de la SARL en République Démocratique du Congo',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : AUSCGIE révisé du 30 janvier 2014, art. 4 à 115, 256-1 à 269, 309 à 314, 385 à 400, 853-1 à 853-6 · Arrêtés interministériels RDC n° 002 et n° 243 du 30/12/2014',
}

export default chapitre
