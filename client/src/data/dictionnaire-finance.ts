// ═══════════════════════════════════════════════════════════════════
//  DICTIONNAIRE ORBIT — Domaine « Finance » (analyse financière)
//
//  Source : module CPCC d'analyse financière et diagnostic financier
//  (SYSCOHADA révisé), encodé dans le skill
//  `analyse-financiere-diagnostic-rdc`. Concepts d'équilibre financier
//  (FR/BF/trésorerie nette) et soldes intermédiaires de gestion
//  retraités, tels qu'utilisés par la page /analyse-financiere.
// ═══════════════════════════════════════════════════════════════════
import type { TermeDict } from './dictionnaire'

export const TERMES_FINANCE: TermeDict[] = [
  {
    id: 'analyse-financiere-def',
    terme: 'Analyse financière',
    domaine: 'finance',
    ues: ['analyse-financiere'],
    definition: "Ensemble de méthodes et de techniques qui permettent aux gestionnaires ainsi qu'aux différents partenaires intéressés par la vie d'une entité, pour diverses raisons, de porter un diagnostic sur la santé financière de celle-ci. Elle aide à la prise de décision et permet au gestionnaire d'apprécier sa gestion, d'évaluer, de contrôler et de mieux piloter l'entité qu'il conduit.",
    source: "Module CPCC d'analyse financière, section I",
    voirAussi: ['fonds-roulement', 'besoin-financement', 'tresorerie-nette'],
  },
  {
    id: 'fonds-roulement',
    terme: 'Fonds de roulement (FR)',
    domaine: 'finance',
    ues: ['analyse-financiere'],
    definition: "Part des ressources durables qui, n'étant pas absorbée par le financement de l'actif immobilisé, reste disponible pour financer les besoins liés au cycle d'exploitation. Deux modes de calcul, algébriquement équivalents : par le haut du bilan (ressources durables − actif immobilisé), qui seul explique l'origine du FR, ou par le bas du bilan (actif circulant + trésorerie-actif) − (passif circulant + trésorerie-passif), qui sert de contrôle.",
    source: "Module CPCC d'analyse financière, diagnostic de l'équilibre financier",
    exemple: "FR positif : les ressources stables excèdent les actifs fixes ; il se compare alors aux stocks pour apprécier sa suffisance. FR négatif : une partie des immobilisations est financée par des ressources circulantes — violation de la règle de l'équilibre financier minimum.",
    voirAussi: ['besoin-financement', 'tresorerie-nette'],
  },
  {
    id: 'besoin-financement',
    terme: "Besoin de financement (BF)",
    domaine: 'finance',
    ues: ['analyse-financiere'],
    definition: "Part des besoins cycliques (stocks + créances) dont le financement n'est pas assuré par les ressources cycliques (passif circulant) et se trouve donc à la charge de l'entreprise. Le besoin de financement global se décompose en besoin de financement d'exploitation (BFAO, cyclique) et besoin de financement hors activité ordinaire (BFHAO, acyclique).",
    source: "Module CPCC d'analyse financière, diagnostic de l'équilibre financier",
    exemple: "BF positif (fréquent dans les entreprises à cycle long) : à financer par le FR ou par des concours bancaires à court terme. BF nul : le crédit fournisseur suffit à financer les stocks.",
    voirAussi: ['fonds-roulement', 'tresorerie-nette'],
  },
  {
    id: 'tresorerie-nette',
    terme: 'Trésorerie nette',
    domaine: 'finance',
    ues: ['analyse-financiere'],
    definition: "Différence entre les ressources mises en œuvre pour financer l'activité (fonds de roulement) et les besoins entraînés par cette activité (besoin de financement) : Trésorerie nette = FR − BF = Trésorerie active − Trésorerie passive. Elle représente l'ensemble des disponibilités permettant de financer les dépenses à court terme.",
    source: "Module CPCC d'analyse financière, diagnostic de l'équilibre financier",
    voirAussi: ['fonds-roulement', 'besoin-financement'],
  },
  {
    id: 'valeur-ajoutee-retraitee',
    terme: 'Valeur ajoutée retraitée (VA*)',
    domaine: 'finance',
    ues: ['analyse-financiere'],
    definition: "Solde intermédiaire de gestion retraité, égal à la valeur ajoutée augmentée de la rémunération du personnel extérieur (compte 637), des impôts et taxes (compte 64) et des redevances de crédit-bail (compte 623). Ce retraitement neutralise des choix de gestion (recours à l'intérim, au crédit-bail) qui, sans lui, biaiseraient la comparaison entre entreprises. La valeur ajoutée non retraitée reste, elle, égale à la production diminuée des consommations intermédiaires.",
    source: "Module CPCC d'analyse financière, soldes intermédiaires de gestion retraités",
    voirAussi: ['ebe-retraite'],
  },
  {
    id: 'ebe-retraite',
    terme: 'Excédent brut d\'exploitation retraité (EBE*)',
    domaine: 'finance',
    ues: ['analyse-financiere'],
    definition: "VA* diminuée des charges de personnel, de la rémunération du personnel extérieur, des impôts et taxes et de la participation des travailleurs (compte 87). L'EBE non retraité reste égal à la valeur ajoutée diminuée des seules charges de personnel (compte 66).",
    source: "Module CPCC d'analyse financière, soldes intermédiaires de gestion retraités",
    voirAussi: ['valeur-ajoutee-retraitee'],
  },
  {
    id: 'resultat-exploitation-retraite',
    terme: "Résultat d'exploitation retraité (RE*)",
    domaine: 'finance',
    ues: ['analyse-financiere'],
    definition: "EBE* diminué des dotations aux amortissements, provisions et dépréciations, et de la quote-part d'amortissement de la redevance de crédit-bail. Le résultat d'exploitation non retraité reste égal aux produits d'exploitation diminués des charges d'exploitation.",
    source: "Module CPCC d'analyse financière, soldes intermédiaires de gestion retraités",
    voirAussi: ['ebe-retraite'],
  },
  {
    id: 'marge-commerciale-finance',
    terme: 'Marge commerciale',
    domaine: 'finance',
    ues: ['analyse-financiere'],
    definition: "Différence entre le chiffre d'affaires et le coût d'achat des marchandises vendues (achats corrigés de la variation de stocks). En unitaire : prix de vente unitaire moins coût d'achat unitaire. C'est le premier solde intermédiaire de gestion, propre aux activités commerciales.",
    source: "Module CPCC d'analyse financière, rappel des soldes non retraités",
    voirAussi: ['valeur-ajoutee-retraitee'],
  },
]
