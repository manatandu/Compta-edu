// ═══════════════════════════════════════════════════════════════════════
//  CAMPUS OHADA - Couche de données Firebase (remplace localStorage)
//  Toutes les fonctions gardent les mêmes signatures qu'avant
//  pour éviter de modifier les pages existantes.
// ═══════════════════════════════════════════════════════════════════════

import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc,
  deleteDoc, query, where, onSnapshot,
  writeBatch, getFirestore,
  type Unsubscribe
} from 'firebase/firestore'
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged, type User as FirebaseUser,
  initializeAuth, browserLocalPersistence
} from 'firebase/auth'
import { initializeApp, getApps } from 'firebase/app'
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, auth, storage } from './firebase'
import { notifyFirestoreError } from './firestoreErrorHandler'
import { anneeAcademiqueEnCours } from './utils'
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
  SOUMISSIONS:      'soumissions',
  PRESENCES:        'presences',
  NOTES_COURS:      'notes_cours',
  EXERCICES_LIBRES:   'exercices_libres',
  TENTATIVES_EL:      'tentatives_el',
  COURS_STATUTS:      'cours_statuts',
  ETUDIANTS:          'etudiants',
  CONFIG:             'config',
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
  const path = `devoirs/${devoirId}/${file.name}`
  const ref = storageRef(storage, path)
  const snapshot = await uploadBytes(ref, file)
  const url = await getDownloadURL(snapshot.ref)
  return url
}

/**
 * Supprime le PDF d'un devoir dans Firebase Storage.
 */
function storageRefFromUrl(url: string) {
  // Extrait le chemin depuis une URL Firebase Storage complète
  // ex: https://firebasestorage.googleapis.com/v0/b/BUCKET/o/PATH?token=...
  if (url.startsWith('http')) {
    const match = url.match(/\/o\/(.+?)(?:\?|$)/)
    if (match) {
      const path = decodeURIComponent(match[1])
      return storageRef(storage, path)
    }
  }
  return storageRef(storage, url)
}

export async function deleteDevoirPDF(pdfUrl: string): Promise<void> {
  try {
    const ref = storageRefFromUrl(pdfUrl)
    await deleteObject(ref)
  } catch (e) {
    console.warn('deleteDevoirPDF: fichier introuvable', e)
  }
}

/**
 * Uploade un PDF d'exercice dans Firebase Storage.
 * Chemin : exercices/{exerciceId}/{fileName}
 */
export async function uploadExercicePDF(exerciceId: string, file: File): Promise<string> {
  const path = `exercices/${exerciceId}/enonce_${Date.now()}_${file.name}`
  const ref = storageRef(storage, path)
  const snapshot = await uploadBytes(ref, file)
  return await getDownloadURL(snapshot.ref)
}

export async function uploadExerciceCorrigePDF(exerciceId: string, file: File): Promise<string> {
  const path = `exercices/${exerciceId}/corrige_${Date.now()}_${file.name}`
  const ref = storageRef(storage, path)
  const snapshot = await uploadBytes(ref, file)
  return await getDownloadURL(snapshot.ref)
}

/**
 * Uploade un document pédagogique dans Firebase Storage.
 * Chemin : documents/{userId}/{fileName}
 */
export async function uploadNoteCoursFile(userId: string, file: File): Promise<string> {
  const path = `notes-cours/${userId}/${Date.now()}_${file.name}`
  const ref = storageRef(storage, path)
  const snapshot = await uploadBytes(ref, file)
  return await getDownloadURL(snapshot.ref)
}

export async function uploadDocumentFile(userId: string, file: File): Promise<string> {
  const path = `documents/${userId}/${Date.now()}_${file.name}`
  const ref = storageRef(storage, path)
  const snapshot = await uploadBytes(ref, file)
  return await getDownloadURL(snapshot.ref)
}

/**
 * Supprime un fichier Storage depuis son URL.
 */
export async function deleteStorageFile(fileUrl: string): Promise<void> {
  try {
    const ref = storageRefFromUrl(fileUrl)
    await deleteObject(ref)
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

    // Si le profil Firestore n'existe pas → le recréer automatiquement
    // (cas de migration : compte Auth existe mais Firestore vide)
    if (!userSnap.exists()) {
      console.warn('Profil Firestore absent pour', username, '- reconstruction automatique')
      // Déterminer le rôle : manasse.tandu est admin par défaut
      const isDefaultAdmin = username.toLowerCase() === 'manasse.tandu'
      const reconstructed: User = {
        id: uid,
        username: username.toLowerCase(),
        password: password,
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
    return user
  } catch (e: any) {
    // Propager les erreurs métier (compte en attente, refusé, inactif)
    if (e.message === 'COMPTE_EN_ATTENTE' || e.message === 'COMPTE_REFUSE' || e.message === 'COMPTE_INACTIF') {
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

export async function getCurrentUserAsync(fbUser?: FirebaseUser | null): Promise<User | null> {
  // Utiliser l'utilisateur passé en paramètre, sinon le mémorisé, sinon le localStorage
  const resolvedFbUser = fbUser !== undefined ? fbUser : _currentFirebaseUser
  const uid = resolvedFbUser?.uid || localStorage.getItem('compta_current_user')
  if (!uid) return null

  const snap = await getDoc(doc(db, C.USERS, uid))
  if (snap.exists()) {
    const user = fromDoc<User>(snap)
    localStorage.setItem('compta_current_user', uid)
    return user
  }

  // Profil absent dans Firestore mais Firebase Auth est connecté
  // → Reconstruire le profil automatiquement
  if (resolvedFbUser) {
    const email = resolvedFbUser.email || ''
    const username = email.replace('@campus-ohada.app', '')
    const isAdmin = username === 'manasse.tandu'
    const reconstructed: User = {
      id: resolvedFbUser.uid,
      username,
      password: '',
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
  // Utilise la seconde instance Auth pour ne PAS déconnecter l'admin courant.
  // IMPORTANT : le setDoc doit utiliser secondaryDb (instance liée à secondaryAuth)
  // et être fait AVANT signOut(secondaryAuth), sinon Firestore refuse l'écriture
  // (aucun utilisateur authentifié sur l'instance principale au moment de la création).
  const email = toEmail(data.username)
  let uid: string
  let useSecondaryDb = false

  try {
    const cred = await createUserWithEmailAndPassword(secondaryAuth, email, data.password)
    uid = cred.user.uid
    useSecondaryDb = true  // secondaryAuth est connecté → on peut écrire avec secondaryDb
  } catch (e: any) {
    if (e.code === 'auth/email-already-in-use') {
      // Le compte Auth existe (ancienne session) - récupérer l'UID et mettre à jour
      try {
        const cred2 = await signInWithEmailAndPassword(secondaryAuth, email, data.password)
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
        // Mot de passe différent - vérifier si un profil Firestore existe déjà avec ce username
        await signOut(secondaryAuth).catch(() => {})
        const existing = await getDocs(query(collection(db, C.USERS), where('username', '==', data.username.toLowerCase())))
        if (!existing.empty) {
          throw new Error('Ce nom d\'utilisateur est déjà utilisé.')
        }
        // Compte Auth avec autre MDP : impossible de récupérer - générer un ID unique
        uid = generateId()
        useSecondaryDb = false
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
    await setDoc(doc(db, 'accountInvites', uid), { role: data.role, dateCreation: new Date().toISOString() })
  }

  const user: User = {
    ...data,
    username: data.username.toLowerCase(),
    id: uid,
    dateCreation: new Date().toISOString(),
  }

  // Écriture Firestore avec l'instance authentifiée AVANT déconnexion
  if (useSecondaryDb) {
    await setDoc(doc(secondaryDb, C.USERS, uid), cleanUndefined(user) as any)
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
    if (rolePrivilegie) {
      await deleteDoc(doc(db, 'accountInvites', uid)).catch(() => {})
    }
  } else {
    // Cas fallback (uid généré) : l'admin est connecté sur db principal
    await setDoc(doc(db, C.USERS, uid), cleanUndefined(user) as any)
    if (data.role === 'etudiant') {
      await creerFicheEtudiantLiee(db, user).catch(() => {})
    }
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
  // setDoc avec merge:true est plus robuste qu'updateDoc :
  // - fonctionne même si le document n'existe pas encore
  // - moins sujet aux restrictions Firestore sur updateDoc
  const ref = doc(db, C.USERS, id)
  await setDoc(ref, cleanUndefined(data) as any, { merge: true })

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
  await deleteDoc(doc(db, C.USERS, id))
  // Note: suppression du compte Firebase Auth nécessite Admin SDK (backend)
  // Pour l'instant on désactive l'utilisateur dans Firestore

  // Supprime la fiche 'etudiants' liée (voir creerFicheEtudiantLiee), pour ne
  // pas laisser une fiche orpheline pointant vers un compte disparu.
  try {
    const snap = await getDocs(query(collection(db, C.ETUDIANTS), where('userId', '==', id)))
    await Promise.all(snap.docs.map(d => deleteDoc(d.ref)))
  } catch { /* best-effort */ }
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
    if (promotionId && t.promotionId && t.promotionId !== promotionId) return false
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
  // ISOLATION STRICTE :
  // Si l'appelant est un étudiant (promotionId fourni), un document ne lui est visible
  // QUE si son promotionId ET son coursId correspondent exactement - OU si le document
  // n'a aucune restriction (pas de promotionId ET pas de coursId = document système global).
  // Un document avec promotionId mais sans coursId = visible pour toute la promotion.
  // Un document avec coursId mais sans promotionId = visible pour tout le cours.
  // Un document avec les deux = visible uniquement à l'intersection exacte.
  return all.filter(doc => {
    const hasPromoFilter = !!promotionId  // l'appelant a une promotion (= étudiant)
    const hasCoursFilter = !!coursId      // l'appelant a un cours
    // Restriction promotion : si le doc cible une promotion précise, l'étudiant doit correspondre
    if (doc.promotionId && hasPromoFilter && doc.promotionId !== promotionId) return false
    // Restriction cours : si le doc cible un cours précis, l'étudiant doit y être inscrit
    if (doc.coursId && hasCoursFilter && doc.coursId !== coursId) return false
    // Si le doc a un cours mais l'étudiant n'a pas ce cours dans ses inscriptions -> invisible
    if (doc.coursId && hasPromoFilter && !hasCoursFilter) return false
    return true
  })
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

// Listener temps réel pour les messages
// Deux écouteurs séparés (envoyés + reçus) pour éviter l'index composite
export function onMessagesSnapshot(userId: string, callback: (messages: Message[]) => void): Unsubscribe {
  let sent: Message[] = []
  let received: Message[] = []

  const merge = () => {
    const all = [...sent, ...received]
    const seen = new Set<string>()
    const unique = all.filter(m => { if (seen.has(m.id)) return false; seen.add(m.id); return true })
    unique.sort((a, b) => (a.date || '').localeCompare(b.date || ''))
    callback(unique)
  }

  const qSent = query(collection(db, C.MESSAGES), where('expediteurId', '==', userId))
  const qReceived = query(collection(db, C.MESSAGES), where('destinataireId', '==', userId))

  const unsubSent = onSnapshot(qSent, (snap) => {
    sent = snap.docs.map(d => fromDoc<Message>(d))
    merge()
  }, err => notifyFirestoreError('onMessagesSnapshot(sent)', err))
  const unsubReceived = onSnapshot(qReceived, (snap) => {
    received = snap.docs.map(d => fromDoc<Message>(d))
    merge()
  }, err => notifyFirestoreError('onMessagesSnapshot(received)', err))

  return () => { unsubSent(); unsubReceived() }
}

// Marque comme lus les messages reçus d'un expéditeur donné. Sans cet appel,
// le champ `lu` d'un Message restait figé à `false` depuis sa création
// (saveMessageAsync) : la messagerie n'écrivait jamais l'inverse, donc rien
// ne repassait jamais à `true`, même après ouverture de la conversation -
// la cloche de notification (NotificationBell) comptait alors des messages
// lus depuis longtemps comme éternellement « non lus ».
export async function marquerMessagesLusAsync(destinataireId: string, expediteurId: string): Promise<void> {
  const snap = await getDocs(query(
    collection(db, C.MESSAGES),
    where('destinataireId', '==', destinataireId),
    where('expediteurId', '==', expediteurId),
    where('lu', '==', false)
  ))
  if (snap.empty) return
  const batch = writeBatch(db)
  snap.docs.forEach(d => batch.update(d.ref, { lu: true }))
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

export async function updateDevoirAsync(id: string, data: Partial<Devoir>): Promise<void> {
  await updateDoc(doc(db, C.DEVOIRS, id), cleanUndefined(data) as any)
}

export async function deleteDevoirAsync(id: string): Promise<void> {
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

export async function createSoumissionAsync(data: Omit<Soumission, 'id' | 'dateSoumission' | 'statut'>): Promise<Soumission> {
  const id = generateId()
  const s: Soumission = { ...data, id, dateSoumission: new Date().toISOString(), statut: 'soumis' }
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
//  INITIALISATION - Créer l'admin principal au premier lancement
// ──────────────────────────────────────────────────────────────────────────────

export async function initAdminIfNeeded(): Promise<void> {
  const email = toEmail('manasse.tandu')
  let uid: string | null = null

  // Étape 1 : obtenir l'UID Firebase Auth (créer ou récupérer)
  try {
    const cred = await createUserWithEmailAndPassword(secondaryAuth, email, 'tandu2026')
    uid = cred.user.uid
    await signOut(secondaryAuth)
    console.log('✅ Compte Auth admin créé, UID:', uid)
  } catch (e: any) {
    if (e.code === 'auth/email-already-in-use') {
      try {
        const cred2 = await signInWithEmailAndPassword(secondaryAuth, email, 'tandu2026')
        uid = cred2.user.uid
        await signOut(secondaryAuth)
        console.log('ℹ️ Compte Auth admin existant, UID:', uid)
      } catch (e2: any) {
        console.error('Impossible de récupérer UID admin:', e2)
        return
      }
    } else {
      console.error('Erreur init admin Auth:', e)
      return
    }
  }

  if (!uid) return

  // Étape 2 : vérifier si le profil Firestore existe avec le BON UID
  try {
    const snap = await getDoc(doc(db, C.USERS, uid))
    if (snap.exists()) {
      console.log('✅ Profil Firestore admin OK')
      return // Tout est en ordre
    }

    // Le profil n'existe pas (ou est sous un autre UID) - forcer la création
    console.warn('⚠️ Profil Firestore admin absent - création forcée')
    const adminUser: User = {
      id: uid,
      username: 'manasse.tandu',
      password: 'tandu2026',
      nom: 'TANDU SAVA',
      prenom: 'Manasse',
      role: 'admin',
      dateCreation: new Date().toISOString(),
      actif: true,
    }
    await setDoc(doc(db, C.USERS, uid), cleanUndefined(adminUser) as any)
    console.log('✅ Profil Firestore admin créé avec UID:', uid)
  } catch (e) {
    console.error('Erreur Firestore initAdmin:', e)
  }
}

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
export function onNotesCours(
  coursIds: string[],
  promotionId: string,
  callback: (notes: NoteCours[]) => void
): Unsubscribe {
  if (coursIds.length === 0 || !promotionId) { callback([]); return () => {} }
  const q = query(collection(db, C.NOTES_COURS), where('actif', '==', true))
  return onSnapshot(q, snap => {
    const notes = snap.docs
      .map(d => fromDoc<NoteCours>(d))
      // ISOLATION STRICTE : le cours ET la promotion doivent correspondre
      .filter(n => coursIds.includes(n.coursId) && n.promotionId === promotionId)
    callback(notes)
  }, err => notifyFirestoreError('onNotesCours', err))
}

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
    actif: false,
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
    id: 'sys_ue6_gestion_financiere',
    ue: 'UE 6',
    nom: 'UE 6 - Analyse financière',
    description: 'Analyse financière, ratios, VAN, TIR, emprunts',
    moduleKey: 'analyse-financiere',
    icon: 'BarChart2',
    systeme: true,
    actif: false,
  },
  {
    id: 'sys_ue7_management',
    ue: 'UE 7',
    nom: 'UE 7 - Management',
    description: 'Théories et pratiques du management',
    moduleKey: 'ue7-management',
    icon: 'BookOpen',
    systeme: true,
    actif: false,
  },
  {
    id: 'sys_ue8_consolidation',
    ue: 'UE 8',
    nom: 'UE 8 - Consolidation des états financiers',
    description: 'Consolidation des comptes de groupe - SYSCOHADA',
    moduleKey: 'ue8-consolidation',
    icon: 'BookOpen',
    systeme: true,
    actif: false,
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
    id: 'sys_ue10_compta_approfondie',
    ue: 'UE 10',
    nom: 'UE 10 - Comptabilité approfondie',
    description: 'Comptabilité approfondie - cas complexes SYSCOHADA',
    moduleKey: 'ue10-compta-approfondie',
    icon: 'BookOpen',
    systeme: true,
    actif: false,
  },
  {
    id: 'sys_controle_de_gestion',
    ue: 'UE 11',
    nom: 'UE 11 - Contrôle de gestion',
    description: 'Budgets, écarts, tableaux de bord',
    moduleKey: 'controle-de-gestion',
    icon: 'Target',
    systeme: true,
    actif: false,
  },
  {
    id: 'sys_ue12_audit',
    ue: 'UE 12',
    nom: 'UE 12 - Audit',
    description: 'Audit légal et contractuel',
    moduleKey: 'ue12-audit',
    icon: 'BookOpen',
    systeme: true,
    actif: false,
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

/** Rang de chaque UE système (0 = UE1, 1 = UE2, ...) pour trier par ordre croissant. */
const RANG_COURS_SYSTEME = new Map(COURS_SYSTEME.map((c, i) => [c.id, i]))

/** IDs des cours système désactivés (à exclure des listes affichées) */
const COURS_SYSTEME_INACTIFS_IDS = new Set(COURS_SYSTEME.filter(c => !c.actif).map(c => c.id))

/**
 * Déduplique et trie par ordre croissant d'UE (UE1, UE2, UE3...) une liste de
 * documents Cours issus de Firestore. Sans cet appel, l'ordre affiché est
 * celui de la requête Firestore - imprévisible, car il dépend de l'ordre
 * d'auto-provisionnement par faculté (provisionCoursManquantsAsync), pas du
 * numéro d'UE.
 * - Exclut les cours non actifs
 * - Exclut les cours liés à un cours système désactivé
 * - Déduplique : un seul cours par coursSystemeId (premier trouvé)
 */
export function getCoursUniquesTries(liste: any[]): any[] {
  const seen = new Set<string>()
  return liste
    .filter(c => {
      if (!c.actif) return false
      if (COURS_SYSTEME_INACTIFS_IDS.has(c.id)) return false
      if (c.coursSystemeId && COURS_SYSTEME_INACTIFS_IDS.has(c.coursSystemeId)) return false
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
      // Toujours mettre à jour actif et les champs système
      await updateDoc(ref, cleanUndefined({ actif: cours.actif, nom: cours.nom, moduleKey: cours.moduleKey, systeme: true }) as any)
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
  createdBy: string | undefined,
  callback: (s: CoursEtudiantStatut[]) => void
): Unsubscribe {
  if (!createdBy) { callback([]); return () => {} }
  const q = query(collection(db, C.COURS_STATUTS), where('createdBy', '==', createdBy))
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
