import { generateId } from './utils'
import { PLAN_COMPTABLE_OHADA } from './planComptable'

// ===================== TYPES =====================

export interface CompteOHADA {
  numero: string
  intitule: string
  classe: number
  type: 'actif' | 'passif' | 'charge' | 'produit' | 'autre'
}

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
  password: string
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

export type DevoirType = 'pratique' | 'theorique' | 'mixte' | 'qcm' | 'qcm_chapitre' | 'qcm_cas'

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

// ===================== OHADA ACCOUNTS =====================

export const COMPTES_OHADA: CompteOHADA[] = [
  // CLASS 1 - CAPITAUX
  { numero: '101', intitule: 'Capital social', classe: 1, type: 'passif' },
  { numero: '1011', intitule: 'Capital souscrit non appelé', classe: 1, type: 'passif' },
  { numero: '1012', intitule: 'Capital souscrit appelé non versé', classe: 1, type: 'passif' },
  { numero: '1013', intitule: 'Capital souscrit, appelé, versé', classe: 1, type: 'passif' },
  { numero: '102', intitule: 'Capital par dotation', classe: 1, type: 'passif' },
  { numero: '104', intitule: 'Comptes de l\'exploitant', classe: 1, type: 'passif' },
  { numero: '105', intitule: 'Primes liées au capital social', classe: 1, type: 'passif' },
  { numero: '1051', intitule: 'Primes d\'émission', classe: 1, type: 'passif' },
  { numero: '1052', intitule: 'Primes de fusion', classe: 1, type: 'passif' },
  { numero: '106', intitule: 'Écarts de réévaluation', classe: 1, type: 'passif' },
  { numero: '1061', intitule: 'Écarts de réévaluation légale', classe: 1, type: 'passif' },
  { numero: '1062', intitule: 'Écarts de réévaluation libre', classe: 1, type: 'passif' },
  { numero: '1063', intitule: 'Écarts de réévaluation des immobilisations', classe: 1, type: 'passif' },
  { numero: '1064', intitule: 'Plus-values de cession réinvesties', classe: 1, type: 'passif' },
  { numero: '1065', intitule: 'Écarts de réévaluation des stocks', classe: 1, type: 'passif' },
  { numero: '1068', intitule: 'Autres écarts de réévaluation', classe: 1, type: 'passif' },
  { numero: '109', intitule: 'Actionnaires - Capital souscrit non appelé', classe: 1, type: 'actif' },
  { numero: '1091', intitule: 'Actionnaires - Capital souscrit non appelé', classe: 1, type: 'actif' },
  { numero: '1092', intitule: 'Actionnaires défaillants', classe: 1, type: 'actif' },
  { numero: '111', intitule: 'Réserve légale', classe: 1, type: 'passif' },
  { numero: '1111', intitule: 'Réserve légale ordinaire', classe: 1, type: 'passif' },
  { numero: '1112', intitule: 'Réserve légale spéciale', classe: 1, type: 'passif' },
  { numero: '112', intitule: 'Réserves statutaires ou contractuelles', classe: 1, type: 'passif' },
  { numero: '113', intitule: 'Réserves réglementées', classe: 1, type: 'passif' },
  { numero: '114', intitule: 'Réserves libres', classe: 1, type: 'passif' },
  { numero: '116', intitule: 'Réserves facultatives', classe: 1, type: 'passif' },
  { numero: '117', intitule: 'Réserves diverses', classe: 1, type: 'passif' },
  { numero: '1171', intitule: 'Réserve pour investissement', classe: 1, type: 'passif' },
  { numero: '1172', intitule: 'Réserves pour hausse de prix', classe: 1, type: 'passif' },
  { numero: '118', intitule: 'Autres réserves', classe: 1, type: 'passif' },
  { numero: '119', intitule: 'Report à nouveau', classe: 1, type: 'passif' },
  { numero: '121', intitule: 'Résultat net: Bénéfice (+)', classe: 1, type: 'passif' },
  { numero: '129', intitule: 'Résultat net: Perte (-)', classe: 1, type: 'passif' },
  { numero: '131', intitule: 'Subventions d\'équipement', classe: 1, type: 'passif' },
  { numero: '132', intitule: 'Subventions de l\'État', classe: 1, type: 'passif' },
  { numero: '133', intitule: 'Subventions des collectivités publiques', classe: 1, type: 'passif' },
  { numero: '134', intitule: 'Subventions des organismes internationaux', classe: 1, type: 'passif' },
  { numero: '135', intitule: 'Subventions des particuliers', classe: 1, type: 'passif' },
  { numero: '136', intitule: 'Subventions reçues dans le cadre d\'investissements', classe: 1, type: 'passif' },
  { numero: '138', intitule: 'Autres subventions d\'investissement', classe: 1, type: 'passif' },
  { numero: '139', intitule: 'Subventions d\'investissement inscrites au résultat', classe: 1, type: 'passif' },
  { numero: '141', intitule: 'Amortissements dérogatoires', classe: 1, type: 'passif' },
  { numero: '142', intitule: 'Plus-values de cession réinvesties', classe: 1, type: 'passif' },
  { numero: '144', intitule: 'Provisions réglementées relatives aux stocks', classe: 1, type: 'passif' },
  { numero: '145', intitule: 'Provisions réglementées relatives aux autres', classe: 1, type: 'passif' },
  { numero: '148', intitule: 'Autres provisions réglementées', classe: 1, type: 'passif' },
  { numero: '149', intitule: 'Provisions réglementées diverses', classe: 1, type: 'passif' },
  { numero: '151', intitule: 'Provisions pour litiges', classe: 1, type: 'passif' },
  { numero: '152', intitule: 'Provisions pour garanties données aux clients', classe: 1, type: 'passif' },
  { numero: '153', intitule: 'Provisions pour pertes sur marchés à terme', classe: 1, type: 'passif' },
  { numero: '154', intitule: 'Provisions pour amendes et pénalités', classe: 1, type: 'passif' },
  { numero: '155', intitule: 'Provisions pour pertes de change', classe: 1, type: 'passif' },
  { numero: '156', intitule: 'Provisions pour retraites et obligations similaires', classe: 1, type: 'passif' },
  { numero: '157', intitule: 'Provisions pour charges à répartir sur plusieurs exercices', classe: 1, type: 'passif' },
  { numero: '158', intitule: 'Autres provisions pour risques et charges', classe: 1, type: 'passif' },
  { numero: '159', intitule: 'Provisions pour charges diverses', classe: 1, type: 'passif' },
  { numero: '161', intitule: 'Emprunts obligataires', classe: 1, type: 'passif' },
  { numero: '162', intitule: 'Emprunts et dettes auprès des établissements de crédit', classe: 1, type: 'passif' },
  { numero: '163', intitule: 'Emprunts et dettes financières divers', classe: 1, type: 'passif' },
  { numero: '164', intitule: 'Dettes de location-acquisition', classe: 1, type: 'passif' },
  { numero: '165', intitule: 'Dépôts et cautionnements reçus', classe: 1, type: 'passif' },
  { numero: '166', intitule: 'Intérêts courus sur emprunts', classe: 1, type: 'passif' },
  { numero: '167', intitule: 'Emprunts et dettes assimilés', classe: 1, type: 'passif' },
  { numero: '168', intitule: 'Autres emprunts et dettes assimilées', classe: 1, type: 'passif' },
  { numero: '169', intitule: 'Primes de remboursement des obligations', classe: 1, type: 'actif' },
  { numero: '171', intitule: 'Dettes de crédit-bail et contrats assimilés', classe: 1, type: 'passif' },
  { numero: '172', intitule: 'Dettes rattachées à des participations (groupe)', classe: 1, type: 'passif' },
  { numero: '173', intitule: 'Dettes rattachées à des participations (hors groupe)', classe: 1, type: 'passif' },
  { numero: '174', intitule: 'Dettes envers les associés', classe: 1, type: 'passif' },
  { numero: '175', intitule: 'Dépôts et cautionnements reçus à long terme', classe: 1, type: 'passif' },
  { numero: '176', intitule: 'Emprunts participatifs', classe: 1, type: 'passif' },
  { numero: '181', intitule: 'Comptes de liaison des établissements et sociétés en participation', classe: 1, type: 'autre' },
  { numero: '182', intitule: 'Comptes de liaison des succursales', classe: 1, type: 'autre' },
  { numero: '183', intitule: 'Comptes courants des filiales', classe: 1, type: 'autre' },
  { numero: '184', intitule: 'Comptes de liaison intra-groupe', classe: 1, type: 'autre' },
  { numero: '185', intitule: 'Biens et droits apportés en garantie', classe: 1, type: 'autre' },
  { numero: '186', intitule: 'Charges à répartir sur plusieurs exercices', classe: 1, type: 'actif' },
  { numero: '188', intitule: 'Intérêts courus sur dettes de financement', classe: 1, type: 'passif' },
  { numero: '191', intitule: 'Provisions pour dépréciation des immobilisations incorporelles', classe: 1, type: 'passif' },
  { numero: '192', intitule: 'Provisions pour dépréciation des immobilisations corporelles', classe: 1, type: 'passif' },
  { numero: '193', intitule: 'Provisions pour dépréciation des immobilisations en cours', classe: 1, type: 'passif' },
  { numero: '194', intitule: 'Provisions pour dépréciation des immobilisations financières', classe: 1, type: 'passif' },
  { numero: '195', intitule: 'Provisions pour dépréciation des prêts', classe: 1, type: 'passif' },
  { numero: '196', intitule: 'Provisions pour dépréciation des avances et acomptes', classe: 1, type: 'passif' },
  { numero: '198', intitule: 'Autres provisions pour dépréciation', classe: 1, type: 'passif' },

  // CLASS 2 - IMMOBILISATIONS
  { numero: '201', intitule: 'Frais d\'établissement', classe: 2, type: 'actif' },
  { numero: '202', intitule: 'Frais de recherche et de développement', classe: 2, type: 'actif' },
  { numero: '203', intitule: 'Frais de recherche et développement', classe: 2, type: 'actif' },
  { numero: '204', intitule: 'Brevets, licences, concessions', classe: 2, type: 'actif' },
  { numero: '205', intitule: 'Logiciels et sites internet', classe: 2, type: 'actif' },
  { numero: '206', intitule: 'Droit au bail', classe: 2, type: 'actif' },
  { numero: '207', intitule: 'Fonds commercial', classe: 2, type: 'actif' },
  { numero: '208', intitule: 'Autres immobilisations incorporelles', classe: 2, type: 'actif' },
  { numero: '211', intitule: 'Terrains', classe: 2, type: 'actif' },
  { numero: '212', intitule: 'Terrains agricoles et forestiers', classe: 2, type: 'actif' },
  { numero: '213', intitule: 'Bâtiments sur sol propre', classe: 2, type: 'actif' },
  { numero: '214', intitule: 'Bâtiments sur sol d\'autrui', classe: 2, type: 'actif' },
  { numero: '215', intitule: 'Installations et agencements', classe: 2, type: 'actif' },
  { numero: '216', intitule: 'Aménagements de terrains', classe: 2, type: 'actif' },
  { numero: '218', intitule: 'Autres immobilisations corporelles', classe: 2, type: 'actif' },
  { numero: '221', intitule: 'Bâtiments d\'exploitation en cours', classe: 2, type: 'actif' },
  { numero: '222', intitule: 'Installations techniques en cours', classe: 2, type: 'actif' },
  { numero: '223', intitule: 'Matériels et mobiliers en cours', classe: 2, type: 'actif' },
  { numero: '224', intitule: 'Matériels de transport en cours', classe: 2, type: 'actif' },
  { numero: '225', intitule: 'Avances et acomptes versés sur commandes', classe: 2, type: 'actif' },
  { numero: '226', intitule: 'Immobilisations incorporelles en cours', classe: 2, type: 'actif' },
  { numero: '228', intitule: 'Autres immobilisations en cours', classe: 2, type: 'actif' },
  { numero: '231', intitule: 'Matériel et outillage', classe: 2, type: 'actif' },
  { numero: '232', intitule: 'Matériel et outillage industriel', classe: 2, type: 'actif' },
  { numero: '233', intitule: 'Matériel et outillage commercial', classe: 2, type: 'actif' },
  { numero: '234', intitule: 'Matériel et outillage agricole', classe: 2, type: 'actif' },
  { numero: '235', intitule: 'Matériel et outillage artisanal', classe: 2, type: 'actif' },
  { numero: '238', intitule: 'Autres matériels et outillages', classe: 2, type: 'actif' },
  { numero: '241', intitule: 'Matériel informatique', classe: 2, type: 'actif' },
  { numero: '242', intitule: 'Mobilier de bureau', classe: 2, type: 'actif' },
  { numero: '243', intitule: 'Matériel et mobilier', classe: 2, type: 'actif' },
  { numero: '244', intitule: 'Matériel de bureau', classe: 2, type: 'actif' },
  { numero: '245', intitule: 'Matériel de transport', classe: 2, type: 'actif' },
  { numero: '246', intitule: 'Mobilier', classe: 2, type: 'actif' },
  { numero: '248', intitule: 'Autres matériels de transport', classe: 2, type: 'actif' },
  { numero: '251', intitule: 'Titres de participation', classe: 2, type: 'actif' },
  { numero: '252', intitule: 'Créances sur des participations', classe: 2, type: 'actif' },
  { numero: '253', intitule: 'Titres immobilisés de l\'activité de portefeuille', classe: 2, type: 'actif' },
  { numero: '254', intitule: 'Titres immobilisés', classe: 2, type: 'actif' },
  { numero: '255', intitule: 'Parts dans des entreprises liées', classe: 2, type: 'actif' },
  { numero: '256', intitule: 'Autres titres immobilisés', classe: 2, type: 'actif' },
  { numero: '258', intitule: 'Intérêts courus sur titres immobilisés', classe: 2, type: 'actif' },
  { numero: '261', intitule: 'Titres de participation', classe: 2, type: 'actif' },
  { numero: '262', intitule: 'Avances consolidées aux filiales', classe: 2, type: 'actif' },
  { numero: '263', intitule: 'Participations dans les GIE', classe: 2, type: 'actif' },
  { numero: '264', intitule: 'Participations dans les sociétés civiles', classe: 2, type: 'actif' },
  { numero: '265', intitule: 'Participations dans les associations', classe: 2, type: 'actif' },
  { numero: '266', intitule: 'Parts dans des entreprises associées', classe: 2, type: 'actif' },
  { numero: '268', intitule: 'Créances rattachées à des participations', classe: 2, type: 'actif' },
  { numero: '271', intitule: 'Prêts et créances non commerciales', classe: 2, type: 'actif' },
  { numero: '272', intitule: 'Dépôts et cautionnements versés', classe: 2, type: 'actif' },
  { numero: '273', intitule: 'Créances sur actionnaires', classe: 2, type: 'actif' },
  { numero: '274', intitule: 'Prêts au personnel', classe: 2, type: 'actif' },
  { numero: '275', intitule: 'Dépôts et cautionnements', classe: 2, type: 'actif' },
  { numero: '276', intitule: 'Autres créances financières', classe: 2, type: 'actif' },
  { numero: '277', intitule: 'Titres détenus en portefeuille', classe: 2, type: 'actif' },
  { numero: '278', intitule: 'Autres immobilisations financières', classe: 2, type: 'actif' },
  { numero: '281', intitule: 'Amortissements des frais d\'établissement', classe: 2, type: 'actif' },
  { numero: '282', intitule: 'Amortissements des frais de recherche', classe: 2, type: 'actif' },
  { numero: '283', intitule: 'Amortissements des brevets et licences', classe: 2, type: 'actif' },
  { numero: '284', intitule: 'Amortissements des logiciels', classe: 2, type: 'actif' },
  { numero: '285', intitule: 'Amortissements des fonds commerciaux', classe: 2, type: 'actif' },
  { numero: '286', intitule: 'Amortissements des autres imm. incorporelles', classe: 2, type: 'actif' },
  { numero: '288', intitule: 'Amortissements des immobilisations corporelles', classe: 2, type: 'actif' },
  { numero: '291', intitule: 'Provisions pour dépréciation imm. incorporelles', classe: 2, type: 'actif' },
  { numero: '292', intitule: 'Provisions pour dépréciation des terrains', classe: 2, type: 'actif' },
  { numero: '293', intitule: 'Provisions pour dépréciation des bâtiments', classe: 2, type: 'actif' },
  { numero: '294', intitule: 'Provisions pour dépréciation des installations', classe: 2, type: 'actif' },
  { numero: '295', intitule: 'Provisions pour dépréciation du matériel', classe: 2, type: 'actif' },
  { numero: '296', intitule: 'Provisions pour dépréciation des titres', classe: 2, type: 'actif' },
  { numero: '298', intitule: 'Provisions pour dépréciation des autres imm.', classe: 2, type: 'actif' },

  // CLASS 3 - STOCKS
  { numero: '301', intitule: 'Marchandises A', classe: 3, type: 'actif' },
  { numero: '302', intitule: 'Marchandises B', classe: 3, type: 'actif' },
  { numero: '303', intitule: 'Marchandises C', classe: 3, type: 'actif' },
  { numero: '304', intitule: 'Marchandises (emballages)', classe: 3, type: 'actif' },
  { numero: '305', intitule: 'Autres marchandises', classe: 3, type: 'actif' },
  { numero: '306', intitule: 'Marchandises en cours de route', classe: 3, type: 'actif' },
  { numero: '307', intitule: 'Marchandises en dépôt-vente', classe: 3, type: 'actif' },
  { numero: '308', intitule: 'Autres stocks de marchandises', classe: 3, type: 'actif' },
  { numero: '311', intitule: 'Matières premières A', classe: 3, type: 'actif' },
  { numero: '312', intitule: 'Matières premières B', classe: 3, type: 'actif' },
  { numero: '313', intitule: 'Matières premières C', classe: 3, type: 'actif' },
  { numero: '314', intitule: 'Matières premières D', classe: 3, type: 'actif' },
  { numero: '315', intitule: 'Matières consommables', classe: 3, type: 'actif' },
  { numero: '316', intitule: 'Emballages', classe: 3, type: 'actif' },
  { numero: '318', intitule: 'Autres approvisionnements', classe: 3, type: 'actif' },
  { numero: '321', intitule: 'Matières en cours', classe: 3, type: 'actif' },
  { numero: '322', intitule: 'Matières en cours de transport', classe: 3, type: 'actif' },
  { numero: '323', intitule: 'Matières en dépôt', classe: 3, type: 'actif' },
  { numero: '324', intitule: 'Matières en cours de traitement', classe: 3, type: 'actif' },
  { numero: '325', intitule: 'Matières en transit', classe: 3, type: 'actif' },
  { numero: '326', intitule: 'Matières reçues en dépôt', classe: 3, type: 'actif' },
  { numero: '328', intitule: 'Autres matières en cours', classe: 3, type: 'actif' },
  { numero: '331', intitule: 'Produits en cours - production de biens', classe: 3, type: 'actif' },
  { numero: '332', intitule: 'Produits en cours - production de services', classe: 3, type: 'actif' },
  { numero: '333', intitule: 'Travaux en cours', classe: 3, type: 'actif' },
  { numero: '334', intitule: 'Études en cours', classe: 3, type: 'actif' },
  { numero: '335', intitule: 'Services en cours', classe: 3, type: 'actif' },
  { numero: '338', intitule: 'Autres en-cours de production', classe: 3, type: 'actif' },
  { numero: '341', intitule: 'Produits intermédiaires', classe: 3, type: 'actif' },
  { numero: '342', intitule: 'Produits intermédiaires B', classe: 3, type: 'actif' },
  { numero: '343', intitule: 'Produits résiduels ou matières de récupération', classe: 3, type: 'actif' },
  { numero: '344', intitule: 'Déchets', classe: 3, type: 'actif' },
  { numero: '345', intitule: 'Rebuts', classe: 3, type: 'actif' },
  { numero: '348', intitule: 'Autres produits intermédiaires et résiduels', classe: 3, type: 'actif' },
  { numero: '351', intitule: 'Produits finis A', classe: 3, type: 'actif' },
  { numero: '352', intitule: 'Produits finis B', classe: 3, type: 'actif' },
  { numero: '353', intitule: 'Produits finis C', classe: 3, type: 'actif' },
  { numero: '354', intitule: 'Produits finis D', classe: 3, type: 'actif' },
  { numero: '355', intitule: 'Produits agricoles', classe: 3, type: 'actif' },
  { numero: '358', intitule: 'Autres produits finis', classe: 3, type: 'actif' },
  { numero: '361', intitule: 'Produits fabriqués A', classe: 3, type: 'actif' },
  { numero: '362', intitule: 'Produits fabriqués B', classe: 3, type: 'actif' },
  { numero: '363', intitule: 'Produits fabriqués C', classe: 3, type: 'actif' },
  { numero: '364', intitule: 'Produits fabriqués D', classe: 3, type: 'actif' },
  { numero: '365', intitule: 'Produits en attente', classe: 3, type: 'actif' },
  { numero: '368', intitule: 'Autres produits', classe: 3, type: 'actif' },
  { numero: '371', intitule: 'Stocks à l\'extérieur', classe: 3, type: 'actif' },
  { numero: '372', intitule: 'Stocks en cours de route', classe: 3, type: 'actif' },
  { numero: '373', intitule: 'Stocks en consignation', classe: 3, type: 'actif' },
  { numero: '374', intitule: 'Stocks en dépôt', classe: 3, type: 'actif' },
  { numero: '375', intitule: 'Stocks à l\'essai', classe: 3, type: 'actif' },
  { numero: '378', intitule: 'Autres stocks à l\'extérieur', classe: 3, type: 'actif' },
  { numero: '381', intitule: 'Stocks de marchandises empruntées', classe: 3, type: 'actif' },
  { numero: '382', intitule: 'Stocks de matières empruntées', classe: 3, type: 'actif' },
  { numero: '383', intitule: 'Stocks de produits empruntés', classe: 3, type: 'actif' },
  { numero: '384', intitule: 'Stocks détenus pour compte de tiers', classe: 3, type: 'actif' },
  { numero: '385', intitule: 'Stocks en consignation chez les tiers', classe: 3, type: 'actif' },
  { numero: '386', intitule: 'Emballages commerciaux', classe: 3, type: 'actif' },
  { numero: '388', intitule: 'Autres stocks et en-cours', classe: 3, type: 'actif' },
  { numero: '391', intitule: 'Provisions pour dépréciation des marchandises', classe: 3, type: 'actif' },
  { numero: '392', intitule: 'Provisions pour dépréciation des matières premières', classe: 3, type: 'actif' },
  { numero: '393', intitule: 'Provisions pour dépréciation des en-cours', classe: 3, type: 'actif' },
  { numero: '394', intitule: 'Provisions pour dépréciation des produits finis', classe: 3, type: 'actif' },
  { numero: '395', intitule: 'Provisions pour dépréciation des produits intermédiaires', classe: 3, type: 'actif' },
  { numero: '396', intitule: 'Provisions pour dépréciation des emballages', classe: 3, type: 'actif' },
  { numero: '398', intitule: 'Provisions pour dépréciation des autres stocks', classe: 3, type: 'actif' },

  // CLASS 4 - TIERS
  { numero: '401', intitule: 'Fournisseurs', classe: 4, type: 'passif' },
  { numero: '402', intitule: 'Fournisseurs - Effets à payer', classe: 4, type: 'passif' },
  { numero: '403', intitule: 'Fournisseurs - Factures non parvenues', classe: 4, type: 'passif' },
  { numero: '404', intitule: 'Fournisseurs d\'immobilisations', classe: 4, type: 'passif' },
  { numero: '405', intitule: 'Fournisseurs d\'immobilisations - effets à payer', classe: 4, type: 'passif' },
  { numero: '408', intitule: 'Fournisseurs - Charges à payer', classe: 4, type: 'passif' },
  { numero: '409', intitule: 'Fournisseurs débiteurs - avances versées', classe: 4, type: 'actif' },
  { numero: '411', intitule: 'Clients', classe: 4, type: 'actif' },
  { numero: '412', intitule: 'Clients - Effets à recevoir', classe: 4, type: 'actif' },
  { numero: '413', intitule: 'Clients - Effets à l\'escompte', classe: 4, type: 'actif' },
  { numero: '414', intitule: 'Clients douteux ou litigieux', classe: 4, type: 'actif' },
  { numero: '415', intitule: 'Clients - Retenues de garantie', classe: 4, type: 'actif' },
  { numero: '416', intitule: 'Clients - Créances litigieuses', classe: 4, type: 'actif' },
  { numero: '418', intitule: 'Clients - Produits à recevoir', classe: 4, type: 'actif' },
  { numero: '419', intitule: 'Clients créditeurs - avances reçues', classe: 4, type: 'passif' },
  { numero: '421', intitule: 'Personnel - Avances et acomptes', classe: 4, type: 'actif' },
  { numero: '422', intitule: 'Personnel - Rémunérations dues', classe: 4, type: 'passif' },
  { numero: '423', intitule: 'Personnel - Oppositions', classe: 4, type: 'passif' },
  { numero: '424', intitule: 'Personnel - Œuvres sociales', classe: 4, type: 'passif' },
  { numero: '425', intitule: 'Personnel - Participations aux résultats', classe: 4, type: 'passif' },
  { numero: '426', intitule: 'Personnel - Emplois du personnel', classe: 4, type: 'actif' },
  { numero: '427', intitule: 'Personnel - Oppositions', classe: 4, type: 'passif' },
  { numero: '428', intitule: 'Personnel - Charges à payer', classe: 4, type: 'passif' },
  { numero: '431', intitule: 'Organismes sociaux', classe: 4, type: 'passif' },
  { numero: '432', intitule: 'Organismes sociaux - CNSS', classe: 4, type: 'passif' },
  { numero: '433', intitule: 'Organismes sociaux - Mutuelles', classe: 4, type: 'passif' },
  { numero: '434', intitule: 'Organismes sociaux - Retraites complémentaires', classe: 4, type: 'passif' },
  { numero: '435', intitule: 'Organismes sociaux - Régime de prévoyance', classe: 4, type: 'passif' },
  { numero: '437', intitule: 'Organismes sociaux - Charges à payer', classe: 4, type: 'passif' },
  { numero: '438', intitule: 'Organismes sociaux - produits à recevoir', classe: 4, type: 'actif' },
  { numero: '441', intitule: 'État - Impôt sur les bénéfices', classe: 4, type: 'passif' },
  { numero: '442', intitule: 'État - TVA facturée', classe: 4, type: 'passif' },
  { numero: '443', intitule: 'État - TVA due ou crédit de TVA', classe: 4, type: 'autre' },
  { numero: '444', intitule: 'État - Impôts et taxes', classe: 4, type: 'passif' },
  { numero: '445', intitule: 'État - TVA à récupérer', classe: 4, type: 'actif' },
  { numero: '446', intitule: 'État - Taxes sur le chiffre d\'affaires', classe: 4, type: 'passif' },
  { numero: '447', intitule: 'État - Impôts retenus à la source', classe: 4, type: 'passif' },
  { numero: '448', intitule: 'État - Charges à payer', classe: 4, type: 'passif' },
  { numero: '449', intitule: 'État - Excédent de versement', classe: 4, type: 'actif' },
  { numero: '451', intitule: 'Sociétés et groupements', classe: 4, type: 'autre' },
  { numero: '452', intitule: 'Société gérant ou société associée commanditaire', classe: 4, type: 'autre' },
  { numero: '453', intitule: 'Associés - Apports en nature non libérés', classe: 4, type: 'autre' },
  { numero: '454', intitule: 'Associés - Avances', classe: 4, type: 'autre' },
  { numero: '455', intitule: 'Associés - Comptes courants', classe: 4, type: 'autre' },
  { numero: '456', intitule: 'Associés - Opérations sur le capital', classe: 4, type: 'autre' },
  { numero: '458', intitule: 'Associés - Opérations faites en commun', classe: 4, type: 'autre' },
  { numero: '461', intitule: 'Débiteurs divers', classe: 4, type: 'actif' },
  { numero: '462', intitule: 'Créditeurs divers', classe: 4, type: 'passif' },
  { numero: '463', intitule: 'Débiteurs - Garanties et retenues', classe: 4, type: 'actif' },
  { numero: '464', intitule: 'Créditeurs - Garanties et retenues', classe: 4, type: 'passif' },
  { numero: '465', intitule: 'Débiteurs - Valeurs à encaisser', classe: 4, type: 'actif' },
  { numero: '466', intitule: 'Créditeurs - Valeurs à décaisser', classe: 4, type: 'passif' },
  { numero: '467', intitule: 'Comptes transitoires ou d\'attente débiteurs', classe: 4, type: 'actif' },
  { numero: '468', intitule: 'Comptes transitoires ou d\'attente créditeurs', classe: 4, type: 'passif' },
  { numero: '469', intitule: 'Produits à recevoir', classe: 4, type: 'actif' },
  { numero: '471', intitule: 'Charges à répartir', classe: 4, type: 'actif' },
  { numero: '472', intitule: 'Charges constatées d\'avance', classe: 4, type: 'actif' },
  { numero: '473', intitule: 'Charges à payer', classe: 4, type: 'passif' },
  { numero: '474', intitule: 'Produits constatés d\'avance', classe: 4, type: 'passif' },
  { numero: '475', intitule: 'Produits à recevoir', classe: 4, type: 'actif' },
  { numero: '476', intitule: 'Différences de conversion - Actif', classe: 4, type: 'actif' },
  { numero: '477', intitule: 'Différences de conversion - Passif', classe: 4, type: 'passif' },
  { numero: '478', intitule: 'Autres comptes transitoires', classe: 4, type: 'autre' },
  { numero: '481', intitule: 'Fournisseurs d\'investissements', classe: 4, type: 'passif' },
  { numero: '482', intitule: 'Dettes sur acquisitions de titres', classe: 4, type: 'passif' },
  { numero: '483', intitule: 'Dettes pour dépôts reçus', classe: 4, type: 'passif' },
  { numero: '484', intitule: 'Dettes pour cautionnements reçus', classe: 4, type: 'passif' },
  { numero: '485', intitule: 'Dettes envers les filiales et participations', classe: 4, type: 'passif' },
  { numero: '486', intitule: 'Dividendes à payer', classe: 4, type: 'passif' },
  { numero: '488', intitule: 'Intérêts courus à payer', classe: 4, type: 'passif' },
  { numero: '491', intitule: 'Provisions pour dépréciation des clients', classe: 4, type: 'actif' },
  { numero: '492', intitule: 'Provisions pour dépréciation autres créances', classe: 4, type: 'actif' },
  { numero: '493', intitule: 'Provisions pour dépréciation - Clients douteux', classe: 4, type: 'actif' },
  { numero: '494', intitule: 'Provisions pour dépréciation des effets', classe: 4, type: 'actif' },
  { numero: '495', intitule: 'Provisions pour dépréciation des avances', classe: 4, type: 'actif' },
  { numero: '496', intitule: 'Provisions pour dépréciation des débiteurs', classe: 4, type: 'actif' },
  { numero: '498', intitule: 'Provisions pour dépréciation des autres tiers', classe: 4, type: 'actif' },
  { numero: '499', intitule: 'Provisions pour risques et charges tiers', classe: 4, type: 'passif' },

  // CLASS 5 - TRÉSORERIE
  { numero: '501', intitule: 'Valeurs mobilières de placement', classe: 5, type: 'actif' },
  { numero: '502', intitule: 'Actions propres', classe: 5, type: 'actif' },
  { numero: '503', intitule: 'Actions', classe: 5, type: 'actif' },
  { numero: '504', intitule: 'Obligations', classe: 5, type: 'actif' },
  { numero: '505', intitule: 'Bons du trésor', classe: 5, type: 'actif' },
  { numero: '506', intitule: 'Parts de fonds commun de placement', classe: 5, type: 'actif' },
  { numero: '507', intitule: 'Certificats de dépôt', classe: 5, type: 'actif' },
  { numero: '508', intitule: 'Autres valeurs mobilières', classe: 5, type: 'actif' },
  { numero: '511', intitule: 'Valeurs à l\'encaissement', classe: 5, type: 'actif' },
  { numero: '512', intitule: 'Chèques à encaisser', classe: 5, type: 'actif' },
  { numero: '513', intitule: 'Effets à l\'encaissement', classe: 5, type: 'actif' },
  { numero: '514', intitule: 'Effets à l\'escompte', classe: 5, type: 'actif' },
  { numero: '515', intitule: 'Virements bancaires en cours', classe: 5, type: 'actif' },
  { numero: '516', intitule: 'Remises à l\'encaissement', classe: 5, type: 'actif' },
  { numero: '517', intitule: 'Autres valeurs à l\'encaissement', classe: 5, type: 'actif' },
  { numero: '518', intitule: 'Intérêts courus sur comptes bancaires', classe: 5, type: 'actif' },
  { numero: '519', intitule: 'Concours bancaires courants', classe: 5, type: 'passif' },
  { numero: '521', intitule: 'Banques, établissements financiers - débit', classe: 5, type: 'actif' },
  { numero: '522', intitule: 'Banques locales', classe: 5, type: 'actif' },
  { numero: '523', intitule: 'Banques étrangères', classe: 5, type: 'actif' },
  { numero: '524', intitule: 'Compte courant postal', classe: 5, type: 'actif' },
  { numero: '525', intitule: 'Compte à terme', classe: 5, type: 'actif' },
  { numero: '526', intitule: 'Comptes d\'épargne', classe: 5, type: 'actif' },
  { numero: '527', intitule: 'Autres comptes bancaires', classe: 5, type: 'actif' },
  { numero: '528', intitule: 'Intérêts courus sur comptes bancaires', classe: 5, type: 'actif' },
  { numero: '531', intitule: 'Caisse siège social', classe: 5, type: 'actif' },
  { numero: '532', intitule: 'Caisse succursale', classe: 5, type: 'actif' },
  { numero: '533', intitule: 'Caisse atelier', classe: 5, type: 'actif' },
  { numero: '534', intitule: 'Caisse magasin', classe: 5, type: 'actif' },
  { numero: '535', intitule: 'Caisse devises', classe: 5, type: 'actif' },
  { numero: '538', intitule: 'Autres caisses', classe: 5, type: 'actif' },
  { numero: '541', intitule: 'Chèques postaux', classe: 5, type: 'actif' },
  { numero: '542', intitule: 'Chèques de voyage', classe: 5, type: 'actif' },
  { numero: '543', intitule: 'Coupons', classe: 5, type: 'actif' },
  { numero: '544', intitule: 'Fonds de caisse', classe: 5, type: 'actif' },
  { numero: '545', intitule: 'Avances sur salaires', classe: 5, type: 'actif' },
  { numero: '546', intitule: 'Imprest account', classe: 5, type: 'actif' },
  { numero: '547', intitule: 'Autres disponibilités', classe: 5, type: 'actif' },
  { numero: '548', intitule: 'Régies d\'avances', classe: 5, type: 'actif' },
  { numero: '551', intitule: 'Lettres de crédit', classe: 5, type: 'actif' },
  { numero: '552', intitule: 'Accréditifs', classe: 5, type: 'actif' },
  { numero: '553', intitule: 'Dépôts en banque à terme', classe: 5, type: 'actif' },
  { numero: '554', intitule: 'Dépôts au trésor', classe: 5, type: 'actif' },
  { numero: '555', intitule: 'Dépôts de fonds auprès du trésor', classe: 5, type: 'actif' },
  { numero: '556', intitule: 'Autres dépôts', classe: 5, type: 'actif' },
  { numero: '558', intitule: 'Intérêts courus sur dépôts', classe: 5, type: 'actif' },
  { numero: '561', intitule: 'Chèques en circulation', classe: 5, type: 'actif' },
  { numero: '562', intitule: 'Effets en circulation', classe: 5, type: 'actif' },
  { numero: '563', intitule: 'Virements en cours', classe: 5, type: 'actif' },
  { numero: '564', intitule: 'Transferts de fonds', classe: 5, type: 'actif' },
  { numero: '565', intitule: 'Autres valeurs en circulation', classe: 5, type: 'actif' },
  { numero: '566', intitule: 'Mandats émis', classe: 5, type: 'actif' },
  { numero: '568', intitule: 'Autres effets en circulation', classe: 5, type: 'actif' },
  { numero: '571', intitule: 'Caisse principale', classe: 5, type: 'actif' },
  { numero: '572', intitule: 'Caisse annexe', classe: 5, type: 'actif' },
  { numero: '573', intitule: 'Caisse monnaies étrangères', classe: 5, type: 'actif' },
  { numero: '574', intitule: 'Caisse en devises', classe: 5, type: 'actif' },
  { numero: '575', intitule: 'Petite caisse', classe: 5, type: 'actif' },
  { numero: '576', intitule: 'Caisse de voyage', classe: 5, type: 'actif' },
  { numero: '578', intitule: 'Autres éléments de caisse', classe: 5, type: 'actif' },
  { numero: '581', intitule: 'Virements internes', classe: 5, type: 'actif' },
  { numero: '582', intitule: 'Virements de fonds', classe: 5, type: 'actif' },
  { numero: '583', intitule: 'Virements entre caisses', classe: 5, type: 'actif' },
  { numero: '584', intitule: 'Virements entre banques', classe: 5, type: 'actif' },
  { numero: '585', intitule: 'Autres virements internes', classe: 5, type: 'actif' },
  { numero: '586', intitule: 'Virements de trésorerie', classe: 5, type: 'actif' },
  { numero: '588', intitule: 'Virements divers', classe: 5, type: 'actif' },
  { numero: '591', intitule: 'Provisions pour dépréciation VMP', classe: 5, type: 'actif' },
  { numero: '592', intitule: 'Provisions pour dépréciation effets', classe: 5, type: 'actif' },
  { numero: '593', intitule: 'Provisions pour dépréciation titres', classe: 5, type: 'actif' },
  { numero: '594', intitule: 'Provisions pour dépréciation créances', classe: 5, type: 'actif' },
  { numero: '595', intitule: 'Provisions pour dépréciation banques', classe: 5, type: 'actif' },
  { numero: '596', intitule: 'Provisions pour dépréciation valeurs', classe: 5, type: 'actif' },
  { numero: '598', intitule: 'Provisions pour dépréciation autres', classe: 5, type: 'actif' },
  { numero: '599', intitule: 'Provisions pour risques trésorerie', classe: 5, type: 'passif' },

  // CLASS 6 - CHARGES
  { numero: '601', intitule: 'Achats de marchandises', classe: 6, type: 'charge' },
  { numero: '602', intitule: 'Achats de matières premières', classe: 6, type: 'charge' },
  { numero: '603', intitule: 'Variations de stocks', classe: 6, type: 'charge' },
  { numero: '604', intitule: 'Achats de matières et fournitures consommables', classe: 6, type: 'charge' },
  { numero: '605', intitule: 'Autres achats', classe: 6, type: 'charge' },
  { numero: '606', intitule: 'Achats d\'emballages', classe: 6, type: 'charge' },
  { numero: '607', intitule: 'Achats de marchandises diverses', classe: 6, type: 'charge' },
  { numero: '608', intitule: 'Frais accessoires d\'achat', classe: 6, type: 'charge' },
  { numero: '609', intitule: 'Rabais, remises et ristournes obtenus sur achats', classe: 6, type: 'charge' },
  { numero: '611', intitule: 'Transports sur achats', classe: 6, type: 'charge' },
  { numero: '612', intitule: 'Transports sur ventes', classe: 6, type: 'charge' },
  { numero: '613', intitule: 'Locations', classe: 6, type: 'charge' },
  { numero: '614', intitule: 'Charges locatives et de copropriété', classe: 6, type: 'charge' },
  { numero: '615', intitule: 'Entretien et réparations', classe: 6, type: 'charge' },
  { numero: '616', intitule: 'Primes d\'assurance', classe: 6, type: 'charge' },
  { numero: '617', intitule: 'Publicité, publications, relations publiques', classe: 6, type: 'charge' },
  { numero: '618', intitule: 'Divers', classe: 6, type: 'charge' },
  { numero: '619', intitule: 'Rabais, remises et ristournes obtenus sur services', classe: 6, type: 'charge' },
  { numero: '621', intitule: 'Personnel extérieur à l\'entreprise', classe: 6, type: 'charge' },
  { numero: '622', intitule: 'Rémunérations d\'intermédiaires et honoraires', classe: 6, type: 'charge' },
  { numero: '623', intitule: 'Publicité, publications, relations publiques', classe: 6, type: 'charge' },
  { numero: '624', intitule: 'Transports de biens et transports collectifs', classe: 6, type: 'charge' },
  { numero: '625', intitule: 'Déplacements, missions et réceptions', classe: 6, type: 'charge' },
  { numero: '626', intitule: 'Frais postaux et de télécommunications', classe: 6, type: 'charge' },
  { numero: '627', intitule: 'Services bancaires et assimilés', classe: 6, type: 'charge' },
  { numero: '628', intitule: 'Divers', classe: 6, type: 'charge' },
  { numero: '629', intitule: 'Rabais, remises et ristournes obtenus', classe: 6, type: 'charge' },
  { numero: '631', intitule: 'Impôts et taxes sur rémunérations', classe: 6, type: 'charge' },
  { numero: '632', intitule: 'Taxes sur le chiffre d\'affaires', classe: 6, type: 'charge' },
  { numero: '633', intitule: 'Contributions et taxes diverses', classe: 6, type: 'charge' },
  { numero: '634', intitule: 'Taxe d\'apprentissage', classe: 6, type: 'charge' },
  { numero: '635', intitule: 'Patentes, licences et impôts locaux', classe: 6, type: 'charge' },
  { numero: '636', intitule: 'Contributions foncières et assimilées', classe: 6, type: 'charge' },
  { numero: '637', intitule: 'Autres impôts, taxes et versements assimilés', classe: 6, type: 'charge' },
  { numero: '638', intitule: 'Droits d\'enregistrement et de timbre', classe: 6, type: 'charge' },
  { numero: '641', intitule: 'Rémunérations du personnel', classe: 6, type: 'charge' },
  { numero: '642', intitule: 'Rémunérations dirigeants', classe: 6, type: 'charge' },
  { numero: '643', intitule: 'Indemnités et avantages divers', classe: 6, type: 'charge' },
  { numero: '644', intitule: 'Rémunérations des actionnaires', classe: 6, type: 'charge' },
  { numero: '645', intitule: 'Charges de sécurité sociale et de prévoyance', classe: 6, type: 'charge' },
  { numero: '646', intitule: 'Cotisations sociales patronales', classe: 6, type: 'charge' },
  { numero: '647', intitule: 'Autres charges sociales', classe: 6, type: 'charge' },
  { numero: '648', intitule: 'Autres charges de personnel', classe: 6, type: 'charge' },
  { numero: '651', intitule: 'Redevances pour concessions, brevets, licences', classe: 6, type: 'charge' },
  { numero: '652', intitule: 'Redevances de crédit-bail', classe: 6, type: 'charge' },
  { numero: '653', intitule: 'Jetons de présence', classe: 6, type: 'charge' },
  { numero: '654', intitule: 'Pertes sur créances irrécouvrables', classe: 6, type: 'charge' },
  { numero: '655', intitule: 'Quotes-parts de résultat sur opérations faites en commun', classe: 6, type: 'charge' },
  { numero: '656', intitule: 'Charges nettes sur cessions de valeurs mobilières de placement', classe: 6, type: 'charge' },
  { numero: '657', intitule: 'Charges diverses de gestion courante', classe: 6, type: 'charge' },
  { numero: '658', intitule: 'Charges de gestion diverse', classe: 6, type: 'charge' },
  { numero: '659', intitule: 'Autres charges d\'exploitation diverses', classe: 6, type: 'charge' },
  { numero: '661', intitule: 'Charges d\'intérêts', classe: 6, type: 'charge' },
  { numero: '662', intitule: 'Pertes de change', classe: 6, type: 'charge' },
  { numero: '663', intitule: 'Charges nettes sur cessions de VMP', classe: 6, type: 'charge' },
  { numero: '664', intitule: 'Escomptes accordés', classe: 6, type: 'charge' },
  { numero: '665', intitule: 'Escomptes de règlement accordés', classe: 6, type: 'charge' },
  { numero: '666', intitule: 'Pertes sur créances liées à des participations', classe: 6, type: 'charge' },
  { numero: '667', intitule: 'Charges nettes sur cessions de titres', classe: 6, type: 'charge' },
  { numero: '668', intitule: 'Autres charges financières', classe: 6, type: 'charge' },
  { numero: '671', intitule: 'Charges HAO - Valeurs comptables', classe: 6, type: 'charge' },
  { numero: '672', intitule: 'Charges HAO - Pénalités et amendes', classe: 6, type: 'charge' },
  { numero: '673', intitule: 'Charges HAO - Dons et libéralités', classe: 6, type: 'charge' },
  { numero: '674', intitule: 'Charges HAO - Pertes sur créances', classe: 6, type: 'charge' },
  { numero: '675', intitule: 'Charges HAO - Rappels d\'impôts', classe: 6, type: 'charge' },
  { numero: '676', intitule: 'Charges HAO - Autres', classe: 6, type: 'charge' },
  { numero: '677', intitule: 'Charges HAO - Sur exercices antérieurs', classe: 6, type: 'charge' },
  { numero: '678', intitule: 'Autres charges HAO', classe: 6, type: 'charge' },
  { numero: '679', intitule: 'Charges HAO diverses', classe: 6, type: 'charge' },
  { numero: '681', intitule: 'Dotations aux amortissements des immobilisations', classe: 6, type: 'charge' },
  { numero: '691', intitule: 'Dotations aux provisions pour risques et charges', classe: 6, type: 'charge' },
  { numero: '694', intitule: 'Dotations aux provisions pour dépréciation', classe: 6, type: 'charge' },
  { numero: '695', intitule: 'Dotations aux provisions réglementées', classe: 6, type: 'charge' },
  { numero: '697', intitule: 'Dotations aux provisions HAO', classe: 6, type: 'charge' },
  { numero: '698', intitule: 'Autres dotations aux provisions', classe: 6, type: 'charge' },

  // CLASS 7 - PRODUITS
  { numero: '701', intitule: 'Ventes de marchandises', classe: 7, type: 'produit' },
  { numero: '702', intitule: 'Ventes de produits finis', classe: 7, type: 'produit' },
  { numero: '703', intitule: 'Ventes de produits intermédiaires', classe: 7, type: 'produit' },
  { numero: '704', intitule: 'Ventes de produits résiduels', classe: 7, type: 'produit' },
  { numero: '705', intitule: 'Travaux', classe: 7, type: 'produit' },
  { numero: '706', intitule: 'Études', classe: 7, type: 'produit' },
  { numero: '707', intitule: 'Services vendus', classe: 7, type: 'produit' },
  { numero: '708', intitule: 'Produits accessoires', classe: 7, type: 'produit' },
  { numero: '709', intitule: 'Rabais, remises et ristournes accordés', classe: 7, type: 'produit' },
  { numero: '711', intitule: 'Subventions d\'exploitation', classe: 7, type: 'produit' },
  { numero: '712', intitule: 'Produits agricoles', classe: 7, type: 'produit' },
  { numero: '713', intitule: 'Variation de stocks de produits finis', classe: 7, type: 'produit' },
  { numero: '714', intitule: 'Variation de stocks d\'en-cours', classe: 7, type: 'produit' },
  { numero: '715', intitule: 'Variation de stocks de matières', classe: 7, type: 'produit' },
  { numero: '716', intitule: 'Variation de stocks de produits intermédiaires', classe: 7, type: 'produit' },
  { numero: '717', intitule: 'Variations de stocks de produits agricoles', classe: 7, type: 'produit' },
  { numero: '718', intitule: 'Autres variations de stocks', classe: 7, type: 'produit' },
  { numero: '719', intitule: 'Rabais et ristournes accordés', classe: 7, type: 'produit' },
  { numero: '721', intitule: 'Production immobilisée - Immobilisations incorporelles', classe: 7, type: 'produit' },
  { numero: '722', intitule: 'Production immobilisée - Immobilisations corporelles', classe: 7, type: 'produit' },
  { numero: '724', intitule: 'Revenus des immeubles non affectés', classe: 7, type: 'produit' },
  { numero: '725', intitule: 'Revenus des participations', classe: 7, type: 'produit' },
  { numero: '726', intitule: 'Revenus des autres titres immobilisés', classe: 7, type: 'produit' },
  { numero: '727', intitule: 'Revenus des prêts', classe: 7, type: 'produit' },
  { numero: '728', intitule: 'Autres revenus des immobilisations financières', classe: 7, type: 'produit' },
  { numero: '731', intitule: 'Subventions d\'exploitation', classe: 7, type: 'produit' },
  { numero: '732', intitule: 'Subventions d\'équilibre', classe: 7, type: 'produit' },
  { numero: '733', intitule: 'Subventions de l\'État', classe: 7, type: 'produit' },
  { numero: '734', intitule: 'Subventions des collectivités', classe: 7, type: 'produit' },
  { numero: '735', intitule: 'Subventions européennes', classe: 7, type: 'produit' },
  { numero: '736', intitule: 'Subventions diverses', classe: 7, type: 'produit' },
  { numero: '737', intitule: 'Bonifications d\'intérêts', classe: 7, type: 'produit' },
  { numero: '738', intitule: 'Autres subventions d\'exploitation', classe: 7, type: 'produit' },
  { numero: '741', intitule: 'Autres produits d\'exploitation', classe: 7, type: 'produit' },
  { numero: '742', intitule: 'Revenus de créances', classe: 7, type: 'produit' },
  { numero: '743', intitule: 'Produits de location', classe: 7, type: 'produit' },
  { numero: '744', intitule: 'Ristournes reçues sur achats', classe: 7, type: 'produit' },
  { numero: '745', intitule: 'Subventions d\'équilibre reçues', classe: 7, type: 'produit' },
  { numero: '746', intitule: 'Remboursements de frais', classe: 7, type: 'produit' },
  { numero: '747', intitule: 'Indemnités reçues', classe: 7, type: 'produit' },
  { numero: '748', intitule: 'Autres produits divers', classe: 7, type: 'produit' },
  { numero: '751', intitule: 'Redevances pour concessions', classe: 7, type: 'produit' },
  { numero: '752', intitule: 'Quotes-parts de résultat sur opérations en commun', classe: 7, type: 'produit' },
  { numero: '753', intitule: 'Jetons de présence reçus', classe: 7, type: 'produit' },
  { numero: '754', intitule: 'Ristournes sur achats de VMP', classe: 7, type: 'produit' },
  { numero: '755', intitule: 'Résultats sur réalisations de VMP', classe: 7, type: 'produit' },
  { numero: '756', intitule: 'Produits nets sur cessions de VMP', classe: 7, type: 'produit' },
  { numero: '757', intitule: 'Produits de gestion courante', classe: 7, type: 'produit' },
  { numero: '758', intitule: 'Autres produits de gestion courante', classe: 7, type: 'produit' },
  { numero: '759', intitule: 'Autres produits d\'exploitation', classe: 7, type: 'produit' },
  { numero: '761', intitule: 'Revenus des participations', classe: 7, type: 'produit' },
  { numero: '762', intitule: 'Revenus des autres immobilisations financières', classe: 7, type: 'produit' },
  { numero: '763', intitule: 'Revenus des créances financières', classe: 7, type: 'produit' },
  { numero: '764', intitule: 'Revenus des valeurs mobilières', classe: 7, type: 'produit' },
  { numero: '765', intitule: 'Escomptes obtenus', classe: 7, type: 'produit' },
  { numero: '766', intitule: 'Gains de change', classe: 7, type: 'produit' },
  { numero: '767', intitule: 'Produits nets sur cessions de VMP', classe: 7, type: 'produit' },
  { numero: '768', intitule: 'Autres produits financiers', classe: 7, type: 'produit' },
  { numero: '771', intitule: 'Produits HAO - Produits de cessions d\'actifs', classe: 7, type: 'produit' },
  { numero: '772', intitule: 'Produits HAO - Subventions d\'équilibre', classe: 7, type: 'produit' },
  { numero: '773', intitule: 'Produits HAO - Dégrèvements d\'impôts', classe: 7, type: 'produit' },
  { numero: '774', intitule: 'Produits HAO - Indemnités', classe: 7, type: 'produit' },
  { numero: '775', intitule: 'Produits HAO - Produits sur exercices antérieurs', classe: 7, type: 'produit' },
  { numero: '776', intitule: 'Produits HAO - Divers', classe: 7, type: 'produit' },
  { numero: '777', intitule: 'Subventions d\'investissement virées', classe: 7, type: 'produit' },
  { numero: '778', intitule: 'Autres produits HAO', classe: 7, type: 'produit' },
  { numero: '779', intitule: 'Produits HAO divers', classe: 7, type: 'produit' },
  { numero: '781', intitule: 'Reprises sur amortissements', classe: 7, type: 'produit' },
  { numero: '791', intitule: 'Reprises sur provisions pour risques et charges', classe: 7, type: 'produit' },
  { numero: '794', intitule: 'Reprises sur provisions pour dépréciation', classe: 7, type: 'produit' },
  { numero: '797', intitule: 'Reprises sur provisions HAO', classe: 7, type: 'produit' },
  { numero: '798', intitule: 'Autres reprises sur provisions', classe: 7, type: 'produit' },

  // CLASS 8 - AUTRES CHARGES ET PRODUITS (HAO / Résultat)
  { numero: '801', intitule: 'Valeurs comptables des cessions d\'immobilisations', classe: 8, type: 'charge' },
  { numero: '811', intitule: 'Charges HAO - Valeurs comptables', classe: 8, type: 'charge' },
  { numero: '812', intitule: 'Charges HAO - Pertes sur créances', classe: 8, type: 'charge' },
  { numero: '813', intitule: 'Charges HAO - Pénalités', classe: 8, type: 'charge' },
  { numero: '814', intitule: 'Charges HAO - Dons et libéralités', classe: 8, type: 'charge' },
  { numero: '815', intitule: 'Charges HAO - Amendes et condamnations', classe: 8, type: 'charge' },
  { numero: '816', intitule: 'Charges HAO - Rappels d\'impôts', classe: 8, type: 'charge' },
  { numero: '817', intitule: 'Charges HAO - Divers', classe: 8, type: 'charge' },
  { numero: '818', intitule: 'Autres charges HAO', classe: 8, type: 'charge' },
  { numero: '821', intitule: 'Produits des cessions d\'immobilisations', classe: 8, type: 'produit' },
  { numero: '822', intitule: 'Produits HAO - Subventions d\'équilibre', classe: 8, type: 'produit' },
  { numero: '823', intitule: 'Produits HAO - Dégrèvements d\'impôts', classe: 8, type: 'produit' },
  { numero: '824', intitule: 'Produits HAO - Indemnités', classe: 8, type: 'produit' },
  { numero: '825', intitule: 'Produits HAO - Divers', classe: 8, type: 'produit' },
  { numero: '826', intitule: 'Produits HAO - Récupérations de créances', classe: 8, type: 'produit' },
  { numero: '827', intitule: 'Produits HAO - Sur exercices antérieurs', classe: 8, type: 'produit' },
  { numero: '828', intitule: 'Autres produits HAO', classe: 8, type: 'produit' },
  { numero: '831', intitule: 'Charges d\'intégration fiscale', classe: 8, type: 'charge' },
  { numero: '832', intitule: 'Produits d\'intégration fiscale', classe: 8, type: 'produit' },
  { numero: '833', intitule: 'Quotes-parts de charges en participation', classe: 8, type: 'charge' },
  { numero: '834', intitule: 'Quotes-parts de produits en participation', classe: 8, type: 'produit' },
  { numero: '835', intitule: 'Résultats sur opérations en commun', classe: 8, type: 'autre' },
  { numero: '838', intitule: 'Résultats sur opérations diverses', classe: 8, type: 'autre' },
  { numero: '841', intitule: 'Produits des cessions de titres de participation', classe: 8, type: 'produit' },
  { numero: '842', intitule: 'Produits des cessions d\'immobilisations corporelles', classe: 8, type: 'produit' },
  { numero: '843', intitule: 'Produits des cessions d\'immobilisations incorporelles', classe: 8, type: 'produit' },
  { numero: '844', intitule: 'Produits des cessions d\'immobilisations financières', classe: 8, type: 'produit' },
  { numero: '848', intitule: 'Produits des cessions d\'autres éléments', classe: 8, type: 'produit' },
  { numero: '851', intitule: 'Produits HAO spéciaux', classe: 8, type: 'produit' },
  { numero: '852', intitule: 'Produits d\'indemnités de sinistres', classe: 8, type: 'produit' },
  { numero: '853', intitule: 'Produits HAO - Récupérations', classe: 8, type: 'produit' },
  { numero: '854', intitule: 'Produits HAO - Reversements', classe: 8, type: 'produit' },
  { numero: '858', intitule: 'Autres produits HAO spéciaux', classe: 8, type: 'produit' },
  { numero: '861', intitule: 'Charges HAO spéciales', classe: 8, type: 'charge' },
  { numero: '862', intitule: 'Charges d\'intégration fiscale', classe: 8, type: 'charge' },
  { numero: '863', intitule: 'Charges de restructuration', classe: 8, type: 'charge' },
  { numero: '864', intitule: 'Charges de fermeture de site', classe: 8, type: 'charge' },
  { numero: '865', intitule: 'Charges de liquidation', classe: 8, type: 'charge' },
  { numero: '868', intitule: 'Autres charges HAO spéciales', classe: 8, type: 'charge' },
  { numero: '871', intitule: 'Dotations aux amortissements HAO', classe: 8, type: 'charge' },
  { numero: '872', intitule: 'Dotations aux provisions HAO', classe: 8, type: 'charge' },
  { numero: '873', intitule: 'Dotations exceptionnelles', classe: 8, type: 'charge' },
  { numero: '874', intitule: 'Dotations aux provisions pour risques HAO', classe: 8, type: 'charge' },
  { numero: '875', intitule: 'Dotations diverses HAO', classe: 8, type: 'charge' },
  { numero: '878', intitule: 'Autres dotations HAO', classe: 8, type: 'charge' },
  { numero: '881', intitule: 'Reprises sur amortissements HAO', classe: 8, type: 'produit' },
  { numero: '891', intitule: 'Participation des travailleurs', classe: 8, type: 'charge' },
  { numero: '894', intitule: 'Impôts sur les bénéfices', classe: 8, type: 'charge' },
  { numero: '897', intitule: 'Impôt minimum forfaitaire', classe: 8, type: 'charge' },
  { numero: '898', intitule: 'Autres impôts sur les bénéfices', classe: 8, type: 'charge' },

  // CLASS 9 - COMPTABILITÉ ANALYTIQUE
  { numero: '901', intitule: 'Comptes de résultats analytiques', classe: 9, type: 'autre' },
  { numero: '902', intitule: 'Comptes de charges analytiques', classe: 9, type: 'autre' },
  { numero: '903', intitule: 'Comptes de produits analytiques', classe: 9, type: 'autre' },
  { numero: '904', intitule: 'Comptes d\'imputation provisoire', classe: 9, type: 'autre' },
  { numero: '905', intitule: 'Comptes de stocks analytiques', classe: 9, type: 'autre' },
  { numero: '906', intitule: 'Comptes d\'en-cours analytiques', classe: 9, type: 'autre' },
  { numero: '908', intitule: 'Comptes de différences analytiques', classe: 9, type: 'autre' },
  { numero: '911', intitule: 'Centres principaux - Charges directes', classe: 9, type: 'autre' },
  { numero: '912', intitule: 'Centres principaux - Charges indirectes', classe: 9, type: 'autre' },
  { numero: '913', intitule: 'Centres principaux - Prestations reçues', classe: 9, type: 'autre' },
  { numero: '914', intitule: 'Centres principaux - Prestations fournies', classe: 9, type: 'autre' },
  { numero: '915', intitule: 'Centres principaux - Résultats', classe: 9, type: 'autre' },
  { numero: '916', intitule: 'Centres principaux - Éléments supplétifs', classe: 9, type: 'autre' },
  { numero: '918', intitule: 'Centres principaux - Autres éléments', classe: 9, type: 'autre' },
  { numero: '921', intitule: 'Centres auxiliaires - Charges directes', classe: 9, type: 'autre' },
  { numero: '922', intitule: 'Centres auxiliaires - Charges indirectes', classe: 9, type: 'autre' },
  { numero: '923', intitule: 'Centres auxiliaires - Prestations reçues', classe: 9, type: 'autre' },
  { numero: '924', intitule: 'Centres auxiliaires - Prestations fournies', classe: 9, type: 'autre' },
  { numero: '925', intitule: 'Centres auxiliaires - Résultats', classe: 9, type: 'autre' },
  { numero: '926', intitule: 'Centres auxiliaires - Éléments supplétifs', classe: 9, type: 'autre' },
  { numero: '928', intitule: 'Centres auxiliaires - Autres éléments', classe: 9, type: 'autre' },
  { numero: '931', intitule: 'Coûts d\'achat', classe: 9, type: 'autre' },
  { numero: '932', intitule: 'Coûts de production', classe: 9, type: 'autre' },
  { numero: '933', intitule: 'Coûts de distribution', classe: 9, type: 'autre' },
  { numero: '934', intitule: 'Coûts de revient', classe: 9, type: 'autre' },
  { numero: '935', intitule: 'Coûts hors production', classe: 9, type: 'autre' },
  { numero: '938', intitule: 'Autres coûts', classe: 9, type: 'autre' },
  { numero: '941', intitule: 'Différences sur charges', classe: 9, type: 'autre' },
  { numero: '942', intitule: 'Différences sur produits', classe: 9, type: 'autre' },
  { numero: '943', intitule: 'Différences de traitement', classe: 9, type: 'autre' },
  { numero: '944', intitule: 'Différences d\'incorporation', classe: 9, type: 'autre' },
  { numero: '945', intitule: 'Différences de conversion', classe: 9, type: 'autre' },
  { numero: '948', intitule: 'Autres différences', classe: 9, type: 'autre' },
  { numero: '951', intitule: 'Stocks analytiques de matières', classe: 9, type: 'autre' },
  { numero: '952', intitule: 'Stocks analytiques de produits en cours', classe: 9, type: 'autre' },
  { numero: '953', intitule: 'Stocks analytiques de produits finis', classe: 9, type: 'autre' },
  { numero: '954', intitule: 'Stocks analytiques de marchandises', classe: 9, type: 'autre' },
  { numero: '955', intitule: 'Stocks analytiques d\'emballages', classe: 9, type: 'autre' },
  { numero: '958', intitule: 'Autres stocks analytiques', classe: 9, type: 'autre' },
  { numero: '961', intitule: 'Produits analytiques A', classe: 9, type: 'autre' },
  { numero: '962', intitule: 'Produits analytiques B', classe: 9, type: 'autre' },
  { numero: '963', intitule: 'Produits analytiques C', classe: 9, type: 'autre' },
  { numero: '964', intitule: 'Produits analytiques D', classe: 9, type: 'autre' },
  { numero: '965', intitule: 'Produits analytiques E', classe: 9, type: 'autre' },
  { numero: '968', intitule: 'Produits analytiques autres', classe: 9, type: 'autre' },
  { numero: '971', intitule: 'Charges analytiques incorporées', classe: 9, type: 'autre' },
  { numero: '972', intitule: 'Charges analytiques non incorporées', classe: 9, type: 'autre' },
  { numero: '973', intitule: 'Charges supplétives', classe: 9, type: 'autre' },
  { numero: '974', intitule: 'Éléments supplétifs', classe: 9, type: 'autre' },
  { numero: '975', intitule: 'Charges d\'usage', classe: 9, type: 'autre' },
  { numero: '978', intitule: 'Autres charges analytiques', classe: 9, type: 'autre' },
  { numero: '981', intitule: 'Résultats analytiques', classe: 9, type: 'autre' },
  { numero: '982', intitule: 'Résultats par activité', classe: 9, type: 'autre' },
  { numero: '983', intitule: 'Résultats par produit', classe: 9, type: 'autre' },
  { numero: '984', intitule: 'Résultats par zone géographique', classe: 9, type: 'autre' },
  { numero: '985', intitule: 'Résultats par client', classe: 9, type: 'autre' },
  { numero: '988', intitule: 'Autres résultats analytiques', classe: 9, type: 'autre' },
  { numero: '991', intitule: 'Comptes de liaison', classe: 9, type: 'autre' },
  { numero: '992', intitule: 'Comptes de régularisation analytique', classe: 9, type: 'autre' },
  { numero: '993', intitule: 'Comptes d\'ordre analytique', classe: 9, type: 'autre' },
  { numero: '994', intitule: 'Comptes de différences de traitement', classe: 9, type: 'autre' },
  { numero: '995', intitule: 'Comptes de contrôle', classe: 9, type: 'autre' },
  { numero: '998', intitule: 'Autres comptes analytiques', classe: 9, type: 'autre' },
]

export const BAREME_DEFAUT = { compte: 40, sens: 30, montant: 20, equilibre: 10 }

// ===================== HELPER =====================

export function estCompteCorrectif(numero: string): boolean {
  if (numero.startsWith('28') || numero.startsWith('29') || numero.startsWith('39')) return true
  if (numero.startsWith('49') && numero !== '499') return true
  if (numero.startsWith('59') && numero !== '599') return true
  return false
}

// ===================== ACCOUNTS =====================

export function getComptes(): CompteOHADA[] {
  return PLAN_COMPTABLE_OHADA
}

export function getCompteByNumero(num: string): CompteOHADA | undefined {
  return PLAN_COMPTABLE_OHADA.find(c => c.numero === num)
}

// ===================== SESSIONS =====================

// SYSCOHADA et SYCEBNL ont des clés de stockage distinctes : aucun mélange
const KEY_SESSIONS =         'compta_sessions'          // SYSCOHADA
const KEY_SESSIONS_SYCEBNL = 'compta_sessions_sycebnl'  // SYCEBNL

// Clés isolées par utilisateur : chaque compte a son propre espace de travail
// compta_current_user stocke directement l'id (string brute), pas un objet JSON
function userKey(baseKey: string): string {
  try {
    const id = localStorage.getItem('compta_current_user')
    return id ? `${baseKey}_${id}` : baseKey
  } catch { return baseKey }
}

export function getSessions(module?: 'syscohada' | 'sycebnl'): Session[] {
  const base = module === 'sycebnl' ? KEY_SESSIONS_SYCEBNL : KEY_SESSIONS
  try {
    return JSON.parse(localStorage.getItem(userKey(base)) || '[]')
  } catch { return [] }
}

export function createSession(data: Omit<Session, 'id' | 'dateCreation'>, module?: 'syscohada' | 'sycebnl'): Session {
  const base = module === 'sycebnl' ? KEY_SESSIONS_SYCEBNL : KEY_SESSIONS
  const sessions = getSessions(module)
  const s: Session = { ...data, id: generateId(), dateCreation: new Date().toISOString() }
  sessions.push(s)
  localStorage.setItem(userKey(base), JSON.stringify(sessions))
  return s
}

export function updateSession(id: string, data: Partial<Session>, module?: 'syscohada' | 'sycebnl'): void {
  const base = module === 'sycebnl' ? KEY_SESSIONS_SYCEBNL : KEY_SESSIONS
  const sessions = getSessions(module)
  const idx = sessions.findIndex(s => s.id === id)
  if (idx !== -1) {
    sessions[idx] = { ...sessions[idx], ...data }
    localStorage.setItem(userKey(base), JSON.stringify(sessions))
  }
}

export function deleteSession(id: string, module?: 'syscohada' | 'sycebnl'): void {
  const base = module === 'sycebnl' ? KEY_SESSIONS_SYCEBNL : KEY_SESSIONS
  const sessions = getSessions(module).filter(s => s.id !== id)
  localStorage.setItem(userKey(base), JSON.stringify(sessions))
  dispatchComptaChange()
}

// ===================== ECRITURES =====================

// Dispatcher un événement custom pour forcer le re-render des pages qui lisent le localStorage
function dispatchComptaChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('compta-data-changed'))
  }
}


// SYSCOHADA et SYCEBNL ont des clés de stockage distinctes : aucun mélange
const KEY_ECRITURES =         'compta_ecritures'          // SYSCOHADA
const KEY_ECRITURES_SYCEBNL = 'compta_ecritures_sycebnl'  // SYCEBNL

export function getEcritures(sessionId?: string, module?: 'syscohada' | 'sycebnl'): Ecriture[] {
  const base = module === 'sycebnl' ? KEY_ECRITURES_SYCEBNL : KEY_ECRITURES
  try {
    const all = JSON.parse(localStorage.getItem(userKey(base)) || '[]') as Ecriture[]
    return sessionId ? all.filter(e => e.sessionId === sessionId) : all
  } catch { return [] }
}

export function addEcriture(data: Omit<Ecriture, 'id'>, module?: 'syscohada' | 'sycebnl'): Ecriture {
  const base = module === 'sycebnl' ? KEY_ECRITURES_SYCEBNL : KEY_ECRITURES
  const all = getEcritures(undefined, module)
  const e: Ecriture = { ...data, id: generateId() }
  all.push(e)
  localStorage.setItem(userKey(base), JSON.stringify(all))
  dispatchComptaChange()
  return e
}

export function updateEcriture(id: string, data: Partial<Ecriture>, module?: 'syscohada' | 'sycebnl'): void {
  const base = module === 'sycebnl' ? KEY_ECRITURES_SYCEBNL : KEY_ECRITURES
  const all = getEcritures(undefined, module)
  const idx = all.findIndex(e => e.id === id)
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...data }
    localStorage.setItem(userKey(base), JSON.stringify(all))
  }
}

export function deleteEcriture(id: string, module?: 'syscohada' | 'sycebnl'): void {
  const base = module === 'sycebnl' ? KEY_ECRITURES_SYCEBNL : KEY_ECRITURES
  const all = getEcritures(undefined, module).filter(e => e.id !== id)
  localStorage.setItem(userKey(base), JSON.stringify(all))
  dispatchComptaChange()
}

export function deleteEcrituresByGroupe(ligneGroupe: string, module?: 'syscohada' | 'sycebnl'): void {
  const base = module === 'sycebnl' ? KEY_ECRITURES_SYCEBNL : KEY_ECRITURES
  const all = getEcritures(undefined, module).filter(e => e.ligneGroupe !== ligneGroupe)
  localStorage.setItem(userKey(base), JSON.stringify(all))
  dispatchComptaChange()
}

// Vider toutes les écritures d'une session (réinitialisation)
export function clearSessionEcritures(sessionId: string, module?: 'syscohada' | 'sycebnl'): void {
  const base = module === 'sycebnl' ? KEY_ECRITURES_SYCEBNL : KEY_ECRITURES
  const all = getEcritures(undefined, module).filter(e => e.sessionId !== sessionId)
  localStorage.setItem(userKey(base), JSON.stringify(all))
  dispatchComptaChange()
}

// ===================== USERS =====================

const KEY_USERS = 'compta_users'
const KEY_CURRENT_USER = 'compta_current_user'

export function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(KEY_USERS) || '[]')
  } catch { return [] }
}

export function getCurrentUser(): User | null {
  try {
    const id = localStorage.getItem(KEY_CURRENT_USER)
    if (!id) return null
    return getUsers().find(u => u.id === id) || null
  } catch { return null }
}

export function setCurrentUser(id: string): void {
  localStorage.setItem(KEY_CURRENT_USER, id)
}

export function createUser(data: Omit<User, 'id' | 'dateCreation'>): User {
  const users = getUsers()
  const u: User = { ...data, id: generateId(), dateCreation: new Date().toISOString() }
  users.push(u)
  localStorage.setItem(KEY_USERS, JSON.stringify(users))
  return u
}

export function updateUser(id: string, data: Partial<User>): void {
  const users = getUsers()
  const idx = users.findIndex(u => u.id === id)
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...data }
    localStorage.setItem(KEY_USERS, JSON.stringify(users))
  }
}

export function deleteUser(id: string): void {
  const users = getUsers().filter(u => u.id !== id)
  localStorage.setItem(KEY_USERS, JSON.stringify(users))
}

export function login(username: string, password: string): User | null {
  const users = getUsers()
  const u = users.find(u => u.username === username && u.password === password && u.actif)
  if (u) {
    setCurrentUser(u.id)
    return u
  }
  return null
}

export function logout(): void {
  localStorage.removeItem(KEY_CURRENT_USER)
}

// ===================== EXERCICES =====================

const KEY_EXERCICES = 'compta_exercices'

export function getExercices(sessionId?: string): Exercice[] {
  try {
    const all = JSON.parse(localStorage.getItem(KEY_EXERCICES) || '[]') as Exercice[]
    return sessionId ? all.filter(e => e.sessionId === sessionId) : all
  } catch { return [] }
}

export function createExercice(data: Omit<Exercice, 'id' | 'dateCreation'>): Exercice {
  const all = getExercices()
  const e: Exercice = { ...data, id: generateId(), dateCreation: new Date().toISOString() }
  all.push(e)
  localStorage.setItem(KEY_EXERCICES, JSON.stringify(all))
  return e
}

export function updateExercice(id: string, data: Partial<Exercice>): void {
  const all = getExercices()
  const idx = all.findIndex(e => e.id === id)
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...data }
    localStorage.setItem(KEY_EXERCICES, JSON.stringify(all))
  }
}

export function deleteExercice(id: string): void {
  const all = getExercices().filter(e => e.id !== id)
  localStorage.setItem(KEY_EXERCICES, JSON.stringify(all))
}

// ===================== TENTATIVES =====================

const KEY_TENTATIVES = 'compta_tentatives'

export function getTentatives(exerciceId?: string): Tentative[] {
  try {
    const all = JSON.parse(localStorage.getItem(KEY_TENTATIVES) || '[]') as Tentative[]
    return exerciceId ? all.filter(t => t.exerciceId === exerciceId) : all
  } catch { return [] }
}

export function saveTentative(data: Omit<Tentative, 'id' | 'dateCreation'>): Tentative {
  const all = getTentatives()
  const t: Tentative = { ...data, id: generateId(), dateCreation: new Date().toISOString() }
  all.push(t)
  localStorage.setItem(KEY_TENTATIVES, JSON.stringify(all))
  return t
}

// ===================== DOCUMENTS =====================

const KEY_DOCUMENTS = 'compta_documents'

export function getDocuments(): Document[] {
  try {
    return JSON.parse(localStorage.getItem(KEY_DOCUMENTS) || '[]')
  } catch { return [] }
}

export function saveDocument(data: Omit<Document, 'id' | 'dateCreation'>): Document {
  const all = getDocuments()
  const d: Document = { ...data, id: generateId(), dateCreation: new Date().toISOString() }
  all.push(d)
  localStorage.setItem(KEY_DOCUMENTS, JSON.stringify(all))
  return d
}

export function deleteDocument(id: string): void {
  const all = getDocuments().filter(d => d.id !== id)
  localStorage.setItem(KEY_DOCUMENTS, JSON.stringify(all))
}

// ===================== MESSAGES =====================

const KEY_MESSAGES = 'compta_messages'

export function getMessages(): Message[] {
  try {
    return JSON.parse(localStorage.getItem(KEY_MESSAGES) || '[]')
  } catch { return [] }
}

export function saveMessage(data: Omit<Message, 'id'>): Message {
  const all = getMessages()
  const m: Message = { ...data, id: generateId() }
  all.push(m)
  localStorage.setItem(KEY_MESSAGES, JSON.stringify(all))
  return m
}

// ===================== UNIVERSITES =====================

const KEY_UNIVERSITES = 'compta_universites'

export function getUniversites(): Universite[] {
  try {
    return JSON.parse(localStorage.getItem(KEY_UNIVERSITES) || '[]')
  } catch { return [] }
}

export function saveUniversite(data: Omit<Universite, 'id'>): Universite {
  const all = getUniversites()
  const u: Universite = { ...data, id: generateId() }
  all.push(u)
  localStorage.setItem(KEY_UNIVERSITES, JSON.stringify(all))
  return u
}

export function updateUniversite(id: string, data: Partial<Universite>): void {
  const all = getUniversites()
  const idx = all.findIndex(x => x.id === id)
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...data }
    localStorage.setItem(KEY_UNIVERSITES, JSON.stringify(all))
  }
}

export function deleteUniversite(id: string): void {
  const all = getUniversites().filter(u => u.id !== id)
  localStorage.setItem(KEY_UNIVERSITES, JSON.stringify(all))
}

// ===================== FACULTÉS =====================

const KEY_FACULTES = 'compta_facultes'

export function getFacultes(universiteId?: string): Faculte[] {
  try {
    const all = JSON.parse(localStorage.getItem(KEY_FACULTES) || '[]') as Faculte[]
    return universiteId ? all.filter(f => f.universiteId === universiteId) : all
  } catch { return [] }
}

export function createFaculte(data: Omit<Faculte, 'id' | 'dateCreation'>): Faculte {
  const all = getFacultes()
  const f: Faculte = { ...data, id: generateId(), dateCreation: new Date().toISOString() }
  all.push(f)
  localStorage.setItem(KEY_FACULTES, JSON.stringify(all))
  return f
}

export function updateFaculte(id: string, data: Partial<Faculte>): void {
  const all = getFacultes()
  const idx = all.findIndex(f => f.id === id)
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...data }
    localStorage.setItem(KEY_FACULTES, JSON.stringify(all))
  }
}

export function deleteFaculte(id: string): void {
  const all = getFacultes().filter(f => f.id !== id)
  localStorage.setItem(KEY_FACULTES, JSON.stringify(all))
}

// ===================== COURS =====================

const KEY_COURS      = 'compta_cours'
const KEY_DEVOIRS    = 'compta_devoirs'
const KEY_SOUMISSIONS = 'compta_soumissions'

export function getCours(faculteId?: string, universiteId?: string): Cours[] {
  try {
    const all = JSON.parse(localStorage.getItem(KEY_COURS) || '[]') as Cours[]
    if (faculteId) return all.filter(c => c.faculteId === faculteId)
    if (universiteId) return all.filter(c => c.universiteId === universiteId)
    return all
  } catch { return [] }
}

export function createCours(data: Omit<Cours, 'id' | 'dateCreation'>): Cours {
  const all = getCours()
  const c: Cours = { ...data, id: generateId(), dateCreation: new Date().toISOString() }
  all.push(c)
  localStorage.setItem(KEY_COURS, JSON.stringify(all))
  return c
}

export function updateCours(id: string, data: Partial<Cours>): void {
  const all = getCours()
  const idx = all.findIndex(c => c.id === id)
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...data }
    localStorage.setItem(KEY_COURS, JSON.stringify(all))
  }
}

export function deleteCours(id: string): void {
  const all = getCours().filter(c => c.id !== id)
  localStorage.setItem(KEY_COURS, JSON.stringify(all))
}

// ===================== INIT =====================

export function initDefaultData(): void {
  // Force admin update every time
  const users = getUsers()
  const adminIdx = users.findIndex(u => u.username === 'manasse.tandu')
  const adminData: User = {
    id: 'admin-manasse-001',
    username: 'manasse.tandu',
    password: 'tandu2026',
    nom: 'TANDU SAVA',
    prenom: 'Manasse',
    role: 'admin',
    dateCreation: new Date().toISOString(),
    actif: true
  }
  if (adminIdx === -1) {
    users.push(adminData)
  } else {
    users[adminIdx] = adminData
  }
  localStorage.setItem(KEY_USERS, JSON.stringify(users))

  // Compte démo professeur
  const profIdx = users.findIndex(u => u.username === 'prof.demo')
  const profData: User = {
    id: 'prof-demo-001',
    username: 'prof.demo',
    password: 'prof2026',
    nom: 'DEMO',
    prenom: 'Professeur',
    role: 'professeur',
    dateCreation: new Date().toISOString(),
    actif: true,
  }
  if (profIdx === -1) users.push(profData)
  else users[profIdx] = profData

  // Compte démo étudiant
  const etudIdx = users.findIndex(u => u.username === 'etudiant.demo')
  const etudData: User = {
    id: 'etudiant-demo-001',
    username: 'etudiant.demo',
    password: 'etud2026',
    nom: 'DEMO',
    prenom: 'Étudiant',
    role: 'etudiant',
    classe: 'L1 Comptabilité',
    dateCreation: new Date().toISOString(),
    actif: true,
  }
  if (etudIdx === -1) users.push(etudData)
  else users[etudIdx] = etudData

  localStorage.setItem(KEY_USERS, JSON.stringify(users))

  // Créer une session démo SYSCOHADA si aucune n'existe
  const sessions = getSessions('syscohada')
  if (sessions.length === 0) {
    createSession({
      nom: 'Session Démonstration 2024',
      exercice: 2024,
      description: 'Session de démonstration SYSCOHADA',
      userId: 'admin-manasse-001'
    }, 'syscohada')
  }
  // Créer une session démo SYCEBNL si aucune n'existe
  const sessionsSycebnl = getSessions('sycebnl')
  if (sessionsSycebnl.length === 0) {
    createSession({
      nom: 'Session Démonstration SYCEBNL 2024',
      exercice: 2024,
      description: 'Session de démonstration SYCEBNL',
      userId: 'admin-manasse-001'
    }, 'sycebnl')
  }
}

// ===================== DEVOIRS =====================
export function getDevoirs(): Devoir[] {
  try { return JSON.parse(localStorage.getItem(KEY_DEVOIRS) || '[]') } catch { return [] }
}
export function createDevoir(data: Omit<Devoir, 'id' | 'dateCreation'>): Devoir {
  const devoirs = getDevoirs()
  const d: Devoir = { ...data, id: generateId(), dateCreation: new Date().toISOString() }
  localStorage.setItem(KEY_DEVOIRS, JSON.stringify([...devoirs, d]))
  return d
}
export function updateDevoir(id: string, data: Partial<Devoir>): void {
  const devoirs = getDevoirs().map(d => d.id === id ? { ...d, ...data } : d)
  localStorage.setItem(KEY_DEVOIRS, JSON.stringify(devoirs))
}
export function deleteDevoir(id: string): void {
  // Supprimer aussi les soumissions liées
  const soumissions = getSoumissions().filter(s => s.devoirId !== id)
  localStorage.setItem(KEY_SOUMISSIONS, JSON.stringify(soumissions))
  const devoirs = getDevoirs().filter(d => d.id !== id)
  localStorage.setItem(KEY_DEVOIRS, JSON.stringify(devoirs))
}
export function isDevoirExpire(devoir: Devoir): boolean {
  return new Date() > new Date(devoir.dateLimit)
}

// ===================== SOUMISSIONS =====================
export function getSoumissions(): Soumission[] {
  try { return JSON.parse(localStorage.getItem(KEY_SOUMISSIONS) || '[]') } catch { return [] }
}
export function getSoumissionsByDevoir(devoirId: string): Soumission[] {
  return getSoumissions().filter(s => s.devoirId === devoirId)
}
export function getSoumissionsByEtudiant(etudiantId: string): Soumission[] {
  return getSoumissions().filter(s => s.etudiantId === etudiantId)
}
export function getSoumission(devoirId: string, etudiantId: string): Soumission | undefined {
  return getSoumissions().find(s => s.devoirId === devoirId && s.etudiantId === etudiantId)
}
export function createSoumission(data: Omit<Soumission, 'id' | 'dateSoumission' | 'statut'>): Soumission {
  const all = getSoumissions()
  const s: Soumission = {
    ...data,
    id: generateId(),
    dateSoumission: new Date().toISOString(),
    statut: 'soumis',
  }
  localStorage.setItem(KEY_SOUMISSIONS, JSON.stringify([...all, s]))
  // Verrouiller la session à la soumission
  const sessions = JSON.parse(localStorage.getItem('compta_sessions') || '[]')
  const updated = sessions.map((sess: any) =>
    sess.id === data.sessionId ? { ...sess, verrouille: true } : sess
  )
  localStorage.setItem('compta_sessions', JSON.stringify(updated))
  return s
}
export function corrigerSoumission(id: string, note: number, commentaire: string): void {
  const all = getSoumissions().map(s =>
    s.id === id
      ? { ...s, note, commentaire, statut: 'note' as const, dateCorrection: new Date().toISOString() }
      : s
  )
  localStorage.setItem(KEY_SOUMISSIONS, JSON.stringify(all))
}
