// ═══════════════════════════════════════════════════════════════════════
//  ORBIT - Couche de données Firebase (remplace localStorage)
//  Toutes les fonctions gardent les mêmes signatures qu'avant
//  pour éviter de modifier les pages existantes.
// ═══════════════════════════════════════════════════════════════════════

import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc,
  deleteDoc, query, where, onSnapshot, deleteField,
  writeBatch, increment, getFirestore, getCountFromServer, documentId, connectFirestoreEmulator,
  type Unsubscribe
} from 'firebase/firestore'
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged, type User as FirebaseUser,
  initializeAuth, browserLocalPersistence,
  EmailAuthProvider, reauthenticateWithCredential, updatePassword, connectAuthEmulator
} from 'firebase/auth'
import { initializeApp, getApps } from 'firebase/app'
import { db, auth, getStorageDiffere, EMULATEURS, PORT_EMU_AUTH, PORT_EMU_FIRESTORE } from './firebase'
import { notifyFirestoreError } from './firestoreErrorHandler'
import { anneeAcademiqueEnCours } from './utils'
import { promotionCorrespond } from './promotion'
import type {
  User, Session, Ecriture, Exercice, Tentative,
  Document, Message, Universite, Faculte, Cours, Devoir, Soumission, Presence, NoteCours
} from './db'

// ─── ID générique ────────────────────────────────────────────────────────────
function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

// ─── Seconde instance Firebase pour créer des comptes sans déconnecter l'admin ─
// Firebase déconnecte l'utilisateur courant quand on crée un nouveau compte.
// Solution : utiliser une seconde instance d'app pour les créations.
const firebaseConfig = {
  apiKey: "AIzaSyDERRGuR0EBGatLlcB5zzFi284JK6_IGmM",
  authDomain: "campus-ohada.firebaseapp.com",
  projectId: "campus-ohada",
  storageBucket: "campus-ohada.firebasestorage.app",
  messagingSenderId: "378322713592",
  appId: "1:378322713592:web:30c47407e4dbfc7d7d340d",
}
const secondaryApp = getApps().find(a => a.name === 'secondary') ||
  initializeApp(firebaseConfig, 'secondary')
const secondaryAuth = initializeAuth(secondaryApp, { persistence: browserLocalPersistence })
// Firestore secondaire - utilisé pour les écritures authentifiées via secondaryAuth
const secondaryDb = getFirestore(secondaryApp)
if (EMULATEURS) {
  connectAuthEmulator(secondaryAuth, `http://127.0.0.1:${PORT_EMU_AUTH}`, { disableWarnings: true })
  connectFirestoreEmulator(secondaryDb, '127.0.0.1', PORT_EMU_FIRESTORE)
}

// ─── Noms des collections Firestore ──────────────────────────────────────────
const C = {
  USERS:            'users',
  SESSIONS:         'sessions',
  ECRITURES:        'ecritures',
  EXERCICES:        'exercices',
  TENTATIVES:       'tentatives',
  DOCUMENTS:        'documents',
  MESSAGES:         'messages',
  UNIVERSITES:      'universites',
  FACULTES:         'facultes',
  COURS:            'cours',
  DEVOIRS:          'devoirs',
  DEVOIRS_CORRIGES: 'devoirs_corriges',
  SOUMISSIONS:      'soumissions',
  PRESENCES:        'presences',
  NOTES_COURS:      'notes_cours',
  EXERCICES_LIBRES:   'exercices_libres',
  TENTATIVES_EL:      'tentatives_el',
  COURS_STATUTS:      'cours_statuts',
  ETUDIANTS:          'etudiants',
  CONFIG:             'config',
  ANNUAIRE:           'annuaire',
}

// ─── Convertisseur Firestore → objet TS (dates, etc.) ────────────────────────
function fromDoc<T>(snap: any): T {
  const data = snap.data()
  if (!data) return { id: snap.id } as T
  return { ...data, id: snap.id } as T
}

// ─── Supprime tous les champs undefined (Firestore les refuse) ────────────────
function cleanUndefined(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  )
}

// ───────────────────────────────────────────────────────────────────────────────
//  FIREBASE STORAGE - Upload / Download PDF
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Uploade un fichier PDF dans Firebase Storage.
 * Chemin : devoirs/{devoirId}/{fileName}
 * Retourne l'URL de téléchargement permanent.
 */
export async function uploadDevoirPDF(devoirId: string, file: File): Promise<string> {
  return televerser(`devoirs/${devoirId}/${file.name}`, file)
}

// Module de stockage chargé à la demande (voir getStorageDiffere).
async function moduleStockage() {
  const [m, storage] = await Promise.all([import('firebase/storage'), getStorageDiffere()])
  return { m, storage }
}

async function televerser(path: string, file: File): Promise<string> {
  const { m, storage } = await moduleStockage()
  const snapshot = await m.uploadBytes(m.ref(storage, path), file)
  return await m.getDownloadURL(snapshot.ref)
}

/**
 * Supprime le PDF d'un devoir dans Firebase Storage.
 */
function cheminDepuisUrl(url: string): string {
  // Extrait le chemin depuis une URL Firebase Storage complète
  // ex: https://firebasestorage.googleapis.com/v0/b/BUCKET/o/PATH?token=...
  if (url.startsWith('http')) {
    const match = url.match(/\/o\/(.+?)(?:\?|$)/)
    if (match) return decodeURIComponent(match[1])
  }
  return url
}

export async function deleteDevoirPDF(pdfUrl: string): Promise<void> {
  try {
    const { m, storage } = await moduleStockage()
    await m.deleteObject(m.ref(storage, cheminDepuisUrl(pdfUrl)))
  } catch (e) {
    console.warn('deleteDevoirPDF: fichier introuvable', e)
  }
}

/**
 * Uploade un PDF d'exercice dans Firebase Storage.
 * Chemin : exercices/{exerciceId}/{fileName}
 */
export async function uploadExercicePDF(exerciceId: string, file: File): Promise<string> {
  return televerser(`exercices/${exerciceId}/enonce_${Date.now()}_${file.name}`, file)
}

export async function uploadExerciceCorrigePDF(exerciceId: string, file: File): Promise<string> {
  return televerser(`exercices/${exerciceId}/corrige_${Date.now()}_${file.name}`, file)
}

/**
 * Uploade un document pédagogique dans Firebase Storage.
 * Chemin : documents/{userId}/{fileName}
 */
export async function uploadNoteCoursFile(userId: string, file: File): Promise<string> {
  return televerser(`notes-cours/${userId}/${Date.now()}_${file.name}`, file)
}

export async function uploadDocumentFile(userId: string, file: File): Promise<string> {
  return televerser(`documents/${userId}/${Date.now()}_${file.name}`, file)
}

/**
 * Supprime un fichier Storage depuis son URL.
 */
export async function deleteStorageFile(fileUrl: string): Promise<void> {
  try {
    const { m, storage } = await moduleStockage()
    await m.deleteObject(m.ref(storage, cheminDepuisUrl(fileUrl)))
  } catch (e) {
    console.warn('deleteStorageFile: fichier introuvable', e)
  }
}

// ══════════════════════════════════════════════════════════════════════════════
//  AUTH - Connexion / Déconnexion
// ══════════════════════════════════════════════════════════════════════════════

// Utilisateur Firebase courant en mémoire
let _currentFirebaseUser: FirebaseUser | null = null

onAuthStateChanged(auth, (u) => { _currentFirebaseUser = u })

/**
 * Convertit username → email Firebase (Firebase Auth exige un email).
 * Convention : username@campus-ohada.app
 */
function toEmail(username: string): string {
  return `${username.toLowerCase().replace(/[^a-z0-9._-]/g, '_')}@campus-ohada.app`
}

export async function loginAsync(username: string, password: string): Promise<User | null> {
  try {
    const email = toEmail(username)
    const cred = await signInWithEmailAndPassword(auth, email, password)
    const uid = cred.user.uid

    // Lire le profil dans Firestore
    let userSnap = await getDoc(doc(db, C.USERS, uid))

    // Profil absent : seul le compte administrateur principal est recréé
    // (amorçage d'une base vide). Pour tout autre compte, un profil absent
    // signifie qu'il a été supprimé : le recréer en étudiant actif annulait
    // la suppression (le compte d'authentification, lui, subsiste).
    if (!userSnap.exists()) {
      const isDefaultAdmin = username.toLowerCase() === 'manasse.tandu'
      if (!isDefaultAdmin) {
        await signOut(auth)
        throw new Error('COMPTE_SUPPRIME')
      }
      console.warn('Profil Firestore absent pour', username, '- reconstruction automatique')
      const reconstructed: User = {
        id: uid,
        username: username.toLowerCase(),
        nom: isDefaultAdmin ? 'TANDU SAVA' : username,
        prenom: isDefaultAdmin ? 'Manasse' : '',
        role: isDefaultAdmin ? 'admin' : 'etudiant',
        dateCreation: new Date().toISOString(),
        actif: true,
      }
      await setDoc(doc(db, C.USERS, uid), cleanUndefined(reconstructed) as any)
      userSnap = await getDoc(doc(db, C.USERS, uid))
    }

    if (!userSnap.exists()) { await signOut(auth); return null }
    const user = fromDoc<User>(userSnap)
    if (user.actif === false) {
      await signOut(auth)
      const statut = (user as any).statutInscription
      if (statut === 'en_attente') throw new Error('COMPTE_EN_ATTENTE')
      if (statut === 'refuse') throw new Error('COMPTE_REFUSE')
      throw new Error('COMPTE_INACTIF')
    }
    localStorage.setItem('compta_current_user', uid)
    void purgerMonMotDePasseStockeAsync(user)
    void publierMaFicheAnnuaireAsync(user)
    return { ...user, password: undefined }
  } catch (e: any) {
    // Propager les erreurs métier (compte en attente, refusé, inactif)
    if (e.message === 'COMPTE_EN_ATTENTE' || e.message === 'COMPTE_REFUSE' || e.message === 'COMPTE_INACTIF' || e.message === 'COMPTE_SUPPRIME') {
      throw e
    }
    console.error('Login error:', e.code, e.message)
    return null
  }
}

export async function logoutAsync(): Promise<void> {
  await signOut(auth)
  localStorage.removeItem('compta_current_user')
}

// ──────────────────────────────────────────────────────────────────────────────
//  USERS
// ──────────────────────────────────────────────────────────────────────────────

export async function getUsersAsync(): Promise<User[]> {
  const snap = await getDocs(collection(db, C.USERS))
  return snap.docs.map(d => fromDoc<User>(d))
}

// Lecture unique et partagée de toute la collection users, pour les écrans qui
// en ont réellement besoin (recherche globale, liste des promotions). Remplace
// plusieurs écoutes temps réel simultanées de la collection entière : avec
// quelques milliers d'étudiants, chaque écoute relisait tous les profils à
// chaque ouverture de page. Le cache est vidé à toute création, modification
// ou suppression de compte faite depuis ce navigateur.
const USERS_CACHE_TTL_MS = 5 * 60 * 1000
let usersCache: { at: number; promise: Promise<User[]> } | null = null
export function getUsersCacheAsync(): Promise<User[]> {
  if (usersCache && Date.now() - usersCache.at < USERS_CACHE_TTL_MS) return usersCache.promise
  const promise = getUsersAsync().catch(err => { usersCache = null; throw err })
  usersCache = { at: Date.now(), promise }
  return promise
}
export function invaliderCacheUsers(): void { usersCache = null }

// Découpe une liste pour l'opérateur Firestore "in" (30 valeurs au maximum).
function paquetsDe30<T>(arr: T[]): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += 30) out.push(arr.slice(i, i + 30))
  return out
}

// Profils précis, lus par identifiant (noms des expéditeurs de messages, etc.)
// au lieu de charger toute la collection pour n'en garder que quelques-uns.
export async function getUsersByIdsAsync(ids: string[]): Promise<User[]> {
  const uniques = Array.from(new Set(ids.filter(Boolean)))
  if (uniques.length === 0) return []
  const snaps = await Promise.all(paquetsDe30(uniques).map(paquet =>
    getDocs(query(collection(db, C.USERS), where(documentId(), 'in', paquet)))))
  return snaps.flatMap(s => s.docs.map(d => fromDoc<User>(d)))
}

// Étudiants rattachés à un membre du personnel. Le champ createdBy contient
// l'uid du créateur, ou son identifiant pour les comptes les plus anciens :
// on interroge donc les deux valeurs.
// refsSupplementaires : uids/identifiants des autres membres de l'équipe
// pédagogique (lib/equipe.ts), dont les étudiants sont aussi ceux du créateur.
export async function getEtudiantsCreesParAsync(
  createur: { id: string; username?: string },
  statutInscription?: string,
  refsSupplementaires: string[] = [],
): Promise<User[]> {
  const refs = Array.from(new Set([createur.id, createur.username, ...refsSupplementaires].filter(Boolean))).slice(0, 30) as string[]
  if (refs.length === 0) return []
  const conditions: any[] = [where('createdBy', 'in', refs), where('role', '==', 'etudiant')]
  if (statutInscription) conditions.push(where('statutInscription', '==', statutInscription))
  const snap = await getDocs(query(collection(db, C.USERS), ...conditions))
  return snap.docs.map(d => fromDoc<User>(d))
}

// Tous les étudiants (écrans réservés à l'administrateur principal).
export async function getEtudiantsAsync(): Promise<User[]> {
  const snap = await getDocs(query(collection(db, C.USERS), where('role', '==', 'etudiant')))
  return snap.docs.map(d => fromDoc<User>(d))
}

// ─── Annuaire du personnel ──────────────────────────────────────────────────
// Fiche minimale (nom, prénom, identifiant, rôle) de chaque membre du
// personnel, lisible par tout compte connecté. C'est par elle, et jamais par
// la collection users, qu'un étudiant voit ses contacts de messagerie et les
// noms des expéditeurs.
const ROLES_PERSONNEL = ['admin', 'professeur', 'assistant']

function ficheAnnuaire(u: User) {
  return { nom: u.nom || '', prenom: u.prenom || '', username: u.username || '', role: u.role }
}

// Publie (ou met à jour) SA propre fiche : appelé à la connexion d'un membre du personnel.
export async function publierMaFicheAnnuaireAsync(user: User): Promise<void> {
  if (!ROLES_PERSONNEL.includes(user.role)) return
  try { await setDoc(doc(db, C.ANNUAIRE, user.id), ficheAnnuaire(user)) } catch { /* best-effort */ }
}

// Réservé à l'admin : aligne l'annuaire sur les profils du personnel
// (ajouts, changements de nom ou de rôle) et retire les anciens membres.
export async function synchroniserAnnuaireAsync(users: User[]): Promise<void> {
  const personnel = users.filter(u => ROLES_PERSONNEL.includes(u.role) && u.actif !== false)
  const ids = new Set(personnel.map(u => u.id))
  const existants = await getDocs(collection(db, C.ANNUAIRE))
  const batch = writeBatch(db)
  personnel.forEach(u => batch.set(doc(db, C.ANNUAIRE, u.id), ficheAnnuaire(u)))
  existants.docs.forEach(d => { if (!ids.has(d.id)) batch.delete(d.ref) })
  await batch.commit()
}

// Contacts de la messagerie étudiante : tout le personnel, depuis l'annuaire.
export async function getPersonnelAsync(): Promise<User[]> {
  const snap = await getDocs(collection(db, C.ANNUAIRE))
  return snap.docs.map(d => ({ ...(d.data() as any), id: d.id, actif: true }) as User)
}

// Noms affichables d'une liste de comptes, lus dans l'annuaire (personnel).
export async function getFichesAnnuaireAsync(ids: string[]): Promise<User[]> {
  const uniques = Array.from(new Set(ids.filter(Boolean)))
  if (uniques.length === 0) return []
  const snaps = await Promise.all(paquetsDe30(uniques).map(paquet =>
    getDocs(query(collection(db, C.ANNUAIRE), where(documentId(), 'in', paquet)))))
  return snaps.flatMap(s => s.docs.map(d => ({ ...(d.data() as any), id: d.id }) as User))
}

// Identifiants déjà pris parmi une liste (contrôle des doublons à l'inscription
// et à l'import CSV), sans relire toute la collection.
export async function getUsernamesExistantsAsync(usernames: string[]): Promise<Set<string>> {
  const uniques = Array.from(new Set(usernames.map(u => u.trim().toLowerCase()).filter(Boolean)))
  const pris = new Set<string>()
  const snaps = await Promise.all(paquetsDe30(uniques).map(paquet =>
    getDocs(query(collection(db, C.USERS), where('username', 'in', paquet)))))
  snaps.forEach(s => s.docs.forEach(d => { const u = (d.data() as any).username; if (u) pris.add(u) }))
  return pris
}

// Rattache un assistant à son professeur titulaire (équipe pédagogique), ou
// l'en détache (null : champ supprimé, jamais une chaîne vide, qui ferait de
// tous les assistants détachés une même équipe). Réservé à l'admin.
export async function definirTitulaireAsync(userId: string, titulaireId: string | null): Promise<void> {
  invaliderCacheUsers()
  await updateDoc(doc(db, C.USERS, userId), { titulaireId: titulaireId || deleteField() })
}

// Retire le champ password des profils qui le contiennent encore (comptes
// créés avant que le mot de passe cesse d'être stocké). Réservé à l'admin,
// seul autorisé par firestore.rules à modifier le profil d'un autre compte.
export async function purgerMotsDePasseStockesAsync(users: User[]): Promise<number> {
  const cibles = users.filter(u => (u as any).password !== undefined)
  for (let i = 0; i < cibles.length; i += 400) {
    const batch = writeBatch(db)
    cibles.slice(i, i + 400).forEach(u => batch.update(doc(db, C.USERS, u.id), { password: deleteField() }))
    await batch.commit()
  }
  if (cibles.length > 0) invaliderCacheUsers()
  return cibles.length
}

// Retire le mot de passe de SON propre profil (autorisé par la règle
// d'auto-modification). Appelé à la connexion : chaque compte se nettoie
// lui-même, sans attendre le passage d'un administrateur.
export async function purgerMonMotDePasseStockeAsync(user: User): Promise<void> {
  if ((user as any).password === undefined) return
  try { await updateDoc(doc(db, C.USERS, user.id), { password: deleteField() }) } catch { /* best-effort */ }
}

// Changement de mot de passe par l'utilisateur lui-même : Firebase exige une
// authentification récente, d'où la ré-authentification avec l'ancien mot de passe.
export async function changerMonMotDePasseAsync(ancien: string, nouveau: string): Promise<void> {
  const fbUser = auth.currentUser
  if (!fbUser || !fbUser.email) throw new Error('NON_CONNECTE')
  await reauthenticateWithCredential(fbUser, EmailAuthProvider.credential(fbUser.email, ancien))
  await updatePassword(fbUser, nouveau)
}

export async function getCurrentUserAsync(fbUser?: FirebaseUser | null): Promise<User | null> {
  // Utiliser l'utilisateur passé en paramètre, sinon le mémorisé, sinon le localStorage
  const resolvedFbUser = fbUser !== undefined ? fbUser : _currentFirebaseUser
  const uid = resolvedFbUser?.uid || localStorage.getItem('compta_current_user')
  if (!uid) return null

  const snap = await getDoc(doc(db, C.USERS, uid))
  if (snap.exists()) {
    const user = fromDoc<User>(snap)
    // Reprise de session (rechargement de la page) : même contrôle qu'à la
    // connexion. Un compte suspendu, refusé ou en attente retrouvait sinon
    // l'application au simple rechargement.
    if (user.actif === false) {
      await signOut(auth).catch(() => {})
      localStorage.removeItem('compta_current_user')
      return null
    }
    localStorage.setItem('compta_current_user', uid)
    void purgerMonMotDePasseStockeAsync(user)
    void publierMaFicheAnnuaireAsync(user)
    return { ...user, password: undefined }
  }

  // Profil absent dans Firestore mais Firebase Auth est connecté : seul
  // l'administrateur principal est reconstruit (voir loginAsync). Un autre
  // compte sans profil a été supprimé : session fermée.
  if (resolvedFbUser) {
    const email = resolvedFbUser.email || ''
    const username = email.replace('@campus-ohada.app', '')
    const isAdmin = username === 'manasse.tandu'
    if (!isAdmin) {
      await signOut(auth).catch(() => {})
      localStorage.removeItem('compta_current_user')
      return null
    }
    const reconstructed: User = {
      id: resolvedFbUser.uid,
      username,
      nom: isAdmin ? 'TANDU SAVA' : username,
      prenom: isAdmin ? 'Manasse' : '',
      role: isAdmin ? 'admin' : 'etudiant',
      dateCreation: new Date().toISOString(),
      actif: true,
    }
    await setDoc(doc(db, C.USERS, resolvedFbUser.uid), cleanUndefined(reconstructed) as any)
    localStorage.setItem('compta_current_user', resolvedFbUser.uid)
    console.log('✅ Profil reconstruit automatiquement pour:', username)
    return reconstructed
  }

  return null
}

export async function createUserAsync(data: Omit<User, 'id' | 'dateCreation'>): Promise<User> {
  invaliderCacheUsers()
  const motDePasse = data.password
  if (!motDePasse) throw new Error('MOT_DE_PASSE_REQUIS')
  // Utilise la seconde instance Auth pour ne PAS déconnecter l'admin courant.
  // IMPORTANT : le setDoc doit utiliser secondaryDb (instance liée à secondaryAuth)
  // et être fait AVANT signOut(secondaryAuth), sinon Firestore refuse l'écriture
  // (aucun utilisateur authentifié sur l'instance principale au moment de la création).
  const email = toEmail(data.username)
  let uid: string
  let useSecondaryDb = false

  try {
    const cred = await createUserWithEmailAndPassword(secondaryAuth, email, motDePasse)
    uid = cred.user.uid
    useSecondaryDb = true  // secondaryAuth est connecté → on peut écrire avec secondaryDb
  } catch (e: any) {
    if (e.code === 'auth/email-already-in-use') {
      // Le compte Auth existe (ancienne session) - récupérer l'UID et mettre à jour
      try {
        const cred2 = await signInWithEmailAndPassword(secondaryAuth, email, motDePasse)
        uid = cred2.user.uid
        // Le compte Auth existe déjà ET accepte ce mot de passe : ça peut être la même
        // personne qui retente son inscription (légitime, il faut alors compléter/mettre
        // à jour son profil), OU deux personnes différentes ayant généré le même
        // identifiant+mot de passe par défaut (ex. homonymes - l'identifiant suggéré ne
        // contient pas de suffixe garantissant l'unicité). Un profil Firestore déjà
        // présent pour cet uid signifie que ce compte a déjà été réclamé : ne JAMAIS
        // l'écraser silencieusement ici - createUserAsync sert à CRÉER, pas à modifier
        // un profil existant (updateUserAsync existe pour ça). On rejette la collision
        // et on laisse l'appelant demander un identifiant différent.
        const existingProfile = await getDoc(doc(secondaryDb, C.USERS, uid))
        if (existingProfile.exists()) {
          await signOut(secondaryAuth).catch(() => {})
          throw new Error('Ce nom d\'utilisateur est déjà utilisé.')
        }
        useSecondaryDb = true
      } catch (e2: any) {
        if (e2?.message === 'Ce nom d\'utilisateur est déjà utilisé.') throw e2
        // Compte d'authentification existant, avec un autre mot de passe :
        // l'identifiant est pris, par un compte actif ou par un compte dont
        // seul le profil a été supprimé. Le profil était auparavant recréé
        // sous un identifiant tiré au hasard, sans compte de connexion
        // derrière : l'import l'annonçait réussi, mais l'étudiant ne pouvait
        // jamais se connecter. Et la recherche du profil existant, faite
        // sans être connecté depuis l'onglet Rejoindre, était refusée par
        // les règles : l'étudiant lisait une erreur technique.
        await signOut(secondaryAuth).catch(() => {})
        throw new Error('Ce nom d\'utilisateur est déjà utilisé.')
      }
    } else {
      throw e
    }
  }

  // Rôle à privilèges créé via secondaryAuth : l'écriture du profil se fait "en tant
  // que" le nouveau compte, pas en tant qu'admin. On dépose donc une invitation sur
  // l'instance PRINCIPALE (où l'admin appelant est authentifié) : c'est elle que la
  // règle Firestore de création vérifie pour autoriser un rôle autre qu'étudiant.
  const rolePrivilegie = useSecondaryDb && data.role !== 'etudiant'
  if (rolePrivilegie) {
    await setDoc(doc(db, 'accountInvites', uid), { role: data.role, ...((data as any).titulaireId ? { titulaireId: (data as any).titulaireId } : {}), dateCreation: new Date().toISOString() })
  }
  // Compte étudiant créé par un membre du personnel connecté : même
  // invitation, à son nom. Les règles n'acceptent plus un profil étudiant
  // écrit par le compte lui-même sans elle, sauf inscription en attente par
  // code d'accès (onglet Rejoindre, où personne n'est connecté).
  const inviteEtudiant = useSecondaryDb && data.role === 'etudiant' && !!auth.currentUser && data.createdBy === auth.currentUser.uid
  if (inviteEtudiant) {
    await setDoc(doc(db, 'accountInvites', uid), { role: 'etudiant', createdBy: data.createdBy, dateCreation: new Date().toISOString() })
  }

  // Le mot de passe ne sert qu'à créer le compte Firebase Authentication
  // ci-dessus : il n'est JAMAIS recopié dans le profil Firestore (il y était
  // auparavant en clair, lisible par tout professeur via la règle de lecture
  // des profils, et ne servait à rien pour la connexion).
  const { password: _motDePasse, ...profil } = data as any
  const user: User = {
    ...profil,
    username: data.username.toLowerCase(),
    id: uid,
    dateCreation: new Date().toISOString(),
  }

  // Écriture Firestore avec l'instance authentifiée AVANT déconnexion
  if (useSecondaryDb) {
    const codeAcces = (data as any).codeAcces as string | undefined
    if (codeAcces) {
      // Inscription par code : profil et compteur du code d'un bloc (les
      // règles refusent l'un sans l'autre, voir codeOuvert).
      const lot = writeBatch(secondaryDb)
      lot.set(doc(secondaryDb, C.USERS, uid), cleanUndefined(user) as any)
      lot.update(doc(secondaryDb, 'codesAcces', codeAcces), { utilisations: increment(1) })
      await lot.commit()
    } else {
      await setDoc(doc(secondaryDb, C.USERS, uid), cleanUndefined(user) as any)
    }
    // Fiche 'etudiants' liée, créée pendant que secondaryAuth est encore
    // authentifié comme le compte tout juste créé (voir firestore.rules,
    // bloc etudiants : cette écriture ne peut se désigner elle-même que
    // comme userId == son propre uid). Sans ça, "Gestion des étudiants"
    // (qui lit la collection etudiants) reste vide alors que le compte
    // existe bien dans users - c'est exactement l'écart signalé en
    // production entre le compteur du tableau de bord et cette page.
    if (data.role === 'etudiant') {
      await creerFicheEtudiantLiee(secondaryDb, user).catch(() => {})
    }
    await signOut(secondaryAuth)
    if (rolePrivilegie || inviteEtudiant) {
      await deleteDoc(doc(db, 'accountInvites', uid)).catch(() => {})
    }
  } else {
    // Cas fallback (uid généré) : l'admin est connecté sur db principal
    await setDoc(doc(db, C.USERS, uid), cleanUndefined(user) as any)
    if (data.role === 'etudiant') {
      await creerFicheEtudiantLiee(db, user).catch(() => {})
    }
  }
  // Nouveau membre du personnel : fiche d'annuaire écrite par l'admin (instance
  // principale), pour qu'il apparaisse tout de suite dans les contacts étudiants.
  if (data.role !== 'etudiant') {
    await setDoc(doc(db, C.ANNUAIRE, uid), ficheAnnuaire(user)).catch(() => {})
  }
  return user
}

// ─── Fiche 'etudiants' auto-créée et liée à un compte de connexion ────────────
// Résout les noms lisibles d'université/faculté (lecture ouverte à tout
// utilisateur authentifié, cf. firestore.rules) ; la filière/matricule restent
// à compléter manuellement depuis la fiche, non collectés à l'inscription.
async function creerFicheEtudiantLiee(dbInstance: typeof db, user: User): Promise<void> {
  let universite = ''
  let faculte = ''
  try {
    if (user.universiteId) {
      const uSnap = await getDoc(doc(dbInstance, C.UNIVERSITES, user.universiteId))
      universite = (uSnap.data() as any)?.nom || ''
    }
    if (user.faculteId) {
      const fSnap = await getDoc(doc(dbInstance, C.FACULTES, user.faculteId))
      faculte = (fSnap.data() as any)?.nom || ''
    }
  } catch { /* lecture best-effort - la fiche se crée même sans ces noms */ }

  const ficheId = generateId()
  await setDoc(doc(dbInstance, C.ETUDIANTS, ficheId), cleanUndefined({
    type: 'interne',
    userId: user.id,
    nom: user.nom,
    prenom: user.prenom || '',
    matricule: '',
    universite,
    faculte,
    filiere: '',
    promotion: user.classe || '',
    universiteId: user.universiteId,
    anneeAcademique: anneeAcademiqueEnCours(),
    statut: user.actif ? 'actif' : 'suspendu',
    photo: null,
    telephone: user.telephone || '',
    email: '',
    dateInscription: new Date().toISOString().split('T')[0],
    createdBy: user.createdBy || user.id,
  }) as any)
}

export async function updateUserAsync(id: string, data: Partial<User>): Promise<void> {
  invaliderCacheUsers()
  // setDoc avec merge:true est plus robuste qu'updateDoc :
  // - fonctionne même si le document n'existe pas encore
  // - moins sujet aux restrictions Firestore sur updateDoc
  const ref = doc(db, C.USERS, id)
  // Jamais de mot de passe dans le profil (voir createUserAsync) : un mot de
  // passe écrit ici ne changeait d'ailleurs rien à la connexion, qui passe par
  // Firebase Authentication.
  const { password: _motDePasse, ...profil } = data as any
  await setDoc(ref, cleanUndefined(profil) as any, { merge: true })

  // Répercute actif sur le statut de la fiche 'etudiants' liée (voir
  // creerFicheEtudiantLiee) - notamment Valider/Refuser une inscription
  // (ProfesseurPage, onglet Inscriptions), qui change actif sans jamais
  // toucher la fiche sinon. Best-effort : ne bloque jamais la mise à jour du
  // compte si la fiche n'existe pas (staff/admin) ou si l'écriture échoue.
  if (typeof data.actif === 'boolean') {
    try {
      const snap = await getDocs(query(collection(db, C.ETUDIANTS), where('userId', '==', id)))
      await Promise.all(snap.docs.map(d => updateDoc(d.ref, { statut: data.actif ? 'actif' : 'suspendu' })))
    } catch { /* best-effort */ }
  }
}

export async function deleteUserAsync(id: string): Promise<void> {
  invaliderCacheUsers()
  await deleteDoc(doc(db, C.USERS, id))
  // Note: suppression du compte Firebase Auth nécessite Admin SDK (backend)
  // Pour l'instant on désactive l'utilisateur dans Firestore

  // Supprime la fiche 'etudiants' liée (voir creerFicheEtudiantLiee), pour ne
  // pas laisser une fiche orpheline pointant vers un compte disparu.
  try {
    const snap = await getDocs(query(collection(db, C.ETUDIANTS), where('userId', '==', id)))
    await Promise.all(snap.docs.map(d => deleteDoc(d.ref)))
  } catch { /* best-effort */ }
  try { await deleteDoc(doc(db, C.ANNUAIRE, id)) } catch { /* best-effort : absente pour un étudiant */ }
}

// ──────────────────────────────────────────────────────────────────────────────
//  SESSIONS
// ──────────────────────────────────────────────────────────────────────────────

export async function getSessionsAsync(userId: string, module?: 'syscohada' | 'sycebnl'): Promise<Session[]> {
  let q = query(
    collection(db, C.SESSIONS),
    where('userId', '==', userId),
    ...(module ? [where('module', '==', module)] : [])
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => fromDoc<Session>(d))
}

export async function createSessionAsync(data: Omit<Session, 'id' | 'dateCreation'>, module?: 'syscohada' | 'sycebnl'): Promise<Session> {
  const id = generateId()
  const session: Session = { ...data, id, dateCreation: new Date().toISOString(), ...(module ? { module } : {}) }
  await setDoc(doc(db, C.SESSIONS, id), cleanUndefined(session) as any)
  return session
}

export async function updateSessionAsync(id: string, data: Partial<Session>): Promise<void> {
  await updateDoc(doc(db, C.SESSIONS, id), cleanUndefined(data) as any)
}

export async function deleteSessionAsync(id: string): Promise<void> {
  await deleteDoc(doc(db, C.SESSIONS, id))
}

// ──────────────────────────────────────────────────────────────────────────────
//  ECRITURES
// ──────────────────────────────────────────────────────────────────────────────

export async function getEcrituresAsync(userId: string, sessionId?: string, module?: 'syscohada' | 'sycebnl'): Promise<Ecriture[]> {
  const conditions: any[] = [where('userId', '==', userId)]
  if (sessionId) conditions.push(where('sessionId', '==', sessionId))
  if (module)    conditions.push(where('module', '==', module))
  const snap = await getDocs(query(collection(db, C.ECRITURES), ...conditions))
  return snap.docs.map(d => fromDoc<Ecriture>(d))
}

// Nombre de lignes d'écriture d'une session, compté côté serveur (une lecture
// facturée par tranche de 1 000 lignes) au lieu de télécharger les lignes.
export async function compterEcrituresSessionAsync(userId: string, sessionId: string): Promise<number> {
  const snap = await getCountFromServer(query(collection(db, C.ECRITURES),
    where('userId', '==', userId), where('sessionId', '==', sessionId)))
  return snap.data().count
}

export async function addEcritureAsync(data: Omit<Ecriture, 'id'>, module?: 'syscohada' | 'sycebnl'): Promise<Ecriture> {
  const id = generateId()
  const ecriture: Ecriture = { ...data, id, ...(module ? { module } : {}) }
  await setDoc(doc(db, C.ECRITURES, id), cleanUndefined(ecriture) as any)
  return ecriture
}

export async function updateEcritureAsync(id: string, data: Partial<Ecriture>): Promise<void> {
  await updateDoc(doc(db, C.ECRITURES, id), cleanUndefined(data) as any)
}

export async function deleteEcritureAsync(id: string): Promise<void> {
  await deleteDoc(doc(db, C.ECRITURES, id))
}

// Enregistre une écriture (toutes ses lignes) en une seule opération, et
// remplace l'ancienne version en cas de modification. La modification
// supprimait l'ancienne écriture, puis écrivait les nouvelles lignes une à
// une : une coupure réseau en cours de route perdait l'écriture, ou n'en
// laissait qu'une partie, déséquilibrée.
export async function enregistrerEcritureAsync(
  lignes: Omit<Ecriture, 'id'>[],
  module?: 'syscohada' | 'sycebnl',
  remplace?: { ligneGroupe: string; userId: string },
): Promise<void> {
  const batch = writeBatch(db)
  if (remplace) {
    const snap = await getDocs(query(collection(db, C.ECRITURES),
      where('ligneGroupe', '==', remplace.ligneGroupe),
      where('userId', '==', remplace.userId)
    ))
    snap.docs.forEach(d => batch.delete(d.ref))
  }
  for (const l of lignes) {
    const id = generateId()
    batch.set(doc(db, C.ECRITURES, id), cleanUndefined({ ...l, id, ...(module ? { module } : {}) }) as any)
  }
  await batch.commit()
}
// Export vers le journal d'écritures produites par un outil (factures,
// emprunts, stocks). Chaque écriture est écrite d'un bloc ; une écriture déjà
// présente dans la session (même date, même libellé, mêmes lignes) n'est pas
// écrite une seconde fois ; une écriture datée hors de l'exercice de la
// session est refusée, comme à la saisie. L'export écrivait ligne par ligne :
// une coupure laissait une écriture déséquilibrée, et un second clic la
// dupliquait.
export interface EcritureAExporter {
  date: string
  libelle: string
  numeroPiece?: string
  lignes: { compte: string; intitule: string; debit: number; credit: number }[]
}
export class ErreurExercice extends Error {
  constructor(public annee: number, public exercice: number) { super(`EXERCICE:${annee}:${exercice}`) }
}
export async function exporterEcrituresAsync(
  userId: string,
  session: { id: string; exercice: number },
  ecritures: EcritureAExporter[],
): Promise<{ exportees: number; dejaPresentes: number }> {
  const horsExercice = ecritures.find(e => new Date(e.date).getFullYear() !== Number(session.exercice))
  if (horsExercice) throw new ErreurExercice(new Date(horsExercice.date).getFullYear(), Number(session.exercice))
  const signature = (date: string, libelle: string, lignes: { compte: string; debit: number; credit: number }[]) =>
    [date, libelle, ...lignes.map(l => `${l.compte}:${Math.round(l.debit * 100)}:${Math.round(l.credit * 100)}`).sort()].join('|')
  const existantes = await getEcrituresAsync(userId, session.id)
  const parGroupe = new Map<string, Ecriture[]>()
  existantes.forEach(e => parGroupe.set(e.ligneGroupe, [...(parGroupe.get(e.ligneGroupe) || []), e]))
  const deja = new Set(Array.from(parGroupe.values()).map(g =>
    signature(g[0].date, g[0].libelle, g.map(l => ({ compte: l.numeroCompte, debit: l.debit, credit: l.credit })))))
  let exportees = 0, dejaPresentes = 0
  for (const e of ecritures) {
    if (deja.has(signature(e.date, e.libelle, e.lignes))) { dejaPresentes++; continue }
    const ligneGroupe = generateId()
    await enregistrerEcritureAsync(e.lignes.map(l => ({
      sessionId: session.id, ligneGroupe, date: e.date, libelle: e.libelle,
      numeroPiece: e.numeroPiece || undefined,
      numeroCompte: l.compte, intituleCompte: l.intitule, debit: l.debit, credit: l.credit, userId,
    })), 'syscohada')
    exportees++
  }
  return { exportees, dejaPresentes }
}

export async function deleteEcrituresByGroupeAsync(ligneGroupe: string, userId: string): Promise<void> {
  const snap = await getDocs(query(collection(db, C.ECRITURES),
    where('ligneGroupe', '==', ligneGroupe),
    where('userId', '==', userId)
  ))
  const batch = writeBatch(db)
  snap.docs.forEach(d => batch.delete(d.ref))
  await batch.commit()
}

export async function clearSessionEcrituresAsync(sessionId: string, userId: string): Promise<void> {
  const snap = await getDocs(query(collection(db, C.ECRITURES),
    where('sessionId', '==', sessionId),
    where('userId', '==', userId)
  ))
  const batch = writeBatch(db)
  snap.docs.forEach(d => batch.delete(d.ref))
  await batch.commit()
}

// ──────────────────────────────────────────────────────────────────────────────
//  EXERCICES
// ──────────────────────────────────────────────────────────────────────────────

export async function getExercicesAsync(): Promise<Exercice[]> {
  const snap = await getDocs(collection(db, C.EXERCICES))
  return snap.docs.map(d => fromDoc<Exercice>(d))
}

export async function createExerciceAsync(data: Omit<Exercice, 'id' | 'dateCreation'>): Promise<Exercice> {
  const id = generateId()
  const ex: Exercice = { ...data, id, dateCreation: new Date().toISOString() }
  await setDoc(doc(db, C.EXERCICES, id), cleanUndefined(ex) as any)
  return ex
}

export async function updateExerciceAsync(id: string, data: Partial<Exercice>): Promise<void> {
  await updateDoc(doc(db, C.EXERCICES, id), cleanUndefined(data) as any)
}

export async function deleteExerciceAsync(id: string): Promise<void> {
  await deleteDoc(doc(db, C.EXERCICES, id))
}

// ──────────────────────────────────────────────────────────────────────────────
//  TENTATIVES
// ──────────────────────────────────────────────────────────────────────────────

export async function getTentativesAsync(userId?: string, exerciceId?: string, promotionId?: string, coursId?: string): Promise<Tentative[]> {
  const conditions: any[] = []
  if (userId)     conditions.push(where('userId', '==', userId))
  if (exerciceId) conditions.push(where('exerciceId', '==', exerciceId))
  const snap = await getDocs(query(collection(db, C.TENTATIVES), ...conditions))
  const all = snap.docs.map(d => fromDoc<Tentative>(d))
  return all.filter(t => {
    if (!promotionCorrespond(t.promotionId, promotionId)) return false
    if (coursId && t.coursId && t.coursId !== coursId) return false
    return true
  })
}

export async function saveTentativeAsync(data: Omit<Tentative, 'id' | 'dateCreation'>): Promise<Tentative> {
  const id = generateId()
  const t: Tentative = { ...data, id, dateCreation: new Date().toISOString() }
  await setDoc(doc(db, C.TENTATIVES, id), cleanUndefined(t) as any)
  return t
}

// ──────────────────────────────────────────────────────────────────────────────
//  DOCUMENTS
// ──────────────────────────────────────────────────────────────────────────────

export async function getDocumentsAsync(_userId?: string, promotionId?: string, coursId?: string): Promise<Document[]> {
  // Isolation : quand un coursId précis est fourni (appel étudiant, un par cours
  // inscrit - voir DocumentsPage), la requête Firestore elle-même doit être
  // contrainte par ce coursId. firestore.rules refuse désormais une lecture non
  // filtrée de toute la collection dès que la règle dépend de resource.data.
  // Sans coursId (appel prof/admin), la lecture reste non filtrée - déjà
  // autorisée par isProf() côté règles.
  const q = coursId
    ? query(collection(db, C.DOCUMENTS), where('coursId', '==', coursId))
    : query(collection(db, C.DOCUMENTS))
  const snap = await getDocs(q)
  const all = snap.docs.map(d => fromDoc<Document>(d))
  // Appel étudiant (un par cours inscrit, requête déjà contrainte par ce
  // coursId) : reste le filtre de promotion. Un document sans promotion vaut
  // pour tout le cours ; la promotion est comparée par son code (L1…M2).
  // Appel prof/admin (sans coursId) : tout.
  if (!coursId) return all
  return all.filter(doc => (!doc.coursId || doc.coursId === coursId) && promotionCorrespond(doc.promotionId, promotionId))
}

export async function saveDocumentAsync(data: Omit<Document, 'id' | 'dateCreation'>): Promise<Document> {
  const id = generateId()
  const document: Document = { ...data, id, dateCreation: new Date().toISOString() }
  await setDoc(doc(db, C.DOCUMENTS, id), cleanUndefined(document) as any)
  return document
}

export async function deleteDocumentAsync(id: string): Promise<void> {
  await deleteDoc(doc(db, C.DOCUMENTS, id))
}

// ──────────────────────────────────────────────────────────────────────────────
//  MESSAGES
// ──────────────────────────────────────────────────────────────────────────────

export async function getMessagesAsync(userId: string): Promise<Message[]> {
  const snap = await getDocs(query(
    collection(db, C.MESSAGES),
    where('participants', 'array-contains', userId)
  ))
  return snap.docs.map(d => fromDoc<Message>(d))
}

export async function saveMessageAsync(data: Omit<Message, 'id'>): Promise<Message> {
  const id = generateId()
  const participants = [data.expediteurId, data.destinataireId].filter(Boolean)
  const message: Message = { ...data, id }
  await setDoc(doc(db, C.MESSAGES, id), cleanUndefined({ ...message, participants }) as any)
  return message
}

// Écoute temps réel des messages d'un utilisateur (envoyés + reçus).
//
// Une seule requête, filtrée sur `participants` (array-contains) : c'est la
// seule forme que firestore.rules accepte pour la collection messages
// (allow read: request.auth.uid in resource.data.participants). Les deux
// anciens écouteurs filtrés sur expediteurId / destinataireId ne permettaient
// pas au moteur de règles de prouver cette appartenance : Firestore les
// refusait en bloc (permission-denied) — y compris pour le vrai destinataire,
// et même sur une collection vide. Comme NotificationBell (Layout) monte cet
// écouteur en permanence, le bandeau « Connexion interrompue » apparaissait
// sur toutes les pages, pour tous les rôles. Pas d'index composite requis :
// un array-contains seul est servi par l'index mono-champ automatique.
export function onMessagesSnapshot(userId: string, callback: (messages: Message[]) => void): Unsubscribe {
  const q = query(collection(db, C.MESSAGES), where('participants', 'array-contains', userId))
  return onSnapshot(q, (snap) => {
    const messages = snap.docs.map(d => fromDoc<Message>(d))
    messages.sort((a, b) => (a.date || '').localeCompare(b.date || ''))
    callback(messages)
  }, err => notifyFirestoreError('onMessagesSnapshot', err))
}

// Marque comme lus les messages reçus d'un expéditeur donné. Sans cet appel,
// le champ `lu` d'un Message restait figé à `false` depuis sa création
// (saveMessageAsync) : la messagerie n'écrivait jamais l'inverse, donc rien
// ne repassait jamais à `true`, même après ouverture de la conversation -
// la cloche de notification (NotificationBell) comptait alors des messages
// lus depuis longtemps comme éternellement « non lus ».
// Même contrainte que onMessagesSnapshot : la requête doit passer par
// `participants` (array-contains) pour être acceptée par firestore.rules ;
// l'ancienne forme (destinataireId == / expediteurId == / lu == false) était
// refusée silencieusement (getDocs, donc sans bandeau) et les messages ne
// passaient jamais à `lu: true`. Le tri par expéditeur et par état de lecture
// se fait ensuite côté client, sur le petit volume de messages de l'appelant.
export async function marquerMessagesLusAsync(destinataireId: string, expediteurId: string): Promise<void> {
  const snap = await getDocs(query(
    collection(db, C.MESSAGES),
    where('participants', 'array-contains', destinataireId)
  ))
  const nonLus = snap.docs.filter(d => {
    const m = d.data() as Message
    return m.destinataireId === destinataireId && m.expediteurId === expediteurId && !m.lu
  })
  if (nonLus.length === 0) return
  const batch = writeBatch(db)
  nonLus.forEach(d => batch.update(d.ref, { lu: true }))
  await batch.commit()
}

// ──────────────────────────────────────────────────────────────────────────────
//  UNIVERSITES
// ──────────────────────────────────────────────────────────────────────────────

export async function getUniversitesAsync(): Promise<Universite[]> {
  const snap = await getDocs(collection(db, C.UNIVERSITES))
  return snap.docs.map(d => fromDoc<Universite>(d))
}

export async function saveUniversiteAsync(data: Omit<Universite, 'id'>): Promise<Universite> {
  const id = generateId()
  const uni: Universite = { ...data, id }
  await setDoc(doc(db, C.UNIVERSITES, id), cleanUndefined(uni) as any)
  return uni
}

export async function updateUniversiteAsync(id: string, data: Partial<Universite>): Promise<void> {
  await updateDoc(doc(db, C.UNIVERSITES, id), cleanUndefined(data) as any)
}

export async function deleteUniversiteAsync(id: string): Promise<void> {
  await deleteDoc(doc(db, C.UNIVERSITES, id))
}

// ──────────────────────────────────────────────────────────────────────────────
//  FACULTES
// ──────────────────────────────────────────────────────────────────────────────

export async function getFacultesAsync(universiteId?: string): Promise<Faculte[]> {
  const q = universiteId
    ? query(collection(db, C.FACULTES), where('universiteId', '==', universiteId))
    : query(collection(db, C.FACULTES))
  const snap = await getDocs(q)
  return snap.docs.map(d => fromDoc<Faculte>(d))
}

export async function createFaculteAsync(data: Omit<Faculte, 'id' | 'dateCreation'>): Promise<Faculte> {
  const id = generateId()
  const fac: Faculte = { ...data, id, dateCreation: new Date().toISOString() }
  await setDoc(doc(db, C.FACULTES, id), cleanUndefined(fac) as any)
  return fac
}

export async function updateFaculteAsync(id: string, data: Partial<Faculte>): Promise<void> {
  await updateDoc(doc(db, C.FACULTES, id), cleanUndefined(data) as any)
}

export async function deleteFaculteAsync(id: string): Promise<void> {
  await deleteDoc(doc(db, C.FACULTES, id))
}

// ──────────────────────────────────────────────────────────────────────────────
//  COURS
// ──────────────────────────────────────────────────────────────────────────────

export async function getCoursAsync(faculteId?: string, universiteId?: string): Promise<Cours[]> {
  const conditions: any[] = []
  if (faculteId)    conditions.push(where('faculteId', '==', faculteId))
  if (universiteId) conditions.push(where('universiteId', '==', universiteId))
  const snap = await getDocs(query(collection(db, C.COURS), ...conditions))
  return snap.docs.map(d => fromDoc<Cours>(d))
}

export async function createCoursAsync(data: Omit<Cours, 'id' | 'dateCreation'>): Promise<Cours> {
  const id = generateId()
  const cours: Cours = { ...data, id, dateCreation: new Date().toISOString() }
  await setDoc(doc(db, C.COURS, id), cleanUndefined(cours) as any)
  return cours
}

export async function updateCoursAsync(id: string, data: Partial<Cours>): Promise<void> {
  await updateDoc(doc(db, C.COURS, id), cleanUndefined(data) as any)
}

export async function deleteCoursAsync(id: string): Promise<void> {
  await deleteDoc(doc(db, C.COURS, id))
}

// ──────────────────────────────────────────────────────────────────────────────
//  DEVOIRS
// ──────────────────────────────────────────────────────────────────────────────

export async function getDevoirsAsync(createdBy?: string): Promise<Devoir[]> {
  const q = createdBy
    ? query(collection(db, C.DEVOIRS), where('createdBy', '==', createdBy))
    : query(collection(db, C.DEVOIRS))
  const snap = await getDocs(q)
  return snap.docs.map(d => fromDoc<Devoir>(d))
}

export async function createDevoirAsync(data: Omit<Devoir, 'id' | 'dateCreation'>): Promise<Devoir> {
  const id = generateId()
  const devoir: Devoir = { ...data, id, dateCreation: new Date().toISOString() }
  await setDoc(doc(db, C.DEVOIRS, id), cleanUndefined(devoir) as any)
  return devoir
}

// Devoir à questions rédigées : les réponses attendues ne figurent pas dans
// le devoir, que tout étudiant du cours peut lire, mais dans un document à
// part (devoirs_corriges/{devoirId}) réservé à l'équipe pédagogique. Les deux
// sont écrits d'un bloc : pas de devoir sans corrigé après une coupure.
export async function createDevoirAvecCorrigeAsync(
  data: Omit<Devoir, 'id' | 'dateCreation'>, corriges: Record<string, string>,
): Promise<Devoir> {
  const id = generateId()
  const devoir: Devoir = { ...data, id, dateCreation: new Date().toISOString() }
  const batch = writeBatch(db)
  batch.set(doc(db, C.DEVOIRS, id), cleanUndefined(devoir) as any)
  batch.set(doc(db, C.DEVOIRS_CORRIGES, id), { devoirId: id, createdBy: data.createdBy, corriges })
  await batch.commit()
  return devoir
}

// Réponses attendues d'un devoir, par question ; vide si le devoir n'en a pas.
export async function getCorrigesDevoirAsync(devoirId: string): Promise<Record<string, string>> {
  const snap = await getDoc(doc(db, C.DEVOIRS_CORRIGES, devoirId))
  return (snap.exists() ? (snap.data() as any).corriges : null) || {}
}

export async function updateDevoirAsync(id: string, data: Partial<Devoir>): Promise<void> {
  await updateDoc(doc(db, C.DEVOIRS, id), cleanUndefined(data) as any)
}

export async function deleteDevoirAsync(id: string): Promise<void> {
  // Les copies rendues partent avec le devoir, comme l'annonce la fenêtre de
  // confirmation : sinon elles restaient orphelines en base. Elles sont
  // supprimées d'abord, car firestore.rules autorise leur suppression d'après
  // le créateur du devoir (ownsVia), qu'il faut donc encore pouvoir lire.
  const copies = await getDocs(query(collection(db, C.SOUMISSIONS), where('devoirId', '==', id)))
  await Promise.all(copies.docs.map(d => deleteDoc(d.ref)))
  // Corrigé réservé à l'équipe, s'il existe : même raison, avant le devoir.
  await deleteDoc(doc(db, C.DEVOIRS_CORRIGES, id))
  await deleteDoc(doc(db, C.DEVOIRS, id))
}

// ──────────────────────────────────────────────────────────────────────────────
//  SOUMISSIONS
// ──────────────────────────────────────────────────────────────────────────────

export async function getSoumissionsAsync(devoirId?: string, etudiantId?: string): Promise<Soumission[]> {
  const conditions: any[] = []
  if (devoirId)    conditions.push(where('devoirId', '==', devoirId))
  if (etudiantId)  conditions.push(where('etudiantId', '==', etudiantId))
  const snap = await getDocs(query(collection(db, C.SOUMISSIONS), ...conditions))
  return snap.docs.map(d => fromDoc<Soumission>(d))
}

// Statut « noté » quand la copie arrive déjà notée (QCM corrigé à l'envoi),
// « soumis » sinon. Le statut était auparavant toujours forcé à « soumis » :
// les QCM corrigés automatiquement restaient « en attente de correction »
// chez l'étudiant, s'accumulaient dans les copies à corriger de l'enseignant
// et n'entraient dans aucune cote. Les copies enregistrées avant ce correctif
// sont reconnues par leur note (voir estNotee, lib/cotes.ts).
// Identifiant imposé par firestore.rules (devoirId_etudiantId) : une seule
// copie par étudiant et par devoir.
export async function createSoumissionAsync(data: Omit<Soumission, 'id' | 'dateSoumission' | 'statut'>): Promise<Soumission> {
  const id = `${data.devoirId}_${data.etudiantId}`
  const statut: Soumission['statut'] = typeof data.note === 'number' ? 'note' : 'soumis'
  const s: Soumission = { ...data, id, dateSoumission: new Date().toISOString(), statut }
  await setDoc(doc(db, C.SOUMISSIONS, id), cleanUndefined(s) as any)
  return s
}

export async function corrigerSoumissionAsync(id: string, note: number, commentaire: string): Promise<void> {
  await updateDoc(doc(db, C.SOUMISSIONS, id), cleanUndefined({
    note,
    commentaire,
    statut: 'note',
    dateCorrection: new Date().toISOString(),
  }) as any)
}

// ──────────────────────────────────────────────────────────────────────────────
//  AMORÇAGE DU COMPTE ADMINISTRATEUR
//
//  Il n'y a plus d'amorçage automatique de l'administrateur depuis le client.
//  L'ancienne fonction initAdminIfNeeded() embarquait l'identifiant et le mot
//  de passe du compte admin en clair dans le bundle JavaScript servi à tout
//  visiteur, et tentait à chaque chargement une connexion puis une lecture
//  Firestore non authentifiée - refusée par les règles, d'où des erreurs
//  permission-denied dès l'écran de connexion. Le compte existe ; s'il fallait
//  le recréer, cela se fait dans la console Firebase, jamais depuis le client.
//  Un profil Firestore manquant reste reconstruit à la connexion par
//  loginAsync()/getCurrentUserAsync(), à partir du mot de passe saisi.
// ──────────────────────────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────────────────────
//  LISTENERS TEMPS RÉEL (pour les hooks React)
// ──────────────────────────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────────────────────
//  PRÉSENCES
// ──────────────────────────────────────────────────────────────────────────────

export async function createPresenceAsync(data: Omit<Presence, 'id'>): Promise<Presence> {
  const id = generateId()
  // etudiantIds est dérivé de etudiants (tableau plat requis par firestore.rules
  // et par la requête array-contains ci-dessous - voir le commentaire sur ce champ
  // dans db.ts).
  const presence = { ...data, id, etudiantIds: data.etudiants.map(e => e.etudiantId) }
  await setDoc(doc(db, C.PRESENCES, id), cleanUndefined(presence) as any)
  return presence
}

export async function updatePresenceAsync(id: string, data: Partial<Presence>): Promise<void> {
  const patch = data.etudiants ? { ...data, etudiantIds: data.etudiants.map(e => e.etudiantId) } : data
  await updateDoc(doc(db, C.PRESENCES, id), cleanUndefined(patch) as any)
}

export async function deletePresenceAsync(id: string): Promise<void> {
  await deleteDoc(doc(db, C.PRESENCES, id))
}

export function onPresencesSnapshot(createdBy: string, callback: (presences: Presence[]) => void): Unsubscribe {
  const q = query(collection(db, C.PRESENCES), where('createdBy', '==', createdBy))
  return onSnapshot(q, snap => callback(snap.docs.map(d => fromDoc<Presence>(d))), err => notifyFirestoreError('onPresencesSnapshot', err))
}

export function onPresencesByEtudiantSnapshot(etudiantId: string, callback: (presences: Presence[]) => void): Unsubscribe {
  // Requête filtrée côté serveur via le champ plat etudiantIds (voir db.ts) - avant,
  // ceci écoutait TOUTE la collection sans filtre et triait côté client, ce qui, en
  // plus d'être un problème de passage à l'échelle, ne correspondait à aucune règle
  // de lecture valide (voir le correctif dans firestore.rules).
  const q = query(collection(db, C.PRESENCES), where('etudiantIds', 'array-contains', etudiantId))
  return onSnapshot(q, snap => callback(snap.docs.map(d => fromDoc<Presence>(d))), err => notifyFirestoreError('onPresencesByEtudiantSnapshot', err))
}

export function onSessionsSnapshot(userId: string, module: string | undefined, callback: (sessions: Session[]) => void): Unsubscribe {
  const conditions: any[] = [where('userId', '==', userId)]
  if (module) conditions.push(where('module', '==', module))
  const q = query(collection(db, C.SESSIONS), ...conditions)
  return onSnapshot(q, snap => callback(snap.docs.map(d => fromDoc<Session>(d))), err => notifyFirestoreError('onSessionsSnapshot', err))
}

export function onEcrituresSnapshot(userId: string, module: string | undefined, callback: (ecritures: Ecriture[]) => void): Unsubscribe {
  const conditions: any[] = [where('userId', '==', userId)]
  if (module) conditions.push(where('module', '==', module))
  const q = query(collection(db, C.ECRITURES), ...conditions)
  return onSnapshot(q, snap => callback(snap.docs.map(d => fromDoc<Ecriture>(d))), err => notifyFirestoreError('onEcrituresSnapshot', err))
}

export function onUsersSnapshot(callback: (users: User[]) => void): Unsubscribe {
  return onSnapshot(collection(db, C.USERS), snap => callback(snap.docs.map(d => fromDoc<User>(d))), err => notifyFirestoreError('onUsersSnapshot', err))
}

// ──────────────────────────────────────────────────────────────────────────────
//  NOTES DE COURS
// ──────────────────────────────────────────────────────────────────────────────
export function onAllNotesCours(callback: (notes: NoteCours[]) => void): Unsubscribe {
  return onSnapshot(collection(db, C.NOTES_COURS), snap => callback(snap.docs.map(d => fromDoc<NoteCours>(d))), err => notifyFirestoreError('onAllNotesCours', err))
}

export async function createNoteCoursAsync(data: Omit<NoteCours, 'id' | 'dateCreation'>): Promise<NoteCours> {
  const id = generateId()
  const note: NoteCours = { ...data, id, dateCreation: new Date().toISOString() }
  await setDoc(doc(db, C.NOTES_COURS, id), cleanUndefined(note) as any)
  return note
}

export async function updateNoteCoursAsync(id: string, data: Partial<NoteCours>): Promise<void> {
  await updateDoc(doc(db, C.NOTES_COURS, id), cleanUndefined(data) as any)
}

export async function deleteNoteCoursAsync(id: string): Promise<void> {
  await deleteDoc(doc(db, C.NOTES_COURS, id))
}

// ──────────────────────────────────────────────────────────────────────────────
//  EXERCICES LIBRES (non cotés)
// ──────────────────────────────────────────────────────────────────────────────
import type { ExerciceLibre, TentativeExerciceLibre } from './db'

export function onExercicesLibres(createdBy: string | undefined, callback: (ex: ExerciceLibre[]) => void): Unsubscribe {
  const q = createdBy
    ? query(collection(db, C.EXERCICES_LIBRES), where('createdBy', '==', createdBy))
    : query(collection(db, C.EXERCICES_LIBRES))
  return onSnapshot(q, snap => callback(snap.docs.map(d => fromDoc<ExerciceLibre>(d))), err => notifyFirestoreError('onExercicesLibres', err))
}

export function onAllExercicesLibres(callback: (ex: ExerciceLibre[]) => void): Unsubscribe {
  return onSnapshot(collection(db, C.EXERCICES_LIBRES), snap => callback(snap.docs.map(d => fromDoc<ExerciceLibre>(d))), err => notifyFirestoreError('onAllExercicesLibres', err))
}

export async function createExerciceLibreAsync(data: Omit<ExerciceLibre, 'id' | 'dateCreation'>): Promise<ExerciceLibre> {
  const id = generateId()
  const ex: ExerciceLibre = { ...data, id, dateCreation: new Date().toISOString() }
  await setDoc(doc(db, C.EXERCICES_LIBRES, id), cleanUndefined(ex) as any)
  return ex
}

export async function updateExerciceLibreAsync(id: string, data: Partial<ExerciceLibre>): Promise<void> {
  await updateDoc(doc(db, C.EXERCICES_LIBRES, id), cleanUndefined(data) as any)
}

export async function deleteExerciceLibreAsync(id: string): Promise<void> {
  await deleteDoc(doc(db, C.EXERCICES_LIBRES, id))
}

// Tentatives ExerciceLibre
export function onTentativesEL(etudiantId: string | undefined, callback: (t: TentativeExerciceLibre[]) => void): Unsubscribe {
  if (!etudiantId) { callback([]); return () => {} }
  const q = query(collection(db, C.TENTATIVES_EL), where('etudiantId', '==', etudiantId))
  return onSnapshot(q, snap => callback(snap.docs.map(d => fromDoc<TentativeExerciceLibre>(d))), err => notifyFirestoreError('onTentativesEL', err))
}

export async function createTentativeELAsync(data: Omit<TentativeExerciceLibre, 'id' | 'dateCreation'>): Promise<TentativeExerciceLibre> {
  const id = generateId()
  const t: TentativeExerciceLibre = { ...data, id, dateCreation: new Date().toISOString() }
  await setDoc(doc(db, C.TENTATIVES_EL, id), cleanUndefined(t) as any)
  return t
}

export async function updateTentativeELAsync(id: string, data: Partial<TentativeExerciceLibre>): Promise<void> {
  await updateDoc(doc(db, C.TENTATIVES_EL, id), cleanUndefined(data) as any)
}

// ══════════════════════════════════════════════════════════════════════════════
//  COURS SYSTÈME - Initialisation des cours par défaut
// ══════════════════════════════════════════════════════════════════════════════
import type { CoursEtudiantStatut } from './db'

// Les 3 cours système non supprimables
export const COURS_SYSTEME = [
  {
    id: 'sys_ue1_droit_travail',
    ue: 'UE 1',
    nom: 'UE 1 - Droit du travail',
    description: 'Contrats de travail, licenciement, droit social OHADA',
    moduleKey: 'ue1-droit-travail',
    icon: 'BookOpen',
    systeme: true,
    actif: true,
  },
  {
    id: 'sys_ue2_droit_societes',
    ue: 'UE 2',
    nom: 'UE 2 - Droit des sociétés OHADA',
    description: 'Droit des sociétés dans l\'espace OHADA',
    moduleKey: 'ue2-droit-societes',
    icon: 'BookOpen',
    systeme: true,
    actif: true,
  },
  {
    id: 'sys_ue3_compta_societes',
    ue: 'UE 3',
    nom: 'UE 3 - Comptabilité des sociétés',
    description: 'Comptabilité des sociétés - SYSCOHADA Révisé',
    moduleKey: 'ue3-compta-societes',
    icon: 'BookOpen',
    systeme: true,
    actif: true,
  },
  {
    id: 'sys_fiscalite',
    ue: 'UE 4',
    nom: 'UE 4 - Fiscalité des entreprises',
    description: 'Fiscalité des entreprises - IS, TVA, IRPP, RDC',
    moduleKey: 'fiscalite',
    icon: 'FileText',
    systeme: true,
    actif: true,
  },
  {
    id: 'sys_ue5_finances_publiques',
    ue: 'UE 5',
    nom: 'UE 5 - Finances Publiques',
    description: 'LOFIP, budget Etat, décentralisation, contrôle finances RDC',
    moduleKey: 'ue5-finances-publiques',
    icon: 'BookOpen',
    systeme: true,
    actif: true,
  },
  {
    id: 'sys_comptabilite_generale',
    ue: 'UE 9',
    nom: 'UE 9 - Comptabilité générale',
    description: 'Comptabilité générale - SYSCOHADA Révisé',
    moduleKey: 'comptabilite-generale',
    icon: 'Calculator',
    systeme: true,
    actif: true,
  },
  {
    id: 'sys_ue13_ias_ifrs',
    ue: 'UE 13',
    nom: 'UE 13 - Normes IAS/IFRS',
    description: 'Normes comptables internationales IAS/IFRS - Cadre conceptuel IASB, Due Process, architecture institutionnelle',
    moduleKey: 'ue13-ifrs-ias',
    icon: 'BookOpen',
    systeme: true,
    actif: true,
  },
]

/**
 * UE retirées du catalogue le 26/09/2026 (6, 7, 8, 10, 11, 12) : jamais
 * rédigées, elles restaient affichées comme « bientôt disponibles ». Leurs
 * identifiants sont conservés ici pour écarter tout document Cours qui en
 * dériverait encore dans Firestore.
 */
export const COURS_RETIRES_IDS = new Set([
  'sys_ue6_gestion_financiere',
  'sys_ue7_management',
  'sys_ue8_consolidation',
  'sys_ue10_compta_approfondie',
  'sys_controle_de_gestion',
  'sys_ue12_audit',
])

/** Rang de chaque UE système (0 = UE1, 1 = UE2, ...) pour trier par ordre croissant. */
const RANG_COURS_SYSTEME = new Map(COURS_SYSTEME.map((c, i) => [c.id, i]))


/**
 * Déduplique et trie par ordre croissant d'UE (UE1, UE2, UE3...) une liste de
 * documents Cours issus de Firestore. Sans cet appel, l'ordre affiché est
 * celui de la requête Firestore - imprévisible, car il dépend de l'ordre
 * d'auto-provisionnement par faculté (provisionCoursManquantsAsync), pas du
 * numéro d'UE.
 * - Exclut les cours non actifs
 * - Exclut les cours liés à une UE retirée du catalogue
 * - Déduplique : un seul cours par coursSystemeId (premier trouvé)
 */
export function getCoursUniquesTries(liste: any[]): any[] {
  const seen = new Set<string>()
  return liste
    .filter(c => {
      if (!c.actif) return false
      if (COURS_RETIRES_IDS.has(c.id)) return false
      if (c.coursSystemeId && COURS_RETIRES_IDS.has(c.coursSystemeId)) return false
      const key = c.coursSystemeId || c.id
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((a, b) => {
      const ra = RANG_COURS_SYSTEME.get(a.coursSystemeId) ?? 999
      const rb = RANG_COURS_SYSTEME.get(b.coursSystemeId) ?? 999
      return ra - rb
    })
}

/**
 * Même tri et même exclusion que getCoursUniquesTries, SANS déduplication :
 * chaque faculté a son propre document pour une même UE, et les étudiants
 * sont inscrits à celui de leur faculté. Pour rattacher une séance ou filtrer
 * un groupe, il faut le document exact - la déduplication gardait le premier
 * trouvé, parfois celui d'une autre faculté.
 */
export function getCoursTries<T extends { id: string; actif?: boolean; coursSystemeId?: string }>(liste: T[]): T[] {
  return liste
    .filter(c => {
      if (!c.actif) return false
      if (COURS_RETIRES_IDS.has(c.id)) return false
      if (c.coursSystemeId && COURS_RETIRES_IDS.has(c.coursSystemeId)) return false
      return true
    })
    .sort((a, b) => {
      const ra = RANG_COURS_SYSTEME.get(a.coursSystemeId || '') ?? 999
      const rb = RANG_COURS_SYSTEME.get(b.coursSystemeId || '') ?? 999
      return ra - rb
    })
}

// ─── Rattachement au cours réel d'une faculté ────────────────────────────────
// Chaque faculté reçoit son propre document de cours pour chaque UE du
// catalogue (provisionCoursManquantsAsync), relié à l'UE par coursSystemeId.
// Les étudiants sont inscrits à ces documents, et firestore.rules ne leur
// laisse lire un devoir, un exercice libre ou un document que si son coursId
// figure dans leurs inscriptions.

/** UE du catalogue désignée par l'identifiant d'un chapitre (« ue1-droit-travail ») ou par son id système. */
export function coursSystemeDe(cle: string | undefined) {
  if (!cle) return undefined
  return COURS_SYSTEME.find(cs => cs.moduleKey === cle || cs.id === cle)
}

/** Document de cours de la faculté `faculteId` pour l'UE désignée par `cleUE`. */
export function coursDeFaculte<T extends { faculteId: string; coursSystemeId?: string }>(
  liste: T[], faculteId: string | undefined, cleUE: string | undefined,
): T | undefined {
  const cs = coursSystemeDe(cleUE)
  if (!cs || !faculteId) return undefined
  return liste.find(c => c.faculteId === faculteId && c.coursSystemeId === cs.id)
}

// Devoirs et exercices libres créés depuis un chapitre avant ce correctif :
// leur coursId était l'identifiant du module (« ue1-droit-travail »), qui ne
// désigne aucun cours. Aucun étudiant ne pouvait les lire. Ils sont rattachés
// au cours de leur faculté. Portée : ceux de l'équipe pédagogique appelante,
// seule autorisée à les modifier.
export async function reparerContenusDeChapitreAsync(equipeIds: string[], coursList: Cours[]): Promise<number> {
  if (equipeIds.length === 0 || coursList.length === 0) return 0
  const cles = new Set(COURS_SYSTEME.map(cs => cs.moduleKey))
  let n = 0
  for (const coll of [C.DEVOIRS, C.EXERCICES_LIBRES]) {
    const snap = await getDocs(query(collection(db, coll), where('createdBy', 'in', equipeIds.slice(0, 30))))
    for (const d of snap.docs) {
      const data = d.data() as { coursId?: string; faculteId?: string }
      if (!data.coursId || !cles.has(data.coursId)) continue
      const cible = coursDeFaculte(coursList, data.faculteId, data.coursId)
      if (!cible) continue
      await updateDoc(d.ref, { coursId: cible.id })
      n++
    }
  }
  return n
}

// Ramène une liste d'inscriptions à la faculté `faculteId` : un cours d'une
// autre faculté est remplacé par celui de la faculté pour la même UE.
export function inscriptionsDeLaFaculte(coursIds: string[], faculteId: string, coursList: Cours[]): string[] {
  return Array.from(new Set(coursIds.map(id => {
    const c = coursList.find(x => x.id === id)
    if (!c || c.faculteId === faculteId || !c.coursSystemeId) return id
    return coursList.find(x => x.faculteId === faculteId && x.coursSystemeId === c.coursSystemeId)?.id || id
  })))
}

// Inscriptions et codes d'accès établis avec l'ancienne liste de cours, qui ne
// gardait qu'un exemplaire de chaque UE, parfois celui d'une autre faculté :
// l'étudiant ne voyait alors ni les devoirs ni les notes de son enseignant.
// Ramenés à la faculté de l'étudiant (ou du code). Réservé à l'administrateur,
// seul autorisé à modifier le profil d'un autre compte.
export async function reparerInscriptionsFaculteAsync(users: User[], coursList: Cours[]): Promise<number> {
  if (coursList.length === 0) return 0
  const maj: { id: string; coursIds: string[] }[] = []
  for (const u of users) {
    const ids = (u as any).coursIds as string[] | undefined
    const fac = (u as any).faculteId as string | undefined
    if (u.role !== 'etudiant' || !fac || !ids?.length) continue
    const nouveaux = inscriptionsDeLaFaculte(ids, fac, coursList)
    if (nouveaux.join('|') !== ids.join('|')) maj.push({ id: u.id, coursIds: nouveaux })
  }
  for (let i = 0; i < maj.length; i += 400) {
    const batch = writeBatch(db)
    maj.slice(i, i + 400).forEach(m => batch.update(doc(db, C.USERS, m.id), { coursIds: m.coursIds }))
    await batch.commit()
  }
  if (maj.length > 0) invaliderCacheUsers()
  return maj.length
}

export async function reparerCodesAccesFaculteAsync(equipeIds: string[], coursList: Cours[]): Promise<number> {
  if (equipeIds.length === 0 || coursList.length === 0) return 0
  const snap = await getDocs(query(collection(db, 'codesAcces'), where('createdBy', 'in', equipeIds.slice(0, 30))))
  let n = 0
  for (const d of snap.docs) {
    const data = d.data() as { faculteId?: string | null; coursIds?: string[] }
    if (!data.faculteId || !data.coursIds?.length) continue
    const nouveaux = inscriptionsDeLaFaculte(data.coursIds, data.faculteId, coursList)
    if (nouveaux.join('|') === data.coursIds.join('|')) continue
    await updateDoc(d.ref, { coursIds: nouveaux })
    n++
  }
  return n
}

// Initialise les cours système dans Firestore (crée ou met à jour)
export async function initCoursSystemeAsync(): Promise<void> {
  for (const cours of COURS_SYSTEME) {
    const ref = doc(db, C.COURS, cours.id)
    const snap = await getDoc(ref)
    if (!snap.exists()) {
      await setDoc(ref, cleanUndefined({
        ...cours,
        faculteId: '',
        universiteId: '',
        createdBy: 'system',
        // adminId requis par firestore.rules (hasAll(['adminId','createdBy']))
        // à la création - ces cours système n'appartiennent à aucun admin en
        // particulier (visibles de tous, cf. allow read: if isAuth() sur
        // /cours), donc pas de vraie valeur à mettre : présence du champ
        // suffit à satisfaire la règle.
        adminId: 'system',
        dateCreation: new Date().toISOString(),
      }) as any)
    } else {
      // Champs système réalignés sur le catalogue, seulement s'ils ont changé :
      // sept écritures inutiles à chaque connexion sinon.
      const d = snap.data() as any
      if (d.actif !== cours.actif || d.nom !== cours.nom || d.moduleKey !== cours.moduleKey || d.systeme !== true) {
        await updateDoc(ref, cleanUndefined({ actif: cours.actif, nom: cours.nom, moduleKey: cours.moduleKey, systeme: true }) as any)
      }
    }
  }
}

// Provisionne, pour UNE faculté donnée, un cours réel (document propre à
// cette faculté, cf. Cours.faculteId/universiteId - c'est ce qui isole ses
// inscrits/côtes/présences de ceux d'une autre faculté) pour chaque UE
// active du catalogue COURS_SYSTEME qui n'en a pas encore. Idempotent :
// s'appuie sur la liste déjà chargée (coursExistants) pour ne rien recréer,
// donc rappelable sans risque à chaque chargement de l'écran admin - c'est
// ce qui rend l'affectation des UE automatique (plus besoin du bouton
// "Nouveau cours" pour le cas courant : une UE active doit exister pour
// toute faculté). Une UE nouvellement activée dans COURS_SYSTEME (mise à
// jour de code) se retrouve provisionnée dès la prochaine ouverture de la
// page, pour toutes les facultés déjà existantes - pas seulement les
// nouvelles.
export async function provisionCoursManquantsAsync(
  faculteId: string,
  universiteId: string,
  adminId: string,
  createdBy: string,
  coursExistants: Cours[]
): Promise<void> {
  const dejaAssignes = new Set(
    coursExistants
      .filter(c => c.faculteId === faculteId && (c as any).coursSystemeId)
      .map(c => (c as any).coursSystemeId as string)
  )
  const manquants = COURS_SYSTEME.filter(cs => cs.actif && !dejaAssignes.has(cs.id))
  for (const cs of manquants) {
    await createCoursAsync({
      nom: cs.nom,
      description: cs.description,
      faculteId,
      universiteId,
      actif: true,
      createdBy,
      adminId,
      coursSystemeId: cs.id,
    } as any)
  }
}

// ── Cours Statuts ─────────────────────────────────────────────────────────────

export function onCoursStatutsEtudiant(
  etudiantId: string | undefined,
  callback: (s: CoursEtudiantStatut[]) => void
): Unsubscribe {
  if (!etudiantId) { callback([]); return () => {} }
  const q = query(collection(db, C.COURS_STATUTS), where('etudiantId', '==', etudiantId))
  return onSnapshot(q, snap => callback(snap.docs.map(d => fromDoc<CoursEtudiantStatut>(d))), err => notifyFirestoreError('onCoursStatutsEtudiant', err))
}

export function onCoursStatutsParCreateur(
  createdBy: string | string[] | undefined,
  callback: (s: CoursEtudiantStatut[]) => void
): Unsubscribe {
  const ids = (Array.isArray(createdBy) ? createdBy : [createdBy]).filter(Boolean) as string[]
  if (ids.length === 0) { callback([]); return () => {} }
  // Plusieurs créateurs : membres d'une équipe pédagogique (lib/equipe.ts).
  const q = query(collection(db, C.COURS_STATUTS), where('createdBy', 'in', ids.slice(0, 30)))
  return onSnapshot(q, snap => callback(snap.docs.map(d => fromDoc<CoursEtudiantStatut>(d))), err => notifyFirestoreError('onCoursStatutsParCreateur', err))
}

export async function setCoursStatutAsync(
  etudiantId: string,
  coursId: string,
  moduleKey: string,
  statut: 'actif' | 'termine' | 'verrouille',
  createdBy: string
): Promise<void> {
  const id = `${etudiantId}_${coursId}`
  const existing = await getDoc(doc(db, C.COURS_STATUTS, id))
  const now = new Date().toISOString()
  const data: CoursEtudiantStatut = {
    id, etudiantId, coursId, moduleKey, statut, createdBy,
    dateDebut: existing.exists() ? (existing.data()?.dateDebut || now) : now,
    dateFin: statut === 'termine' ? now : undefined,
  }
  await setDoc(doc(db, C.COURS_STATUTS, id), cleanUndefined(data) as any)
}

export async function deleteCoursStatutAsync(etudiantId: string, coursId: string): Promise<void> {
  await deleteDoc(doc(db, C.COURS_STATUTS, `${etudiantId}_${coursId}`))
}

// ──────────────────────────────────────────────────────────────────────────────
//  ANNÉE ACADÉMIQUE - réglage global + archivage automatique des promotions
// ──────────────────────────────────────────────────────────────────────────────

const CONFIG_ANNEE_ID = 'anneeAcademique'

// Lit l'année académique active. Tant qu'aucun admin n'a encore fait avancer
// l'année (document config/anneeAcademique absent), on retombe sur le calcul
// par date (anneeAcademiqueEnCours) déjà utilisé ailleurs dans l'app - bootstrap
// sans configuration manuelle préalable.
export async function getAnneeAcademiqueActiveAsync(): Promise<string> {
  const snap = await getDoc(doc(db, C.CONFIG, CONFIG_ANNEE_ID))
  return snap.exists() ? (snap.data() as any).valeur : anneeAcademiqueEnCours()
}

export function onAnneeAcademiqueSnapshot(callback: (annee: string) => void): Unsubscribe {
  return onSnapshot(doc(db, C.CONFIG, CONFIG_ANNEE_ID), snap => {
    callback(snap.exists() ? (snap.data() as any).valeur : anneeAcademiqueEnCours())
  }, err => notifyFirestoreError('onAnneeAcademiqueSnapshot', err))
}

function anneeAcademiqueSuivante(annee: string): string {
  const m = annee.match(/^(\d{4})-(\d{4})$/)
  if (!m) return anneeAcademiqueEnCours()
  const debut = parseInt(m[1], 10)
  return `${debut + 1}-${debut + 2}`
}

/**
 * Fait passer la plateforme à l'année académique suivante - action admin
 * explicite (bouton "Passer à l'année suivante"), jamais automatique. Toutes
 * les fiches étudiants (collection etudiants) pas encore archivées basculent
 * archive:true avec anneeArchivage = l'année qui vient de se terminer, et le
 * compte de connexion lié (users.actif) est désactivé le cas échéant.
 *
 * Rien n'est supprimé : une fiche archivée reste consultable pour toujours
 * (base des anciens étudiants), filtrable par anneeAcademique. C'est
 * uniquement l'onglet Archives (qui n'affiche que anneeArchivage ==
 * l'année juste précédente) qui perd la cohorte au bascule suivant - elle
 * reste accessible via le filtre par année dans l'historique complet.
 */
export async function avancerAnneeAcademiqueAsync(adminId: string): Promise<{
  ancienneAnnee: string
  nouvelleAnnee: string
  nbFichesArchivees: number
  nbComptesDesactives: number
}> {
  const ancienneAnnee = await getAnneeAcademiqueActiveAsync()
  const nouvelleAnnee = anneeAcademiqueSuivante(ancienneAnnee)

  const [fichesSnap, usersSnap] = await Promise.all([
    getDocs(collection(db, C.ETUDIANTS)),
    getDocs(collection(db, C.USERS)),
  ])
  const usersExistants = new Set(usersSnap.docs.map(d => d.id))
  const fichesAArchiver = fichesSnap.docs.filter(d => !(d.data() as any).archive)

  type Op = { ref: ReturnType<typeof doc>; data: Record<string, any> }
  const ops: Op[] = []
  let nbComptesDesactives = 0
  for (const d of fichesAArchiver) {
    ops.push({ ref: d.ref, data: { archive: true, anneeArchivage: ancienneAnnee } })
    const userId = (d.data() as any).userId
    // Vérifié contre usersExistants avant d'ajouter au lot : un batch Firestore
    // échoue intégralement si une seule de ses opérations update() cible un
    // document absent (userId orphelin - compte déjà supprimé), voir
    // deleteUserAsync qui ne nettoie que la fiche portant CE userId, pas
    // l'inverse s'il a été supprimé autrement.
    if (userId && usersExistants.has(userId)) {
      ops.push({ ref: doc(db, C.USERS, userId), data: { actif: false } })
      nbComptesDesactives++
    }
  }

  // writeBatch plafonné à 500 opérations côté Firestore - lots de 450 par sécurité.
  const CHUNK = 450
  for (let i = 0; i < ops.length; i += CHUNK) {
    const batch = writeBatch(db)
    for (const op of ops.slice(i, i + CHUNK)) batch.update(op.ref, cleanUndefined(op.data))
    await batch.commit()
  }

  await setDoc(doc(db, C.CONFIG, CONFIG_ANNEE_ID), {
    id: CONFIG_ANNEE_ID,
    valeur: nouvelleAnnee,
    updatedAt: new Date().toISOString(),
    updatedBy: adminId,
  })

  return { ancienneAnnee, nouvelleAnnee, nbFichesArchivees: fichesAArchiver.length, nbComptesDesactives }
}
