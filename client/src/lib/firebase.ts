// ═══════════════════════════════════════════════════════
//  CAMPUS OHADA : Configuration Firebase
// ═══════════════════════════════════════════════════════
import { initializeApp } from 'firebase/app'
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
} from 'firebase/firestore'
import { initializeAuth, indexedDBLocalPersistence, browserLocalPersistence } from 'firebase/auth'
import type { FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDERRGuR0EBGatLlcB5zzFi284JK6_IGmM",
  authDomain: "campus-ohada.firebaseapp.com",
  projectId: "campus-ohada",
  storageBucket: "campus-ohada.firebasestorage.app",
  messagingSenderId: "378322713592",
  appId: "1:378322713592:web:30c47407e4dbfc7d7d340d",
  measurementId: "G-NMG0E7V08Z"
}

const app = initializeApp(firebaseConfig)

// Cache local persistant (IndexedDB) : les données déjà vues s'affichent
// instantanément à la réouverture d'une page (ou après un rechargement),
// pendant que Firestore resynchronise en tâche de fond. Sans ça, chaque
// écran repart de zéro et attend un aller-retour réseau avant d'afficher
// quoi que ce soit - la cause principale de la lenteur perçue à l'ouverture.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
})
// initializeAuth plutôt que getAuth : getAuth embarque d'office le module de
// connexion par fenêtre surgissante et par redirection (Google, Facebook...),
// que l'application n'utilise pas. Même persistance que getAuth (IndexedDB en
// premier), donc les sessions déjà ouvertes restent valides.
export const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence],
})

// Le stockage de fichiers ne sert qu'aux téléversements (devoirs, documents,
// notes de cours) : son module n'est téléchargé qu'au premier envoi de
// fichier, pas à l'ouverture de l'application.
let storagePromise: Promise<FirebaseStorage> | null = null
export function getStorageDiffere(): Promise<FirebaseStorage> {
  if (!storagePromise) {
    storagePromise = import('firebase/storage').then(m => m.getStorage(app))
  }
  return storagePromise
}
export default app
