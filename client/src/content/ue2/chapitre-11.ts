// Chapitre 11 du module UE2, Droit des sociétés : contenu pur.
// Migré depuis l'ancienne page dédiée UE2Chapitre11Page.tsx (contenu repris
// à l'identique) vers le moteur commun components/chapitre/ChapitreManuscrit.tsx.
import type { Chapitre } from '@/lib/chapitre-types'

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1', question: "Comment la société en participation est-elle définie par l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Une société immatriculée au RCCM mais sans personnalité morale" },
      { id: 'b', texte: "Une société que les associés ont convenu de ne pas immatriculer et qui n'est pas destinée à être connue des tiers" },
      { id: 'c', texte: "Une société qui ne peut exercer qu'une seule opération commerciale" },
      { id: 'd', texte: "Une société constituée entre époux uniquement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 854 AUSCGIE',
    explication: "L'Art. 854 AUSCGIE définit la société en participation comme celle que les associés ont convenu de ne pas immatriculer et qui n'est pas destinée à être connue des tiers.",
  },
  {
    id: 'q2', question: "La société en participation a-t-elle la personnalité morale ?",
    options: [
      { id: 'a', texte: "Oui, comme toute société commerciale OHADA" },
      { id: 'b', texte: "Oui, mais seulement à compter de l'immatriculation" },
      { id: 'c', texte: "Non, elle est dépourvue de personnalité morale (Art. 854 al. 2)" },
      { id: 'd', texte: "Seulement si les statuts le prévoient expressément" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 854 al. 2 AUSCGIE',
    explication: "L'Art. 854 al. 2 AUSCGIE dispose expressément que la société en participation est dépourvue de personnalité morale. Elle n'est pas immatriculée.",
  },
  {
    id: 'q3', question: "Les apports dans une société en participation sont-ils soumis aux règles de la copropriété ?",
    options: [
      { id: 'a', texte: "Non, chaque associé reste propriétaire de ses apports" },
      { id: 'b', texte: "Oui, chaque associé est propriétaire de ses apports en nature ou en numéraire ; les autres associés n'ont de droits que sur les bénéfices" },
      { id: 'c', texte: "Oui, les apports deviennent propriété de la société" },
      { id: 'd', texte: "Non, les apports sont mis en indivision automatiquement" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 856 AUSCGIE',
    explication: "L'Art. 856 AUSCGIE dispose que chaque associé est propriétaire de ses apports. Il ne les transfère pas à la société. Les autres associés ont des droits sur les bénéfices, non sur les apports.",
  },
  {
    id: 'q4', question: "Quel est l'associé qui s'engage vis-à-vis des tiers dans une société en participation à caractère commercial ?",
    options: [
      { id: 'a', texte: "Tous les associés solidairement" },
      { id: 'b', texte: "L'associé désigné comme gérant dans les statuts uniquement" },
      { id: 'c', texte: "L'associé qui agit pour son propre compte, en son nom personnel" },
      { id: 'd', texte: "La société en participation en tant que personne morale" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 858 AUSCGIE',
    explication: "L'Art. 858 AUSCGIE prévoit que chaque associé contracte en son nom personnel et est seul engagé envers les tiers avec lesquels il traite. Les tiers n'ont d'action que contre l'associé avec qui ils ont contracté.",
  },
  {
    id: 'q5', question: "Comment la société de fait est-elle définie par l'AUSCGIE ?",
    options: [
      { id: 'a', texte: "Une société dont l'acte constitutif est entaché de nullité" },
      { id: 'b', texte: "Une société immatriculée mais dont les activités sont contraires à la loi" },
      { id: 'c', texte: "La situation de deux ou plusieurs personnes qui se comportent comme des associés sans avoir constitué une société reconnue par l'AUSCGIE" },
      { id: 'd', texte: "Une société en nom collectif non immatriculée" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 864 AUSCGIE',
    explication: "L'Art. 864 AUSCGIE définit la société de fait comme la situation de deux ou plusieurs personnes physiques ou morales qui, sans avoir constitué entre elles une société reconnue par l'AUSCGIE, se comportent comme des associés.",
  },
  {
    id: 'q6', question: "Quelle forme sociale s'applique à la société de fait lorsqu'elle existe entre plusieurs personnes ?",
    options: [
      { id: 'a', texte: "Les règles de la SARL lui sont appliquées par défaut" },
      { id: 'b', texte: "Les règles de la société en nom collectif (SNC) lui sont appliquées" },
      { id: 'c', texte: "Elle est soumise aux règles de la société civile" },
      { id: 'd', texte: "Aucune règle spécifique ne lui est applicable" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 865 AUSCGIE',
    explication: "L'Art. 865 AUSCGIE dispose que les règles de la société en nom collectif (SNC) sont applicables à la société de fait entre plusieurs personnes, notamment la responsabilité illimitée et solidaire de tous les associés.",
  },
  {
    id: 'q7', question: "Un tiers peut-il invoquer l'existence d'une société de fait ?",
    options: [
      { id: 'a', texte: "Non, seuls les associés peuvent invoquer la société de fait" },
      { id: 'b', texte: "Oui, les associés et les tiers peuvent se prévaloir de l'existence d'une société de fait" },
      { id: 'c', texte: "Oui, mais uniquement si la société de fait a été immatriculée" },
      { id: 'd', texte: "Non, la société de fait est réservée aux seuls associés" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 866 AUSCGIE',
    explication: "L'Art. 866 AUSCGIE précise que l'existence d'une société de fait peut être invoquée par les associés eux-mêmes et par les tiers. Cela permet aux créanciers de poursuivre les associés.",
  },
  {
    id: 'q8', question: "Comment prend fin la société en participation à durée indéterminée ?",
    options: [
      { id: 'a', texte: "Elle ne peut jamais prendre fin" },
      { id: 'b', texte: "Par une décision unanime de tous les associés uniquement" },
      { id: 'c', texte: "Par la dissolution judiciaire uniquement" },
      { id: 'd', texte: "Par la notification de la décision de dissolution aux autres associés, sans qu'il soit nécessaire de justifier cette décision" },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 862 AUSCGIE',
    explication: "L'Art. 862 AUSCGIE dispose que la société en participation à durée indéterminée prend fin par la notification de la décision de dissolution à tous les associés, à condition que cette décision ne soit pas de mauvaise foi ni intempestive.",
  },
  {
    id: 'q9', question: "Quel est le régime applicable aux associés dans une société en participation à caractère civil ?",
    options: [
      { id: 'a', texte: "Responsabilité solidaire et illimitée" },
      { id: 'b', texte: "Responsabilité limitée à leurs apports" },
      { id: 'c', texte: "Chaque associé ne supporte les pertes que proportionnellement à sa part et les tiers n'ont d'action que contre l'associé avec qui ils ont traité" },
      { id: 'd', texte: "Aucune responsabilité envers les tiers" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 859 AUSCGIE',
    explication: "L'Art. 859 AUSCGIE prévoit que dans la société en participation à caractère civil, chaque associé ne supporte les pertes que proportionnellement à sa part. Les créanciers ne peuvent agir que contre l'associé contractant.",
  },
  {
    id: 'q10', question: "La société en participation peut-elle être prouvée par tous moyens ?",
    options: [
      { id: 'a', texte: "Non, elle doit être prouvée par écrit uniquement" },
      { id: 'b', texte: "Non, elle doit être notariée" },
      { id: 'c', texte: "Oui, entre associés et par les tiers, par tous moyens" },
      { id: 'd', texte: "Seulement par témoignage" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 857 AUSCGIE',
    explication: "L'Art. 857 AUSCGIE dispose que l'existence et le contenu de la société en participation peuvent être prouvés par tous moyens entre les associés et par les tiers.",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '11.1',
    titre: 'La société en participation : définition et constitution',
    navLabel: '11.1 SEP : définition et constitution',
    blocs: [
      { type: 'paragraphe', texte: "La **société en participation (SEP)** est définie par l'Art. 854 de l'AUSCGIE comme la société que les associés ont convenu de ne pas immatriculer. Elle n'est pas destinée à être connue des tiers et est **dépourvue de personnalité morale**." },
      { type: 'carte', titre: 'Caractéristiques essentielles (Art. 854)', tableau: { entetes: ['Caractéristique', 'Règle', 'Article'], lignes: [
        ['Personnalité morale', 'Aucune : la SEP est dépourvue de personnalité morale', 'Art. 854 al. 2'],
        ['Immatriculation', "Aucune : les associés ont convenu de ne pas l'immatriculer", 'Art. 854 al. 1'],
        ['Connaissance des tiers', 'Non destinée à être connue des tiers (principe)', 'Art. 854 al. 1'],
        ['Objet', 'Peut être civile ou commerciale', 'Art. 854'],
        ['Durée', 'Déterminée ou indéterminée selon les statuts', 'Art. 854'],
      ] } },
      { type: 'paragraphe', texte: "Contrairement aux sociétés à personnalité morale, les apports dans la SEP ne sont pas transférés à une entité juridique. L'Art. 856 AUSCGIE dispose que **chaque associé reste propriétaire de ses apports** en numéraire ou en nature, sauf convention contraire entre les associés. Pour les apports en numéraire, chaque associé conserve la propriété des fonds qu'il met à disposition : ils ne forment pas un capital social. Pour les apports en nature, l'associé reste propriétaire du bien et en permet seulement la jouissance ou l'utilisation par la SEP." },
      { type: 'filet', titre: 'Constitution', texte: "La SEP peut être constituée verbalement ou par écrit. Aucune forme solennelle n'est imposée. Elle peut résulter de la simple volonté des parties de collaborer sans créer une structure immatriculée (Art. 854)." },
      { type: 'controle', question: QCM[0] },
      { type: 'controle', question: QCM[1] },
    ],
  },
  {
    numero: '11.2',
    titre: 'Régime juridique de la SEP : preuve, gestion, responsabilité',
    navLabel: '11.2 SEP : preuve et responsabilité',
    blocs: [
      { type: 'paragraphe', texte: "La SEP fonctionne selon des règles propres organisant la **preuve de son existence**, la **gestion interne** et la **responsabilité des associés vis-à-vis des tiers**." },
      { type: 'filet', titre: "Preuve de l'existence de la SEP (Art. 857)", texte: "L'Art. 857 AUSCGIE prévoit que l'existence et le contenu de la société en participation peuvent être prouvés **par tous moyens**, tant entre les associés qu'à l'égard des tiers. Ce principe de liberté de preuve est une dérogation importante aux formalités des sociétés classiques." },
      { type: 'carte', titre: 'Responsabilité selon la nature de la SEP (Art. 858-860)', tableau: { entetes: ['Nature', 'Régime de responsabilité', 'Article'], lignes: [
        ['SEP commerciale', "Chaque associé contracte en son nom personnel et est seul engagé envers les tiers avec qui il a traité. Les autres associés ne sont pas engagés.", 'Art. 858'],
        ['SEP civile', "Chaque associé ne supporte les pertes que proportionnellement à sa part. Les tiers n'ont d'action que contre l'associé avec qui ils ont contracté.", 'Art. 859'],
        ['SEP avec révélation aux tiers', "Si un associé révèle sa participation à un tiers et que ce tiers l'accepte, cet associé est alors engagé vis-à-vis du tiers même s'il n'a pas personnellement contracté.", 'Art. 860'],
      ] } },
      { type: 'paragraphe', texte: "L'Art. 861 AUSCGIE prévoit que les associés peuvent librement organiser la gestion de la SEP dans leurs statuts. **En l'absence de statuts**, les rapports entre associés sont régis par les règles de la société en nom collectif (SNC), notamment la règle de la gestion par l'un quelconque des associés." },
      { type: 'filet', titre: 'Conséquence pratique', texte: "La SEP est très utilisée dans les opérations de co-promotion immobilière, les coentreprises ponctuelles et les groupements d'entreprises pour la réalisation d'un projet unique, car elle évite les formalités et les coûts de constitution d'une société immatriculée." },
      { type: 'controle', question: QCM[2] },
      { type: 'controle', question: QCM[3] },
    ],
  },
  {
    numero: '11.3',
    titre: 'La dissolution de la SEP',
    navLabel: '11.3 Dissolution de la SEP',
    blocs: [
      { type: 'paragraphe', texte: "La dissolution de la SEP est régie par les Art. 862 et 863 de l'AUSCGIE. Son régime varie selon que la société a été constituée pour une durée déterminée ou indéterminée." },
      { type: 'carte', titre: 'Modes de dissolution (Art. 862)', tableau: { entetes: ['Hypothèse', 'Règle', 'Article'], lignes: [
        ['SEP à durée déterminée', "Elle prend fin à l'expiration du terme prévu. Elle peut aussi être dissoute avant ce terme par décision unanime des associés, ou par la survenance des événements prévus dans les statuts comme causes de dissolution (décès d'un associé, réalisation de l'objet social, etc.).", 'Art. 862 al. 1'],
        ['SEP à durée indéterminée', "Chaque associé peut demander la dissolution à tout moment en notifiant sa décision à tous les autres associés. Cette décision ne doit pas être intempestive (prise à un moment inopportun causant un préjudice aux coassociés) ni de mauvaise foi.", 'Art. 862 al. 2'],
        ['Dissolution judiciaire', "Tout associé peut demander au tribunal la dissolution anticipée pour juste motif (mésentente grave paralysant le fonctionnement, inexécution des obligations par un associé, etc.).", 'Art. 862 al. 3'],
      ] } },
      { type: 'paragraphe', texte: "L'Art. 863 AUSCGIE prévoit qu'à la dissolution de la SEP, chaque associé **reprend ses apports**. S'il y a des biens mis en commun au cours de l'exploitation, les associés procèdent à leur partage ou les reprennent selon les modalités convenues dans les statuts ou, à défaut, par accord entre eux." },
      { type: 'filet', titre: 'Absence de liquidateur', texte: "Contrairement aux sociétés immatriculées, la SEP ne passe pas par une procédure formelle de liquidation avec un liquidateur. Les associés règlent directement entre eux les conséquences de la dissolution." },
      { type: 'controle', question: QCM[4] },
      { type: 'controle', question: QCM[5] },
    ],
  },
  {
    numero: '11.4',
    titre: 'La société de fait : définition et qualification',
    navLabel: '11.4 Société de fait : qualification',
    blocs: [
      { type: 'paragraphe', texte: "La **société de fait** est définie par l'Art. 864 AUSCGIE comme la situation de deux ou plusieurs personnes physiques ou morales qui, **sans avoir constitué entre elles une société reconnue par l'AUSCGIE**, se comportent en fait comme des associés." },
      { type: 'carte', titre: 'Éléments constitutifs de la société de fait (Art. 864)', liste: [
        "**Apports réciproques** : chaque personne contribue à une activité commune (argent, biens, travail, compétences).",
        "**Vocation aux résultats** : les personnes partagent les bénéfices ou supportent les pertes ensemble.",
        "**Affectio societatis** : intention de collaborer sur un pied d'égalité, dans l'intérêt commun, sans lien de subordination.",
      ] },
      { type: 'carte', titre: 'Différence SEP / société de fait', tableau: { entetes: ['Critère', 'SEP (Art. 854)', 'Société de fait (Art. 864)'], lignes: [
        ['Volonté des parties', "Volonté délibérée de créer une société sans l'immatriculer", 'Comportement de fait sans volonté consciente de créer une société'],
        ['Statuts', 'Peuvent exister (écrits ou verbaux)', 'Absents le plus souvent'],
        ['Origine', 'Contractuelle (accord conscient)', "Comportementale (résultat d'une situation de fait)"],
        ['Régime applicable', 'Règles propres à la SEP (Art. 854 à 863)', 'Règles de la SNC appliquées (Art. 865)'],
      ] } },
      { type: 'paragraphe', texte: "L'Art. 866 AUSCGIE précise que l'existence d'une société de fait peut être invoquée par **les associés eux-mêmes** (pour réclamer le partage des bénéfices par exemple) et par **les tiers** (pour engager la responsabilité de tous les associés de fait). Cette double faculté d'invocation distingue la société de fait d'une simple société nulle." },
      { type: 'controle', question: QCM[6] },
      { type: 'controle', question: QCM[7] },
    ],
  },
  {
    numero: '11.5',
    titre: 'Le régime juridique de la société de fait',
    navLabel: '11.5 Régime de la société de fait',
    blocs: [
      { type: 'paragraphe', texte: "La société de fait est soumise à un régime juridique résultant de l'application des règles de la SNC, avec des spécificités liées à son origine informelle. L'Art. 865 AUSCGIE dispose que **les règles de la SNC s'appliquent à la société de fait entre plusieurs personnes**, ce qui emporte des conséquences importantes." },
      { type: 'carte', titre: "Conséquences de l'application des règles de la SNC (Art. 865)", liste: [
        "**Responsabilité indéfinie et solidaire** : tous les associés de fait sont responsables indéfiniment et solidairement des dettes nées de l'activité commune. Un créancier peut poursuivre n'importe lequel d'entre eux pour la totalité de la dette.",
        "**Qualité de commerçant** : si l'activité est commerciale, tous les associés de fait acquièrent la qualité de commerçant, avec toutes les obligations qui y sont attachées (immatriculation au RCCM à titre personnel, respect des obligations comptables, etc.).",
        "**Interdiction d'associés** : les personnes frappées d'une interdiction de commercer ou d'incapacité légale ne peuvent pas être associés de fait dans une activité commerciale sans engager leur responsabilité pénale.",
      ] },
      { type: 'carte', titre: 'Dissolution de la société de fait (Art. 867-868)', tableau: { entetes: ['Mode de dissolution', 'Règle', 'Article'], lignes: [
        ["Cessation d'activité commune", 'La dissolution intervient lorsque les personnes cessent de se comporter comme des associés', 'Art. 867'],
        ['Dissolution judiciaire', 'Tout associé de fait peut saisir le tribunal pour faire constater et liquider la société de fait', 'Art. 867'],
        ['Partage des biens communs', "Les biens acquis ou générés dans le cadre de l'activité commune sont partagés en proportion des apports de chacun, selon les règles de l'indivision", 'Art. 868'],
      ] } },
      { type: 'controle', question: QCM[8] },
      { type: 'controle', question: QCM[9] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cp1',
    titre: 'Qualification de société de fait',
    contexte: "KABAMBA et NZINGA exploitent ensemble un restaurant depuis 2 ans. Ils partagent les bénéfices et les pertes, prennent les décisions ensemble, mais n'ont jamais signé de statuts ni demandé d'immatriculation. Un fournisseur MATADI FOODS réclame le paiement de factures impayées et poursuit les deux. (Art. 864-866 AUSCGIE)",
    questions: [
      { num: 1, enonce: "Peut-on qualifier cette situation de société de fait ?", correction: "Oui. L'Art. 864 AUSCGIE définit la société de fait comme la situation de deux ou plusieurs personnes qui se comportent comme des associés sans avoir constitué une société reconnue par l'AUSCGIE. En l'espèce, les 3 éléments constitutifs sont réunis : apports (participation à l'exploitation), vocation aux résultats (partage bénéfices/pertes), affectio societatis (décisions conjointes)." },
      { num: 2, enonce: "Quel régime de responsabilité s'applique à KABAMBA et NZINGA vis-à-vis de MATADI FOODS ?", correction: "En vertu de l'Art. 865 AUSCGIE, la société de fait entre plusieurs personnes est soumise aux règles de la SNC. Les associés de fait sont donc responsables indéfiniment et solidairement des dettes sociales. MATADI FOODS peut donc poursuivre KABAMBA et NZINGA solidairement pour le tout, sans avoir à diviser sa demande." },
    ],
  },
  {
    id: 'cp2',
    titre: 'Société en participation et responsabilité',
    contexte: "MBUYI et TSHIBANDA créent une société en participation pour réaliser un seul chantier de construction. Ils décident expressément de ne pas l'immatriculer. MBUYI signe un contrat de fourniture de matériaux avec GOMA SUPPLIES au nom de la SEP. Le chantier ne génère pas suffisamment de revenus. GOMA SUPPLIES réclame le paiement à MBUYI et TSHIBANDA solidairement. (Art. 854-862 AUSCGIE)",
    questions: [
      { num: 1, enonce: "La société en participation a-t-elle la personnalité morale ? Peut-elle ester en justice ?", correction: "Non. L'Art. 854 al. 2 AUSCGIE dispose expressément que la société en participation est dépourvue de personnalité morale. Elle ne peut donc pas ester en justice, acquérir des biens, ni être immatriculée." },
      { num: 2, enonce: "GOMA SUPPLIES peut-il poursuivre TSHIBANDA pour les dettes contractées par MBUYI ?", correction: "En principe, non. L'Art. 858 AUSCGIE prévoit que dans la SEP à caractère commercial, chaque associé contracte en son nom personnel et est seul engagé envers les tiers. MBUYI ayant signé seul le contrat avec GOMA SUPPLIES, c'est lui seul qui est engagé. GOMA SUPPLIES ne peut pas poursuivre TSHIBANDA, sauf si TSHIBANDA a révélé sa participation à GOMA SUPPLIES et accepté d'être engagé (Art. 860)." },
    ],
  },
]

export const chapitre: Chapitre = {
  ue: 'ue2',
  numero: 11,
  id: 'ue2-ch11',
  titre: 'Société en participation et société de fait',
  sousTitre: 'Art. 854 à 868 AUSCGIE révisé du 30 janvier 2014',
  infoBulle: 'Sociétés sans personnalité morale en droit OHADA : la société en participation (volontairement non immatriculée) et la société de fait (comportement d\'associés sans société constituée).',
  loiRef: 'Art. 854-868 AUSCGIE',
  moduleLabel: 'UE 2 · Droit des sociétés',
  retourRoute: '/ue2-droit-societes',
  coursId: 'ue2-droit-societes',
  objectifs: [
    "Distinguer la société en participation de la société de fait selon l'AUSCGIE",
    "Identifier les caractéristiques essentielles de la SEP : absence de personnalité morale, non-immatriculation (Art. 854)",
    "Appliquer les règles de responsabilité des associés de la SEP selon son caractère civil ou commercial (Art. 858-859)",
    "Qualifier une situation de société de fait et appliquer le régime de la SNC (Art. 864-865)",
    "Maîtriser les modes de preuve et de dissolution de ces deux formes (Art. 857, 862-863)",
  ],
  sections: SECTIONS,
  aRetenir: [
    'La SEP (Art. 854) n\'a ni personnalité morale ni immatriculation : elle n\'est connue que des seuls associés, et chaque associé reste propriétaire de ses apports, sans transfert à une personne morale (Art. 856).',
    'Dans la SEP commerciale, seul l\'associé contractant est engagé envers les tiers (Art. 858) ; dans la SEP civile, chaque associé ne supporte les pertes qu\'à proportion de sa part (Art. 859) ; la révélation acceptée de sa participation engage l\'associé même non contractant (Art. 860).',
    'L\'existence et le contenu de la SEP se prouvent par tous moyens, entre associés comme à l\'égard des tiers (Art. 857).',
    'La société de fait (Art. 864) résulte du comportement d\'associés sans société formellement constituée : les règles de la SNC s\'y appliquent, avec responsabilité indéfinie et solidaire de tous les associés de fait (Art. 865).',
    'La société de fait peut être invoquée aussi bien par les associés que par les tiers (Art. 866) ; ses biens communs se partagent selon les règles de l\'indivision, en proportion des apports (Art. 868).',
  ],
  references: [
    {
      genre: 'texte',
      intitule: "Acte uniforme révisé relatif au droit des sociétés commerciales et du groupement d'intérêt économique (AUSCGIE)",
      precision: 'adopté le 30 janvier 2014 à Ouagadougou, art. 854 à 868',
    },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: 'Sources : AUSCGIE révisé du 30 janvier 2014, art. 854 à 868',
}

export default chapitre
