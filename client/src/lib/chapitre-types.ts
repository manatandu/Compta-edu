// ─────────────────────────────────────────────────────────────────────────────
// MODÈLE DE DONNÉES D'UN CHAPITRE DE COURS
//
// Ce fichier définit la forme d'un chapitre, pas son apparence. Un chapitre
// n'est plus un composant React de 750 lignes recopié d'un chapitre à l'autre,
// mais un objet de données rendu par un moteur unique
// (components/chapitre/ChapitreManuscrit.tsx).
//
// Conséquence directe : une correction de forme (un bouton, une marge, une
// couleur) se fait à un seul endroit et bénéficie immédiatement à tous les
// chapitres, présents et futurs. Avant cette refonte, le composant
// CasPratiqueBlock était redéfini à l'identique dans 29 fichiers.
//
// Règle de rédaction : aucun HTML n'est interprété dans les chaînes de
// caractères. Deux marqueurs légers sont reconnus par le rendu en ligne
// (voir components/chapitre/TexteEnrichi.tsx) :
//   *italique*   pour une mise en relief
//   **fort**     pour une valeur saillante (gras, couleur d'accent)
// Tout le reste est du texte brut, échappé par React.
// ─────────────────────────────────────────────────────────────────────────────
import type { QCMChapitre } from './db'

/** Un cas pratique : un contexte, puis des questions à correction dépliable. */
export interface CasPratique {
  id: string
  titre: string
  contexte: string
  questions: { num: number; enonce: string; correction: string }[]
}

/** Tableau simple. Les cellules acceptent les marqueurs *italique* et **fort**. */
export interface Tableau {
  entetes: string[]
  lignes: string[][]
}

/**
 * Les cinq natures de blocs qui composent le corps d'une section. Ce
 * vocabulaire a été établi par relevé exhaustif des chapitres 1 à 6 d'UE1 :
 * il les couvre intégralement, sans recours à du JSX libre.
 */
export type Bloc =
  /** Paragraphe de corps de texte. Le premier de chaque section reçoit
   *  automatiquement la lettrine : ce n'est pas au rédacteur de le demander. */
  | { type: 'paragraphe'; texte: string }
  /** Encadré à filet vertical : citation de loi, mise en garde, point d'attention. */
  | { type: 'filet'; titre: string; texte: string }
  /** Carte sur fond papier : synthèse, tableau comparatif, note méthodologique. */
  | { type: 'carte'; titre: string; texte?: string; tableau?: Tableau; liste?: string[]; note?: string }
  /** Tableau posé directement dans le fil du texte, sans carte d'accueil. */
  | { type: 'tableau'; tableau: Tableau }
  /** Contrôle de lecture inséré au fil du texte, sur une question de la banque. */
  | { type: 'controle'; question: QCMChapitre }

export interface Section {
  /** Numérotation affichée, par exemple « 3.2 ». */
  numero: string
  /** Titre complet, affiché en tête de section. */
  titre: string
  /** Libellé court pour le rail de navigation latéral. */
  navLabel: string
  blocs: Bloc[]
}

/**
 * Référence bibliographique structurée plutôt que mise en forme à la main.
 * La typographie (italiques, guillemets, ponctuation) devient ainsi uniforme
 * sur l'ensemble du logiciel, au lieu de dépendre de la vigilance du rédacteur
 * chapitre par chapitre.
 */
export type Reference =
  | { genre: 'ouvrage'; auteur: string; titre: string; editeur: string; lieu: string; annee: string }
  | { genre: 'article'; auteur: string; titre: string; support: string; precision?: string }
  | { genre: 'texte'; intitule: string; precision?: string }

export interface Chapitre {
  /** Identifiant du module, par exemple « ue1 ». */
  ue: string
  /** Numéro du chapitre au sein du module. */
  numero: number
  /** Identifiant stable, utilisé notamment par le créateur de devoirs. */
  id: string
  titre: string
  /** Ligne de situation sous le titre (titre du Code, articles couverts). */
  sousTitre: string
  /** Texte de l'infobulle du titre. */
  infoBulle: string
  /** Référence légale affichée dans l'infobulle. */
  loiRef: string
  objectifs: string[]
  sections: Section[]
  aRetenir: string[]
  references: Reference[]
  qcm: QCMChapitre[]
  casPratiques: CasPratique[]
  /** Ligne de sources en pied de page. */
  sources: string
  /** Outil interactif rattaché au chapitre (simulateur, générateur...),
   *  hébergé sur sa propre page. Rendu en carte d'appel à la fin de la
   *  lecture, avant les parcours d'exercice. */
  outil?: { label: string; description: string; route: string }
  /** Cours de rattachement, pour la création de devoirs. */
  coursId: string
  /** Route du sommaire du module, pour le bouton de retour. */
  retourRoute: string
  /** Libellé du module dans le fil d'Ariane. */
  moduleLabel: string
}
