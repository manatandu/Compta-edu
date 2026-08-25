// ═══════════════════════════════════════════════════════════════════
//  DICTIONNAIRE ORBIT
//
//  Règle unique : aucune définition sans source. Le champ `source` est
//  obligatoire au niveau du type - TypeScript refuse un terme non sourcé.
//
//  Deux axes de classement, volontairement distincts :
//   • `domaine` - la discipline (donne la couleur et le filtre principal) ;
//   • `ues`     - les cours où le terme est enseigné, plusieurs possibles.
//  Un même terme relève souvent de plusieurs UE : « amortissement » est
//  enseigné en comptabilité générale, en comptabilité approfondie, en
//  fiscalité (dégressif) et en IFRS. Le forcer dans une seule UE le rendrait
//  introuvable depuis les autres - d'où la liste.
//  Une liste `ues` vide signifie « socle commun », sans rattachement.
//
//  Le gros du fonds vient du Titre VI de l'AUDCIF, glossaire officiel de
//  l'OHADA (592 termes), généré par scripts/generer-dictionnaire.js. Les
//  termes fiscaux et sociaux ci-dessous sont écrits à la main, chacun
//  rattaché à son article.
// ═══════════════════════════════════════════════════════════════════
import { TERMES_AUDCIF } from './dictionnaire-audcif'
import { TERMES_IFRS } from './dictionnaire-ifrs'
import { TERMES_DROIT } from './dictionnaire-droit'
import { TERMES_FINANCE } from './dictionnaire-finance'
import { TERMES_FINANCES_PUBLIQUES } from './dictionnaire-finances-publiques'
import { TERMES_AUDIT } from './dictionnaire-audit'
import { TERMES_MANAGEMENT } from './dictionnaire-management'

export type DomaineDict =
  | 'comptabilite'
  | 'normes-ifrs'
  | 'fiscalite'
  | 'droit'
  | 'finance'
  | 'finances-publiques'
  | 'audit'
  | 'management'

export interface TermeDict {
  id: string
  terme: string
  domaine: DomaineDict
  /** moduleKey des cours concernés (COURS_SYSTEME). Vide = socle commun. */
  ues: string[]
  definition: string
  /** Obligatoire : texte, article ou arrêté d'où la définition est tirée. */
  source: string
  exemple?: string
  voirAussi?: string[]
}

export const DOMAINES_DICT: Record<DomaineDict, string> = {
  comptabilite:        'Comptabilité',
  'normes-ifrs':       'Normes IAS/IFRS',
  fiscalite:           'Fiscalité',
  droit:               'Droit',
  finance:             'Finance',
  'finances-publiques': 'Finances publiques',
  audit:               'Audit',
  management:          'Management',
}

/** moduleKey → libellé court, pour le filtre « vocabulaire de mon cours ». */
export const UES_DICT: Record<string, string> = {
  'ue1-droit-travail':      'UE 1 - Droit du travail',
  'ue2-droit-societes':     'UE 2 - Droit des sociétés',
  'ue3-compta-societes':    'UE 3 - Comptabilité des sociétés',
  'fiscalite':              'UE 4 - Fiscalité',
  'ue5-finances-publiques': 'UE 5 - Finances publiques',
  'analyse-financiere':     'UE 6 - Analyse financière',
  'ue7-management':         'UE 7 - Management',
  'ue8-consolidation':      'UE 8 - Consolidation',
  'comptabilite-generale':  'UE 9 - Comptabilité générale',
  'ue10-compta-approfondie': 'UE 10 - Comptabilité approfondie',
  'controle-de-gestion':    'UE 11 - Contrôle de gestion',
  'ue12-audit':             'UE 12 - Audit',
  'ue13-ifrs-ias':          'UE 13 - Normes IAS/IFRS',
}

// ── Fiscalité et parafiscalité RDC ────────────────────────────────────
// Chaque définition renvoie à son article. Les taux et seuils ne sont
// jamais écrits de mémoire : ils sortent du texte cité.
const TERMES_FISCALITE: TermeDict[] = [
  {
    id: 'irpp',
    terme: 'IRPP (Impôt sur le Revenu des Personnes Physiques)',
    domaine: 'fiscalite',
    ues: ['fiscalite'],
    definition: "Impôt unique sur le revenu des personnes physiques, en vigueur depuis le 1er janvier 2026. Il remplace l'ancien système cédulaire (IPR sur les salaires, IM sur les mobiliers, IRL sur les locatifs) par un impôt unique appliqué à six catégories de revenus : revenus salariaux, bénéfices industriels et commerciaux, bénéfices non commerciaux, bénéfices agricoles, revenus de capitaux mobiliers et plus-values.",
    source: 'Art. 4 et 58 à 128, Loi n° 23/053 du 30 novembre 2023',
    voirAussi: ['is', 'bareme-progressif-irpp'],
  },
  {
    id: 'bareme-progressif-irpp',
    terme: 'Barème progressif de l’IRPP',
    domaine: 'fiscalite',
    ues: ['fiscalite'],
    definition: "Barème à quatre tranches appliqué au revenu net imposable : 3 % jusqu'à 162 000 FC par mois, 15 % de 162 001 à 1 800 000 FC, 30 % de 1 800 001 à 3 600 000 FC, 40 % au-delà. Les tranches annuelles valent douze fois les tranches mensuelles. Deux arrondis encadrent le calcul, et ils ne portent pas sur la même chose : en entrée, le revenu net s'arrondit au millier de francs inférieur avant application du barème ; en sortie, l'impôt s'arrondit à la centaine la plus proche. L'impôt total ne peut excéder 30 % du revenu imposable.",
    source: 'Art. 118, Loi n° 23/053 (barème, arrondi d’entrée, plafond) ; Art. 150 (arrondi de sortie)',
    exemple: "Revenu net de 2 000 000 FC/mois → arrondi à 2 000 000 → (162 000 × 3 %) + (1 638 000 × 15 %) + (200 000 × 30 %) = 4 860 + 245 700 + 60 000 = 310 560 → arrondi à 310 600 FC.",
    voirAussi: ['irpp', 'reduction-charges-famille'],
  },
  {
    id: 'reduction-charges-famille',
    terme: 'Réduction pour charges de famille',
    domaine: 'fiscalite',
    ues: ['fiscalite'],
    definition: "Réduction de 2 % de l'IRPP par personne à charge, dans la limite de neuf personnes. Seule la part d'impôt afférente aux trois premières tranches du barème ouvre droit à la réduction : la portion correspondant à la tranche à 40 % en est exclue. Ce n'est donc pas la réduction entière qui disparaît au-delà du seuil, mais la seule fraction qui s'y rapporte.",
    source: 'Art. 123 à 125, Loi n° 23/053',
    voirAussi: ['bareme-progressif-irpp'],
  },
  {
    id: 'arrondi-fiscal',
    terme: 'Arrondi de l’impôt',
    domaine: 'fiscalite',
    ues: ['fiscalite'],
    definition: "Règle d'arrondi commune à l'Impôt sur les Sociétés, à l'impôt minimum, à l'IRPP et à tous les autres prélèvements de la loi. L'impôt est d'abord arrondi à l'unité (décimale ≥ 5 vers le haut), puis la tranche restante est ramenée à la centaine de francs supérieure si elle atteint 50 FC, à la centaine inférieure sinon.",
    source: 'Art. 150, Loi n° 23/053',
    voirAussi: ['bareme-progressif-irpp', 'is'],
  },
  {
    id: 'is',
    terme: 'IS (Impôt sur les Sociétés)',
    domaine: 'fiscalite',
    ues: ['fiscalite', 'ue3-compta-societes'],
    definition: "Impôt sur l'ensemble des bénéfices réalisés par les sociétés et personnes morales, en vigueur depuis le 1er janvier 2026 en remplacement de l'impôt sur les bénéfices et profits (IBP). Le taux est de 30 % du résultat fiscal net. Lorsque le résultat est déficitaire, ou que l'impôt calculé est inférieur à ce seuil, un impôt minimum de 1 % du chiffre d'affaires déclaré s'applique.",
    source: 'Art. 3 à 57, Loi n° 23/053 ; taux à l’Art. 56, minimum à l’Art. 57',
    voirAussi: ['irpp', 'deficit-reportable'],
  },
  {
    id: 'deficit-reportable',
    terme: 'Déficit reportable',
    domaine: 'fiscalite',
    ues: ['fiscalite'],
    definition: "Perte d'un exercice imputable sur les bénéfices des exercices suivants, jusqu'au troisième exercice qui suit l'exercice déficitaire. Le report se perd en cas d'absence de déclaration après mise en demeure. Il ne se transmet pas : ni au repreneur d'une entreprise déficitaire, ni en cas de changement complet d'activité. Les pertes subies hors RDC ne sont pas déductibles.",
    source: 'Art. 51 et 52, Loi n° 23/053 (IS) ; Art. 101 pour les bénéfices non commerciaux',
    voirAussi: ['is'],
  },
  {
    id: 'iere',
    terme: 'IERE (prélèvement exceptionnel sur les rémunérations des expatriés)',
    domaine: 'fiscalite',
    ues: ['fiscalite'],
    definition: "Prélèvement de 25 % à la charge exclusive de l'employeur, dû par les entreprises employant du personnel expatrié. Il est assis sur les mêmes rémunérations que l'IRPP salarial, exemptions et immunités comprises : l'assiette est donc identique à celle de l'IRPP de l'expatrié avant déduction de la quote-part ouvrière. Il n'est pas déductible du bénéfice imposable. Le taux réduit de 10 % pour le secteur minier a disparu avec l'abrogation de l'Ordonnance-loi 69/007.",
    source: 'Art. 145 à 149, Loi n° 23/053 ; taux à l’Art. 148, renvoi aux immunités à l’Art. 147 ; non-déductibilité à l’Art. 50, 2°',
    voirAussi: ['irpp', 'immunites-indemnites'],
  },
  {
    id: 'immunites-indemnites',
    terme: 'Immunités sur indemnités et avantages',
    domaine: 'fiscalite',
    ues: ['fiscalite'],
    definition: "Les indemnités et avantages versés au salarié ne sont pas exonérés en bloc : chaque ligne s'apprécie séparément. L'indemnité de logement est exonérée dans la limite de 30 % de la rémunération, l'excédent redevenant imposable. L'indemnité de transport est exonérée sous conditions de réalité et de nécessité, plafonnée au coût du billet local. Les indemnités non visées par le texte - représentation, expatriation, autres avantages - restent intégralement imposables.",
    source: 'Art. 69, 8°, Loi n° 23/053',
    voirAussi: ['iere', 'assiette-securite-sociale'],
  },
  {
    id: 'assiette-securite-sociale',
    terme: 'Assiette des cotisations sociales',
    domaine: 'fiscalite',
    ues: ['fiscalite', 'ue1-droit-travail'],
    definition: "Les cotisations sociales sont assises sur l'ensemble de la rémunération du travailleur. En sont exclus : les soins de santé, l'indemnité de logement ou le logement en nature, les allocations familiales légales, l'indemnité de transport, les frais de voyage et les avantages accordés exclusivement pour faciliter l'accomplissement des fonctions. Tout le reste y entre. Cette assiette sociale ne se confond pas avec l'assiette fiscale de l'IRPP : les deux ne se recoupent pas terme à terme. L'assiette ne peut être inférieure au SMIG.",
    source: 'Art. 13, Loi n° 16/009 du 15 juillet 2016, renvoyant à l’Art. 7 litera h du Code du travail ; précisé par l’Art. 17 de l’Arrêté ministériel n° 146 du 05/12/2018',
    voirAussi: ['immunites-indemnites', 'cotisations-cnss'],
  },
  {
    id: 'cotisations-cnss',
    terme: 'Cotisations CNSS',
    domaine: 'fiscalite',
    ues: ['fiscalite', 'ue1-droit-travail'],
    definition: "Cotisations dues à la Caisse nationale de sécurité sociale pour le secteur privé, réparties en trois branches : prestations aux familles 6,5 %, à charge exclusive de l'employeur ; pensions 10 %, réparties à parts égales entre employeur et travailleur (5 % chacun) ; risques professionnels 1,5 %, à charge exclusive de l'employeur et pouvant être doublé en cas de non-conformité. Les taux transitoires de 2018 (pensions à 7 %) sont historiques et ne s'appliquent plus depuis le 1er janvier 2019.",
    source: 'Décret n° 18/041 du 24 novembre 2018, art. 2 à 5 et 10 ; charge exclusive à l’Art. 16 de la Loi n° 16/009',
    voirAussi: ['assiette-securite-sociale'],
  },
  {
    id: 'regimes-imposition',
    terme: 'Régimes d’imposition (micro, petite, réel)',
    domaine: 'fiscalite',
    ues: ['fiscalite'],
    definition: "Le régime applicable à une entreprise individuelle dépend de son chiffre d'affaires annuel hors taxes. Micro-entreprise jusqu'à 25 000 000 FC : impôt forfaitaire. Petite entreprise de 25 000 001 à 300 000 000 FC : impôt proportionnel de 1 % du chiffre d'affaires pour les ventes, 2 % pour les prestations de services. Régime réel au-delà de 300 000 000 FC : imposition du bénéfice réel au barème progressif, avec comptabilité complète obligatoire. Le passage au régime supérieur est immédiat dès dépassement du seuil.",
    source: 'Art. 105 à 113 (régimes et seuils) et Art. 127 à 128 (taux), Loi n° 23/053',
    voirAussi: ['irpp', 'impot-minimum'],
  },
  {
    id: 'impot-minimum',
    terme: 'Impôt minimum',
    domaine: 'fiscalite',
    ues: ['fiscalite'],
    definition: "Montant plancher dû lorsque l'impôt calculé est inférieur à un seuil, ou que le résultat est déficitaire. Il s'élève à 1 % du chiffre d'affaires déclaré, pour l'Impôt sur les Sociétés comme pour les bénéfices soumis au régime réel de l'IRPP.",
    source: 'Art. 57 (IS) et Art. 122 (IRPP), Loi n° 23/053',
    voirAussi: ['is', 'regimes-imposition'],
  },
  {
    id: 'retenue-capitaux-mobiliers',
    terme: 'Retenue sur revenus de capitaux mobiliers',
    domaine: 'fiscalite',
    ues: ['fiscalite'],
    definition: "Retenue à la source de 20 % opérée par le débiteur sur les revenus de capitaux mobiliers : dividendes, intérêts d'obligations et d'effets publics, intérêts de créances et de dépôts, produits de bons de caisse, indemnités de fonction et jetons de présence. Sont exonérés les intérêts des titres d'emprunt émis par l'État, les Provinces et les entités territoriales décentralisées, ainsi que les intérêts des comptes d'épargne. La retenue s'impute sur l'IRPP global du contribuable.",
    source: 'Art. 72 à 81 (revenus visés et exonérations) et Art. 120 à 121 (taux et imputation), Loi n° 23/053',
    voirAussi: ['irpp'],
  },
  {
    id: 'acomptes-provisionnels',
    terme: 'Acomptes provisionnels',
    domaine: 'fiscalite',
    ues: ['fiscalite'],
    definition: "Versements anticipés de l'impôt, calculés sur l'impôt déclaré de l'exercice précédent et non sur celui de l'exercice en cours : 30 % au plus tard le 25 juillet, 30 % au plus tard le 25 septembre et 20 % au plus tard le 25 novembre. Le solde est versé au dépôt de la déclaration annuelle. Un excédent d'acomptes constitue un crédit imputable sur d'autres impôts, mais non cessible.",
    source: 'Art. 57 bis et 57 ter de la Loi n° 004/2003 (procédures fiscales) ; échéances modifiées par la loi de finances n° 25/060 du 29 décembre 2025',
    voirAussi: ['is'],
  },
]

/**
 * Fonds complet : glossaire officiel AUDCIF (comptabilité), termes
 * fiscaux sourcés (Loi 23/053, Loi 16/009, décrets d'application), et
 * les six domaines complémentaires ci-dessus — chacun sourcé sur le
 * texte de norme, la loi ou l'ouvrage de référence approprié plutôt
 * que sur l'AUDCIF seul, qui ne couvre que la comptabilité générale.
 */
export const DICTIONNAIRE: TermeDict[] = [
  ...TERMES_AUDCIF,
  ...TERMES_FISCALITE,
  ...TERMES_IFRS,
  ...TERMES_DROIT,
  ...TERMES_FINANCE,
  ...TERMES_FINANCES_PUBLIQUES,
  ...TERMES_AUDIT,
  ...TERMES_MANAGEMENT,
]
  .sort((a, b) => a.terme.localeCompare(b.terme, 'fr'))
