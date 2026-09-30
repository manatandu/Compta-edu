// ===================== TYPES =====================

// Définition unique dans lib/planComptable.ts, réexportée pour les écrans qui
// importent leurs types depuis ce fichier.
export type { CompteOHADA } from './planComptable'

export interface Session {
  id: string
  nom: string
  exercice: number
  description?: string
  dateCreation: string
  userId: string
  faculteId?: string       // isolation : faculté de l'étudiant
  universiteId?: string    // isolation : université de l'étudiant
  coursId?: string         // isolation : cours lié
  verrouille?: boolean     // true = figé après soumission devoir
  devoirId?: string        // lié à un devoir spécifique
  exerciceLibreId?: string // lié à un exercice libre pratique (écritures au journal)
}

export interface Ecriture {
  id: string
  sessionId: string
  ligneGroupe: string
  date: string
  libelle: string
  numeroPiece?: string   // optionnel : n° facture, reçu, etc.
  numeroCompte: string
  intituleCompte: string
  debit: number
  credit: number
  userId: string
  faculteId?: string     // isolation : faculté de l'étudiant
  universiteId?: string  // isolation : université de l'étudiant
  coursId?: string       // isolation : cours lié
}

export type UserRole = 'admin' | 'professeur' | 'assistant' | 'etudiant'

// Cours disponibles : définit l'accès aux modules
export type CoursInscrit = 'syscohada' | 'sycebnl' | 'les-deux'

export interface User {
  id: string
  username: string
  password?: string  // n'est plus stocké dans Firestore ; reste utile au formulaire de création
  nom: string
  prenom?: string
  role: UserRole
  dateCreation: string
  actif: boolean
  universiteId?: string   // null = étudiant indépendant
  faculteId?: string      // faculté de rattachement (tous rôles)
  classe?: string         // ex: L1 Comptabilité (promotion)
  telephone?: string
  cours?: CoursInscrit    // pour les étudiants : module(s) auxquels ils ont accès
  coursIds?: string[]     // IDs des cours auxquels l'étudiant est inscrit
  createdBy?: string      // userId de l'admin/prof qui a créé ce compte
  statutInscription?: 'en_attente' | 'valide' | 'refuse'  // null = créé directement par admin (actif)
}

export interface LigneSolution {
  id: string
  numeroCompte: string
  intitule: string
  sens: 'D' | 'C'   // D = Débit, C = Crédit
  montant: string
}

export interface QCMOption { id: string; texte: string; correct: boolean }
export interface QCMQuestion { id: string; question: string; options: QCMOption[] }

export interface Exercice {
  id: string
  sessionId: string
  titre: string
  description: string
  instructions: string
  // Nouveaux champs formulaire pédagogique
  difficulte?: 'Facile' | 'Moyen' | 'Difficile'
  categorie?: string
  contexte?: string           // Contexte / Énoncé
  questions?: string[]        // Questions théoriques (texte libre)
  qcm?: QCMQuestion[]         // Questions QCM avec choix A/B/C/D
  solution?: LigneSolution[]  // Écritures corrigées
  explicationCorrige?: string // Explication du corrigé
  ecrituresAttendues: any[]
  bareme: { compte: number; sens: number; montant: number; equilibre: number }
  dateCreation: string
  userId: string
  // Requis par firestore.rules pour autoriser update/delete (isProf() &&
  // createdBy()) - distinct de userId par convention avec les autres
  // collections prof-créées (cours, devoirs, documents), même si ici les
  // deux valent la même chose (l'auteur de l'exercice).
  createdBy?: string
  actif: boolean
  pdfData?: string            // base64 du PDF joint
  pdfNom?: string
  coursId?: string            // cours auquel appartient l'exercice
  promotionId?: string        // isolation : promotion ciblée
  faculteId?: string          // isolation : faculté du cours
  universiteId?: string       // isolation : université du cours
}

export interface Tentative {
  id: string
  exerciceId: string
  userId: string
  ecritures: any[]
  score: number
  dateCreation: string
  corrections: any[]
  duree?: number  // en secondes
  modeEntrainement?: boolean
  promotionId?: string   // isolation : promotion de l'étudiant
  coursId?: string       // isolation : cours lié
}

export interface Document {
  id: string
  titre: string
  contenu: string
  type: string
  userId: string
  // Requis par firestore.rules (hasAll(['createdBy']) à la création, exploité
  // par createdBy() pour update/delete) - distinct de userId par convention
  // avec les autres collections prof-créées (cours, devoirs, exercices...),
  // même si ici les deux valent la même chose (l'auteur du document).
  createdBy?: string
  dateCreation: string
  folderId?: string
  pdfData?: string    // base64 du fichier PDF joint
  pdfNom?: string     // nom original du fichier
  promotionId?: string  // isolation : promotion ciblée (null = visible par tous)
  coursId?: string      // isolation : cours ciblé (null = visible dans tous les cours)
}

export interface Message {
  id: string
  expediteurId: string
  destinataireId?: string
  contenu: string
  date: string
  lu: boolean
  // [expediteurId, destinataireId] — posé par saveMessageAsync ; c'est le seul
  // champ sur lequel firestore.rules autorise la lecture (array-contains).
  participants?: string[]
}

export interface Universite {
  id: string
  nom: string
  ville?: string
  adresse?: string
  logo?: string
  adminId: string
}

export interface Faculte {
  id: string
  nom: string             // ex: "Faculté des Sciences Économiques"
  description?: string
  universiteId: string    // liée à une université
  dateCreation: string
  actif: boolean
}

export interface Cours {
  id: string
  nom: string             // ex: "Comptabilité Générale L1"
  description?: string
  faculteId: string       // lié à une faculté
  universiteId: string    // redondant pour requêtes rapides
  promotion?: string      // ex: 'L1', 'L2', 'M1' - null = visible toutes promotions
  dateCreation: string
  createdBy: string
  // Admin propriétaire de ce cours (repris de l'université - voir
  // firestore.rules, qui l'exige à la création). Optionnel côté type car les
  // cours système créés par initCoursSystemeAsync() n'ont pas d'université ;
  // ownsCours()/sameAdmin() dans firestore.rules gèrent son absence.
  adminId?: string
  actif: boolean
  systeme?: boolean       // true = cours par défaut non supprimable
  moduleKey?: string      // clé pour lier au module (ex: 'comptabilite-generale')
  icon?: string           // icône lucide (ex: 'Calculator')
  coursSystemeId?: string // lien vers le cours système d'origine (pour dédupliquer)
}

// Statut d'un étudiant dans un cours
export interface CoursEtudiantStatut {
  id: string              // `${etudiantId}_${coursId}`
  etudiantId: string
  coursId: string
  moduleKey?: string
  statut: 'actif' | 'termine' | 'verrouille'
  dateDebut?: string
  dateFin?: string        // rempli quand statut = 'termine'
  createdBy: string
}

export interface NoteCours {
  id: string
  titre: string
  contenu?: string          // texte libre (markdown simple)
  pdfUrl?: string           // lien PDF optionnel
  coursId: string           // cours ciblé - OBLIGATOIRE
  promotionId: string       // promotion ciblée - OBLIGATOIRE (isolation stricte)
  faculteId?: string
  universiteId?: string
  createdBy: string         // userId du prof/admin
  dateCreation: string
  actif: boolean
}

// redaction : questions à réponse rédigée (cas du chapitre ou questions de
// l'enseignant), notées sur 20 par l'enseignant avec l'aide de l'IA.
export type DevoirType = 'pratique' | 'theorique' | 'mixte' | 'qcm' | 'qcm_chapitre' | 'qcm_cas' | 'redaction'

// Cas pratique intégré dans un devoir QCM+Cas (type qcm_cas)
export interface CasPratique {
  id: string                // identifiant unique ex: 'cas1'
  titre: string             // ex: 'Cas : Constitution SARL'
  enonce: string            // texte complet de la mise en situation
  corrigeType: string       // réponse attendue - sert de référence pour Gemini
  pointsMax: number         // points alloués (ex: 5 ou 10)
}

// QCM issu d'un chapitre pédagogique (format unifié pour les devoirs auto-cotés)
export interface QCMChapitre {
  id: string           // identifiant unique de la question
  question: string     // énoncé
  options: { id: string; texte: string }[]  // choix possibles
  reponseCorrecte: string   // id de l'option correcte
  explication: string  // explication après correction
  articleRef: string   // référence légale
}

// Promotions disponibles - utilisé pour l'isolation stricte
export const PROMOTIONS = ['L1', 'L2', 'L3', 'M1', 'M2'] as const
export type Promotion = typeof PROMOTIONS[number]
export type ExerciceLibreType = 'pratique' | 'theorique' | 'mixte' | 'qcm'

// ExerciceLibre : exercice non coté pour entraînement individuel
export interface ExerciceLibre {
  id: string
  titre: string
  consignes: string
  coursId?: string
  faculteId?: string
  universiteId?: string
  createdBy: string
  dateCreation: string
  actif: boolean
  type: ExerciceLibreType
  // Commun
  pdfUrl?: string              // énoncé PDF
  pdfNom?: string
  // Corrigé PDF
  corrigePdfUrl?: string
  corrigePdfNom?: string
  // Corrigé écritures (pratique/mixte)
  ecrituresCorrigees?: any[]   // tableau d'écritures attendues
  // QCM
  questions?: QuestionQCM[]
  // Théorique : corrigé texte
  corrigeTexte?: string
}

export interface TentativeExerciceLibre {
  id: string
  exerciceId: string
  etudiantId: string
  sessionId?: string           // session journal (pratique/mixte)
  reponseTexte?: string        // réponse texte (théorique/mixte)
  reponsesQCM?: number[]       // réponses QCM
  dateCreation: string
  corrigeVu: boolean           // l'étudiant a consulté le corrigé
}

export interface QuestionQCM {
  id: string
  texte: string                // énoncé de la question
  choix: string[]              // tableau de 2 à 5 choix
  bonneReponse: number         // index du bon choix (0-based)
  explication?: string         // explication affichée après correction
}

export interface Devoir {
  id: string
  titre: string
  consignes: string
  coursId: string          // cours ciblé
  universiteId?: string
  faculteId?: string        // faculté ciblée (isolation par faculté)
  dateLimit: string        // ISO : soumission fermée après cette date
  createdBy: string        // userId du prof/admin
  dateCreation: string
  actif: boolean
  type: DevoirType         // pratique | theorique | mixte | qcm
  pdfData?: string         // base64 du PDF énoncé (legacy)
  pdfUrl?: string          // URL Firebase Storage
  pdfNom?: string          // nom original du fichier
  questions?: QuestionQCM[] // questions QCM (type qcm uniquement)
  // Champs spécifiques aux devoirs QCM-chapitre (type qcm_chapitre)
  questionsChapitre?: QCMChapitre[]  // 10 QCM sélectionnés depuis un chapitre
  chapitreId?: string                // ex: 'ue2-ch1', 'ue2-ch2'
  chapitreNom?: string               // nom affiché du chapitre
  promotionId?: string               // promotion cible (ex: 'L2')
  // Champs spécifiques aux devoirs QCM+Cas (type qcm_cas)
  casPratiques?: CasPratique[]        // 1 ou 2 cas pratiques évalués par IA
}

export interface Soumission {
  id: string
  devoirId: string
  etudiantId: string
  sessionId?: string       // session journal (type pratique/mixte)
  reponseTexte?: string    // réponse texte (type theorique/mixte)
  reponsesQCM?: number[]   // index des réponses choisies par l'étudiant (type qcm)
  // Champs spécifiques aux devoirs QCM-chapitre
  reponsesQCMChapitre?: Record<string, string>  // { questionId: optionId choisi }
  scoreQCMChapitre?: number   // nb de bonnes réponses sur 10 (auto-calculé)
  detailsQCMChapitre?: { qId: string; choix: string; correct: boolean }[]  // détail par question
  dateSoumission: string
  statut: 'soumis' | 'note'
  note?: number            // 0-10 (saisi par prof OU auto-calculé pour qcm_chapitre)
  commentaire?: string
  dateCorrection?: string
  // Champs spécifiques aux devoirs QCM+Cas (type qcm_cas)
  reponsesCasPratiques?: Record<string, string>  // { casId: réponse libre de l'étudiant }
  evaluationsCasPratiques?: {                     // évaluation Gemini par cas
    casId: string
    score: number       // 0 à pointsMax
    commentaire: string // explication Gemini
    coherente: boolean  // logique correcte même si formulation différente
  }[]
  scoreQCMCas?: number    // score partie QCM (sur 5 questions, max 10 pts)
  scoreCasPratiques?: number // score partie cas pratiques (max 10 pts)
}

export interface Presence {
  id: string
  titre: string           // ex: "Séance du 01/02/2025"
  date: string            // ISO
  createdBy: string       // id du prof/admin
  coursId?: string        // cours lié
  faculteId?: string      // isolation : faculté
  universiteId?: string   // isolation : université
  etudiants: {
    etudiantId: string
    present: boolean
  }[]
  // Dérivé de `etudiants` (maintenu par createPresenceAsync/updatePresenceAsync) :
  // Firestore ne peut ni interroger ni vérifier par règle un sous-champ d'un
  // tableau d'objets - ce tableau plat des etudiantId permet where('etudiantIds',
  // 'array-contains', uid) côté requête ET la règle de lecture côté firestore.rules.
  etudiantIds?: string[]
}

// ===================== MODULE ÉTUDIANTS =====================

export type TypeEtudiant = 'interne' | 'externe'
export type StatutEtudiant = 'actif' | 'suspendu' | 'diplome'

export interface EtudiantFiche {
  id: string
  type: TypeEtudiant
  userId: string | null        // lié au compte Firebase si interne
  nom: string
  prenom: string
  matricule: string
  universite: string
  faculte: string
  filiere: string
  promotion: string
  anneeAcademique: string      // ex: "2025-2026"
  statut: StatutEtudiant
  photo: string | null
  telephone: string
  email: string
  dateInscription: string      // ISO
  createdBy: string            // userId admin
  universiteId?: string        // isolation faculté/université
  // Archivage par année académique (voir avancerAnneeAcademiqueAsync) : à
  // chaque passage à l'année suivante, toutes les fiches non déjà archivées
  // basculent archive:true avec anneeArchivage = l'année qui vient de se
  // terminer. Rien n'est jamais supprimé - anneeArchivage sert seulement à
  // ne montrer, dans l'onglet Archives, que la dernière année archivée ;
  // l'historique complet (toutes années) reste consultable en filtrant par
  // anneeAcademique. Une fiche archivée peut aussi avoir son compte de
  // connexion désactivé (users.actif = false), voir la même fonction.
  archive?: boolean
  anneeArchivage?: string       // année académique au moment de l'archivage
}

// Réglage global unique : année académique active (voir avancerAnneeAcademiqueAsync).
export interface ConfigAnneeAcademique {
  id: 'anneeAcademique'
  valeur: string          // ex: "2025-2026"
  updatedAt: string
  updatedBy: string
}

export type ModeNote = 'plateforme' | 'manuel'

export interface NoteManuelle {
  id: string
  etudiantFicheId: string      // id dans collection etudiants/
  chapitreId: string
  chapitreLabel: string        // ex: "UE2 - Chapitre 3"
  ueLabel: string              // ex: "UE2 Droit des sociétés"
  note: number                 // sur 20
  mode: ModeNote
  commentaire: string
  saisiePar: string            // userId admin/prof
  dateSaisie: string           // ISO
  anneeAcademique: string
}

export const BAREME_DEFAUT = { compte: 40, sens: 30, montant: 20, equilibre: 10 }

// Ce fichier ne contient plus que les types du domaine et deux constantes.
// L'ancienne couche de stockage en localStorage (comptes utilisateurs avec mot
// de passe, sessions, écritures, devoirs, soumissions...) et une seconde copie
// du plan comptable (COMPTES_OHADA, doublon de lib/planComptable.ts) ont été
// retirées : plus aucun écran ne les lisait depuis le passage à Firestore
// (lib/db-firebase.ts). getComptes et getCompteByNumero vivent dans
// lib/comptes.ts.

export function isDevoirExpire(devoir: Devoir): boolean {
  return new Date() > new Date(devoir.dateLimit)
}
