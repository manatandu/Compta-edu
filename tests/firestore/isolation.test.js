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

  it('Un utilisateur fraîchement authentifié (auto-inscription) peut créer SON profil étudiant', async () => {
    // L'app crée d'abord le compte Firebase Auth (via secondaryAuth), PUIS écrit le
    // profil Firestore : au moment de l'écriture, l'appelant est donc authentifié
    // en tant que ce nouvel utilisateur — jamais réellement anonyme.
    const ref = doc(db({ uid: 'nouveau-uid' }), 'users', 'nouveau-uid')
    await assertSucceeds(setDoc(ref, { uid: 'nouveau-uid', role: 'etudiant', username: 'nouveau' }))
  })

  it('Un utilisateur non authentifié NE PEUT PAS créer de compte directement', async () => {
    const ref = doc(db(null), 'users', 'nouveau-uid')
    await assertFails(setDoc(ref, { uid: 'nouveau-uid', role: 'etudiant', username: 'nouveau' }))
  })

  it('Un utilisateur NE PEUT PAS créer un profil pour un uid qui n\'est pas le sien', async () => {
    const ref = doc(db({ uid: 'attaquant-uid' }), 'users', 'victime-uid')
    await assertFails(setDoc(ref, { uid: 'victime-uid', role: 'etudiant', username: 'victime' }))
  })

  it('Un utilisateur NE PEUT PAS s\'auto-attribuer le rôle admin sans invitation', async () => {
    const ref = doc(db({ uid: 'attaquant-uid' }), 'users', 'attaquant-uid')
    await assertFails(setDoc(ref, { uid: 'attaquant-uid', role: 'admin', username: 'attaquant' }))
  })

  it('Un utilisateur NE PEUT PAS s\'auto-attribuer le rôle professeur sans invitation', async () => {
    const ref = doc(db({ uid: 'attaquant-uid' }), 'users', 'attaquant-uid')
    await assertFails(setDoc(ref, { uid: 'attaquant-uid', role: 'professeur', username: 'attaquant' }))
  })

  it('Avec une invitation admin valide, un compte professeur peut être créé avec le rôle invité', async () => {
    await seedDoc('accountInvites', 'invite-uid', { role: 'professeur' })
    const ref = doc(db({ uid: 'invite-uid' }), 'users', 'invite-uid')
    await assertSucceeds(setDoc(ref, { uid: 'invite-uid', role: 'professeur', username: 'nouveau-prof' }))
  })

  it('Une invitation pour un rôle donné NE couvre PAS un rôle différent', async () => {
    await seedDoc('accountInvites', 'invite-uid', { role: 'professeur' })
    const ref = doc(db({ uid: 'invite-uid' }), 'users', 'invite-uid')
    await assertFails(setDoc(ref, { uid: 'invite-uid', role: 'admin', username: 'nouveau-admin' }))
  })

  it('Un admin authentifié peut créer un profil pour un uid arbitraire (cas de repli import)', async () => {
    await seedUsers(USERS.admin1)
    const ref = doc(db(USERS.admin1), 'users', 'uid-genere-csv')
    await assertSucceeds(setDoc(ref, { uid: 'uid-genere-csv', role: 'etudiant', username: 'import-csv' }))
  })

  it('Seul un admin peut poser une invitation de compte', async () => {
    await seedUsers(USERS.prof1)
    const ref = doc(db(USERS.prof1), 'accountInvites', 'cible-uid')
    await assertFails(setDoc(ref, { role: 'professeur' }))
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

  it('Un étudiant NE PEUT PAS s\'auto-promouvoir admin en modifiant son profil', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'users', USERS.etud1.uid)
    await assertFails(updateDoc(ref, { role: 'admin' }))
  })

  it('Un étudiant en attente NE PEUT PAS s\'auto-valider (actif/statutInscription)', async () => {
    await seedDoc('users', USERS.etud1.uid, { ...USERS.etud1, actif: false, statutInscription: 'en_attente' })
    const ref = doc(db(USERS.etud1), 'users', USERS.etud1.uid)
    await assertFails(updateDoc(ref, { actif: true, statutInscription: 'valide' }))
  })

  it('Un étudiant peut modifier son propre profil SANS toucher role/actif/statutInscription', async () => {
    await seedUsers(USERS.etud1)
    const ref = doc(db(USERS.etud1), 'users', USERS.etud1.uid)
    await assertSucceeds(updateDoc(ref, { telephone: '+243900000000' }))
  })

  it('Un admin PEUT modifier le rôle d\'un autre utilisateur', async () => {
    await seedUsers(USERS.admin1, USERS.etud1)
    const ref = doc(db(USERS.admin1), 'users', USERS.etud1.uid)
    await assertSucceeds(updateDoc(ref, { role: 'professeur' }))
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

  it('Un étudiant inscrit au cours PEUT lire la note de ce cours', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('notes_cours', 'note-001', DOCS.noteCoursCompta)
    const ref = doc(db(USERS.etud1), 'notes_cours', 'note-001')
    await assertSucceeds(getDoc(ref))
  })

  it("Un étudiant NON inscrit au cours NE PEUT PAS lire la note de ce cours (faille corrigée)", async () => {
    await seedUsers(USERS.etud2)
    await seedDoc('notes_cours', 'note-001', DOCS.noteCoursCompta)
    const ref = doc(db(USERS.etud2), 'notes_cours', 'note-001')
    await assertFails(getDoc(ref))
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

  it('Un étudiant inscrit au cours PEUT lire le devoir de ce cours', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('devoirs', 'devoir-001', DOCS.devoirCompta)
    const ref = doc(db(USERS.etud1), 'devoirs', 'devoir-001')
    await assertSucceeds(getDoc(ref))
  })

  it("Un étudiant NON inscrit au cours NE PEUT PAS lire le devoir de ce cours (faille corrigée)", async () => {
    await seedUsers(USERS.etud2)
    await seedDoc('devoirs', 'devoir-001', DOCS.devoirCompta)
    const ref = doc(db(USERS.etud2), 'devoirs', 'devoir-001')
    await assertFails(getDoc(ref))
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

  it('Un étudiant inscrit au cours PEUT lire l\'exercice libre de ce cours', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('exercices_libres', 'exlib-001', DOCS.exerciceLibreCompta)
    const ref = doc(db(USERS.etud1), 'exercices_libres', 'exlib-001')
    await assertSucceeds(getDoc(ref))
  })

  it("Un étudiant NON inscrit au cours NE PEUT PAS lire l'exercice libre de ce cours (faille corrigée)", async () => {
    await seedUsers(USERS.etud2)
    await seedDoc('exercices_libres', 'exlib-001', DOCS.exerciceLibreCompta)
    const ref = doc(db(USERS.etud2), 'exercices_libres', 'exlib-001')
    await assertFails(getDoc(ref))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 6bis — DOCUMENTS — Isolation par cours
// ══════════════════════════════════════════════════════════════════════════════
describe('📁 Documents — Isolation par cours', () => {

  it('Un document sans coursId (global) est lisible par tout étudiant authentifié', async () => {
    await seedUsers(USERS.etud2)
    await seedDoc('documents', 'doc-global', { titre: 'Guide plateforme', createdBy: USERS.prof1.uid })
    const ref = doc(db(USERS.etud2), 'documents', 'doc-global')
    await assertSucceeds(getDoc(ref))
  })

  it('Un étudiant inscrit au cours PEUT lire le document de ce cours', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('documents', 'doc-compta', { titre: 'Support cours', coursId: IDS.coursCompta, createdBy: USERS.prof1.uid })
    const ref = doc(db(USERS.etud1), 'documents', 'doc-compta')
    await assertSucceeds(getDoc(ref))
  })

  it("Un étudiant NON inscrit au cours NE PEUT PAS lire le document de ce cours (faille corrigée)", async () => {
    await seedUsers(USERS.etud2)
    await seedDoc('documents', 'doc-compta', { titre: 'Support cours', coursId: IDS.coursCompta, createdBy: USERS.prof1.uid })
    const ref = doc(db(USERS.etud2), 'documents', 'doc-compta')
    await assertFails(getDoc(ref))
  })

  it('Un prof/admin peut lire le document d\'un cours qui n\'est pas le sien', async () => {
    await seedUsers(USERS.admin2, USERS.prof2)
    await seedDoc('documents', 'doc-compta', { titre: 'Support cours', coursId: IDS.coursCompta, createdBy: USERS.prof1.uid })
    const ref = doc(db(USERS.prof2), 'documents', 'doc-compta')
    await assertSucceeds(getDoc(ref))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 6ter — EXERCICES (cotés) — Isolation par cours
// ══════════════════════════════════════════════════════════════════════════════
describe('🧮 Exercices — Isolation par cours', () => {

  it('Un exercice sans coursId (global) est lisible par tout étudiant authentifié', async () => {
    await seedUsers(USERS.etud2)
    await seedDoc('exercices', 'ex-global', {
      sessionId: 'sess-1', titre: 'Exercice général', description: '', instructions: '',
      ecrituresAttendues: [], bareme: { compte: 1, sens: 1, montant: 1, equilibre: 1 },
      dateCreation: new Date().toISOString(), userId: USERS.prof1.uid, actif: true,
    })
    const ref = doc(db(USERS.etud2), 'exercices', 'ex-global')
    await assertSucceeds(getDoc(ref))
  })

  it('Un étudiant inscrit au cours PEUT lire l\'exercice de ce cours', async () => {
    await seedUsers(USERS.etud1)
    await seedDoc('exercices', 'ex-compta', {
      sessionId: 'sess-1', titre: 'Exercice compta', description: '', instructions: '',
      ecrituresAttendues: [], bareme: { compte: 1, sens: 1, montant: 1, equilibre: 1 },
      dateCreation: new Date().toISOString(), userId: USERS.prof1.uid, actif: true,
      coursId: IDS.coursCompta,
    })
    const ref = doc(db(USERS.etud1), 'exercices', 'ex-compta')
    await assertSucceeds(getDoc(ref))
  })

  it("Un étudiant NON inscrit au cours NE PEUT PAS lire l'exercice de ce cours (faille corrigée)", async () => {
    await seedUsers(USERS.etud2)
    await seedDoc('exercices', 'ex-compta', {
      sessionId: 'sess-1', titre: 'Exercice compta', description: '', instructions: '',
      ecrituresAttendues: [], bareme: { compte: 1, sens: 1, montant: 1, equilibre: 1 },
      dateCreation: new Date().toISOString(), userId: USERS.prof1.uid, actif: true,
      coursId: IDS.coursCompta,
    })
    const ref = doc(db(USERS.etud2), 'exercices', 'ex-compta')
    await assertFails(getDoc(ref))
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

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 12 — SESSIONS (journal) — Isolation par étudiant
// ══════════════════════════════════════════════════════════════════════════════
describe('📓 Sessions — Isolation par étudiant', () => {

  it('Etud1 peut créer sa propre session', async () => {
    const ref = doc(db(USERS.etud1), 'sessions', 'session1')
    await assertSucceeds(setDoc(ref, { nom: 'Exercice 1', exercice: 1, userId: USERS.etud1.uid }))
  })

  it('Etud1 NE PEUT PAS créer une session au nom de Etud2', async () => {
    const ref = doc(db(USERS.etud1), 'sessions', 'session-etud2')
    await assertFails(setDoc(ref, { nom: 'Exercice 1', exercice: 1, userId: USERS.etud2.uid }))
  })

  it('Etud1 peut lire SA session', async () => {
    await seedDoc('sessions', 'session1', { nom: 'Exercice 1', exercice: 1, userId: USERS.etud1.uid })
    const ref = doc(db(USERS.etud1), 'sessions', 'session1')
    await assertSucceeds(getDoc(ref))
  })

  it('Etud1 NE PEUT PAS lire la session de Etud2', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    await seedDoc('sessions', 'session2', { nom: 'Exercice 1', exercice: 1, userId: USERS.etud2.uid })
    const ref = doc(db(USERS.etud1), 'sessions', 'session2')
    await assertFails(getDoc(ref))
  })

  it('Un prof peut lire la session d\'un étudiant (statistiques)', async () => {
    await seedUsers(USERS.prof1)
    await seedDoc('sessions', 'session1', { nom: 'Exercice 1', exercice: 1, userId: USERS.etud1.uid })
    const ref = doc(db(USERS.prof1), 'sessions', 'session1')
    await assertSucceeds(getDoc(ref))
  })

  it('Un prof NE PEUT PAS modifier la session d\'un étudiant', async () => {
    await seedUsers(USERS.prof1)
    await seedDoc('sessions', 'session1', { nom: 'Exercice 1', exercice: 1, userId: USERS.etud1.uid })
    const ref = doc(db(USERS.prof1), 'sessions', 'session1')
    await assertFails(updateDoc(ref, { nom: 'Modifié par le prof' }))
  })

  it('Etud2 NE PEUT PAS supprimer la session de Etud1', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    await seedDoc('sessions', 'session1', { nom: 'Exercice 1', exercice: 1, userId: USERS.etud1.uid })
    const ref = doc(db(USERS.etud2), 'sessions', 'session1')
    await assertFails(deleteDoc(ref))
  })
})

// ══════════════════════════════════════════════════════════════════════════════
//  SUITE 13 — MESSAGES — Isolation par participant
// ══════════════════════════════════════════════════════════════════════════════
describe('💬 Messages — Isolation par participant', () => {

  it('Etud1 peut envoyer un message à Etud2', async () => {
    const ref = doc(db(USERS.etud1), 'messages', 'msg1')
    await assertSucceeds(setDoc(ref, {
      expediteurId: USERS.etud1.uid,
      destinataireId: USERS.etud2.uid,
      participants: [USERS.etud1.uid, USERS.etud2.uid],
      texte: 'Bonjour',
      date: new Date().toISOString(),
    }))
  })

  it('Etud1 NE PEUT PAS envoyer un message en usurpant l\'expéditeur', async () => {
    const ref = doc(db(USERS.etud1), 'messages', 'msg-usurpe')
    await assertFails(setDoc(ref, {
      expediteurId: USERS.etud2.uid,
      destinataireId: USERS.etud1.uid,
      participants: [USERS.etud1.uid, USERS.etud2.uid],
      texte: 'Faux message',
      date: new Date().toISOString(),
    }))
  })

  it('Le destinataire peut lire le message reçu', async () => {
    await seedUsers(USERS.etud1, USERS.etud2)
    await seedDoc('messages', 'msg1', {
      expediteurId: USERS.etud1.uid,
      destinataireId: USERS.etud2.uid,
      participants: [USERS.etud1.uid, USERS.etud2.uid],
      texte: 'Bonjour',
    })
    const ref = doc(db(USERS.etud2), 'messages', 'msg1')
    await assertSucceeds(getDoc(ref))
  })

  it('Un tiers étranger à la conversation NE PEUT PAS lire le message', async () => {
    await seedUsers(USERS.etud1, USERS.etud2, USERS.etud3)
    await seedDoc('messages', 'msg1', {
      expediteurId: USERS.etud1.uid,
      destinataireId: USERS.etud2.uid,
      participants: [USERS.etud1.uid, USERS.etud2.uid],
      texte: 'Bonjour',
    })
    const ref = doc(db(USERS.etud3), 'messages', 'msg1')
    await assertFails(getDoc(ref))
  })
})
