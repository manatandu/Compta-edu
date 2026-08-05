/**
 * ═══════════════════════════════════════════════════════════════════
 *  CAMPUS OHADA — Tests d'isolation Firestore Security Rules
 *  Fichier : tests/firestore/isolation.test.js
 *
 *  Ce fichier teste TOUTES les règles de sécurité définies dans
 *  firestore.rules pour garantir l'isolation stricte entre :
 *    - Cours (un étudiant ne voit pas les cours d'un autre)
 *    - Administrateurs (isolation admin → ses enfants uniquement)
 *    - Promotions (notes/devoirs cloisonnés par promotion)
 *    - Professeurs (un prof ne modifie pas le contenu d'un autre)
 *    - Étudiants (un étudiant ne voit pas les données d'un autre)
 *
 *  Chaque test est AUTONOME — aucune interférence entre les suites.
 * ═══════════════════════════════════════════════════════════════════
 */

import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, addDoc } from 'firebase/firestore'
import { describe, it, beforeAll, afterAll, afterEach } from 'vitest'

import { USERS, IDS, DOCS, token } from './helpers.js'

// ─── Chemins ──────────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
const RULES_PATH = resolve(__dirname, '../../firestore.rules')

// ─── Environnement de test ────────────────────────────────────────────────────
let testEnv

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'campus-ohada-test',
    firestore: {
      rules: readFileSync(RULES_PATH, 'utf8'),
      host: 'localhost',
      port: 8080,
    },
  })
}, 30000)

afterAll(async () => {
  await testEnv.cleanup()
})

afterEach(async () => {
  await testEnv.clearFirestore()
})

// ─── Helpers internes ─────────────────────────────────────────────────────────

/** Firestore authentifié en tant qu'utilisateur */
function db(user) {
  if (!user) return testEnv.unauthenticatedContext().firestore()
  return testEnv.authenticatedContext(user.uid).firestore()
}

/** Prépare les documents users dans Firestore (pour que isAdmin()/isProf() fonctionnent) */
async function seedUsers(...users) {
  await testEnv.withSecurityRulesDisabled(async ctx => {
    const fs = ctx.firestore()
    for (const u of users) {
      await setDoc(doc(fs, 'users', u.uid), u)
    }
  })
}

/** Insère un document directement (contourne les règles) */
async function seedDoc(collectionName, docId, data) {
  await testEnv.withSecurityRulesDisabled(async ctx => {
    await setDoc(doc(ctx.firestore(), collectionName, docId), data)
  })
}

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 1 — UTILISATEURS
// ══════════════════════════════════════════════════════════════════════════════
describe('🔐 Users — Isolation par utilisateur', () => {

  it('Un étudiant peut lire son propre profil', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'users', USERS.etud1.uid)
    await assertSucceeds(getDoc(ref))
  })

  it('Un étudiant NE PEUT PAS lire le profil d\'un autre étudiant', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    const ref = doc(db(USERS.etud1), 'users', USERS.etud2.uid)
    await assertFails(getDoc(ref))
  })

  it('Un admin peut lire TOUS les profils', async () => {
    await seedUsers(USERS.admin1, USERS.etud1, USERS.etud2)
    const ref1 = doc(db(USERS.admin1), 'users', USERS.etud1.uid)
    const ref2 = doc(db(USERS.admin1), 'users', USERS.etud2.uid)
    await assertSucceeds(getDoc(ref1))
    await assertSucceeds(getDoc(ref2))
  })

  it('Un utilisateur non authentifié PEUT créer un compte (code d\'accès)', async () => {
    const ref = doc(db(null), 'users', 'nouveau-uid')
    await assertSucceeds(setDoc(ref, { uid: 'nouveau-uid', role: 'etudiant', username: 'nouveau' }))
  })

  it('Un utilisateur non authentifié NE PEUT PAS lire un profil', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(null), 'users', USERS.etud1.uid)
    await assertFails(getDoc(ref))
  })

  it('Un étudiant NE PEUT PAS supprimer un compte', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    const ref = doc(db(USERS.etud1), 'users', USERS.etud2.uid)
    await assertFails(deleteDoc(ref))
  })

  it('Seul un admin peut supprimer un compte', async () => {
    await seedUsers(USERS.admin1, USERS.etud1)
    const ref = doc(db(USERS.admin1), 'users', USERS.etud1.uid)
    await assertSucceeds(deleteDoc(ref))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 2 — COURS — Isolation admin
// ══════════════════════════════════════════════════════════════════════════════
describe('🏫 Cours — Isolation stricte par administrateur', () => {

  it('Un prof peut créer un cours avec adminId + createdBy', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'cours', IDS.coursCompta)
    await assertSucceeds(setDoc(ref, DOCS.coursCompta))
  })

  it('Un prof NE PEUT PAS créer un cours sans adminId', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'cours', 'cours-sans-admin')
    await assertFails(setDoc(ref, {
      nom: 'Cours sans admin',
      createdBy: USERS.prof1.uid,
      // adminId manquant → doit échouer
    }))
  })

  it('Un prof NE PEUT PAS créer un cours sans createdBy', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'cours', 'cours-sans-createdby')
    await assertFails(setDoc(ref, {
      nom: 'Cours sans createdBy',
      adminId: USERS.admin1.uid,
      // createdBy manquant → doit échouer
    }))
  })

  it('Un étudiant NE PEUT PAS créer un cours', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'cours', 'cours-hack')
    await assertFails(setDoc(ref, {
      nom: 'Cours hack',
      adminId: USERS.admin1.uid,
      createdBy: USERS.etud1.uid,
    }))
  })

  it('Prof1 NE PEUT PAS modifier le cours de Prof2', async () => {
    await seedUsers(USERS.admin1, USERS.admin2, USERS.prof1, USERS.prof2)
    await seedDoc('cours', IDS.coursFiscalite, DOCS.coursFiscalite)
    const ref = doc(db(USERS.prof1), 'cours', IDS.coursFiscalite)
    await assertFails(updateDoc(ref, { nom: 'Cours modifié par prof1' }))
  })

  it('Prof1 peut modifier son propre cours', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    await seedDoc('cours', IDS.coursCompta, DOCS.coursCompta)
    const ref = doc(db(USERS.prof1), 'cours', IDS.coursCompta)
    await assertSucceeds(updateDoc(ref, { nom: 'Comptabilité Générale v2' }))
  })

  it('Un non authentifié NE PEUT PAS lire les cours', async () => {
    await seedDoc('cours', IDS.coursCompta, DOCS.coursCompta)
    const ref = doc(db(null), 'cours', IDS.coursCompta)
    await assertFails(getDoc(ref))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 3 — NOTES DE COURS — Isolation double cours + promotion
// ══════════════════════════════════════════════════════════════════════════════
describe('📝 Notes de cours — Isolation stricte cours × promotion', () => {

  it('Prof1 peut créer une note avec coursId + promotionId + createdBy', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'notes_cours', 'note-001')
    await assertSucceeds(setDoc(ref, DOCS.noteCoursCompta))
  })

  it('Un prof NE PEUT PAS créer une note sans coursId', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'notes_cours', 'note-invalide')
    await assertFails(setDoc(ref, {
      titre: 'Note sans coursId',
      promotionId: IDS.promoL1,
      createdBy: USERS.prof1.uid,
      actif: true,
    }))
  })

  it('Un prof NE PEUT PAS créer une note sans promotionId', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'notes_cours', 'note-invalide-2')
    await assertFails(setDoc(ref, {
      titre: 'Note sans promotionId',
      coursId: IDS.coursCompta,
      createdBy: USERS.prof1.uid,
      actif: true,
    }))
  })

  it('Prof2 NE PEUT PAS modifier la note de Prof1', async () => {
    await seedUsers(USERS.admin1, USERS.admin2, USERS.prof1, USERS.prof2)
    await seedDoc('notes_cours', 'note-001', DOCS.noteCoursCompta)
    const ref = doc(db(USERS.prof2), 'notes_cours', 'note-001')
    await assertFails(updateDoc(ref, { titre: 'Note modifiée par prof2' }))
  })

  it('Prof2 NE PEUT PAS supprimer la note de Prof1', async () => {
    await seedUsers(USERS.admin1, USERS.admin2, USERS.prof1, USERS.prof2)
    await seedDoc('notes_cours', 'note-001', DOCS.noteCoursCompta)
    const ref = doc(db(USERS.prof2), 'notes_cours', 'note-001')
    await assertFails(deleteDoc(ref))
  })

  it('Un étudiant NE PEUT PAS créer une note de cours', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'notes_cours', 'note-hack')
    await assertFails(setDoc(ref, {
      titre: 'Note hackée',
      coursId: IDS.coursCompta,
      promotionId: IDS.promoL1,
      createdBy: USERS.etud1.uid,
      actif: true,
    }))
  })

  it('Un étudiant NE PEUT PAS modifier une note de cours', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('notes_cours', 'note-001', DOCS.noteCoursCompta)
    const ref = doc(db(USERS.etud1), 'notes_cours', 'note-001')
    await assertFails(updateDoc(ref, { titre: 'Modif par étudiant' }))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 4 — DEVOIRS — Isolation cours + promotion
// ══════════════════════════════════════════════════════════════════════════════
describe('📋 Devoirs — Isolation stricte cours × promotion', () => {

  it('Prof1 peut créer un devoir avec coursId + promotionId + createdBy', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'devoirs', 'devoir-001')
    await assertSucceeds(setDoc(ref, DOCS.devoirCompta))
  })

  it('Un prof NE PEUT PAS créer un devoir sans coursId', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'devoirs', 'devoir-invalide')
    await assertFails(setDoc(ref, {
      titre: 'Devoir sans coursId',
      promotionId: IDS.promoL1,
      createdBy: USERS.prof1.uid,
    }))
  })

  it('Un prof NE PEUT PAS créer un devoir sans promotionId', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'devoirs', 'devoir-invalide-2')
    await assertFails(setDoc(ref, {
      titre: 'Devoir sans promotionId',
      coursId: IDS.coursCompta,
      createdBy: USERS.prof1.uid,
    }))
  })

  it('Prof2 NE PEUT PAS modifier le devoir de Prof1', async () => {
    await seedUsers(USERS.admin1, USERS.admin2, USERS.prof1, USERS.prof2)
    await seedDoc('devoirs', 'devoir-001', DOCS.devoirCompta)
    const ref = doc(db(USERS.prof2), 'devoirs', 'devoir-001')
    await assertFails(updateDoc(ref, { titre: 'Modifié par prof2' }))
  })

  it('Un étudiant NE PEUT PAS créer un devoir', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'devoirs', 'devoir-hack')
    await assertFails(setDoc(ref, {
      titre: 'Devoir hacké',
      coursId: IDS.coursCompta,
      promotionId: IDS.promoL1,
      createdBy: USERS.etud1.uid,
    }))
  })

  it('Un étudiant NE PEUT PAS supprimer un devoir', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('devoirs', 'devoir-001', DOCS.devoirCompta)
    const ref = doc(db(USERS.etud1), 'devoirs', 'devoir-001')
    await assertFails(deleteDoc(ref))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 5 — TENTATIVES — Isolation stricte par étudiant
// ══════════════════════════════════════════════════════════════════════════════
describe('✏️ Tentatives — Un étudiant ne voit que les siennes', () => {

  it('Etud1 peut créer sa propre tentative', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'tentatives', 'tent-etud1-001')
    await assertSucceeds(setDoc(ref, DOCS.tentativeEtud1))
  })

  it('Etud1 NE PEUT PAS créer une tentative au nom de Etud2', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    const ref = doc(db(USERS.etud1), 'tentatives', 'tent-usurpee')
    await assertFails(setDoc(ref, {
      ...DOCS.tentativeEtud1,
      etudiantId: USERS.etud2.uid, // usurpation d'identité
    }))
  })

  it('Etud1 peut lire SA tentative', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('tentatives', 'tent-etud1-001', DOCS.tentativeEtud1)
    const ref = doc(db(USERS.etud1), 'tentatives', 'tent-etud1-001')
    await assertSucceeds(getDoc(ref))
  })

  it('Etud1 NE PEUT PAS lire la tentative de Etud2', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    await seedDoc('tentatives', 'tent-etud2-001', DOCS.tentativeEtud2)
    const ref = doc(db(USERS.etud1), 'tentatives', 'tent-etud2-001')
    await assertFails(getDoc(ref))
  })

  it('Un prof peut lire TOUTES les tentatives', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    await seedDoc('tentatives', 'tent-etud1-001', DOCS.tentativeEtud1)
    await seedDoc('tentatives', 'tent-etud2-001', DOCS.tentativeEtud2)
    const ref1 = doc(db(USERS.prof1), 'tentatives', 'tent-etud1-001')
    const ref2 = doc(db(USERS.prof1), 'tentatives', 'tent-etud2-001')
    await assertSucceeds(getDoc(ref1))
    await assertSucceeds(getDoc(ref2))
  })

  it('Un prof peut supprimer une tentative', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    await seedDoc('tentatives', 'tent-etud1-001', DOCS.tentativeEtud1)
    const ref = doc(db(USERS.prof1), 'tentatives', 'tent-etud1-001')
    await assertSucceeds(deleteDoc(ref))
  })

  it('Etud1 NE PEUT PAS supprimer la tentative de Etud2', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    await seedDoc('tentatives', 'tent-etud2-001', DOCS.tentativeEtud2)
    const ref = doc(db(USERS.etud1), 'tentatives', 'tent-etud2-001')
    await assertFails(deleteDoc(ref))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 6 — EXERCICES LIBRES — Isolation par cours + createdBy
// ══════════════════════════════════════════════════════════════════════════════
describe('🏋️ Exercices libres — Isolation par cours', () => {

  it('Prof1 peut créer un exercice libre avec coursId + createdBy', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'exercices_libres', 'exlib-001')
    await assertSucceeds(setDoc(ref, DOCS.exerciceLibreCompta))
  })

  it('Un prof NE PEUT PAS créer un exercice libre sans coursId', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'exercices_libres', 'exlib-invalide')
    await assertFails(setDoc(ref, {
      titre: 'Exercice sans coursId',
      createdBy: USERS.prof1.uid,
      type: 'pratique',
      // coursId manquant
    }))
  })

  it('Prof2 NE PEUT PAS modifier l\'exercice libre de Prof1', async () => {
    await seedUsers(USERS.admin1, USERS.admin2, USERS.prof1, USERS.prof2)
    await seedDoc('exercices_libres', 'exlib-001', DOCS.exerciceLibreCompta)
    const ref = doc(db(USERS.prof2), 'exercices_libres', 'exlib-001')
    await assertFails(updateDoc(ref, { titre: 'Modifié par prof2' }))
  })

  it('Prof2 NE PEUT PAS supprimer l\'exercice libre de Prof1', async () => {
    await seedUsers(USERS.admin1, USERS.admin2, USERS.prof1, USERS.prof2)
    await seedDoc('exercices_libres', 'exlib-001', DOCS.exerciceLibreCompta)
    const ref = doc(db(USERS.prof2), 'exercices_libres', 'exlib-001')
    await assertFails(deleteDoc(ref))
  })

  it('Un étudiant NE PEUT PAS créer un exercice libre', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'exercices_libres', 'exlib-hack')
    await assertFails(setDoc(ref, {
      titre: 'Exercice hacké',
      coursId: IDS.coursCompta,
      createdBy: USERS.etud1.uid,
      type: 'pratique',
    }))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 7 — SOUMISSIONS — Un étudiant ne voit que les siennes
// ══════════════════════════════════════════════════════════════════════════════
describe('📤 Soumissions — Isolation stricte par étudiant', () => {

  it('Etud1 peut créer SA soumission', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'soumissions', 'soum-etud1-001')
    await assertSucceeds(setDoc(ref, {
      etudiantId: USERS.etud1.uid,
      devoirId: 'devoir-001',
      coursId: IDS.coursCompta,
      contenu: 'Réponse de etud1',
    }))
  })

  it('Etud1 NE PEUT PAS créer une soumission au nom de Etud2', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'soumissions', 'soum-usurpee')
    await assertFails(setDoc(ref, {
      etudiantId: USERS.etud2.uid, // usurpation
      devoirId: 'devoir-001',
      coursId: IDS.coursCompta,
    }))
  })

  it('Etud1 NE PEUT PAS lire la soumission de Etud2', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    await seedDoc('soumissions', 'soum-etud2-001', {
      etudiantId: USERS.etud2.uid,
      devoirId: 'devoir-001',
      coursId: IDS.coursFiscalite,
    })
    const ref = doc(db(USERS.etud1), 'soumissions', 'soum-etud2-001')
    await assertFails(getDoc(ref))
  })

  it('Un prof peut lire les soumissions de ses étudiants', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    await seedDoc('soumissions', 'soum-etud1-001', {
      etudiantId: USERS.etud1.uid,
      devoirId: 'devoir-001',
      coursId: IDS.coursCompta,
    })
    const ref = doc(db(USERS.prof1), 'soumissions', 'soum-etud1-001')
    await assertSucceeds(getDoc(ref))
  })

  it('Un prof peut supprimer une soumission', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    await seedDoc('soumissions', 'soum-etud1-001', {
      etudiantId: USERS.etud1.uid,
      devoirId: 'devoir-001',
      coursId: IDS.coursCompta,
    })
    const ref = doc(db(USERS.prof1), 'soumissions', 'soum-etud1-001')
    await assertSucceeds(deleteDoc(ref))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 8 — UNIVERSITÉS / FACULTÉS — Seul l'admin peut modifier
// ══════════════════════════════════════════════════════════════════════════════
describe('🏛️ Universités & Facultés — Seul l\'admin peut écrire', () => {

  it('Un admin peut créer une université', async () => {
    await seedUsers(USERS.admin1)
    const ref = doc(db(USERS.admin1), 'universites', IDS.univ1)
    await assertSucceeds(setDoc(ref, DOCS.univ1))
  })

  it('Un prof NE PEUT PAS créer une université', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'universites', 'univ-hack')
    await assertFails(setDoc(ref, { nom: 'Université hackée', adminId: USERS.admin1.uid }))
  })

  it('Un étudiant NE PEUT PAS modifier une université', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('universites', IDS.univ1, DOCS.univ1)
    const ref = doc(db(USERS.etud1), 'universites', IDS.univ1)
    await assertFails(updateDoc(ref, { nom: 'Modifié par étudiant' }))
  })

  it('Un étudiant peut LIRE une université', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('universites', IDS.univ1, DOCS.univ1)
    const ref = doc(db(USERS.etud1), 'universites', IDS.univ1)
    await assertSucceeds(getDoc(ref))
  })

  it('Admin1 peut créer une faculté', async () => {
    await seedUsers(USERS.admin1)
    const ref = doc(db(USERS.admin1), 'facultes', IDS.fac1)
    await assertSucceeds(setDoc(ref, { nom: 'Faculté de Droit', universiteId: IDS.univ1 }))
  })

  it('Un étudiant NE PEUT PAS créer une faculté', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'facultes', 'fac-hack')
    await assertFails(setDoc(ref, { nom: 'Faculté hackée', universiteId: IDS.univ1 }))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 9 — PRÉSENCES — Seul le prof gère les présences
// ══════════════════════════════════════════════════════════════════════════════
describe('📅 Présences — Seul le prof peut écrire', () => {

  it('Prof1 peut créer une présence', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    const ref = doc(db(USERS.prof1), 'presences', 'pres-001')
    await assertSucceeds(setDoc(ref, DOCS.presenceEtud1))
  })

  it('Un étudiant NE PEUT PAS créer une présence', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'presences', 'pres-hack')
    await assertFails(setDoc(ref, DOCS.presenceEtud1))
  })

  it('Un étudiant peut lire SA présence', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('presences', 'pres-001', DOCS.presenceEtud1)
    const ref = doc(db(USERS.etud1), 'presences', 'pres-001')
    await assertSucceeds(getDoc(ref))
  })

  it('Etud2 NE PEUT PAS lire la présence de Etud1', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    await seedDoc('presences', 'pres-001', DOCS.presenceEtud1)
    const ref = doc(db(USERS.etud2), 'presences', 'pres-001')
    await assertFails(getDoc(ref))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 10 — ÉCRITURES COMPTABLES — Isolation par userId
// ══════════════════════════════════════════════════════════════════════════════
describe('📒 Écritures comptables — Isolation par utilisateur', () => {

  it('Etud1 peut créer ses propres écritures', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'ecritures', 'ecriture-001')
    await assertSucceeds(setDoc(ref, {
      userId: USERS.etud1.uid,
      sessionId: 'session-001',
      module: 'journal',
      lignes: [],
    }))
  })

  it('Etud1 NE PEUT PAS lire les écritures de Etud2', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    await seedDoc('ecritures', 'ecriture-etud2', {
      userId: USERS.etud2.uid,
      sessionId: 'session-002',
      module: 'journal',
    })
    const ref = doc(db(USERS.etud1), 'ecritures', 'ecriture-etud2')
    await assertFails(getDoc(ref))
  })

  it('Un non authentifié NE PEUT PAS lire des écritures', async () => {
    await seedDoc('ecritures', 'ecriture-001', {
      userId: USERS.etud1.uid,
      module: 'journal',
    })
    const ref = doc(db(null), 'ecritures', 'ecriture-001')
    await assertFails(getDoc(ref))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 11 — COURS STATUTS — Progression isolée par étudiant
// ══════════════════════════════════════════════════════════════════════════════
describe('📊 Cours statuts — Progression isolée par étudiant', () => {

  it('Etud1 peut lire SA progression', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('cours_statuts', `${USERS.etud1.uid}_${IDS.coursCompta}`, {
      etudiantId: USERS.etud1.uid,
      coursId: IDS.coursCompta,
      progression: 60,
    })
    const ref = doc(db(USERS.etud1), 'cours_statuts', `${USERS.etud1.uid}_${IDS.coursCompta}`)
    await assertSucceeds(getDoc(ref))
  })

  it('Etud1 NE PEUT PAS lire la progression de Etud2', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    await seedDoc('cours_statuts', `${USERS.etud2.uid}_${IDS.coursCompta}`, {
      etudiantId: USERS.etud2.uid,
      coursId: IDS.coursCompta,
      progression: 80,
    })
    const ref = doc(db(USERS.etud1), 'cours_statuts', `${USERS.etud2.uid}_${IDS.coursCompta}`)
    await assertFails(getDoc(ref))
  })

  it('Un prof peut lire la progression de tous les étudiants', async () => {
    await seedUsers(USERS.admin1, USERS.prof1)
    await seedDoc('cours_statuts', `${USERS.etud1.uid}_${IDS.coursCompta}`, {
      etudiantId: USERS.etud1.uid,
      coursId: IDS.coursCompta,
      progression: 60,
    })
    const ref = doc(db(USERS.prof1), 'cours_statuts', `${USERS.etud1.uid}_${IDS.coursCompta}`)
    await assertSucceeds(getDoc(ref))
  })
})
