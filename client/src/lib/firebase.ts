// ═══════════════════════════════════════════════════════
//  CAMPUS OHADA : Configuration Firebase
// ═══════════════════════════════════════════════════════
import { initializeApp } from 'firebase/app'
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

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
// quoi que ce soit — la cause principale de la lenteur perçue à l'ouverture.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
})
export const auth    = getAuth(app)
export const storage = getStorage(app)
export default app
