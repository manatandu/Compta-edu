// ═══════════════════════════════════════════════════════
//  CAMPUS OHADA : Configuration Firebase
// ═══════════════════════════════════════════════════════
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
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
export const db      = getFirestore(app)
export const auth    = getAuth(app)
export const storage = getStorage(app)
export default app
